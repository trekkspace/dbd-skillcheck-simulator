import store from '@/store/store'

import {startGenerator as startGen} from '@/js/gamemode/generator/startGen.js'
import {runGenerator as runGen} from '@/js/gamemode/generator/runGen.js'
import {stopGenerator as stopGen} from '@/js/gamemode/generator/stopGen.js'
import {skillcheckGeneration} from '@/js/skillcheckGeneration.js'


const startGenerator = () => {
    if (!store.state.gameStatus.now.generatorStarted) {
        store.commit('updateGameStatus', [{
            event: "startGame",
            to: true
        }])
        startGen()   
    }
}

const stopGenerator = () => {
    if (store.state.gameStatus.now.generatorStarted) {
        store.commit('updateGameStatus', [{
            event: "startGame",
            to: false
        },
        {
            event: "pauseGame",
            to: false
        }])

        if (store.state.gameStatus.now.generatorPaused) {
            store.state.gameStatus.now.generatorStoped = true
            stopGen()
        } else{
            store.state.gameStatus.now.generatorStoped = true
        }
    }
}

const pauseGenerator = () => {
    if (store.state.gameStatus.now.generatorStarted && !store.state.gameStatus.now.generatorPaused) {
        store.state.gameStatus.now.generatorPaused = true

        store.commit('updateGameStatus', [{
            event: "",
            to: true
        }])
    }
}

const resumeGenerator = () => {
    if (store.state.gameStatus.now.generatorPaused) {
        store.state.gameStatus.now.generatorPaused = false

        runGen()
        skillcheckGeneration()

        store.commit('updateGameStatus', [{
            event: "",
            to: false
        }])
    }
}

export {startGenerator, stopGenerator, pauseGenerator, resumeGenerator}
