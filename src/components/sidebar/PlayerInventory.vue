<template>
    <div style="height: 27vw;">
        <h2 class="s-title">Inventory</h2>
        <hr>
        <h2 style="text-align: center;" v-if="Object.keys(inventory).length < 1">No items</h2>
        <div v-else class="items">
            <div @click="equipItem(key, value)" class="item-box" v-for="(value, key, index) in inventory" :key="index">

                <popper style="z-index: 9999;" trigger="hover" :options="{placement: 'bottom'}">

                    <div v-html="value.description" class="popper">
                        
                    </div>

                    <div slot="reference">
                        <img class="item-image" :src="require(`@/assets/items/high/${key}.webp`)" alt="">
                        <h2 class="item-quantity">{{value.quantity}}</h2>
                    </div>

                </popper>
            </div>
        </div>
    </div>
</template>

<script>

import {toolboxes, toolboxAddOns} from '@/js/items'
import {notification} from '@/js/library/use'


import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'


// import {mapGetters} from 'vuex'

export default {
    name: 'PlayerInventory',
    components: {
        'popper': Popper
    },
    
    computed: {
        inventory(){
            return this.$store.getters['playerItems/getInventory']
        }
    },
    created(){
        this.$store.dispatch('playerItems/inventory')
    },
    methods:{
        iWantToTakeDownThisItem(item) {
            this.$store.state.playerItems.inventory[item].quantity -= 1
            if (this.$store.state.playerItems.inventory[item].quantity <= 0) {
                delete this.$store.state.playerItems.inventory[item]
            }
        },
        iWantToAddMyToolbox(item){
            if (this.$store.state.playerItems.equipedItems.toolbox.length == 0) {
                this.iWantToTakeDownThisItem(item)
                this.$store.state.playerItems.equipedItems.toolbox.push(toolboxes[item])
            }
            if (this.$store.state.playerItems.equipedItems.toolbox.length == 1) {
                const takeDown = this.$store.state.playerItems.equipedItems.toolbox[0].name
                if (this.$store.state.playerItems.inventory[takeDown]) {
                    this.$store.state.playerItems.inventory[takeDown].quantity += 1
                }else{
                    this.$store.state.playerItems.inventory[takeDown] = {
                        quantity: 1,
                        what: toolboxes[takeDown].what
                    }
                }
                this.$store.state.playerItems.equipedItems.toolbox = []
                this.$store.state.playerItems.equipedItems.toolbox.push(toolboxes[item])
                this.iWantToTakeDownThisItem(item)
            }
        },
        iWantToAddMyAddOn(item){
            if (this.$store.state.playerItems.equipedItems.addOns.length == 0) {
                if (this.$store.state.playerItems.equipedItems.toolbox.length !== 0) {
                    this.$store.state.playerItems.equipedItems.addOns.push(toolboxAddOns[item])
                    this.iWantToTakeDownThisItem(item)
                }else{
                    notification('You have to equip a toolbox first')
                }
            }else if(this.$store.state.playerItems.equipedItems.addOns.length == 1) {

                if (this.$store.state.playerItems.equipedItems.addOns[0].name == item && !this.$store.state.playerItems.equipedItems.addOns[0].stacks) {
                    notification('You already have an item that cannot stack together')
                }else{
                    this.$store.state.playerItems.equipedItems.addOns.push(toolboxAddOns[item])
                    this.iWantToTakeDownThisItem(item)
                }
            } else{
                notification('You cannot add add-ons anymore')
            }
        },

        equipItem(key, value){
            if (this.$store.state.gameStatus.now.generatorStarted) {
                notification('Stop your current game then try again')
                return
            }

            this.$store.dispatch('playerItems/inventory')            
            if (value.what == 'toolbox') {
                this.iWantToAddMyToolbox(key)
            }else if(value.what == 'addOn'){
                this.iWantToAddMyAddOn(key)
            }
        }
    }
}
</script>
