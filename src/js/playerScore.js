// import {updateDomData} from './dom.js'
import {gameOptions} from '@/js/status/options.js'
import {playerRateStatus} from '@/js/playerStats.js'
import {damageGenerator} from '@/js/gamemode/generator/damageGen.js'
import playTrack from '@/js/sound.js'
import {dom} from "@/js/skillchecks/dom/domElements";
import store from '@/store/store'

import {combo} from '@/js/combo.js'

import {skillcheckSpawnCoordinates} from '@/js/drawSkillCheck.js'
import {getSwitch} from "@/js/library/getSwitch";


const score = (status) => {
    playTrack(status)
    // Decisive Strike SKILLCHECKS
    store.state.playerStats.latestGame[status] += 1
    switch (store.state.gameStatus.now.gameMode){
        case "glyph":
            var timedif = new Date().getTime() - store.state.gameStatus.now.glyph.last ;
            timedif = parseInt(timedif);
            if (timedif > (1100*5)){
                store.state.playerStats.stats.glyphGood += 1
                combo(true)
                store.commit('updateObjectivePoints',
                    {
                        objective: `Glyph`,
                        points: `+ 1500`
                    })
                dom.callbackComplete();
                store.state.playerStats.stats.bloodpoints += 1500;
                playerRateStatus(['glyphGood', 'glyphFailed'], ['rateGlyphGood', 'rateGlyphFailed']);

            }
            if (status != 'good') {
                store.state.playerStats.stats.glyphFailed += 1
                dom.callbackComplete(false);
                playerRateStatus(['glyphGood', 'glyphFailed'], ['rateGlyphGood', 'rateGlyphFailed']);

            }

            break;
        case "ds":
            if (status == 'great') {
                store.state.playerStats.stats.dsEscape += 1
                // base points + 50 * combo points, starting from the second combo point
                const points = gameOptions.dsEscape + (store.state.playerStats.stats.rowScore * 50)
                combo(true)
                store.commit('updateObjectivePoints',
                    {
                        objective: `Decisive Strike`,
                        points: `+ ${points}`
                    })

                store.state.playerStats.stats.bloodpoints += points
            }else{
                store.state.playerStats.stats.dsFailed += 1
                combo(false)
                store.state.playerStats.stats.bloodpoints += gameOptions.dsFailed
            }
            playerRateStatus(['dsEscape', 'dsFailed'], ['rateDsEscape', 'rateDsFailed']);

            break;
        case "easy":
        case "medium":
        case "hard":
        case "custom":
            var points;
            var isBrand = false;
            if (store.state.gameStatus.item) {
                const itemOn = store.state.playerItems.equipedItems
                const addOns = itemOn.addOns
                if (addOns.length > 0) {
                    addOns.forEach(addOn => {
                        if (addOn.name==="brandNewPart"){
                            if (addOn.customProp.left>0){
                                addOn.customProp.left--;
                                isBrand = addOn.customProp.tickProgression;

                            }
                        }
                    })
                }
            }
            if (status == 'great') {
                // base points + 50 * combo points, starting from the second combo point
                points = gameOptions[status] + (store.state.playerStats.stats.rowScore * 50)
                combo(true)
                // add bonus points in order to complete a generator 'x%' faster
                if (isBrand){
                    store.state.gameStatus.now.charges += (isBrand / 100) * 80
                }
                if (!isBrand &&!store.state.gameStatus.now.brokeGeneratorEffect && !store.state.gameStatus.now.brokeGeneratorEffectRunning && skillcheckSpawnCoordinates.mode !== 'hex') {
                    store.state.gameStatus.now.charges += (2 / 100) * 80 // add 2% bonus
                }
                store.commit('updateObjectivePoints',
                    {
                        objective: 'GREAT SKILL CHECK',
                        points: `+ ${ points}`
                    })

            } else{
                points = gameOptions[status]
                combo(false)
            }

            if (status == 'failed') {
                damageGenerator((10 / 100) * 80) // damage 10% from the generator
            }

            if (status == 'good') {
                if (skillcheckSpawnCoordinates.mode == 'hex') {
                    damageGenerator(((getSwitch(store.state.gameStatus.killerPerks.hexRuin, "tier").val + 2)  / 100) * 80) // damage 5% from the generator
                } else{
                    store.commit('updateObjectivePoints',
                        {
                            objective: `${status} skill check`.toUpperCase(),
                            points: `+ ${ points}`
                        })
                }
            }

            // update player score
            store.state.playerStats.stats[`${status}Score`] += 1
            store.state.playerStats.stats.bloodpoints += points

            playerRateStatus(
                ['greatScore', 'goodScore', 'failedScore'],
                ['rateGreatScore', 'rateGoodScore', 'rateFailedScore']
            )
            break;
    }



} 


const checkNeedlePos = (pos) => {
        switch (store.state.gameStatus.now.gameMode){
            case "easy":
            case "medium":
            case "hard":
            case "custom":
            case "ds":
                if (skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start <= pos && pos <= skillcheckSpawnCoordinates.greatSkillCheckCoordinates.end) {
                    score('great')
                } else if (skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start < pos && pos <= skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) {
                    score('good')
                } else {
                    score('failed')
                }
                break;
            case "glyph":
                if (skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start < pos && pos <= skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) {
                    score('good')
                } else {
                    score('failed')
                }
                break;
        }
}

export {checkNeedlePos}
