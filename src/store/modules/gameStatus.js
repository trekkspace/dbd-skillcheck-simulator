const state = {
    now: {
        generatorRunning: false,
        generatorStarted: false,

        brokenGeneratorEffectCurrentTime: 0,
        brokeGeneratorEffect: false,
        brokeGeneratorEffectRunning: false,
        brokeGeneratorEffectStoped: false,

        generatorPaused: false,
        generatorStoped: false,

        charges: 0, // 80 charges for a complete generator

        // inProgress: false,
        // waitStart: false,
        generatorsLeft: 2, // 
        gameMode: 'easy',
        effects: [],
        gameModes: [
            'easy', 'medium', 'hard', 'ds', "wiggle", "glyph", 'custom',
        ],
        glyph:{
            start: new Date().getTime(),
            last: new Date().getTime(),
            started:false,
            now:0
        }
    },
    rank: {
        buttonArea: {
        showButton: false,
        disableButton: true,
    },
        showRank: false,
        pipLevel: 0,
    },
    item: false, // holds the value from toolbox and addons toghether,
    killerPerks: {},
    survivorPerks:{}
}

export default {
    namespaced: true,
    state
}
