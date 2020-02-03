const gameOptions = {
    dsEscape: 200,
    dsFailed: -200,
    great: 150,
    good: 50,
    failed: -200,
    generatorCharges: 80, // %,
    generatorsToComplete: 2,
    generator_penalty: 10, // %
    generator_penalty_time: 3000, // ms
    generatorGreatPointsBonus: 2, // %
}

const predefinedOptions = {
    minSCspawnDeg: 0,
    maxSCspawnDeg: 170,
    defaultFixedRandomArbitrary: 4,
}

const delaySkillckeckLimits = {
    minValue: 500,  // ms
    maxValue: 10000 // ms
}

const playerOptions = {
    // delayBeforeStop: false, // false or a value, example: "3000" which stands for 3000ms
    volume: {
        value: 10,
        minValue(){
            return 0
        },
        maxValue(){
            return 100
        }
    },
    skillCheckDelayMin: {
        value: 1000,
        minValue(){
            return delaySkillckeckLimits.minValue
        }, // 1s
        maxValue(){
            return playerOptions.skillCheckDelayMax.value
        }
    },
    skillCheckDelayMax: {
        value: 2000,
        minValue(){
            return playerOptions.skillCheckDelayMin.value
        },
        maxValue(){
            return delaySkillckeckLimits.maxValue
        } // 10s
    },
}

export {gameOptions, predefinedOptions, playerOptions}