(function (self) {

    // NOTE(sestren): self.sotnShuffler can't be assigned at the start

    const TELEPORTERS = {
        fromAbandonedMineToCatacombs: { // fromCatacombsToAbandonedMine
            sourceStage: 'abandonedMine',
            targetStage: 'catacombs',
            room: 'bend',
            positionX: 16,
            positionY: 388,
        },
        fromAbandonedMineToUndergroundCaverns: { // fromUndergroundCavernsToAbandonedMine
            sourceStage: 'abandonedMine',
            targetStage: 'undergroundCaverns',
            room: 'wolfsHeadColumn',
            positionX: 240,
            positionY: 132,
        },
        fromAbandonedMineToWarpRooms: { // fromWarpRoomsToAbandonedMine
            sourceStage: 'abandonedMine',
            targetStage: 'warpRooms',
            room: 'fourWayIntersection',
            positionX: 752,
            positionY: 132,
        },
        fromAlchemyLaboratoryToCastleEntrance: { // fromCastleEntranceToAlchemyLaboratory
            sourceStage: 'alchemyLaboratory',
            targetStage: 'castleEntrance',
            room: 'entryway',
            positionX: 752,
            positionY: 132,
        },
        fromAlchemyLaboratoryToMarbleGallery: { // fromMarbleGalleryToAlchemyLaboratory
            sourceStage: 'alchemyLaboratory',
            targetStage: 'marbleGallery',
            room: 'exitToMarbleGallery',
            positionX: 496,
            positionY: 392,
        },
        fromAlchemyLaboratoryToRoyalChapel: { // fromRoyalChapelToAlchemyLaboratory
            sourceStage: 'alchemyLaboratory',
            targetStage: 'royalChapel',
            room: 'exitToRoyalChapel',
            positionX: 16,
            positionY: 132,
        },
        fromCastleEntranceToAlchemyLaboratory: { // fromAlchemyLaboratoryToCastleEntrance
            sourceStage: 'castleEntrance',
            targetStage: 'alchemyLaboratory',
            room: 'cubeOfZoeRoom',
            positionX: 16,
            positionY: 132,
        },
        fromCastleEntranceToMarbleGallery: { // fromMarbleGalleryToCastleEntrance
            sourceStage: 'castleEntrance',
            targetStage: 'marbleGallery',
            room: 'cubeOfZoeRoom',
            positionX: 496,
            positionY: 132,
        },
        fromCastleEntranceToUndergroundCaverns: { // fromUndergroundCavernsToCastleEntrance
            sourceStage: 'castleEntrance',
            targetStage: 'undergroundCaverns',
            room: 'shortcutToUndergroundCaverns',
            positionX: 240,
            positionY: 132,
        },
        fromCastleEntranceToWarpRooms: { // fromWarpRoomsToCastleEntrance
            sourceStage: 'castleEntrance',
            targetStage: 'warpRooms',
            room: 'shortcutToWarpRooms',
            positionX: 16,
            positionY: 132,
        },
        fromCastleKeepToClockTower: { // fromClockTowerToCastleKeep
            sourceStage: 'castleKeep',
            targetStage: 'clockTower',
            room: 'lionTorchPlatform',
            positionX: 240,
            positionY: 388,
        },
        fromCastleKeepToRoyalChapel: { // fromRoyalChapelToCastleKeep
            sourceStage: 'castleKeep',
            targetStage: 'royalChapel',
            room: 'keepArea',
            positionX: 16,
            positionY: 1924,
        },
        fromCastleKeepToWarpRooms: { // fromWarpRoomsToCastleKeep
            sourceStage: 'castleKeep',
            targetStage: 'warpRooms',
            room: 'dualPlatforms',
            positionX: 240,
            positionY: 388,
        },
        fromCatacombsToAbandonedMine: { // fromAbandonedMineToCatacombs
            sourceStage: 'catacombs',
            targetStage: 'abandonedMine',
            room: 'exitToAbandonedMine',
            positionX: 240,
            positionY: 132,
        },
        fromClockTowerToCastleKeep: { // fromCastleKeepToClockTower
            sourceStage: 'clockTower',
            targetStage: 'castleKeep',
            room: 'karasumansRoom',
            positionX: 16,
            positionY: 132,
        },
        fromClockTowerToOuterWall: { // fromOuterWallToClockTower
            sourceStage: 'clockTower',
            targetStage: 'outerWall',
            room: 'stairwellToOuterWall',
            positionX: 240,
            positionY: 132,
        },
        fromColosseumToOlroxsQuarters: { // fromOlroxsQuartersToColosseum
            sourceStage: 'colosseum',
            targetStage: 'olroxsQuarters',
            room: 'topOfElevatorShaft',
            positionX: 1264,
            positionY: 132,
        },
        fromColosseumToRoyalChapel: { // fromRoyalChapelToColosseum
            sourceStage: 'colosseum',
            targetStage: 'royalChapel',
            room: 'passagewayBetweenArenaAndRoyalChapel',
            positionX: 16,
            positionY: 132,
        },
        fromLongLibraryToOuterWall: { // fromOuterWallToLongLibrary
            sourceStage: 'longLibrary',
            targetStage: 'outerWall',
            room: 'exitToOuterWall',
            positionX: 752,
            positionY: 132,
        },
        fromMarbleGalleryToAlchemyLaboratory: { // fromAlchemyLaboratoryToMarbleGallery
            sourceStage: 'marbleGallery',
            targetStage: 'alchemyLaboratory',
            room: 'entrance',
            positionX: 16,
            positionY: 132,
        },
        fromMarbleGalleryToCastleEntrance: { // fromCastleEntranceToMarbleGallery
            sourceStage: 'marbleGallery',
            targetStage: 'castleEntrance',
            room: 'sShapedHallways',
            positionX: 16,
            positionY: 644,
        },
        fromMarbleGalleryToOlroxsQuarters: { // fromOlroxsQuartersToMarbleGallery
            sourceStage: 'marbleGallery',
            targetStage: 'olroxsQuarters',
            room: 'pathwayAfterLeftStatue',
            positionX: 16,
            positionY: 132,
        },
        fromMarbleGalleryToOuterWall: { // fromOuterWallToMarbleGallery
            sourceStage: 'marbleGallery',
            targetStage: 'outerWall',
            room: 'longHallway',
            positionX: 3824,
            positionY: 132,
        },
        fromMarbleGalleryToUndergroundCaverns: { // fromUndergroundCavernsToMarbleGallery
            sourceStage: 'marbleGallery',
            targetStage: 'undergroundCaverns',
            room: 'stairwellToUndergroundCaverns',
            positionX: 16,
            positionY: 388,
        },
        fromOlroxsQuartersToColosseum: { // fromColosseumToOlroxsQuarters
            sourceStage: 'olroxsQuarters',
            targetStage: 'colosseum',
            room: 'grandStaircase',
            positionX: 16,
            positionY: 388,
        },
        fromOlroxsQuartersToMarbleGallery: { // fromMarbleGalleryToOlroxsQuarters
            sourceStage: 'olroxsQuarters',
            targetStage: 'marbleGallery',
            room: 'skelerangRoom',
            positionX: 240,
            positionY: 648,
        },
        fromOlroxsQuartersToRoyalChapel: { // fromRoyalChapelToOlroxsQuarters
            sourceStage: 'olroxsQuarters',
            targetStage: 'royalChapel',
            room: 'catwalkCrypt',
            positionX: 16,
            positionY: 132,
        },
        fromOlroxsQuartersToWarpRooms: { // fromWarpRoomsToOlroxsQuarters
            sourceStage: 'olroxsQuarters',
            targetStage: 'warpRooms',
            room: 'tallShaft',
            positionX: 240,
            positionY: 1412,
        },
        fromOuterWallToClockTower: { // fromClockTowerToOuterWall
            sourceStage: 'outerWall',
            targetStage: 'clockTower',
            room: 'exitToClockTower',
            positionX: 16,
            positionY: 132,
        },
        fromOuterWallToLongLibrary: { // fromLongLibraryToOuterWall
            sourceStage: 'outerWall',
            targetStage: 'longLibrary',
            room: 'elevatorShaftRoom',
            positionX: 16,
            positionY: 1672,
        },
        fromOuterWallToMarbleGallery: { // fromMarbleGalleryToOuterWall
            sourceStage: 'outerWall',
            targetStage: 'marbleGallery',
            room: 'exitToMarbleGallery',
            positionX: 16,
            positionY: 132,
        },
        fromOuterWallToWarpRooms: { // fromWarpRoomsToOuterWall
            sourceStage: 'outerWall',
            targetStage: 'warpRooms',
            room: 'elevatorShaftRoom',
            positionX: 272,
            positionY: 644,
        },
        fromRoyalChapelToAlchemyLaboratory: { // fromAlchemyLaboratoryToRoyalChapel
            sourceStage: 'royalChapel',
            targetStage: 'alchemyLaboratory',
            room: 'statueLedge',
            positionX: 240,
            positionY: 132,
        },
        fromRoyalChapelToCastleKeep: { // fromCastleKeepToRoyalChapel
            sourceStage: 'royalChapel',
            targetStage: 'castleKeep',
            room: 'rightTower',
            positionX: 752,
            positionY: 648,
        },
        fromRoyalChapelToColosseum: { // fromColosseumToRoyalChapel
            sourceStage: 'royalChapel',
            targetStage: 'colosseum',
            room: 'nave',
            positionX: 496,
            positionY: 388,
        },
        fromRoyalChapelToOlroxsQuarters: { // fromOlroxsQuartersToRoyalChapel
            sourceStage: 'royalChapel',
            targetStage: 'olroxsQuarters',
            room: 'pushingStatueShortcut',
            positionX: 240,
            positionY: 132,
        },
        fromUndergroundCavernsToAbandonedMine: { // fromAbandonedMineToUndergroundCaverns
            sourceStage: 'undergroundCaverns',
            targetStage: 'abandonedMine',
            room: 'exitToAbandonedMine',
            positionX: 16,
            positionY: 132,
        },
        fromUndergroundCavernsToCastleEntrance: { // fromCastleEntranceToUndergroundCaverns
            sourceStage: 'undergroundCaverns',
            targetStage: 'castleEntrance',
            room: 'exitToCastleEntrance',
            positionX: 16,
            positionY: 132,
        },
        fromUndergroundCavernsToMarbleGallery: { // fromMarbleGalleryToUndergroundCaverns
            sourceStage: 'undergroundCaverns',
            targetStage: 'marbleGallery',
            room: 'longDrop',
            positionX: 240,
            positionY: 132,
        },
        fromWarpRoomsToAbandonedMine: { // fromAbandonedMineToWarpRooms
            sourceStage: 'warpRooms',
            targetStage: 'abandonedMine',
            room: 'warpRoomToAbandonedMine',
            positionX: 16,
            positionY: 132,
        },
        fromWarpRoomsToCastleEntrance: { // fromCastleEntranceToWarpRooms
            sourceStage: 'warpRooms',
            targetStage: 'castleEntrance',
            room: 'warpRoomToCastleEntrance',
            positionX: 240,
            positionY: 132,
        },
        fromWarpRoomsToCastleKeep: { // fromCastleKeepToWarpRooms
            sourceStage: 'warpRooms',
            targetStage: 'castleKeep',
            room: 'warpRoomToCastleKeep',
            positionX: 16,
            positionY: 132,
        },
        fromWarpRoomsToOlroxsQuarters: { // fromOlroxsQuartersToWarpRooms
            sourceStage: 'warpRooms',
            targetStage: 'olroxsQuarters',
            room: 'warpRoomToOlroxsQuarters',
            positionX: 16,
            positionY: 132,
        },
        fromWarpRoomsToOuterWall: { // fromOuterWallToWarpRooms
            sourceStage: 'warpRooms',
            targetStage: 'outerWall',
            room: 'warpRoomToOuterWall',
            positionX: 240,
            positionY: 132,
        },
    }

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
        TELEPORTERS: TELEPORTERS,
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
