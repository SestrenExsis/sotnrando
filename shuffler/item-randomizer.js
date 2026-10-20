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

    const TEMPLATE = {
        authors: [
            'Sestren',
        ],
        changes: [],
        description: [
            'Randomize found items strewn about the castle',
        ],
    }

    const ITEM_IDS = {
        // prizeHeart1: 0,
        // prizeHeart5: 1,
        // prizeGold1: 2,
        // prizeGold25: 3,
        // prizeGold50: 4,
        // prizeGold100: 5,
        // prizeGold250: 6,
        // prizeGold400: 7,
        // prizeGold700: 8,
        // prizeGold1000: 9,
        // prizeGold2000: 10,
        // prizeGold5000: 11,
        upgradeHeartMax: 12,
        // prizeFakeTurkey: 13,
        // subweaponDagger: 14,
        // subweaponAxe: 15,
        // subweaponCross: 16,
        // subweaponHolyWater: 17,
        // subweaponStopwatch: 18,
        // subweaponBible: 19,
        // subweaponReboundStone: 20,
        // subweaponVibhuti: 21,
        // subweaponAgunea: 22,
        // upgradeLifeMax: 23,
        // emptyHandSlot: 128,
        itemMonsterVial1: 129,
        itemMonsterVial2: 130,
        itemMonsterVial3: 131,
        itemShieldRod: 132,
        itemLeatherShield: 133,
        itemKnightShield: 134,
        itemIronShield: 135,
        itemAxeLordShield: 136,
        itemHeraldShield: 137,
        itemDarkShield: 138,
        itemGoddessShield: 139,
        itemShamanShield: 140,
        itemMedusaShield: 141,
        itemSkullShield: 142,
        itemFireShield: 143,
        itemAlucardShield: 144,
        itemSwordofDawn: 145,
        itemBasilard: 146,
        itemShortSword: 147,
        itemCombatKnife: 148,
        itemNunchaku: 149,
        itemWereBane: 150,
        itemRapier: 151,
        itemKarmaCoin: 152,
        itemMagicMissile: 153,
        itemRedRust: 154,
        itemTakemitsu: 155,
        itemShotel: 156,
        itemOrange: 157,
        itemApple: 158,
        itemBanana: 159,
        itemGrapes: 160,
        itemStrawberry: 161,
        itemPineapple: 162,
        itemPeanuts: 163,
        itemToadstool: 164,
        itemShiitake: 165,
        itemCheesecake: 166,
        itemShortcake: 167,
        itemTart: 168,
        itemParfait: 169,
        itemPudding: 170,
        itemIceCream: 171,
        itemFrankfurter: 172,
        itemHamburger: 173,
        itemPizza: 174,
        itemCheese: 175,
        itemHamandEggs: 176,
        itemOmelette: 177,
        itemMorningSet: 178,
        itemLunchA: 179,
        itemLunchB: 180,
        itemCurryRice: 181,
        itemGyrosPlate: 182,
        itemSpaghetti: 183,
        itemGrapeJuice: 184,
        itemBarleyTea: 185,
        itemGreenTea: 186,
        itemNatou: 187,
        itemRamen: 188,
        itemMisoSoup: 189,
        itemSushi: 190,
        itemPorkBun: 191,
        itemRedBeanBun: 192,
        itemChineseBun: 193,
        itemDimSumSet: 194,
        itemPotRoast: 195,
        itemSirloin: 196,
        itemTurkey: 197,
        itemMealTicket: 198,
        itemNeutronBomb: 199,
        itemPowerofSire: 200,
        itemPentagram: 201,
        itemBatPentagram: 202,
        itemShuriken: 203,
        itemCrossShuriken: 204,
        itemBuffaloStar: 205,
        itemFlameStar: 206,
        itemTNT: 207,
        itemBwakaKnife: 208,
        itemBoomerang: 209,
        itemJavelin: 210,
        itemTyrfing: 211,
        itemNamakura: 212,
        itemKnuckleDuster: 213,
        itemGladius: 214,
        itemScimitar: 215,
        itemCutlass: 216,
        itemSaber: 217,
        itemFalchion: 218,
        itemBroadsword: 219,
        itemBekatowa: 220,
        itemDamascusSword: 221,
        itemHunterSword: 222,
        itemEstoc: 223,
        itemBastardSword: 224,
        itemJewelKnuckles: 225,
        itemClaymore: 226,
        itemTalwar: 227,
        itemKatana: 228,
        itemFlamberge: 229,
        itemIronFist: 230,
        itemZweiHander: 231,
        itemSwordofHador: 232,
        itemLuminus: 233,
        itemHarper: 234,
        itemObsidianSword: 235,
        itemGram: 236,
        itemJewelSword: 237,
        itemMormegil: 238,
        itemFirebrand: 239,
        itemThunderbrand: 240,
        itemIcebrand: 241,
        itemStoneSword: 242,
        itemHolySword: 243,
        itemTerminusEst: 244,
        itemMarsil: 245,
        itemDarkBlade: 246,
        itemHeavenSword: 247,
        itemFistofTulkas: 248,
        itemGurthang: 249,
        itemMourneblade: 250,
        itemAlucardSword: 251,
        itemMablungSword: 252,
        itemBadelaire: 253,
        // specialSwordFamiliar: 254,
        itemGreatSword: 255,
        itemMace: 256,
        itemMorningstar: 257,
        itemHolyRod: 258,
        itemStarFlail: 259,
        itemMoonRod: 260,
        itemChakram: 261,
        itemFireBoomerang: 262,
        itemIronBall: 263,
        itemHolbeinDagger: 264,
        itemBlueKnuckles: 265,
        itemDynamite: 266,
        itemOsafuneKatana: 267,
        itemMasamune: 268,
        itemMuramasa: 269,
        itemHeartRefresh: 270,
        itemRunesword: 271,
        itemAntivenom: 272,
        itemUncurse: 273,
        itemLifeApple: 274,
        itemHammer: 275,
        itemStrengthPotion: 276,
        itemLuckPotion: 277,
        itemSmartPotion: 278,
        itemAttackPotion: 279,
        itemShieldPotion: 280,
        itemResistFire: 281,
        itemResistThunder: 282,
        itemResistIce: 283,
        itemResistStone: 284,
        itemResistHoly: 285,
        itemResistDark: 286,
        itemPotion: 287,
        itemHighPotion: 288,
        itemElixir: 289,
        itemMannaPrism: 290,
        itemVorpalBlade: 291,
        itemCrissaegrim: 292,
        itemYasutsuna: 293,
        itemLibraryCard: 294,
        itemAlucartShield: 295,
        itemAlucartSword: 296,
        // emptyArmorSlot: 297,
        itemClothTunic: 298,
        itemHideCuirass: 299,
        itemBronzeCuirass: 300,
        itemIronCuirass: 301,
        itemSteelCuirass: 302,
        itemSilverPlate: 303,
        itemGoldPlate: 304,
        itemPlatinumMail: 305,
        itemDiamondPlate: 306,
        itemFireMail: 307,
        itemLightningMail: 308,
        itemIceMail: 309,
        itemMirrorCuirass: 310,
        itemSpikeBreaker: 311,
        itemAlucardMail: 312,
        itemDarkArmor: 313,
        itemHealingMail: 314,
        itemHolyMail: 315,
        itemWalkArmor: 316,
        itemBrilliantMail: 317,
        itemMojoMail: 318,
        itemFuryPlate: 319,
        itemDraculaTunic: 320,
        itemGodsGarb: 321,
        itemAxeLordArmor: 322,
        // emptyHeadSlot: 323,
        itemSunglasses: 324,
        itemBallroomMask: 325,
        itemBandanna: 326,
        itemFeltHat: 327,
        itemVelvetHat: 328,
        itemGoggles: 329,
        itemLeatherHat: 330,
        itemHolyGlasses: 331,
        itemSteelHelm: 332,
        itemStoneMask: 333,
        itemCirclet: 334,
        itemGoldCirclet: 335,
        itemRubyCirclet: 336,
        itemOpalCirclet: 337,
        itemTopazCirclet: 338,
        itemBerylCirclet: 339,
        itemCatEyeCirclet: 340,
        itemCoralCirclet: 341,
        itemDragonHelm: 342,
        itemSilverCrown: 343,
        itemWizardHat: 344,
        // emptyCapeSlot: 345,
        itemClothCape: 346,
        itemReverseCloak: 347,
        itemElvenCloak: 348,
        itemCrystalCloak: 349,
        itemRoyalCloak: 350,
        itemBloodCloak: 351,
        itemJosephsCloak: 352,
        itemTwilightCloak: 353,
        // emptyAccessorySlot: 354,
        itemMoonstone: 355,
        itemSunstone: 356,
        itemBloodstone: 357,
        itemStaurolite: 358,
        itemRingofPales: 359,
        itemZircon: 360,
        itemAquamarine: 361,
        itemTurquoise: 362,
        itemOnyx: 363,
        itemGarnet: 364,
        itemOpal: 365,
        itemDiamond: 366,
        itemLapisLazuli: 367,
        itemRingofAres: 368,
        itemGoldRing: 369,
        itemSilverRing: 370,
        itemRingofVarda: 371,
        itemRingofArcana: 372,
        itemMysticPendant: 373,
        itemHeartBroach: 374,
        itemNecklaceofJ: 375,
        itemGauntlet: 376,
        itemAnkhofLife: 377,
        itemRingofFeanor: 378,
        itemMedal: 379,
        itemTalisman: 380,
        itemDuplicator: 381,
        itemKingsStone: 382,
        itemCovenantStone: 383,
        itemNauglamir: 384,
        itemSecretBoots: 385,
        itemAlucartMail: 386,
    }

    const REWARDS = {}
    Object.entries(ITEM_IDS)
    .forEach(([itemKey, itemValue]) => {
        REWARDS[itemKey] = {
            rewardId: itemKey,
            // displayName: TODO(sestren),
        }
    })

    function getItemLocation(stageKey, dropKey, rewardKey) {
        const result = {
            defaultValue: rewardKey,
            validRewardTypes: ['item'],
            forbiddenRewards: [],
            writes: {
                item: [
                    {
                        value: {
                            type: 'property',
                            property: 'rewardId',
                        },
                        keys: [
                            `stages.${stageKey}.constants.uniqueItemDrops.${dropKey}`,
                        ],
                    },
                ],
            },
        }
        return result
    }

    const LOCATIONS = {
        locationAbandonedMinePowerOfSire: getItemLocation('abandonedMine', 'dropPowerOfSire', 'itemPowerofSire'),
        locationAbandonedMineKarmaCoin: getItemLocation('abandonedMine', 'dropKarmaCoin', 'itemKarmaCoin'),
        // NOTE(sestren): This item is only spawned once, when the wall is broken, so it is being kept vanilla for now
        // locationAbandonedMineTurkey: getItemLocation('abandonedMine', 'dropTurkey', 'itemTurkey'),
        locationAbandonedMineRingofAres: getItemLocation('abandonedMine', 'dropRingOfAres', 'itemRingofAres'),
        locationAbandonedMineCombatKnife: getItemLocation('abandonedMine', 'dropCombatKnife', 'itemCombatKnife'),
        locationAbandonedMinePeanuts1: getItemLocation('abandonedMine', 'dropPeanuts1', 'itemPeanuts'),
        locationAbandonedMinePeanuts2: getItemLocation('abandonedMine', 'dropPeanuts2', 'itemPeanuts'),
        locationAbandonedMinePeanuts3: getItemLocation('abandonedMine', 'dropPeanuts3', 'itemPeanuts'),
        locationAbandonedMinePeanuts4: getItemLocation('abandonedMine', 'dropPeanuts4', 'itemPeanuts'),
        locationAbandonedMineBarleyTea: getItemLocation('abandonedMine', 'dropBarleyTea', 'itemBarleyTea'),
        locationAbandonedMineShiitake1: getItemLocation('abandonedMine', 'dropShiitake1', 'itemShiitake'),
        locationAbandonedMineShiitake2: getItemLocation('abandonedMine', 'dropShiitake2', 'itemShiitake'),
        // locationYYYXXX: getItemLocation('YYY', 'dropXXX', 'itemXXX'),
    }

    function randomizeItems(seed) {
        const rng = seedrandom(seed)
        const itemPool = Array.from(Object.keys(ITEM_IDS))
        let result = {
            debugInfo: {
                attemptCounter: 0,
            },
            valid: true,
        }
        let validInd = false
        while (!validInd) {
            result.debugInfo.attemptCounter += 1
            validInd = true
            result.locations = {}
            Object.entries(LOCATIONS)
            .forEach(([locationName, locationInfo]) => {
                result.locations[locationName] = common.shuffleArray(rng, itemPool).at(-1)
            })
        }
        return result
    }

    function getItemsChanges(locations) {
        const itemsChanges = {}
        Object.entries(locations)
        .forEach(([locationName, rewardName]) => {
            const properties = {
                rewardId: REWARDS[rewardName].rewardId,
                // displayName: REWARDS[rewardName].displayName,
            }
            const rewardType = (rewardName.startsWith('item')) ? 'item' : 'relic'
            LOCATIONS[locationName].writes[rewardType]
            .forEach((writeInfo) => {
                let writeValue = 0
                switch (writeInfo.value.type) {
                    case 'property':
                        writeValue = properties[writeInfo.value.property]
                        break
                    case 'constant':
                        writeValue = writeInfo.value.constant
                        break
                }
                writeInfo.keys
                .forEach((writeKey) => {
                    itemsChanges[writeKey + '='] = writeValue
                })
            })
        })
        const result = Object.assign({}, TEMPLATE)
        result.changes.push({
            changeType: 'merge',
            merge: itemsChanges,
        })
        return result
    }

    const exports = {
        getItemsChanges: getItemsChanges,
        randomizeItems: randomizeItems,
    }
    if (self) {
        self.sotnShuffler = Object.assign(self.sotnShuffler || {}, {
            itemRandomizer: exports,
        })
    } else {
        module.exports = exports
    }
})(typeof (self) !== 'undefined' ? self : null)
