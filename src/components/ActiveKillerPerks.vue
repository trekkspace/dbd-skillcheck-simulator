<template>
    <div>
    <div :class="[gameOn.generatorStarted == true ? 'active-killer-perks': 'active-killer-perks gone-killer-perks']">
        <div v-for="(value, key, index) in killerPerks" :key='index' >
            <div v-if="value.active == true" class="perks-grid">
                <div  style="position: relative;" class="killer-perk">
                    <div class="perk-content">
                      <img class="perks-icon" :src="require(`@/assets/perks/killer/${value.icon}.png`)" alt="">
                      <div class="perks-tokens" v-for="opt in value.switches" :key="opt">
                        <span v-if="opt.type == 'int'">
                          {{opt.name}}: {{opt.val}}
                        </span>
                        <span v-else-if="opt.type == 'boolean'">
                          {{opt.name}}: {{(opt.val)?"ON":"OFF"}}
                        </span><br>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div :class="[gameOn.generatorStarted == true ? 'active-survivor-perks': 'active-survivor-perks gone-survivor-perks']">
        <div v-for="(value, key, index) in survivorPerks" :key='index' >
          <div v-if="value.active == true" class="perks-grid">
            <div  style="position: relative;" class="survivor-perk">
              <div class="perk-content">
                <img class="perks-icon" :src="require(`@/assets/perks/survivor/${value.icon}.png`)" alt="">
                <div class="perks-tokens c-surv" v-for="opt in value.switches" :key="opt">
                        <span v-if="opt.type == 'int'">
                          {{opt.name}}: {{opt.val}}
                        </span>
                  <span v-else-if="opt.type == 'boolean'">
                          {{opt.name}}: {{(opt.val)?"ON":"OFF"}}
                        </span><br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>


export default {
    name: 'ActiveKillerPerks',
    computed: {
        killerPerks(){
            return this.$store.state.gameStatus.killerPerks
        },
        survivorPerks(){
          return this.$store.state.gameStatus.survivorPerks
        },
        gameOn(){
            return this.$store.state.gameStatus.now
        }
    }
}
</script>

<style>
.active-survivor-perks{
  transition: 800ms;
  position: absolute;
  left: 5vw;

  bottom: calc(3% + 20rem);

  display: grid;
  grid-auto-flow: column;
  grid-gap: 2vh;
  background-size: cover;
  background-blend-mode: multiply;
}
.active-killer-perks{
    transition: 800ms;
    position: absolute;
    right: 5vw;

    bottom: calc(3% + 18rem);

    display: grid;
    grid-auto-flow: column;
    grid-gap: 2vh;
    background-size: cover;
    background-blend-mode: multiply;
}
.perks-grid{

}
.killer-perk{
  position: relative;
  background-color: red;
  border: solid #770505;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  height: 3vw;
  width: 3vw;
}
.survivor-perk{
  position: relative;
  background-color: #16a3fa;
  border: solid #2b7393;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  height: 3vw;
  width: 3vw;
}
.perk-content{
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.active-survivor-perks{

}
.perks-tokens{
  bottom: 4vw;
  position: absolute;
  text-align: center;
  margin-top: -1vw;
  margin-bottom: .5vw;
  font-size: 1vw;
  width: 5vw;
  left: -.2vw;
}
.perks-tokens > span{
  background-color: #ff2626;
  padding: .2vw;
  border-radius: 2px;
}
.c-surv > span{
  background-color: #1f6c8d;
  padding: .2vw;
  border-radius: 2px;
}

.perks-icon{
    /* position: relative; */
    height: 3vw;
    width: 3vw;
}

.perk-switches{
    margin-top: -1rem;
    font-size: 2rem;
    text-align: center;
}
.gone-killer-perks .gone-survivor-perks{
  opacity: 0;
}

</style>
