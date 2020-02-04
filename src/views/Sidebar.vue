<template>
    <div>
        <div >
            <div class="menu" v-if="menu">
                <div class="navigation">
                <!-- <div vnavigation-for="(key, value, index) in inventory" :key="index">
                    {{key}}
                </div> -->
                <div class="navigation-items">
                    <a @click.prevent="center = 'PlayerSettings'" :class="center == 'PlayerSettings' ? 'simple-to' : 'navigation-to'" href="">Settings</a>
                    <a @click.prevent="center = 'GameMode'" :class="center == 'GameMode' ? 'simple-to' : 'navigation-to'" href="">Game Mode</a>
                    <a @click.prevent="center = 'PlayerScore'" :class="center == 'PlayerScore' ? 'simple-to' : 'navigation-to'" href="">Stats</a>
                    <a @click.prevent="center = 'GameStore'" :class="center == 'GameStore' ? 'simple-to' : 'navigation-to'" href="">Shop</a>
                    <a @click.prevent="center = 'PlayerInventory'" :class="center == 'PlayerInventory' ? 'simple-to' : 'navigation-to'" href="">Inventory</a>
                    <a @click.prevent="center = 'About'" :class="center == 'About' ? 'simple-to' : 'navigation-to'" href="">About</a>
                </div>
                </div>

                <div class="template">
                    <div class="template-border"></div>
                    
                    <simplebar class="template-content" data-simplebar-auto-hide="false">
                            <component :is="center"></component>
                    </simplebar>
                </div>

                <div v-if="leftTemplate" class="item-showcase">
                    <div class="item-showcase-border"></div>
                    <component :is="leftTemplate"></component>
                </div>

                </div>

            <div class="menu-btn" @click="menuSwitchState()">
                <div></div>
                <div></div>
                <div></div>
                <p class="menu-text">Menu</p>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>
    </div>
</template>

<script>

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

import PlayerScore from '@/components/sidebar/PlayerScore.vue'
import PlayerSettings from '@/components/sidebar/PlayerSettings.vue'
import GameMode from '@/components/sidebar/GameMode.vue'
import TrainingMode from '@/components/sidebar/TrainingMode.vue'
import GameStore from '@/components/sidebar/GameStore.vue'
import PlayerInventory from '@/components/sidebar/PlayerInventory.vue'
import EquipItems from '@/components/sidebar/EquipItems.vue'
import About from '@/components/sidebar/About.vue'



import {notification} from '@/js/library/use'

// import anime from 'animejs/lib/anime.es.js'
// import {dom} from '@/js/domElements'


export default {
  data(){
      return{
          center: PlayerScore,
          openedMenu: false,
      }
  },
  components: {
    PlayerScore,
    PlayerSettings,
    GameMode,
    TrainingMode,
    GameStore,
    PlayerInventory,
    EquipItems,
    simplebar,
    About
  },
  computed:{
      leftTemplate(){
        if (this.center == 'GameMode' && this.$store.state.gameStatus.now.gameMode == 'training') {
            return TrainingMode
          }else if(this.center == 'PlayerInventory'){
            return EquipItems
          } else{
              return ''
          }
      },
      menu(){
          return this.$store.state.gameEvents.events.menu
      }
  },
  methods: {
      menuSwitchState(){

        if (this.$store.state.gameStatus.now.generatorStarted && !this.$store.state.gameStatus.now.generatorPaused) {
            notification('Pause the current game then try again')
            return
        } else{
            this.$store.state.gameEvents.events.menu = !this.$store.state.gameEvents.events.menu
        }
      }
  },
}
</script>

<style>

.menu{
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 2;


}

.menu-btn{
    position: absolute;
    top: 2%;
    left: 2%;
    grid-gap: 0.4rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    cursor: pointer;
    
}

.menu-btn div{
    height: .8vw;
    width: .8vw;

    background: var(--texture-one) center center var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;
}

.navigation{
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);
  background: var(--texture-one) center center var(--font-color-two);
  background-size: cover;
  background-blend-mode: multiply;


  position: absolute;
  left: -10vw;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  /* background: #ECECEC; */
  /* margin-top: 5rem; */
  height: 25vw;
  width: 10vw;

}



.template-border{
  background-color: #FFC2C2;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);
  background: var(--texture-one) center center var(--font-color-two);
  background-size: cover;
  background-blend-mode: multiply;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  z-index: -1;
  top: -.5vw;
  height: 26vw;
  width: 20vw;
}

.item-showcase-border{
  background-color: #FFC2C2;

  background: var(--texture-one) center center var(--font-color-two);
  background-size: cover;
  background-blend-mode: multiply;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  z-index: -1;
  top: -.5vw;
  height: 11vw;
  width: 16vw;
}

.navigation-items{
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: .8vw 1vw;
  
}

.navigation-items a:hover{
    transform: scale(1.2);
}

.navigation-to, .simple-to{
  transition: 400ms;
  margin-top: 1vw;
  color: #8A9DDB;
  text-decoration: none;
  font-size: 1.4vw;
}

.simple-to{
background-color: #8A9DDB;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-size: cover;
  background-image: url('../assets/backgrounds/texture3.png');
  background-position: center;
  background-size: cover;
  /* background-color: rgb(82, 190, 204); */
  color:aliceblue;
  padding: 0.01em;
  border-radius: 4px;
  background-blend-mode: multiply;
    /* background: #242323; */
}


.template-content{
    height: 24vw;
    padding: 0vw 4vw;
}

.template{
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background: #242323;
  position: relative;
  width: 30vw;
  height: 25vw;
  color: white;

  background: url('../assets/backgrounds/texture11.png') center center rgb(78, 78, 78);
  background-size: cover;
  background-blend-mode: multiply;
}

.item-showcase{
  /* position: relative; */
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  position: absolute;
  padding: 0px 2vw;
  right: -20vw;
  width: 20vw;
  height: 10vw;
  background: #242323;
  background: url('../assets/backgrounds/texture11.png') center center rgb(83, 83, 83);
  background-blend-mode: multiply;
}

.menu-text{
    justify-self: center;
    grid-column: 1/4;
    grid-row-start: 2;
    font-size: 1vw;
}

/* // global */

.s-title{
    margin-top: 1.5vw;
    text-align: center;
    color: #DEC2FE;
    font-size: 2.4rem;
}

hr{
    width: 50%;
    transform: translateX(50%);
    border: none;
    border-top: 2px solid white;
    margin-bottom: 2vw;
    /* margin: 1rem 0rem; */
}

.s-template{
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1.4rem;
}

.border-line{
    height: 100%;
    width: 3px;
    background: #ffffff;
}

.s-left{
    justify-self: end;
}

.s-right{
    justify-self: start;
}

.s-text{
    font-size: 1.7rem;
    text-transform: lowercase;
}

.s-close{
    right: 0;
    top: -5%;
    position: absolute;
    font-size: 4rem;
    margin: 1rem 2rem;
}

.s-close:hover{
    color: rgb(248, 86, 86);
    cursor: pointer;
}

</style>
