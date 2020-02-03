const state = {
    events: {
        menu: false,
        skillcheck: false,
        generator: false,
        locked: false,
        startGame: false,
        pauseGame: false
    },
    buttons: {
        startGameButton: true,
        stopGameButton: false,
        pauseGameButton: false,
        resumeGameButton: false,
    },
}

const mutations = {
    updateGameStatus(state, payload){
        if (payload.length > 1) {
            payload.forEach(element => {
                state[element.state][element.event] = element.to
            })
        } else {
            state[payload[0].state][payload[0].event] = payload[0].to
        }
    }
}

export default {
    state, mutations
}
