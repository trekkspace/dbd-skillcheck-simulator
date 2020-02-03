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
        <div class="game-mode-select">
            <div @click="changeGameEffect('madness')" :class="effect">
               (Testing) madness
            </div>
        </div>
    </div>
</template>

<script>


import {generateKillerPerks} from '@/js/perks'
import {notification} from '@/js/library/use'

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

                if (mode !== 'normal') {
                    generateKillerPerks()                    
                }
                // killer perks will be generated in funtion on the selected game mode
            }
        },
        changeGameEffect(effect){
            console.log(effect)
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
}

.game-mode-select div:hover{
    background: #1D324A;
    border: 2px solid #16769A;
    color: #3597E2;
    cursor: pointer;
}

.activeGameMode{
    background: #4d2a9f !important;
    color: #CFEAFF !important;
    border: 2px solid #8a9ddb !important;
}

</style>
