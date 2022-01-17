<template>
    <div class="menu-perks">
      <h2 class="s-title">Killer Perks</h2>
      <hr>
        <div class="killer-perks-showcase">
            <div class="killer-perk-box" v-for="(value, perk, index) in killerPerks" :key='index'>
                <img @click='changeKillerPerk(perk)' class="training-killer-perks" :src="require(`@/assets/perks/killer/${value.icon}.png`)" alt="">
                <h2>{{ value.active ? 'ON': 'OFF' }}</h2>
                <div v-for="sw in value.switches" :key="sw">
                  <hr>
                  <span class="text-option">{{sw.name}}</span><br><input v-if="sw.type == 'int'" class="perk-option"
                         @input="set_value_killer(perk,sw.attr)"
                         :placeholder="sw.val"
                         :min="sw.from"
                         :max="sw.to"
                         :step="1"
                         type="number">
                </div>
            </div>
        </div>
      <h2 class="s-title">Survivor Perks</h2>
      <hr>
      <div class="survivor-perks-showcase">
        <div @click='changeSurvPerk(perk)' class="killer-perk-box" v-for="(value, perk, index) in survivorPerks" :key='index'>
          <img class="training-killer-perks" :src="require(`@/assets/perks/survivor/${value.icon}.png`)" alt="">
          <h2>{{ value.active ? 'ON': 'OFF' }}</h2>
        </div>
      </div>
    </div>
</template>

<script>

//import store from "@/store/store";

import {getSwitch} from "@/js/library/getSwitch";
export default {
    computed: {
        killerPerks(){
          return this.$store.state.gameStatus.killerPerks
        },
        survivorPerks(){
          return this.$store.state.gameStatus.survivorPerks
        }
    },
    methods:{
        changeKillerPerk(perk){
          this.$store.state.gameStatus.killerPerks[perk].active = !this.$store.state.gameStatus.killerPerks[perk].active
        },
        changeSurvPerk(perk){
          this.$store.state.gameStatus.survivorPerks[perk].active = !this.$store.state.gameStatus.survivorPerks[perk].active
        },
        set_value_killer(key,opt) {
          let inpValue = Number(event.target.value);
          getSwitch(this.$store.state.gameStatus.killerPerks[key], opt).val=inpValue;
        }
    }
}
</script>

<style>

.training-killer-perks{
    width: 4vw;
    height: 4vw;
}
.text-option{
  font-size: 10px;
}
.survivor-perks-showcase{
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  text-align: center;
}
.killer-perks-showcase {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;
    text-align: center;
}
.killer-perk-box{
  background: rgba(27, 27, 27, 0.62);
  border-radius: 3px;
  padding: 2px;
  cursor: pointer;
    
  background-size: cover;
  background-blend-mode: multiply;
}
.menu-perks{
  background-color: #3f3f3f;
}
hr{
    margin-bottom: 1rem !important;
}
.perk-option{
  width: 40px;
}
</style>
