import * as ffs from '@/js/library/math.js'

import {checkNeedlePos} from '@/js/playerScore.js'
import {skillcheckGeneration} from '@/js/skillcheckGeneration.js'
import {skillCheckAnimation, removeSkillCheck} from '@/js/animations/skillcheck/skillCheckAnim'

import {dom} from '@/js/domElements'
import store from '@/store/store.js'
import {notification} from '@/js/library/use'


const handleScore = async () => {
    
    if (store.state.gameEvents.events.skillcheck) {
        store.commit('updateGameStatus', [{
                state: 'events',
                event: "skillcheck",
                to: false
        }])
    
        // if (playerOptions.delayBeforeStop) {
        //     await ffs.delay(playerOptions.delayBeforeStop) // simple delay option to simulate Ping in ms
        // }
        dom.skillcheck['skill-check'].classList.remove('wiggleSkillCheck')
        removeSkillCheck()

        const activePerk = perk => {
            return store.state.gameStatus.killerPerks[perk].active
        }

        
        if (store.state.gameStatus.now.gameMode == 'normal') {
            const killerPerks = Object.keys(store.state.gameStatus.killerPerks)
            for (let index = 0; index < killerPerks.length; index++) {
                if (killerPerks[index] == 'hexRuin') {
                    if (activePerk(killerPerks[index])) {
                        store.state.gameStatus.killerPerks[killerPerks[index]].active = Math.random() > 0.15 || false
                        if (!activePerk(killerPerks[index])) {
                            notification('Hex: Ruin got found')
                            break
                        }
                    }
                }
                if (killerPerks[index] == 'unnervingPresence') {
                    if (activePerk(killerPerks[index])) {
                        if(Math.random() <= 0.10){
                            store.state.gameStatus.killerPerks[killerPerks[index]].activated = !store.state.gameStatus.killerPerks[killerPerks[index]].activated
                            if (store.state.gameStatus.killerPerks[killerPerks[index]].activated) {
                                notification('The killer is near you')
                                break
                            }else{
                                notification('The killer left your area')
                                break
                            }
                        }
                    }
                }
                if (killerPerks[index] == 'huntressLullaby') {
                    if (activePerk(killerPerks[index]) && store.state.gameStatus.killerPerks[killerPerks[index]].currentTokens < 5) {
                        if (Math.random() <= 0.10) {
                            store.state.gameStatus.killerPerks[killerPerks[index]].currentTokens += 1
                            notification('The killer hooked a survivor')
                            break
                        }
                    }
                }
            }      
        }

        checkNeedlePos(ffs.cleanLetters(dom.skillcheck['skill-check-needle'].style.webkitTransform) - 90)

        skillcheckGeneration()
    }
}



export {handleScore}