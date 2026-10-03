// import {
//     getSeedName,
// } from 'sotn-shuffler'

(function (self) {

    let sotnShuffler
    // let errors
    if (self) {
        sotnShuffler = self.sotnRando?.sotnShuffler
        // errors = self.sotnRando.errors
    } else {
        sotnShuffler = require('node_modules/sotn-shuffler/index.js')
        // errors = require('./errors')
    }

    function getRandomSeedName() {
        console.log('blah')
        const seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        console.log(seed)
        document.getElementById('seed').value = sotnShuffler.getSeedName(seed)
    }

    const exports = {
        getRandomSeedName: getRandomSeedName,
        // getLocations: getLocations,
    }
    if (self) {
        self.sotnRando = Object.assign(self.sotnRando || {}, {
            shuffler2: exports,
        })
    } else {
        module.exports = exports
    }
})(typeof (self) !== 'undefined' ? self : null)
