<template>
    <div>
        <h2 class="s-title">Items Equiped</h2>
        <hr>
        <div class="items-equiped">
            <div v-if="itemOn.toolbox.length > 0">
                <img @click="getDownToolbox(itemOn.toolbox[0].name)" class="toolbox-equiped" :src="require(`@/assets/items/high/${itemOn.toolbox[0].name}.webp`)">
            </div>
            <div v-else class="toolbox-equiped"></div>

            <div @click="getDownAddOns(0, itemOn.addOns[0].name)" v-if="itemOn.addOns.length >= 1">
                <img  class="add-on-equiped" :src="require(`@/assets/items/high/${itemOn.addOns[0].name}.webp`)">
            </div>
            <div v-else class="add-on-equiped"></div>

            <div @click="getDownAddOns(1, itemOn.addOns[1].name)" v-if="itemOn.addOns.length >= 2">
                <img class="add-on-equiped" :src="require(`@/assets/items/high/${itemOn.addOns[1].name}.webp`)">
            </div>
            <div v-else class="add-on-equiped"></div>
        </div>
    </div>
</template>

<script>
import {toolboxes, toolboxAddOns} from '@/js/items'

import {notification} from '@/js/library/use'

export default {
    name: 'EquipItems',
    computed: {
        itemOn(){
            return this.$store.state.playerItems.equipedItems
        }
    },
    methods: {
        iWantItBack(item){
            if (this.$store.state.playerItems.inventory[item]) {
                this.$store.state.playerItems.inventory[item].quantity += 1
            } else{
                this.$store.state.playerItems.inventory[item] = {
                    quantity : 1,
                    what: toolboxes[item] ? toolboxes[item].what : toolboxAddOns[item] ? toolboxAddOns[item].what : 'what? this is not possible'
                }
            }
        },

        gameRun(){
            if (this.$store.state.gameStatus.now.generatorStarted) {
                notification('Stop your current game then try again')
                return true
            }
        },

        getDownToolbox(item){

            if (this.gameRun()) {
                return
            }

            this.$store.dispatch('playerItems/inventory')            

            this.iWantItBack(item)
            if (this.$store.state.playerItems.equipedItems.addOns.length > 0) {
                this.$store.state.playerItems.equipedItems.addOns.forEach(element => {
                    this.iWantItBack(element.name)
                })
            }
            this.$store.state.playerItems.equipedItems.addOns = []
            this.$store.state.playerItems.equipedItems.toolbox = []
        },
        getDownAddOns(whichID, name){

            if (this.gameRun()) {
                return
            }

            this.$store.dispatch('playerItems/inventory')            
            this.$store.state.playerItems.equipedItems.addOns.splice(whichID, 1)
            this.iWantItBack(name)
        },
        
    }
}
</script>

<style>

.items-equiped{
    margin-top: 1vw;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 1vw;
}

.items-equiped div{
      background: var(--font-color-two);
  background-size: cover;
  background-blend-mode: multiply;
}

.toolbox-equiped{
    background: #483A57;
    height: 4.6vw;
    width: 4.6vw;
}

.add-on-equiped{
    background: #483A57;
    height: 3.5vw;
    width: 3.5vw;
}

</style>
