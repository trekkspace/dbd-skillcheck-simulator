<template>
  <div oncontextmenu="return false;" id="app">
    <div :style="{ backgroundImage: 'url(' + image + ')' }" class="background">
    </div>
    <Skillcheck/>
    <GeneralStats/>
    <Generator/>
    <Combo/>
    <ObjectivePoints/>
    <Sidebar/>
    <Noise/>
    <!-- <Particles/> -->
    <UserInteractionButtons/>
    <Notifications/>
    <Rank/>
    <ActiveKillerPerks/>
    <LeftBottom/>
  </div>
</template>

<script>
import Skillcheck from './components/Skillcheck.vue'
import GeneralStats from './components/GeneralStats.vue'
import Generator from './components/Generator.vue'
import Combo from './components/Combo.vue'
import ObjectivePoints from './components/ObjectivePoints.vue'
import Noise from './components/Noise.vue'
import UserInteractionButtons from './components/UserInteractionButtons.vue'
import Notifications from './components/Notifications.vue'
import Rank from './components/Rank.vue'
import LeftBottom from './components/LeftBottom.vue'

import Sidebar from './views/Sidebar.vue'
import ActiveKillerPerks from './components/ActiveKillerPerks.vue'


// import {playerOptions} from '@/js/status/options.js'

// eslint-disable-next-line no-unused-vars
import * as events from '@/js/events/keyboardEvents.js'


export default {
  name: 'app',
  components: {
    Skillcheck,
    GeneralStats,
    Generator,
    Combo,
    Sidebar,
    ObjectivePoints,
    Noise,
    UserInteractionButtons,
    Notifications,
    Rank,
    ActiveKillerPerks,
    LeftBottom
  },
  computed: {
      image(){
          return this.$store.state.playerSettings.backgroundURL
      }
  }
}
</script>

<style>

body{
    background-color: #020202;
    font-family: 'Roboto', sans-serif;
    color: white;
    padding: 1rem 1.4rem;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root{
    font-size: 0.58vw;
    --circle-height: 145px;
    --circle-width: 145px;               
    --skillcheck-bar-width: 14px;
    --skillcheck-bar-height: 100px;
    --skillcheck-bar-gradient: radial-gradient(#ff0000, hsla(0, 70%, 5%, 0.00), rgba(0, 0, 0, 0));
    --skillcheck-button-padding: .1rem .6rem;
    --skillcheck-button-borderRadius: 4px;
    --skillcheck-button-border: 1.5px solid #ffffff;
    --skillcheck-button-color: #ffffff;
    --general-stats-color: #ffffff;
    --font-color-one: #91e4c8;
    --font-color-two: #a5acaa;
    --texture-one: url('../src/assets/backgrounds/texture20.png');
    --texture-two: url('../src/assets/backgrounds/texture15.png');
    --texture-tree: url('../src/assets/backgrounds/texture2.png')
}

.background{
    background: no-repeat center 20% fixed;
    /* background-size: 100%; */
    position: fixed;
    top: 0;
    left: 0;
    background-size: 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.popper{
    background: #383838;
    border: none;
    padding: 0.4rem;
    box-shadow: none;
    margin: 0px 4rem;
}

.p-item-name{
    text-align: start;
    font-size: 1.4vw;
    color: #ffffff;
    padding: .2rem 2rem; 
    background: #9593f5;
    width: 100%;
}

.p-item-true{
    color: #6EF37B;
}

.p-item-false{
    color: #FF4D4D;
}

.p-item-description{
    font-size: 1vw;
    color: rgb(168, 102, 255);
    text-align: start;
}

.p-item-status{
    margin: 1vw;
    color: white;
    text-align: start;
    font-size: 1vw;
    padding-left: 2rem;
    list-style-type: circle;
}

.p-item-note{
    font-size: 1vw;
    color: #e3d1b6;
}
</style>
