// import {updateDomData} from './dom.js'
import {gameOptions} from '@/js/status/options.js'
import {playerRateStatus} from '@/js/playerStats.js'
import {damageGenerator} from '@/js/generator/damageGen.js'
import playTrack from '@/js/sound.js'

import store from '@/store/store'

import {combo} from '@/js/combo.js'

import {skillcheckSpawnCoordinates} from '@/js/drawSkillCheck.js'


const score = (status) => {
    playTrack(status)
    // Decisive Strike SKILLCHECKS
    store.state.playerStats.latestGame[status] += 1
    if (store.state.gameStatus.now.gameMode == 'ds') {
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

    playerRateStatus(
            ['dsEscape', 'dsFailed'], 
            ['rateDsEscape', 'rateDsFailed']
        )
    }


    // normal SKILLCHECK 
    if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
        let points

        // check comboStats Score
        if (status == 'great') {
            // base points + 50 * combo points, starting from the second combo point
            points = gameOptions[status] + (store.state.playerStats.stats.rowScore * 50)
            combo(true)
            // add bonus points in order to complete a generator 'x%' faster
            if (!store.state.gameStatus.now.brokeGeneratorEffect && !store.state.gameStatus.now.brokeGeneratorEffectRunning && skillcheckSpawnCoordinates.mode !== 'hex') {
                store.state.gameStatus.now.charges += (2 / 100) * 80 // add 2% bonus
            }
            store.commit('updateObjectivePoints', 
            {
                objective: skillcheckSpawnCoordinates.mode == 'hex' ? 'HEX SKILL CHECK' : 'GREAT SKILL CHECK',
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
                damageGenerator((5 / 100) * 80) // damage 5% from the generator
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
    }

} 


const checkNeedlePos = (pos) => {     
        if (skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start <= pos && pos <= skillcheckSpawnCoordinates.greatSkillCheckCoordinates.end) {
            // console.log('Great Skillcheck')
            
            score('great')

        } else if (skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start < pos && pos <= skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) {
            // console.log('Good Skillcheck')
            score('good')

        } else {
            // console.log('Failed Skillcheck')
            score('failed')
        }
}

export {checkNeedlePos}