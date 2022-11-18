import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'

import {handleScore} from '@/js/needlePosition.js'
import {skillcheckGeneration} from '@/js/skillcheckGeneration.js'
import store from '@/store/store.js'

// skilcheck spawn

let skillCheckAnimation

const skillCheckInit = () => {
    skillCheckAnimation = anime.timeline({
        loop: false,
        autoplay: false
    })

    skillCheckAnimation
    .add({
        targets: dom.skillcheck['skill-check-element'],
        easing: 'easeInOutQuad',
        opacity: [0, 1],
        duration: 300,
        begin(){
            if (store.state.gameStatus.now.effects.includes('madness')) {
                dom.skillcheck['skill-check'].classList.toggle('wiggleSkillCheck') 
                dom.skillcheck['skill-check'].classList.add('wiggleSkillCheck')                
            }
        }
    })
    .add({
        targets: dom.skillcheck['skill-check-needle'],
        easing: 'linear',
        rotate: [0, 360],
        duration: 1100,
        begin(){
            store.commit('updateGameStatus', [{
                state: 'events',
                event: "skillcheck",
                to: true
            }])
        },
        complete() {

            if (store.state.gameStatus.now.gameMode == 'normal' || store.state.gameStatus.now.gameMode == 'training') {
                handleScore()
            }
            if (store.state.gameStatus.now.gameMode == 'ds') {
                store.commit('updateGameStatus', [{
                    state: 'events',
                    event: "skillcheck",
                    to: false
                }])
                removeSkillCheck()
                skillcheckGeneration()
            }
        }
    }, 100)
    .add({
        targets: dom.skillcheck['skill-check-element'],
        easing: 'easeOutExpo',
        delay: 500,
        opacity: 0,
        duration: 300,
        complete(){
            if (skillCheckAnimation.children[1].paused) {
                skillCheckAnimation.restart()
                skillCheckAnimation.pause()
            }
        }
    })
}

const removeSkillCheck = () => {
    // console.log(skillCheckAnimation)
    if (skillCheckAnimation.children[1].began) {
        skillCheckAnimation.pause()
        skillCheckAnimation.children[2].play()
    } else {
        skillCheckAnimation.restart()
        skillCheckAnimation.pause()
    }
}

export {removeSkillCheck, skillCheckAnimation, skillCheckInit}