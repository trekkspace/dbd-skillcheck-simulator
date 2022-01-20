import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'
import store from '@/store/store.js'

// skilcheck spawn

let skillCheckAnimation

const skillCheckInit = () => {
    skillCheckAnimation = anime.timeline({
        loop: false,
        autoplay: false
    })
    skillCheckAnimation.add({
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
        });
    switch (store.state.gameStatus.now.gameMode) {
        case "ds":
        case "easy":
        case "medium":
        case "hard":
        case "custom":
            skillCheckAnimation.add({
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
                    dom.callbackComplete();
                }
            }, 100)
            break;
        case "glyph":
            skillCheckAnimation.add({
                targets: dom.skillcheck['skill-check-needle'],
                easing: 'linear',
                rotate: [0, 360*6],
                duration: 1100*6,
                begin(){
                    store.commit('updateGameStatus', [{
                        state: 'events',
                        event: "skillcheck",
                        to: true
                    }])
                },
                complete() {
                    dom.callbackComplete();
                }
            }, 100)
            break;
    }
    skillCheckAnimation.add({
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
    if (skillCheckAnimation.children[1].began) {
        skillCheckAnimation.pause()
        skillCheckAnimation.children[2].play()
    } else {
        skillCheckAnimation.restart()
        skillCheckAnimation.pause()
    }
}

export {removeSkillCheck, skillCheckAnimation, skillCheckInit}
