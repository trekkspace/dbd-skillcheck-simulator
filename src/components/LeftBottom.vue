<template>
    <div>
        <div @click="fullscreenMode()" class="fullscreen">
            {{fullscreen}}
        </div>
    <div class="leftBottom">

        <h2 :class="[gameStatus.generatorsLeft > 0  && gameStatus.gameMode !== 'ds' ? 'generators-left' : 'generators-left-inv' ]">{{ gameStatus.generatorsLeft}}</h2>
        <img v-if="gameStatus.gameMode == 'ds'" class="generator-icon" src="@/assets/icons/decisiveStrike.png" alt="">
        <img v-else-if="gameStatus.generatorsLeft > 0" class="generator-icon" src="@/assets/icons/generator.png" alt="">
        <img v-else class="generator-icon" src="@/assets/icons/exitGates.png" alt="">

        <div class="addedTools">
            <div v-if="itemCharges == 0 || !gameStarted.generatorStarted" style="background: transparent;" class="item-progress-bar"></div>
            <div v-else class="item-progress-bar">
                <div :style="{height: `${itemCharges}%`}" class="left-item-progress-bar"></div>
            </div>
            <img v-if="itemOn.toolbox.length > 0" class="addedToolbox" :src="require(`@/assets/items/low/${itemOn.toolbox[0].name}.png`)">
            <div v-else class="addedToolbox"></div>

            <img v-if="itemOn.addOns.length >= 1" class="addedAddOn1" :src="require(`@/assets/items/low/${itemOn.addOns[0].name}.png`)">
            <div v-else class="addedAddOn1"></div>

            <img v-if="itemOn.addOns.length >= 2" class="addedAddOn2" :src="require(`@/assets/items/low/${itemOn.addOns[1].name}.png`)">
            <div v-else class="addedAddOn2"></div>
        </div>
    </div>
    </div>
</template>

<script>
import {gameOptions} from '@/js/status/options'

export default {
    data(){
        return{
            isFullscreen: false
        }
    },
    methods: {
      fullscreenMode(){
          if (window.innerHeight == screen.height) {
              this.isFullscreen = false
              this.closeFullscreen()
          } else{
              this.isFullscreen = true
              this.openFullscreen()
          }
      },
      openFullscreen(){
          let elem = document.documentElement
          /* View in fullscreen */
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
      },
      closeFullscreen() {
          let elem = document.documentElement
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        },
    },
    computed: {
        itemOn(){
            return this.$store.state.playerItems.equipedItems
        },
        fullscreen(){
            return `${this.isFullscreen ? 'Exit': 'Enter'} Fullscreen`
        },
        gameStatus(){
            return this.$store.state.gameStatus.now
        },
        generatorsToComplete(){
            return gameOptions.generatorsToComplete
        },
        gameStarted(){
            return this.$store.state.gameStatus.now
        },
        itemCharges(){
            if (!this.$store.state.gameStatus.item) {
                return 0
            } else {
                return (this.$store.state.gameStatus.item.charges / this.$store.state.gameStatus.item.fromCharges ) * 100
            }
        }
    }
}
</script>

<style>

.leftBottom{
    position: absolute;
    bottom: 2%;
    left: 2%;
    background: #383838;
    padding: 0.5rem;
}

.fullscreen{
    background: #383838;
    padding: 1vw 1vw;
    font-size: 1.4vw;
    position: absolute;
    bottom: 6.5vw;
    left: 2%;
    cursor: pointer;
}

.generators-left, .generators-left-inv{
    font-size: 2vw;
}

.generators-left-inv{
    color: transparent;
}

.generator-icon{
    width: 4vw;
    height: 4vw;
}

.leftBottom {
    display: flex;
    align-items: center;
}

.addedToolbox{
    height: 4.5vw;
    width: 4.5vw;
    background: #242323;
    grid-area: toolbox;
}

.addedAddOn1{
    height: 2vw;
    width: 2vw;
    background: #242323;
    align-self: flex-start;
    grid-area: "addon1";
}

.addedAddOn2{
    height: 2vw;
    width: 2vw;
    background: #242323;
    align-self: flex-end;
    grid-area: "addon2";
}

.addedTools{
    grid-gap: 0.8rem;
    display: grid;
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-areas: 
    'pbar toolbox addon1'
    'pbar toolbox addon2';
}

.item-progress-bar{
    display: flex;
    /* align-self: flex-end; */
    /* position: relative; */
    background: #242323;
    height: 100%;
    grid-area: pbar;
    width: 1rem;
    
}

.left-item-progress-bar{
    align-self: flex-end;
    /* position: absolute; */
    width: 1rem;
    background: rgb(6, 206, 6);
}
</style>
