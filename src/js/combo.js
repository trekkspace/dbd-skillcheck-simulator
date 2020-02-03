import store from '@/store/store'

const combo = status => {
    if (status) {
        store.state.playerStats.stats.rowScore += 1
        if (store.state.playerStats.stats.rowScore > (store.state.gameStatus.now.gameMode == 'normal' ?  
            store.state.playerStats.stats.combo : 
            store.state.playerStats.stats.decisiveStrikeCombo)) {
            store.state.gameStatus.now.gameMode == 'normal' ?  
                store.state.playerStats.stats.combo = store.state.playerStats.stats.rowScore : 
                store.state.playerStats.stats.decisiveStrikeCombo = store.state.playerStats.stats.rowScore
        }
    } else {
        if (store.state.playerStats.stats.rowScore > 0) {
            store.state.playerStats.stats.rowScore = 0
        }
        store.state.playerStats.stats.rowScore = 0
    }
}

export {combo}