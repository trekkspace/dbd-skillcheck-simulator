<template>
    <div class="player_settings">
        <h1 class="s-title">Keyboard</h1>
        <hr>
            <div class="s-template s-keyboard" v-for="(value, key, index) in get_keyboard" :key="index + key">
                <h2 class="s-left s-text">{{ key.split(/(?=[A-Z])/).join(' ')}}</h2>
                <span class="border-line"></span>
                <input class="s-right"
                    :placeholder="keyboard[value] || String.fromCharCode(value) || 'Unknown'" 
                    @input="setKeyboardKey(key)"
                    @click="setKeyMessage()"
                    @blur="resetInput()"
                    type="text">
        </div>
        <h1 class="s-title">Mouse</h1>
        <hr>
            <div class="s-template s-keyboard">
                <h2 class="s-left s-text">skill check key</h2>
                <span class="border-line"></span>
                <input @blur="resetInput()" :placeholder="mouseKeys" @mousedown="setMouseKey()" class="s-right" type="text">
            </div>
            <button @click="allowMouseException()" class="allowBtn">Allow M4 / M5</button>
        <h1 class="s-title">Custom</h1>
        <hr>
         <div class="s-template s-custom" v-for="(value, key, index) in playerOptions" :key="index + key">
                <h2 class="s-left s-text">{{ key.split(/(?=[A-Z])/).join(' ') }}</h2>
                <span class="border-line"></span>
                <input class="s-right"
                    @input="set_value(key)"
                    :placeholder="value.value" 
                    :min="value.minValue()"
                    :max="value.maxValue()"
                    :step="value.maxValue() / 20"
                    @blur="resetInput()"
                    type="number">
        </div>

        <h1 class="s-title">Backgrounds</h1>
        <hr>            
            <agile @afterChange="showCurrentSlide($event)" :dots='false' :centerMode='true' :initialSlide='getSlide()' class="allImg" ref="carousel">
                    <img class="prevImg" src="@/assets/backgrounds/fire.jpg" alt="">
                    <img class="prevImg" src="@/assets/backgrounds/meg.jpg" alt="">
                    <img class="prevImg" src="@/assets/backgrounds/astronomy.jpg" alt="">
                    <img class="prevImg" src="@/assets/backgrounds/b1.jpg" alt="">
                    <img class="prevImg" src="@/assets/backgrounds/b2.jpg" alt="">
                    <img class="prevImg" src="@/assets/backgrounds/b3.jpg" alt="">
            </agile>
    </div>
</template>

<script>

import {playerOptions} from '@/js/status/options.js'
import keyCodes from '@/js/events/keyboard.js'
import mouseCodes from '@/js/events/mouse.js'
import {notification} from '@/js/library/use'


import { VueAgile } from 'vue-agile'

export default {
    components: {
      agile: VueAgile
    },
    data(){
        return{
            carouselData: 0
        }
    },
    methods:{
        setKeyboardKey(key){
            event.target.dataset.change = 'true'
            const inputKey = event.data ? event.data.toUpperCase().charCodeAt() : null

            // check if the key was already defined for another thing
            if (inputKey) {
                const checkAnotherValue = Object.values(this.$store.state.playerSettings.keyboard).filter(value => inputKey == value)
                if (checkAnotherValue.length == 0) {
                    this.$store.state.playerSettings.keyboard[key] = inputKey
                }    
            }

            // remove focus from the input field
            event.target.blur()
        },
        resetInput(){
            event.target.value = ''
            if (event.target.dataset.change ) {
                event.target.dataset.change = 'false'                
            }
        },

        set_value(key){
            let inpValue = Number(event.target.value)
            if (inpValue % 1 != 0) {
                inpValue = Number(inpValue.toFixed(2))
            }
            const minVal = playerOptions[key].minValue()
            const maxVal = playerOptions[key].maxValue()
            playerOptions[key].value = isNaN(inpValue) ? minVal : inpValue >= maxVal ? maxVal: inpValue <= minVal ? minVal : inpValue
            // console.log(`min val ${minVal} - max val ${maxVal} - val ${playerOptions[key].value}`)

        },
        allowMouseException(){
            if (!this.$store.state.acceptAllMouseButtons) {
                let confirmLock = confirm(`Are you sure you want to activate M4/M5? Those keys are usually browser-back/browser-forward, you'll overrite those options on this page.`)
                if (confirmLock) {
                    this.$store.state.acceptAllMouseButtons = true
                    history.pushState(null, null, location.href)
                    window.onpopstate = function () {
                    history.go(1)
                    }
                }
            }
        },
        setMouseKey(){
            if (event.target.dataset.change == 'true') {
                if (event.buttons) {
                    this.$store.state.playerSettings.mouse.skillCheckKey = event.buttons
                } else{
                    // console.log('Not a key.')
                }
                
            } else{
                notification('Keep your mouse pointer in the input box and press the mouse key that you want to bind.')
                event.target.dataset.change = 'true'
            }
        },
        setKeyMessage(){
                notification('While the input is active press the key you want to bind.')

        },

        // carousel
        showCurrentSlide (event) {
            this.$store.state.playerSettings.background = event.currentSlide
        },
        getSlide(){
            return this.$store.state.playerSettings.background
        }
    },
    computed: {
        get_keyboard(){
            return this.$store.state.playerSettings.keyboard
        },
        playerOptions(){
           return playerOptions
        },
        mouse(){
            return this.$store.state.playerSettings.mouse
        },
        keyboard(){
            return keyCodes
        },
        mouseKeys(){
            return mouseCodes.mouseCodes[this.mouse.skillCheckKey]
        }
    }
}
</script>

<style>

.agile__actions{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
}


.prevImg{
    /* position: relative; */
    /* height: 100%; */
    /* width: 15vw; */
    /* background-size: cover; */
    align-items: center;
	color: #fff;
	display: flex;
	height: 12vw;
	justify-content: center;
}

.allowBtn{
    margin-left: 4vw;
}

.allImg{
    text-align: center;
}

input{
    width: 10rem;
    background: rgb(103, 238, 175);
    border: none;
    background: url('../../assets/backgrounds/texture13.png');
    border-radius: 2px;
    /* justify-self: end; */
    text-align: center;
}

.s-keyboard input:hover{
    cursor: pointer;
}

input:focus{
    outline: none;
    color: transparent;
    /* text-shadow: 0 0 0 #020202; */
    background: #2E557C;
    border: 2px solid #1BC6E1;
}

::placeholder{
    font-size: 1vw;
    color: #fff;
}

input:focus::placeholder{
    color: rgb(255, 255, 255);
}

.s-custom input:focus{
    color: #ffffff;
}

</style>
