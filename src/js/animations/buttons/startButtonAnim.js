// import {buttonElements} from '@/js/events/controlGameEvents'
import store from '@/store/store'
import anime from 'animejs/lib/anime.es.js'
import {dom} from '@/js/domElements'


const startButtonAnimation = () => {

        anime.timeline({
                easing: 'easeInOutQuad',
                duration: 500,
                loop: false,
                begin() {
                    store.commit('updateGameStatus', [
                    {
                        state: 'buttons',
                        event: "pauseGameButton",
                        to: true
                    },
                    {
                        state: 'buttons',
                        event: "stopGameButton",
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
            targets: dom.buttons['play'],
            translateY: [0, -50],
            opacity: [1, 0],
            complete(){
                store.commit('updateGameStatus', [
                {
                state: 'buttons',
                event: "startGameButton",
                to: false
                }
                ])       
            }
        })
        .add(
            {
            targets: dom.buttons['border'],
            width: ['10vw', '15vw'],
            }, 0)
        .add(
            {
            targets: dom.buttons['stop'],
            translateX: [-50, 20],
            opacity: [0, 1],
            }, 400)
        .add(
            {
            targets: dom.buttons['pause'],
            translateY: [0, 0],
            translateX: [50, -20],
            opacity: [0, 1],
            }, 400)
}

export {startButtonAnimation}