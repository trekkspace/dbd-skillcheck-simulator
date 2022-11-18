import {gameOptions} from '@/js/status/options.js'
import * as ffs from '@/js/library/math.js'
import store from '@/store/store'

import {stopGenerator} from '@/js/generator/stopGen.js'


import {notification} from '@/js/library/use'


const runGenerator = async () => {
    store.state.gameStatus.now.generatorStarted = true
    // skillcheckSpawn()

    if (!store.state.gameStatus.now.generatorRunning) {
        for (; gameOptions.generatorCharges >= store.state.gameStatus.now.charges;) {
            store.state.gameStatus.now.generatorRunning = true
            if (store.state.gameStatus.now.brokeGeneratorEffect) {
                store.state.gameStatus.now.generatorRunning = false
                return
            }

            // check if the generator is on pause or is already been stoped
            if (store.state.gameStatus.now.generatorPaused || store.state.gameStatus.now.generatorStoped) {
                store.state.gameStatus.now.generatorRunning = false
                stopGenerator(store.state.gameStatus.now.generatorPaused ? 'paused': 'stoped')
                return
            }

            const defaultChanges = 100


            // items
            if (store.state.gameStatus.item){
                const chargeEffect = (defaultChanges + store.state.gameStatus.item.repairSpeed) / 1000
                store.state.gameStatus.now.charges += chargeEffect
                store.state.gameStatus.item.charges -= chargeEffect
                if (store.state.gameStatus.item.charges <= 0) {
                    store.state.gameStatus.item = false
                    store.state.playerItems.equipedItems.toolbox = []
                    store.state.playerItems.equipedItems.addOns = []
                    notification('The toolbox is used')
                }
            }else{
                store.state.gameStatus.now.charges += defaultChanges / 1000
            }
            
            await ffs.delay(100)
        }
    }




    store.state.gameStatus.now.generatorRunning = false
    store.state.gameStatus.now.generatorStarted = false
    store.state.playerStats.stats.generatorsCompleted++
    store.state.gameStatus.now.generatorsLeft--
    if (store.state.gameStatus.now.generatorsLeft == 1) {
        store.state.gameStatus.now.charges = 0
        notification('You fixed the first generator, there is only one left')
        await ffs.delay(800)
        runGenerator()

    }else{
        stopGenerator('complete')
    }
}

export {runGenerator}