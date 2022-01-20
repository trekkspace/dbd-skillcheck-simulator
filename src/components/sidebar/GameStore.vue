<template>
    <div>
        <h2 class="s-title">Game Store</h2>
        <hr>
        <h2 class="s-title">Toolboxes</h2>
        <div class="items">



            <div @click='buyItem(key, value)' class="item-box" v-for="(value, key, index) in toolboxes" :key="index">

                <popper trigger="hover" :options="{placement: 'bottom'}">

                    <div v-html="value.description" class="popper"></div>

                <div slot="reference">
                    <img class='item-image' :src="require(`@/assets/items/high/${key}.webp`)" alt="Not like this">
                    <h2 class="item-price">{{value.bloodpoints}}</h2>
                </div>

                </popper>

            </div>

        </div>
        <h2 class="s-title">Add-Ons</h2>
        <div class="items">
            <div @click='buyItem(key, value)' class="item-box" v-for="(value, key, index) in addOns" :key="index">
                <popper style="z-index: 9999;" trigger="hover" :options="{placement: 'bottom'}">
                    <div v-html="value.description" class="popper"></div>
                    <div slot="reference">
                        <img class='item-image' :src="require(`@/assets/items/high/${key}.webp`)" alt="Not like this">
                        <h2 class="item-price">{{value.bloodpoints}}</h2>
                    </div>
                </popper>
            </div>
        </div>
    </div>
</template>

<script>

import {toolboxes, toolboxAddOns} from '@/js/items.js'
import {notification} from '@/js/library/use'

import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
    name: 'GameStore',
    components: {
        'popper': Popper
    },
    computed: {
        toolboxes(){
            return toolboxes
        },
        addOns(){
            return toolboxAddOns
        },
    },
    methods:{
        buyItem(key, value){
            if (this.$store.state.playerStats.stats.bloodpoints >= value.bloodpoints) {
                this.$store.state.playerStats.stats.bloodpoints -= value.bloodpoints
                if (this.$store.state.playerItems.inventory[key]) {
                    this.$store.state.playerItems.inventory[key].quantity += 1
                } else {
                    this.$store.state.playerItems.inventory[key] = {
                        quantity: 1,
                        what: value.what
                    }
                }
                notification(`You bought ${value.easyName} (${value.what == 'toolbox' ? 'Toolbox': 'Add-Ons'}) for ${value.bloodpoints} bloodpoints`)
            } else{
                notification(`You don't have enough bloodpoints`)
            }
        }
    }
}
</script>

<style>

.items{
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.item-box{
    padding: .4rem 0.5rem;
    cursor: pointer;
}

.item-price, .item-quantity{
    font-size: 1vw;
}


.item-box:hover{
    background: #1B1B1B;
}

.item-image{
    width: 4vw;
    height: 4vw;
}

/* 999999999999999999 */



</style>
