import store from '@/store/store'
import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'

const stopButtonAnimation = () => {

        anime.timeline({
            easing: 'easeInOutQuad',
            duration: 500,
            autoplay: true,
            loop: false,
            begin(){
                store.commit('updateGameStatus', [
                {
                    state: 'buttons',
                    event: "startGameButton",
                    to: true
                },
                {
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
            targets: dom.buttons['border'],
            width: ['15vw', '10vw'],
        }, 0)
        .add({
            targets: dom.buttons['stop'] ,
            translateX: [0, -50],
            opacity: [1, 0],
            complete(){
                store.commit('updateGameStatus', [
                {
                    state: 'buttons',
                    event: "stopGameButton",
                    to: false,
                }])
            }
        }, 500)
        .add({
            targets: !store.state.gameEvents.buttons.pauseGameButton ? dom.buttons['resume'] : dom.buttons['pause'],
            translateX: [0, 50],
            opacity: [1, 0],
            complete(){
                store.commit('updateGameStatus', [
                {
                    state: 'buttons',
                    event: "pauseGameButton",
                    to: false,
                },
                {
                    state: 'buttons',
                    event: "resumeGameButton",
                    to: false,
                }])                
            }

        }, 500)
        .add({
            targets: dom.buttons['play'],
            translateY: [-50, 0],
            opacity: [0, 1],
        }, 500)  
}

export {stopButtonAnimation}