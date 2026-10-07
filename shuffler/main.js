const fs = require('fs')
const crypto = require('crypto')
const yargs = require('yargs')

const BinPatcher = require('@sestren/bin-patcher')
const SotnPatcher = require('@sestren/bin-patcher/bins/sotn-us')
// const sotnShuffler = require('sotn-shuffler')
const core = require('./core.js')

function getExtractionFromBin(buffer) {
    const bin = new BinPatcher.GameData(buffer)
    const result = SotnPatcher.processBinary(bin).extraction
    return result
}

function generatePPF(extractionData, changesToApply) {
    // Start with a blank patch file
    let patchData = BinPatcher.maskNodes(extractionData, 'data')
    // Apply changes to patch file
    changesToApply
    .forEach((changesData) => {
        for (const changeData of changesData.changes) {
            BinPatcher.applyChange(patchData, changeData)
        }
    })
    // Convert patch file to PPF
    const result = BinPatcher.toPPF(patchData, 'Test')
    return result
}

const argv = yargs(process.argv.slice(2))
    .command({ // make
        command: 'make',
        describe: 'Create a PPF file',
        builder: (yargs) => {
            return yargs
        // Main options
            .option('bin', {
                alias: 'b',
                describe: 'Binary file to extract data from',
                type: 'string',
                normalize: true,
            })
            .option('out', {
                describe: 'Path to the output file to create',
                type: 'string',
                normalize: true,
                default: 'seeds/current-seed.ppf',
            })
        // Patcher options
            .option('patcher.on', {
                describe: 'Whether or not to apply the given list of patches',
                type: 'boolean',
            })
            .option('patcher.list', {
                describe: 'A list of filepaths of patches to apply, in order',
                type: 'array',
            })
        // Music shuffler options
            .option('musicShuffler.on', {
                describe: 'Whether or not to enable shuffling of in-game music; if disabled, all other options in this category are ignored',
                type: 'boolean',
            })
            .option('musicShuffler.seed', {
                describe: 'If supplied, this seed is always used for supplying randomness to the music shuffler',
                type: 'string',
            })
        // The following options must be declared
            .demandOption(['bin', 'out'])
        },
        handler: (argv) => {
            // Create extraction file from BIN
            const binFile = fs.openSync(argv.bin, 'r')
            const binFileSize = fs.fstatSync(binFile).size
            const buffer = Buffer.alloc(binFileSize)
            fs.readSync(binFile, buffer, 0, binFileSize)
            fs.closeSync(binFile)
            const digest = crypto.createHash('sha256').update(buffer).digest()
            console.log('Digest of disc image', digest.toString('hex'))
            const extractionData = getExtractionFromBin(buffer)
            // Generate shuffler options from args
            const shufflerOptions = {}
            if ('patcher' in argv) {
                shufflerOptions.patcher = {}
                if (('on' in argv.patcher)) {
                    shufflerOptions.patcher.on = argv.patcher.on
                }
                if ('list' in argv.patcher) {
                    shufflerOptions.patcher.list = argv.patcher.list
                }
            }
            if ('musicShuffler' in argv) {
                shufflerOptions.musicShuffler = {}
                if (('on' in argv.musicShuffler)) {
                    shufflerOptions.musicShuffler.on = argv.musicShuffler.on
                }
                if ('seed' in argv.musicShuffler) {
                    shufflerOptions.musicShuffler.seed = argv.musicShuffler.seed
                }
            }
            // Generate PPF from shuffler options
            let changesToApply = core.getChangesFromOptions(shufflerOptions)
            changesToApply = changesToApply.concat(SotnPatcher.getDefaultChangeDependencies())
            const ppfData = generatePPF(extractionData, changesToApply)
            fs.writeFileSync(argv.out, ppfData)
            // TODO(sestren): Add debug data to PPF description
            //   - Max description length on a PPF is 50 characters
            //   -          11111111112222222222333333333344444444445
            //   - 12345687901234568790123456879012345687901234568790
            //   - sotn 12345678 12345678 12345678 12345678 12345678 
            //   - aaaa gggggggg rrrrrrrr ssssssss tttttttt vvvvvvvv 
            //   - a=Abbreviation
            //   - g=Hash of game name
            //   - r=Hash of args (excluding initial seed)
            //   - s=Hash of initial seed
            //   - t=Hex of Unix time seed was generated
            //   - v=Hash of generator ID and generator version (e.g., SOTN-Shuffler v1.0.0)
        }
    })
    .command({ // seed
        command: 'seed',
        describe: 'Generate a random seed value',
        builder: (yargs) => {
            return yargs
            .option('seed', {
                alias: 's',
                describe: 'Seed to provide for randomization',
                type: 'string',
            })
            // .demandOption(['seed'])
        },
        handler: (argv) => {
            let seed = argv.seed
            if (!seed) {
                seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
            }
            console.log(sotnShuffler.getSeedName(argv.seed))
        }
    })
    .demandCommand(1)
    .help()
    .parse()