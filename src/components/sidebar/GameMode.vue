<template>
    <div>
        <h1 class="s-title">Game Mode</h1>
        <hr>
        <div class="game-mode-select">
            <div v-for="mode in gameModes" :key="mode" :class="activeMode(mode)" @click="changeGameMode(mode)">
                {{ mode }}
            </div>
        </div>
        <h1 class="s-title">Effects</h1>
        <hr>
        <div class="game-mode-select">
            <div @click="changeGameEffect('madness')" :class="effect">
               *madness*
            </div>
        </div>
    </div>
</template>

<script>


import {generateKillerPerks} from '@/js/perks'
import {notification} from '@/js/library/use'
import {getSwitch} from "@/js/library/getSwitch";
import store from "@/store/store";
import {skillCheckInit} from "@/js/skillchecks/dom/skillCheckAnim";

export default {
    name: 'GameMode',
    methods: {
        changeGameMode(mode){
            if (this.$store.state.gameStatus.now.generatorStarted) {
                notification('Stop your current game then select again')
                return
            }
            if (this.$store.state.gameStatus.now.gameMode !== mode) {
                this.$store.state.gameStatus.now.gameMode = mode

                if (typeof  this.$store.state.gameStatus.killerPerks.oppression =="undefined") {
                    generateKillerPerks()                    
                }
                skillCheckInit();
                switch (mode){
                  case "easy":
                    this.$store.state.gameStatus.survivorPerks.thisIsNotHappening.active = true;
                    this.$store.state.gameStatus.killerPerks.oppression.active = false;
                    this.$store.state.gameStatus.killerPerks.huntressLullaby.active = false;
                    this.$store.state.gameStatus.killerPerks.hexRuin.active = false;
                    this.$store.state.gameStatus.killerPerks.unnervingPresence.active = false;

                    break;
                  case "medium":
                    this.$store.state.gameStatus.survivorPerks.thisIsNotHappening.active = false;
                    this.$store.state.gameStatus.killerPerks.oppression.active = false;
                    this.$store.state.gameStatus.killerPerks.huntressLullaby.active = true;
                    getSwitch(store.state.gameStatus.killerPerks.huntressLullaby, "tokens").val = 3;
                    this.$store.state.gameStatus.killerPerks.hexRuin.active = false;
                    this.$store.state.gameStatus.killerPerks.unnervingPresence.active = true;
                    getSwitch(store.state.gameStatus.killerPerks.unnervingPresence, "tier").val=3;
                    break;
                  case "hard":
                    this.$store.state.gameStatus.survivorPerks.thisIsNotHappening.active = false;
                    this.$store.state.gameStatus.killerPerks.oppression.active = false;
                    this.$store.state.gameStatus.killerPerks.huntressLullaby.active = true;
                    getSwitch(store.state.gameStatus.killerPerks.huntressLullaby, "tokens").val = 5;
                    this.$store.state.gameStatus.killerPerks.hexRuin.active = true;
                    this.$store.state.gameStatus.killerPerks.unnervingPresence.active = true;
                    getSwitch(store.state.gameStatus.killerPerks.unnervingPresence, "tier").val=3;
                    getSwitch(store.state.gameStatus.killerPerks.hexRuin, "tier").val=3;

                    break;
                }
            }
        },
        changeGameEffect(){
              if (this.$store.state.gameStatus.now.effects.includes('madness')) {
                    this.$store.state.gameStatus.now.effects = []                  
              } else {
                    this.$store.state.gameStatus.now.effects.push('madness')
              }
        },
        // bind style atribute
        activeMode(mode){
            if (mode == this.$store.state.gameStatus.now.gameMode) {
                return 'activeGameMode'
            }
        },

    },
    computed: {
        gameModes(){
            return this.$store.state.gameStatus.now.gameModes
        },
                // eslint-disable-next-line vue/return-in-computed-property
        effect(){
            if (this.$store.state.gameStatus.now.effects.includes('madness')) {
                return 'activeGameMode'
            }
        }
    }
}
</script>

<style>



.game-mode-select{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
}

.game-mode-select div{
    background: #FFC2C2;
    border: 2px solid #FF7676;
    color: #7C5E5E;
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
    z-index: 2;
    padding: .6rem .8rem;
    border: none;
    font-size: 2.5rem;
    border-radius: .2rem;
    width: auto;
    color: #ffffff !important;
    font-weight: 100;
    /* padding: 20px; */
    text-transform: uppercase;
    border-radius: 6px;
    transition: all 0.3s ease 0s;

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .4);
    
    background: var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;
}

.game-mode-select div:hover{
    background: #1D324A;
    color: #3597E2;
    cursor: pointer;

        color: #ffffff !important;
    font-weight: 700 !important;
    letter-spacing: 2px;
    background: none;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.3s ease 0s;
}

.activeGameMode{
    /* background: #4d2a9f !important; */
    /* color: #CFEAFF !important; */
    /* border: 2px solid #8a9ddb !important; */
        color: #ffffff !important;
    font-weight: 700 !important;
    letter-spacing: 2px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.3s ease 0s;
     background-color: #818181 !important;
}

</style>
