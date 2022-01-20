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
    backgroundURL: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/381210/1ffb8d3f83682e63b1b0ea460cec4cf9d2660eec.jpg",
}

export default {
    state
}
