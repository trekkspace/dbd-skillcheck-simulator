<template>
    <div>
        <div ref="border" class="generatorButtons">
            <button ref="play" class="playBtn" 
            :disabled="!gameState.startGameButton || locked"
            v-show="gameState.startGameButton"
            @click="startGame">Play</button>

            <button style="opacity: 0;" ref="stop" class="stopBtn" 
            :disabled="!gameState.stopGameButton || locked"
            v-show="gameState.stopGameButton"
            @click="stopGame">Stop</button>

            <button style="opacity: 0;" ref="pause" class="pauseBtn" 
            :disabled="!gameState.pauseGameButton || locked"
            v-show="gameState.pauseGameButton"
            @click="pauseGame">Pause</button>

            <button style="opacity: 0;" ref="resume" class="resumeBtn" 
            :disabled="!gameState.resumeGameButton || locked"
            v-show="gameState.resumeGameButton"
            @click="resumeGame">Resume</button>
        </div>
    </div>
</template>

<script>

import * as event from '@/js/events/controlGameEvents.js'

import {initDom} from '@/js/domElements'


export default {
    methods:{
        startGame(){
            event.startGame()
        },
        pauseGame(){
            event.pauseGame()
        },

        resumeGame(){
            // this.$refs['resume']
            event.resumeGame()
        },
        stopGame(){
            event.stopGame()
        }
    },
    computed: {
        gameState(){
            return this.$store.state.gameEvents.buttons
        },
        locked(){
            return this.$store.state.gameEvents.events.locked
        }
    },

    mounted(){
 
        this.$nextTick(() => {
            initDom('buttons', this.$refs)
		})
    }
}
</script>

<style>
.generatorButtons{
    z-index: 2;
    position: absolute;
    bottom: 3%;
    left: 50%;
    width: 10vw;
    transform: translateX(-50%);
    background: #383838;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
    padding: 1.2rem;
    border-radius: 2px;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
}

/* // buttons */

button{
    z-index: 2;
    padding: .6rem .8rem;
    border: none;
    color: #574E4E;
    font-size: 1.6rem;
    border-radius: .2rem;

}

button:enabled{
    cursor: pointer;
}

.stopBtn{
    background: #EFE81A;
}

.pauseBtn{
    background: #80D5FF;
}

.playBtn, .resumeBtn{
    background: #44F74A;
}

.playBtn{
    /* position: absolute; */
    /* bottom: 5%; */
    /* left: 70%; */
    /* transform: translateX(-50%); */
    grid-column: 2/3;
    justify-self: center;
}

.stopBtn{
    grid-row: 1/2;
    grid-column: 1/2;
    justify-self: center;
}

.pauseBtn, .resumeBtn{
    grid-row: 1/2;
    grid-column: 3/4;
    justify-self: center;

}
:disabled{
    cursor: not-allowed;
}

</style>
