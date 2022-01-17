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
            this.$store.state.gameStatus.now.glyph.start=false;
            event.startGame()
        },
        pauseGame(){
            event.pauseGame()
        },

        resumeGame(){
            this.$store.state.gameStatus.now.glyph.start=false;
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
    bottom: 2%;
    left: 50%;
    width: 17vw;
    transform: translateX(-50%);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
    padding: .4vw;
    border-radius: 2px;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);

    background: var(--texture-one) center center var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;
}

/* // buttons */

button{
    z-index: 2;
    padding: .6rem .8rem;
    border: none;
    color: #574E4E;
    font-size: 2.5rem;
    border-radius: .2rem;
    width: auto;
    border: none;
    background: #404040;
    color: #ffffff !important;
    font-weight: 100;
    /* padding: 20px; */
    text-transform: uppercase;
    border-radius: 6px;
    transition: all 0.3s ease 0s;

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);
    
    background: var(--texture-two) center center var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;

}

button:hover{
    color: #ffffff !important;
    font-weight: 700 !important;
    letter-spacing: 2px;
    background: none;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.3s ease 0s;
}


button:enabled{
    cursor: pointer;
}


.playBtn, .resumeBtn, .pauseBtn, .stopBtn{
    background-color: #1e1e1e;
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
