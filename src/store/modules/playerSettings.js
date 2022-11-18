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
    backgroundURL: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/322330/4a1a9aaa02672104c56b52cc850cd84dcc15c95c.jpg",
}

export default {
    state
}