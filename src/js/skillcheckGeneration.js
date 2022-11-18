import * as ffs from '@/js/library/math.js'
import playTrack from '@/js/sound.js'

import {playerOptions} from '@/js/status/options'
import store from '@/store/store.js'
import {dom} from '@/js/domElements'

import {skillCheckAnimation} from '@/js/animations/skillcheck/skillCheckAnim' 
import {drawSkillCheck} from '@/js/drawSkillCheck.js'

// import {perks, activeKillerPerks} from '@/js/perks'

// spawn a skillcheck in a random location
// const  () => {
//     console.log('spawn')

//     // rotate the skillcheck circle
//     anime.set(dom.skillcheck['skill-check-circle'], {
//         rotate() {
//             return ffs.getRandomArbitraryRange(0, 170, 4)
//         }
//     })
// }

const skillcheckGeneration = async () => {

    const gameStatusValid = () => {
        return store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame
    }

    if (gameStatusValid()){

        await ffs.delay(ffs.getRandomArbitraryRange(playerOptions.skillCheckDelayMin.value, playerOptions.skillCheckDelayMax.value))


        // restart the skillcheck then check for sound effect between each skillcheck
        if (gameStatusValid()) {
            if (store.state.gameEvents.events.skillcheck) {
                skillCheckAnimation.restart()
                skillCheckAnimation.pause()
            }


            // check if huntressLullaby perk is active
            // if huntressLullaby has 1-4 tokens the sound between the sound and skillcheck is less
            // if huntressLullaby has 5 tokens there will be no sound between skillchecks
            // if huntressLullaby is not active there will be a default delay between skillchecks
            if (store.state.gameStatus.killerPerks.huntressLullaby.active) {
                const huntressLullabyCurrentTokens = store.state.gameStatus.killerPerks.huntressLullaby.currentTokens
                const huntressLullabyCurrentEffect = store.state.gameStatus.killerPerks.huntressLullaby[huntressLullabyCurrentTokens]
                if (huntressLullabyCurrentTokens > 0 && huntressLullabyCurrentTokens < 5) {
                    playTrack('advertise')
                    await ffs.delay((huntressLullabyCurrentEffect / 100 * 500))
                } else if(huntressLullabyCurrentTokens == 5) {

                    await ffs.delay(500) // delay between sound and skillcheck
                } else {

                    playTrack('advertise')
                    await ffs.delay(500)
                }
            } else{
                playTrack('advertise')
                await ffs.delay(500)
            }

        }

        if (gameStatusValid()) {

            // default value for the size of Good Skillchecks
        
            let ranEl = dom.skillcheck['skill-check-element']
            if (store.state.gameStatus.now.effects.includes('madness')) {

                let minSpace = (15 / 100) * window.innerHeight
                ranEl.style.top = `${ffs.getRandomArbitraryRange(minSpace, window.innerHeight - 145 - minSpace)}px`
                ranEl.style.left = `${ffs.getRandomArbitraryRange(minSpace, window.innerWidth - 145 - minSpace)}px`
            } else {
                ranEl.style.top = '50%'
                ranEl.style.left = '50%'
            }

            // check perks
            if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
                const defaultSuccessZoneSize = 35
                let successZoneSize = defaultSuccessZoneSize

                let hex = false

                if (store.state.gameStatus.item) {
                    // store.state.gameStatus.item.successZone can have a positive or a negative number
                    successZoneSize += (store.state.gameStatus.item.successZone / 100) * defaultSuccessZoneSize
                }

                // check for unnervingPresence perk
                if (store.state.gameStatus.killerPerks.unnervingPresence.activated) {
                    successZoneSize -= (store.state.gameStatus.killerPerks.unnervingPresence.successZone / 100) * defaultSuccessZoneSize
                }

                // check for hexRuin perk
                if (store.state.gameStatus.killerPerks.hexRuin.active) {
                    hex = true
                }
                // draw the skillcheck based on the perks used
                // if there are any perks will be draw a default skillcheck
                drawSkillCheck(10, successZoneSize || 35, hex ? 'hex': 'normal')
            }


            // ds mode
            // do not check for any perks and draw a default skillCheck for DS Mode
            if (store.state.gameStatus.now.gameMode == 'ds') {
                // default value for DS Skillchecks
                // this will be the double of the normal or training mode
                drawSkillCheck(20, 0, 'normal')
            }

            // after checking all elements restart the skillCheckAnimation
            // this will start the rotation of the needle
            skillCheckAnimation.restart()
        }
    }
}

export {skillcheckGeneration}