import {gameOptions} from '@/js/status/options.js'

import * as ffs from '@/js/library/math.js'

import {runGenerator} from '@/js/gamemode/generator/runGen.js'
import store from '@/store/store'

const damageGenerator = async (penalty) => {

    store.state.gameStatus.now.charges -= penalty
    if (store.state.gameStatus.now.charges < 1) {
        store.state.gameStatus.now.charges = 0
    }

    // updateGenStatus()

    if (store.state.gameStatus.now.brokeGeneratorEffect) {
        store.state.gameStatus.now.brokeGeneratorEffectRunning = true
    }

    for (; gameOptions.generator_penalty_time > store.state.gameStatus.now.brokenGeneratorEffectCurrentTime;) {
        if (store.state.gameStatus.now.brokeGeneratorEffectRunning) {
            store.state.gameStatus.now.brokenGeneratorEffectCurrentTime = 0
            store.state.gameStatus.now.brokeGeneratorEffectRunning = false
            return
        }

        if (store.state.gameStatus.now.generatorPaused || store.state.gameStatus.now.generatorStoped) {
            store.state.gameStatus.now.brokenGeneratorEffectCurrentTime = 0
            store.state.gameStatus.now.brokeGeneratorEffectRunning = false
            store.state.gameStatus.now.brokeGeneratorEffect = false
            if (!store.state.gameStatus.now.generatorPaused) {
                runGenerator()
            }
            
            return
        }

        store.state.gameStatus.now.brokeGeneratorEffect = true
        store.state.gameStatus.now.brokenGeneratorEffectCurrentTime += 10
        await ffs.delay(10)
    }

    store.state.gameStatus.now.brokeGeneratorEffect = false
    store.state.gameStatus.now.brokeGeneratorEffectRunning = false
    if (store.state.gameStatus.now.brokenGeneratorEffectCurrentTime == gameOptions.generator_penalty_time && !store.state.gameStatus.now.generatorStoped) {
        runGenerator()
    }
    store.state.gameStatus.now.brokenGeneratorEffectCurrentTime = 0

}

export {damageGenerator}
