const binPatcher = require('bin-patcher')
const sotnPatcher = require('bin-patcher/bins/sotn-us/')
const sotnShuffler = require('sotn-shuffler')


import {
    getSeedName,
} from './src/generate-words.js'

import {
    shuffleRewards,
    getRewardChanges,
} from './src/shuffle-rewards.js'

export {
    getRewardChanges,
    getSeedName,
    shuffleRewards,
}