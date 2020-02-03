import anime from 'animejs/lib/anime.es.js'
import store from '@/store/store'
import {dom} from '@/js/domElements'


const generatorProgressInAnimation = () => {
    anime.timeline({
        autoplay: true,
        loop: false,
        easing: 'easeInOutQuad',
        duration: 500,
        begin(){
            store.commit('updateGameStatus', [
                {
                    state: 'events',
                    event: "generator",
                    to: true
                }
            ])           
        }
    })
    .add({
        targets: dom.generator['border'],
        translateX: ['-50%', '-50%'],
        translateY: [-20, 0],  
        opacity: [0, 1]      
    })
    .add({
        targets: dom.generator['repair-message'],
        translateY: [-10, 0],  
        opacity: [0, 1],
    })
    .add({
        targets: dom.generator['progress-bar'],
        translateY: [-10, 0],  
        opacity: [0, 1],
    })
    .add({
        targets: dom.generator['progress-text'],
        translateY: [-10, 0],
        opacity: [0, 1],
    })
}

const generatorProgressOutAnimation = () => {
    anime.timeline({
        autoplay: true,
        loop: false,
        easing: 'easeInOutQuad',
        duration: 500,
        begin(){
            store.commit('updateGameStatus', [
            {
                state: 'events',
                event: "startGame",
                to: false
            },
            {
                state: 'events',
                event: "pauseGame",
                to: false
            },
            ])
        },
        complete(){
            store.commit('updateGameStatus', [
            {
                state: 'events',
                event: "generator",
                to: false
            }
            ])
        }
    })
    .add({
        targets: dom.generator['border'],
        translateX: ['-50%', '-50%'],
        translateY: [0, 10],  
        opacity: [1, 0]      
    }, 200)
    .add({
        targets: dom.generator['repair-message'],
        translateY: [0, -15],  
    }, 0)
    .add({
        targets: dom.generator['progress-bar'],
        translateY: [0, -15],  
    }, 0)
    .add({
        targets: dom.generator['progress-text'],
        translateY: [0, -15],
    }, 0)
}

export {generatorProgressInAnimation, generatorProgressOutAnimation}