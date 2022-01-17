import * as ffs from '@/js/library/math.js'

import {playerOptions} from '@/js/status/options'
import store from '@/store/store.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import {generateKillerPerks} from "@/js/perks";
import {skillCheckAnimation, removeSkillCheck} from '@/js/skillchecks/dom/skillCheckAnim'
import {drawGlyphSkillCheck} from "@/js/skillchecks/drawer/glyph";

const skillcheckGlyph = async (now=0,stop=false) => {
    const gameStatusValid = () => {
        return store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame
    }
    if (typeof store.state.gameStatus.killerPerks.huntressLullaby === "undefined"){
        generateKillerPerks();
    }
    var props = {
        successZoneSize: 50,
        color: "#ffffff",
        circleColor:"#ffffff",
        now:now
    }
    if (gameStatusValid() && !stop) {
        if (!store.state.gameStatus.now.glyph.start){
            await ffs.delay(ffs.getRandomArbitraryRange(playerOptions.skillCheckDelayMin.value, playerOptions.skillCheckDelayMax.value))
        }
        //ffs.outOf(0)
        if (gameStatusValid()) {

            if (store.state.gameEvents.events.skillcheck && !store.state.gameStatus.now.glyph.start) {
                skillCheckAnimation.restart()
                skillCheckAnimation.pause()
            }
            let ranEl = dom.skillcheck['skill-check-element']


            ranEl.style.top = '50%'
            ranEl.style.left = '50%'
            props.callbackComplete = function (end=true) {
                store.commit('updateGameStatus', [{
                    state: 'events',
                    event: "skillcheck",
                    to: false
                }])
                store.state.gameStatus.now.glyph.start = false;
                removeSkillCheck()
                if (end){
                    skillcheckGlyph();
                }

            };
            await drawGlyphSkillCheck(props);

        }
    }

}

export {skillcheckGlyph}
