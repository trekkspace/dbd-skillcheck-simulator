import * as ffs from '@/js/library/math.js'

import {playerOptions} from '@/js/status/options'
import store from '@/store/store.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import {generateKillerPerks} from "@/js/perks";
import {skillCheckAnimation, removeSkillCheck} from '@/js/skillchecks/dom/skillCheckAnim'
import {drawClassicSkillCheck} from '@/js/skillchecks/drawer/classic'

const skillcheckDS = async () => {
    console.log("Ds")
    const gameStatusValid = () => {
        return store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame
    }
    if (typeof store.state.gameStatus.killerPerks.huntressLullaby === "undefined"){
        generateKillerPerks();
    }
    var props = {
        timeAudioDelay: 500,
        successZoneSize: 0,
        greatZoneSize: 20,
        color: "#ffffff",
        circleColor:"#ffffff",
        ruin:false
    }
    if (gameStatusValid()) {
        await ffs.delay(ffs.getRandomArbitraryRange(playerOptions.skillCheckDelayMin.value, playerOptions.skillCheckDelayMax.value))
        if (gameStatusValid()) {

            if (store.state.gameEvents.events.skillcheck) {
                skillCheckAnimation.restart()
                skillCheckAnimation.pause()
            }
            let ranEl = dom.skillcheck['skill-check-element']

            ranEl.style.top = '50%'
            ranEl.style.left = '50%'
            props.callbackComplete = function () {
                store.commit('updateGameStatus', [{
                    state: 'events',
                    event: "skillcheck",
                    to: false
                }])
                removeSkillCheck()
                skillcheckDS();
            };
            await drawClassicSkillCheck(props);

        }
    }

}

export {skillcheckDS}
