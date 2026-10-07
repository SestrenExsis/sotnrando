(function (self) {

    // NOTE(sestren): self.sotnShuffler can't be assigned at the start

    function shuffleArray(rng, array) {
        // Use Fisher-Yates to shuffle an array in-place
        for (let i = array.length - 1; i >= 1; i--) {
            const j = Math.floor(rng() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    const exports = {
        shuffleArray: shuffleArray,
    }
    if (self) {
        self.sotnShuffler = Object.assign(self.sotnShuffler || {}, {
            common: exports,
        })
    } else {
        module.exports = exports
    }
})(typeof (self) !== 'undefined' ? self : null)
