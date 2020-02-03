import * as ffs from '@/js/library/math.js'
import anime from 'animejs/lib/anime.es.js'
import store from '@/store/store'

import {stopGame} from '@/js/events/controlGameEvents.js'

import {dom} from '@/js/domElements'

const rank = () => {

    // {
    //     20: 0,
    //     19: 4,
    //     18: 8,
    //     17: 12,
    //     16: 16,
    //     15: 20,
    //     14: 24,
    //     [...]
    // }

    const latestGameAllChecks = Object.values(store.state.playerStats.latestGame).reduce((a, b) => a + b)
    const goodRate = ffs.outOf(store.state.playerStats.latestGame.good, latestGameAllChecks)
    const failedRate = ffs.outOf(store.state.playerStats.latestGame.miss, latestGameAllChecks)

    const rankRate = 100 - failedRate - (goodRate / 2)

    store.state.playerStats.stats.rankPoints += rankRate >= 75 ? 2 : rankRate >= 50 ? 1 : rankRate >= 25 ? 0 : store.state.playerStats.stats.rankPoints <= 2 ? 0: -2

    rankProgressAnim(rankRate)
}


const reverseOpacity = () =>{

    // disable button while the animation is in the progress
    // this will prevent the animation to the retriggered
    store.state.gameStatus.rank.buttonArea.disableButton = true

    anime.timeline({
        easing: 'easeInOutQuad',
        duration: 400,
        loop: false,
        begin(){
            stopGame()
        },
        complete(){
            // set display to 'none' when the reverse animation is done
            store.state.gameStatus.rank.showRank = false
        }      
    }).add({
        targets: dom.rank['rank-next'],
        opacity: [1, 0],
    }).add({
        targets: dom.rank['rank-status'],
        opacity: [1, 0],
    }).add({
        targets: dom.rank['rank-points'],
        opacity: [1, 0]
    }).add({
        targets: dom.buttons['border'],
        translateY: 0,
        opacity: [0, 1],
    })
}

const rankProgressAnim = (percent) =>{
    stopGame()

    // remove display 'none' before starting the animation process
    store.state.gameStatus.rank.showRank = true

    // if there were 'green-pip' classes added to 'pip' elements remove them
    // there are 3 pip elements
    for (let index = 1; index < 4; index++) {
        dom.rank[`pip${index}`].classList.remove('green-pip')
    }
    
    // reset rank progress bar to 0%
    dom.rank['rank-progress'].style.width = '0%'

    // set 'pipLevel' to 'unknown' this will display the default message until [...]
    // [...] more informations about rank points will be displayed
    store.state.gameStatus.rank.pipLevel = 'unknown'
    

    let s = Number(percent) ? percent: 0
    let c = s > 25 ? 25 : s


    anime.timeline({
        easing: 'easeInOutQuad',
        duration: 1000,
        loop: false,
        complete(){
            runRankAnim()
        }                
    }).add({
        targets: dom.buttons['border'],
        translateX : ['-50%', '-50%'],
        translateY: [0, 10],
        opacity: [1, 0],
    }, 0).add({
        targets: dom.rank['rank-points'],
        opacity: [0, 1],
    }, 0).add({
        targets: dom.rank['rank-status'],
        opacity: [0, 1],
    }, 750)

    const rankPip = () => {

        const addPip = (pip, pipLevel) => {
            if (pip) {
                dom.rank[pip].classList.add('green-pip')
            }
            store.state.gameStatus.rank.pipLevel = pipLevel
        }

        switch(c){
            case 25:
                addPip('pip1', 1)
                break
            case 50:
                addPip('pip2', 2)
                break
            case 75:
                addPip('pip3', 3)
                break
            default:
                if (c < 25) {
                    addPip('', 0)
                }
                break
        }

        if (c == s) {
            store.state.gameStatus.rank.buttonArea.showButton = true

            anime({
                targets: dom.rank['rank-next'],
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: 1000,
                loop: false,
                complete(){
                    store.state.gameStatus.rank.buttonArea.disableButton = false
                }
            })
            return
        }

        c += s - c > 25 ? 25 : s - c
        if (c <= 100 && c >= 0) {
            runRankAnim()                        
        }
    } 

    const runRankAnim = () =>{
        anime({
            targets: dom.rank['rank-progress'],
            // autoplay: true,
            width: c,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: false,
            duration: 800,
            complete(){
                rankPip()
            }
        })
    }
}

export {rank, reverseOpacity}