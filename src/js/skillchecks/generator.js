import * as ffs from '@/js/library/math.js'

import {playerOptions} from '@/js/status/options'
import store from '@/store/store.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import {generateKillerPerks} from "@/js/perks";
import {skillCheckAnimation} from '@/js/skillchecks/dom/skillCheckAnim'
import {drawClassicSkillCheck} from '@/js/skillchecks/drawer/classic'
import {getSwitch} from '@/js/library/getSwitch'
import {handleScore} from "@/js/needlePosition";


const skillcheckGenerator = async (perkEffectActive={}) => {
    const gameStatusValid = () => {
        return store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame
    }
    if (typeof store.state.gameStatus.killerPerks.huntressLullaby === "undefined"){
        generateKillerPerks();
    }
    var props = {
        timeAudioDelay: 500,
        successZoneSize: 50,
        greatZoneSize: 10,
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
            if (store.state.gameStatus.now.effects.includes('madness')) {
                let minSpace = (15 / 100) * window.innerHeight
                ranEl.style.top = `${ffs.getRandomArbitraryRange(minSpace, window.innerHeight - 145 - minSpace)}px`
                ranEl.style.left = `${ffs.getRandomArbitraryRange(minSpace, window.innerWidth - 145 - minSpace)}px`
            } else {
                ranEl.style.top = '50%'
                ranEl.style.left = '50%'
            }

            if (store.state.gameStatus.killerPerks.huntressLullaby.active) {
                const huntressLullabyCurrentTokens = getSwitch(store.state.gameStatus.killerPerks.huntressLullaby, "tokens").val;
                if (huntressLullabyCurrentTokens > 0 && huntressLullabyCurrentTokens < 5) {
                    props.timeAudioDelay = ((500 - (((14 * huntressLullabyCurrentTokens) / 100) * 500)));
                } else if (huntressLullabyCurrentTokens == 5) {
                    props.timeAudioDelay = -1;
                }
            }
            if (store.state.gameStatus.item) {
                props.successZoneSize += (store.state.gameStatus.item.successZone / 100) * 25
            }

            if (store.state.gameStatus.killerPerks.unnervingPresence.active && (typeof perkEffectActive.unnervingPresence == "undefined" || perkEffectActive.unnervingPresence.active)) {
                props.successZoneSize -= ((getSwitch(store.state.gameStatus.killerPerks.unnervingPresence, "tier").val * 10 + 30) / 100) * props.successZoneSize;
            }
            if (store.state.gameStatus.killerPerks.oppression.active && (typeof perkEffectActive.oppression == "undefined" || perkEffectActive.oppression.active)) {
                props.successZoneSize = 0
                props.greatZoneSize = 15
            }
            if (store.state.gameStatus.survivorPerks.thisIsNotHappening.active && (typeof perkEffectActive.oppression == "undefined" || perkEffectActive.oppression.active)) {
                props.greatZoneSize = 15
            }

            if (store.state.gameStatus.killerPerks.hexRuin.active) {
                props.ruin = true;
                props.color = "#B90000";
                props.circleColor = "#F01818";
            }
            props.callbackComplete = function () {
                handleScore();
            };
            await drawClassicSkillCheck(props);

        }
    }

}

export {skillcheckGenerator}
