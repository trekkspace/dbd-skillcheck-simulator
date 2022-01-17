import * as ffs from '@/js/library/math.js'

import {checkNeedlePos} from '@/js/playerScore.js'
import {removeSkillCheck} from '@/js/skillchecks/dom/skillCheckAnim'

import {dom} from '@/js/skillchecks/dom/domElements'
import store from '@/store/store.js'
import {notification} from '@/js/library/use'
import {skillcheckGenerator} from "@/js/skillchecks/generator";
import {skillcheckDS} from "@/js/skillchecks/ds";
import {skillcheckGlyph} from "@/js/skillchecks/glyph";

const handleScore = async () => {
    if (store.state.gameEvents.events.skillcheck) {


        // if (playerOptions.delayBeforeStop) {
        //     await ffs.delay(playerOptions.delayBeforeStop) // simple delay option to simulate Ping in ms
        // }

        const activePerk = perk => {
            return store.state.gameStatus.killerPerks[perk].active
        }
        var pos =ffs.cleanLetters(dom.skillcheck['skill-check-needle'].style.webkitTransform) - 90;
        checkNeedlePos(pos)
        var glyphStop = false;
        if (store.state.gameStatus.now.gameMode=="glyph"){
            var timedif = new Date().getTime() - store.state.gameStatus.now.glyph.last ;
            timedif = parseInt(timedif);
            if (timedif > (1100*5)){
                glyphStop=true;
            }
        }
        if (! ["glyph"].includes(store.state.gameStatus.now.gameMode) || glyphStop){
            store.commit('updateGameStatus', [{
                state: 'events',
                event: "skillcheck",
                to: false
            }])
            removeSkillCheck()
            dom.skillcheck['skill-check'].classList.remove('wiggleSkillCheck')
        }
        switch (store.state.gameStatus.now.gameMode) {
            case "ds":
                skillcheckDS();
                break;
            case "glyph":
                skillcheckGlyph(pos,glyphStop);
                break;
            case "easy":
            case "medium":
            case "hard":
            case "custom":
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
                                if (Math.random() <= 0.10) {
                                    store.state.gameStatus.killerPerks[killerPerks[index]].activated = !store.state.gameStatus.killerPerks[killerPerks[index]].activated
                                    if (store.state.gameStatus.killerPerks[killerPerks[index]].activated) {
                                        notification('The killer is near you')
                                        break
                                    } else {
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
                skillcheckGenerator({})

                break;
        }


    }
}



export {handleScore}
