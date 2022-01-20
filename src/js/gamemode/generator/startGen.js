import {skillcheckGenerator} from '@/js/skillchecks/generator'
// import {gameOptions} from '@/js/status/options'
import {runGenerator} from '@/js/gamemode/generator/runGen'
import {generatorProgressInAnimation} from '@/js/animations/generatorAnim'

import store from '@/store/store'

const startGenerator = () => {
    if (!store.state.gameStatus.now.generatorStarted) {
    const checkItems = () =>{
        const itemOn = store.state.playerItems.equipedItems
        const toolbox = itemOn.toolbox[0]
        const addOns = itemOn.addOns
        let tool 
        // first add the default toolbox
        if (toolbox) {
            tool = {
                fromCharges: toolbox.charges,
                charges: toolbox.charges,
                repairSpeed: toolbox.repairSpeed,
                successZone: toolbox.successZone
            }
            if (addOns.length > 0) {
                addOns.forEach(addOn => {
                    tool.fromCharges += addOn.charges,
                    tool.charges += addOn.charges,
                    tool.repairSpeed += addOn.repairSpeed,
                    tool.successZone += addOn.successZone
                })
            }
            store.state.gameStatus.item = tool
            }
        }
        checkItems()

        store.state.gameStatus.now.generatorsLeft= 2
        store.state.gameStatus.now.charges = 0

        Object.keys(store.state.playerStats.latestGame).forEach(key => {
            store.state.playerStats.latestGame[key] = 0
        }) // reset latestGame points
        store.state.gameStatus.now.generatorStoped = false

        runGenerator() // to create
        skillcheckGenerator()
        generatorProgressInAnimation()
    }
}

export {startGenerator}
