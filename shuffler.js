const fs = require('fs')
const crypto = require('crypto')
const yargs = require('yargs')

const binPatcher = require('bin-patcher')
const sotnPatcher = require('bin-patcher/bins/sotn-us/')
const sotnShuffler = require('sotn-shuffler')

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
                default: './seeds/current-seed.json',
            })
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
            const bin = new binPatcher.GameData(buffer)
            const extractionData = sotnPatcher.processBinary(bin).extraction
            const changeDependencies = sotnPatcher.getDefaultChangeDependencies()
            const changesArray = []
            // TODO(sestren): Add more changes here
            const changesToApply = changesArray.concat(changeDependencies)
            // Create empty patch file
            let patchData = binPatcher.maskNodes(extractionData, 'data')
            // Apply changes to patch file
            changesToApply
            .forEach((changesData) => {
                for (const changeData of changesData.changes) {
                    applyChange(patchData, changeData)
                }
            })
            // Hard-coded changes here
            patchData.messages.richterModeInstructions1.data = 'This is a test'
            const mapColors = [
                '#0000007F',
                '#0808B0FF',
                '#002858FF',
                '#101810FF',
                '#A80808FF',
                '#B04D08FF',
                '#A88020FF',
                '#B04058FF',
                '#880888FF',
                '#286878FF',
                '#8038B0FF',
                '#088008FF',
                '#585858FF',
                '#084828FF',
                '#C0C0C0FF',
                '#0C70B0FF',
            ]
            patchData.castleMapColorPalettes.dra.data = mapColors
            patchData.castleMapColorPalettes.ric.data = mapColors
            // ...
            const result = binPatcher.toPPF(patchData, 'This is a test')
            // 12345687901234568790123456879012345687901234568790
            // sotn 12345678 12345678 12345678 12345678 12345678
            // a=Abbreviation
            // g=Hash of game name
            // r=Hash of non-seed args
            // s=Hash of initial seed
            // t=Hex of Unix time seed was generated
            // v=Hash of generator ID and generator version (e.g., SOTN-Shuffler v1.0.0)
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