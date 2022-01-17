// import anime from 'animejs/lib/anime.es.js'

import store from '@/store/store'

import {startGenerator as startGen} from '@/js/gamemode/generator/startGen.js'
import {runGenerator as runGen} from '@/js/gamemode/generator/runGen.js'
import {stopGenerator as stopGen} from '@/js/gamemode/generator/stopGen.js'

import {skillcheckGenerator} from '@/js/skillchecks/generator'
import {skillcheckDS} from '@/js/skillchecks/ds'

import {removeSkillCheck, skillCheckAnimation} from '@/js/skillchecks/dom/skillCheckAnim'

import {stopButtonAnimation} from '@/js/animations/buttons/stopButtonAnim.js'
import {startButtonAnimation} from '@/js/animations/buttons/startButtonAnim.js'
import {pauseButtonAnimation} from '@/js/animations/buttons/pauseButtonAnim.js'
import {resumeButtonAnimation} from '@/js/animations/buttons/resumeButtonAnim.js'
import {skillcheckGlyph} from "@/js/skillchecks/glyph";

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

        if (['easy','medium','hard','custom'].includes(store.state.gameStatus.now.gameMode)) {
            startGen()
        }else if (store.state.gameStatus.now.gameMode === 'ds') {
            skillcheckDS();
        }else if (store.state.gameStatus.now.gameMode === 'glyph') {
            skillcheckGlyph();
        }

        startButtonAnimation()
    }
}

// stoped game status
const stopGame = () => {
    skillCheckAnimation.restart()
    skillCheckAnimation.pause()
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

        if (['easy','medium','hard','custom'].includes(store.state.gameStatus.now.gameMode)) {
            if (store.state.gameStatus.now.generatorPaused) {
                store.state.gameStatus.now.generatorStoped = true

                stopGen('stoped')

            } else{
                store.state.gameStatus.now.generatorStoped = true
            }     
        }else{
            removeSkillCheck();
        }
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
        if (['easy','medium','hard','custom'].includes(store.state.gameStatus.now.gameMode)) {
            store.state.gameStatus.now.generatorPaused = true
        }else{
            removeSkillCheck();
        }
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
        if (['easy','medium','hard','custom'].includes(store.state.gameStatus.now.gameMode)) {
                store.state.gameStatus.now.generatorPaused = false
                runGen()
                skillcheckGenerator()
        }else if (store.state.gameStatus.now.gameMode === 'ds') {
            updateGameStatus()
            skillcheckDS();
        }else if (store.state.gameStatus.now.gameMode === 'glyph') {
            updateGameStatus()
            skillcheckGlyph();
        }
        resumeButtonAnimation()
    }
}

export {startGame, stopGame, pauseGame, resumeGame}
