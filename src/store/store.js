import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import playerStats from './modules/playerStats'
import playerSettings from './modules/playerSettings'
import playerItems from './modules/playerItems'
import gameEvents from './modules/gameEvents'
import gameNotifications from './modules/gameNotifications'
import gameStatus from './modules/gameStatus'

const localStorageKey = 'sessionStorage'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  supportCircular: true,
  key: localStorageKey,
  storage: window.localStorage,
  modules: ['playerStats','playerItems', 'playerSettings']
})


const store = new Vuex.Store({
    modules: {
        playerStats,
        playerSettings,
        playerItems,
        gameEvents,
        gameNotifications,
        gameStatus,
    },
    plugins: [vuexLocalStorage.plugin],
  })


// let restore = localStorage.getItem(localStorageKey)

// console.log(JSON.parse(restore))

// if (restore) {
//     if (JSON.parse(restore).stats) {
//         store.state.playerScore = JSON.parse(restore).stats
//     }
//     if (JSON.parse(restore).inv) {
//         store.state.inventory = JSON.parse(restore).inv        
//     }
// }




export default store
