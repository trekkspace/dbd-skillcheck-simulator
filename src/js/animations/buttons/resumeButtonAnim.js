// import {buttonElements} from '@/js/events/controlGameEvents'
import store from '@/store/store'
import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'


const resumeButtonAnimation = () => {

        anime.timeline({
            easing: 'easeInOutQuad',
            duration: 500,
            loop: false,
            begin(){
                store.commit('updateGameStatus', [
                {
                    state: 'buttons',
                    event: "pauseGameButton",
                    to: true
                },{
                    state: 'events',
                    event: "locked",
                    to: true
                }])
            },
            complete(){
                store.commit('updateGameStatus', [{
                    state: 'events',
                    event: "locked",
                    to: false
                }])
            }
        })
        .add({
            targets: dom.buttons['resume'],
            translateX: [0, 75],
            opacity: [1, 0],
            complete(){
                store.commit('updateGameStatus', [
                {
                state: 'buttons',
                event: "resumeGameButton",
                to: false
                }])
            }
        }, 0)
        .add({
            targets: dom.buttons['pause'],
            translateY: [-75, 0],
            opacity: [0, 1],
        }, 0)
}

export {resumeButtonAnimation}