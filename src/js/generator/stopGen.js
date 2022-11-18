// import {gameOptions} from '@/js/status/options.js'

// import * as ffs from '@/js/library/math.js'

import store from '@/store/store'

import {stopButtonAnimation} from '@/js/animations/buttons/stopButtonAnim'
import {generatorProgressOutAnimation} from '@/js/animations/generatorAnim'
import {removeSkillCheck} from '@/js/animations/skillcheck/skillCheckAnim'
import {rank} from '@/js/rank.js'


const stopGenerator = async (status) => {

    removeSkillCheck()

    // hitting a bonus point at the end of the generator it may get over the generator maximum point
    // in this case data.progress must be changed to his full value after updating the DOM
    if (store.state.gameStatus.now.charges > 80) {
        store.state.gameStatus.now.changed = 80
    }

    if (status == 'paused') {
        return
    }

    // full completed generator
    if (status == 'complete') {
        //animations
        generatorProgressOutAnimation()
        stopButtonAnimation()

        rank()
    }

    // paused generator
    if (status == 'stoped') {
        generatorProgressOutAnimation()

        store.state.gameStatus.now.generatorRunning = false
        store.state.gameStatus.now.generatorPaused = false
        store.state.gameStatus.now.generatorStarted = false
    }
}

export {stopGenerator}