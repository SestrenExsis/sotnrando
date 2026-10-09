(function (self) {
    let common
    let seedrandom

    if (self) {
        common = self.sotnShuffler.common
        seedrandom = Math.seedrandom
    } else {
        common = require('./common')
        seedrandom = require('seedrandom')
    }

    function getVanillaRoomPositions(extraction) {
        const result = []
        Object.entries(extraction.stages)
        .forEach(([stageName, stageInfo]) => {
            Object.entries(stageInfo.rooms.aliases)
            .forEach(([roomName, roomIndex]) => {
                const roomInfo = extraction.stages[stageName].rooms.data[roomIndex]
                const roomPosition = {
                    stage: stageName,
                    room: roomName,
                    row: roomInfo.top,
                    column: roomInfo.left,
                }
                result.push(roomPosition)
            })
        })
        return result
    }

    const exports = {
        getVanillaRoomPositions: getVanillaRoomPositions,
    }
    if (self) {
        self.sotnShuffler = Object.assign(self.sotnShuffler || {}, {
            roomShuffler: exports,
        })
    } else {
        module.exports = exports
    }
})(typeof (self) !== 'undefined' ? self : null)
