import {playerOptions} from '@/js/status/options.js'


const state = {
    acceptAllMouseButtons: false,
    keyboard: {
        startKey: 80, // P //  startGeneratorKey
        stopKey: 89, // O // stopGeneratorKey
        pauseKey: 73, // I // pauseGeneratorKey
        resumeKey: 71, // G // resumeGeneratorKey
        skillCheckKey: 32 // Space // stopNeedleKey
    },
    mouse: {
        skillCheckKey: 2 // M2 // stopNeedleKey
    },
    custom: playerOptions,
    backgroundURL: "https://raw.githubusercontent.com/trekkspace/dbd-skillcheck-simulator/master/src/assets/backgrounds/b1.jpg",
}

export default {
    state
}