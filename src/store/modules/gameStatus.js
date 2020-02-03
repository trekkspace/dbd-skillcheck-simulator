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
        gameMode: 'normal',
        effects: [],
        gameModes: [
            'normal', 'ds', 'training',
        ]
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
    killerPerks: {}
}

export default {
    state
}