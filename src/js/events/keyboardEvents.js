
import {handleScore} from '@/js/needlePosition.js'
import store from '@/store/store.js'
import * as event from '@/js/events/controlGameEvents.js'
// import {notification} from '@/js/library/use'


const checkKeyChar = (key) => {
    return key.toUpperCase().charCodeAt()
}

// hit a skillcheck "SPACE Default"


// var arrayGP = navigator.getGamepads()

// window.addEventListener("gamepadconnected", function(e) {
//   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
//   e.gamepad.index, e.gamepad.id,
//   e.gamepad.buttons.length, e.gamepad.axes.length);
// });

// mobile users
document.addEventListener('touchstart', e => {
    if (e.target.className == 'background') {
        if (store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame) {
            handleScore()
        }
    }
})

document.addEventListener('mousedown', e => {

    if (e.target.className == 'background' && store.state.playerSettings.mouse.skillCheckKey == e.buttons) {
        if (store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame) {
            handleScore()
        }
    }
})

document.addEventListener('keypress', key => {
    if (checkKeyChar(key.key) == store.state.playerSettings.keyboard.skillCheckKey && store.state.gameEvents.events.startGame && !store.state.gameEvents.events.pauseGame) {
        handleScore()
    }

    if (checkKeyChar(key.key) == store.state.playerSettings.keyboard.startKey && !store.state.gameEvents.events.startGame) {
        event.startGame()
    }

    if (checkKeyChar(key.key) == store.state.playerSettings.keyboard.stopKey && store.state.gameEvents.events.startGame) {
        event.stopGame()
    }

    if (checkKeyChar(key.key) == store.state.playerSettings.keyboard.pauseKey && !store.state.gameEvents.events.pauseGame) {
        event.pauseGame()
    }

    if (checkKeyChar(key.key) == store.state.playerSettings.keyboard.resumeKey && store.state.gameEvents.events.pauseGame) {
        event.resumeGame()
    }
})

// make sure to pause the generator if the user is not on the page and the generator is still running
window.onblur = () => {
    event.pauseGame()
    // console.log( "Blur pause!" )
}
