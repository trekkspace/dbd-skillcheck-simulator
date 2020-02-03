// import anime from 'animejs/lib/anime.es.js'

import store from '@/store/store'

import {startGenerator as startGen} from '@/js/generator/startGen.js'
import {runGenerator as runGen} from '@/js/generator/runGen.js'
import {stopGenerator as stopGen} from '@/js/generator/stopGen.js'
import {skillcheckGeneration} from '@/js/skillcheckGeneration.js'

import {removeSkillCheck} from '@/js/animations/skillcheck/skillCheckAnim'

import {stopButtonAnimation} from '@/js/animations/buttons/stopButtonAnim.js'
import {startButtonAnimation} from '@/js/animations/buttons/startButtonAnim.js'
import {pauseButtonAnimation} from '@/js/animations/buttons/pauseButtonAnim.js'
import {resumeButtonAnimation} from '@/js/animations/buttons/resumeButtonAnim.js'
// import {generatorProgressOutAnimation} from '@/js/animations/generatorAnim'

// import {randomKillerPerks} from '@/js/perks'

// document.addEventListener('mousedown', (e)=> {
//     console.log(e)
// })

const checkLocked = () => {
    return store.state.gameEvents.events.locked
}

const checkMenu = () => {
    if (store.state.gameEvents.events.menu) {
        store.state.gameEvents.events.menu = !store.state.gameEvents.events.menu 
    }
}

// started game status
const startGame = () => {
    if (checkLocked()) {
        return
    }

    checkMenu()

    if (store.state.gameStatus.rank.showRank) {
        return
    }

    // if (store.state.gameStatus.now.gameMode == 'normal') {
    //     randomKillerPerks()
    // }

    store.state.playerStats.stats.rowScore = 0
    const updateGameStatus = () => {
        store.commit('updateGameStatus', [{
            state: 'events',
            event: "startGame",
            to: true
        }])
    }

    if (!store.state.gameEvents.events.startGame) {
        updateGameStatus()

        if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
            startGen()
        }

        if (store.state.gameStatus.now.gameMode == 'ds') {
            skillcheckGeneration()
        }

        // animation effect
        startButtonAnimation()
    }
}

// stoped game status
const stopGame = () => {
    if (checkLocked()) {
        return
    }

    checkMenu()

    // stopGameAnim.play()
    const updateGameStatus = () =>{
        store.commit('updateGameStatus', [{
            state: 'events',
            event: "startGame",
            to: false
        },
        {
            state: 'events',
            event: "pauseGame",
            to: false
        }])
    }
    
    if (store.state.gameEvents.events.startGame) {
        updateGameStatus()

        if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
            if (store.state.gameStatus.now.generatorPaused) {
                store.state.gameStatus.now.generatorStoped = true

                stopGen('stoped')

            } else{
                store.state.gameStatus.now.generatorStoped = true
            }     
        }

        if (store.state.gameStatus.now.gameMode == 'ds') {
            removeSkillCheck()
            // reset combo        
        }

        // buttons animation effect

        stopButtonAnimation()
    }
}

// paused game status
const pauseGame = () => {
    if (checkLocked()) {
        return
    }

    checkMenu()

    // pauseGameAnim.play()
    const updateGameStatus = () => {
        store.commit('updateGameStatus', [{
            state: 'events',
            event: "pauseGame",
            to: true
        }])
    }

    if (store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame) {
        updateGameStatus()
        if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
            store.state.gameStatus.now.generatorPaused = true
        }

        if (store.state.gameStatus.now.gameMode == 'ds') {
            removeSkillCheck()
        }

        // pause game anim effect

        pauseButtonAnimation()
    }
}

// resumed game status
const resumeGame = () => {
    if (checkLocked()) {
        return
    }

    checkMenu()

    // resumeGameAnim.play()
    const updateGameStatus = () => {
        store.commit('updateGameStatus', [{
            state: 'events',
            event: "pauseGame",
            to: false
        }])
    }

    if (store.state.gameEvents.events.pauseGame) {
        updateGameStatus()
        if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
                store.state.gameStatus.now.generatorPaused = false
                runGen()
                skillcheckGeneration()
        }

        if (store.state.gameStatus.now.gameMode == 'ds') {
            updateGameStatus()
            skillcheckGeneration()
        }

        // anim btn

        resumeButtonAnimation()
    }
}

export {startGame, stopGame, pauseGame, resumeGame}
