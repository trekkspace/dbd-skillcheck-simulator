<template>
    <div class="div-score">

      
        <div  ref="game-rank-bloodpoints" class="rank-bloodpoints">
            <div class="rank-bloodpoints-status">
                <img class="rank-bloodpoints-img" src="@/assets/icons/bloodpoints.png" alt="">
                <div class="bloodpoints-score">{{ playerScore.bloodpoints }}</div>
            </div>

            
            <div class="rank-score">
                <img :src="require(`@/assets/rank/${rankIcon}.webp`)" class="top-status-img" alt="">
                <h2 class="rank-score-status rank-string">{{ rankScore }}</h2>
            </div>

        </div>

        <div class="skillchecks">

        
        <div ref="skill-check-rate" :class="[gamemode == 'ds' || gamemode=='glyph'  ? 'rate-ds-skillchecks': 'rate-normal-skillchecks']" >
            <div>
                <h2 class="rate-skill-title">Great</h2>
                <div class="great-skill-rate-icon">
                    <div class="great-skill-color skill-color-size">
                        <div class="over-rate-background"></div>
                    </div>
                    <div class="skill-rate-score" v-if="gamemode=='ds'">{{playerScore.rateDsEscape }}</div>
                    <div class="skill-rate-score" v-else-if="gamemode=='glyph'">{{playerScore.rateGlyphGood }}</div>
                    <div class="skill-rate-score" v-else>{{playerScore.rateGreatScore }}</div>

                </div>

                <h3 class="rate-score" v-if="gamemode=='ds'">{{ playerScore.dsEscape  }}</h3>
                <h3 class="rate-score" v-else-if="gamemode=='glyph'">{{ playerScore.glyphGood  }}</h3>
                <h3 class="rate-score" v-else>{{ playerScore.greatScore }}</h3>

            </div>


            <div v-if="gamemode !== 'ds' && gamemode !== 'glyph'">

                <h2 class="rate-skill-title">Good</h2>

                <div class="great-skill-rate-icon">
                    <div class="good-skill-color skill-color-size">
                        <div class="over-rate-background"></div>
                    </div>
                    <div class="skill-rate-score">{{ playerScore.rateGoodScore }}</div>
                </div>

                <h3 class="rate-score">{{ playerScore.goodScore }}</h3>
            </div>


            <div>

                <h2 class="rate-skill-title">Miss</h2>


                <div class="great-skill-rate-icon">
                    <div class="fail-skill-color skill-color-size">
                        <div class="over-rate-background"></div>
                    </div>
                    <div class="skill-rate-score" v-if="gamemode=='ds'">{{playerScore.rateDsFailed }}</div>
                    <div class="skill-rate-score" v-else-if="gamemode=='glyph'">{{playerScore.rateGlyphFailed }}</div>
                    <div class="skill-rate-score" v-else>{{playerScore.rateFailedScore }}</div>
                </div>

              <h3 class="rate-score" v-if="gamemode=='ds'">{{ playerScore.dsFailed  }}</h3>
              <h3 class="rate-score" v-else-if="gamemode=='glyph'">{{ playerScore.glyphFailed  }}</h3>
              <h3 class="rate-score" v-else>{{ playerScore.failedScore }}</h3>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
  import {initDom} from '@/js/domElements.js'

  export default {
    name: 'GeneralStats',
    computed: {
      playerScore(){
        return this.$store.state.playerStats.stats
      },
      gamemode(){
        return this.$store.state.gameStatus.now.gameMode
      },

      rankIcon(){
        const rankPoints = this.$store.state.playerStats.stats.rankPoints
        var rankGrade = parseInt(rankPoints/4);
        return rankGrade.toString()
      },
      rankScore(){
        const rankPoints = this.$store.state.playerStats.stats.rankPoints
        var rankGrade = parseInt(rankPoints % 4);
        switch (rankGrade){
          case 0:
            return "I";
          case 1:
            return "II"
          case 2:
            return "III"
          case 3:
            return "IV"
          default:
            return "V"
        }
      },
      menu(){
          return this.$store.state.gameEvents.events
      }
    },
    mounted(){
        this.$nextTick(() => {
            initDom('generalStats', this.$refs)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* hard position */
.div-score {
    position: absolute;
    bottom: 2%;
    right: 2%;
    height: 96%;

}


.rank-bloodpoints-status{
    display: grid;
    align-content: center;
    grid-gap: 1rem;
    grid-template-columns: auto 1fr;
}

/* bloodpoints and rank */
.rank-bloodpoints {
    display: grid;
    justify-content: end;
    grid-gap: 2.2rem;
    grid-template-columns: 16rem 8rem;
    border-radius: 4px;

    
}

.rank-bloodpoints, .rate-ds-skillchecks, .rate-normal-skillchecks{
    width: 17.5vw
}

.rank-bloodpoints{
     background-color: var(--font-color-one)
}

.top-status-img {
    height: 8rem;
    width: auto;
}

.rank-score {
    height: 8rem;
    position: relative;
    width: fit-content;
    
}
.skillchecks{
  position: absolute;
  bottom: 0;
  padding: 0px 1rem;
  border-radius: 4px;
  background: rgba(56, 56, 56, .5);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  background: var(--font-color-two);
  background-size: cover;
  background-blend-mode: multiply;
}
.rank-score-status {
    position: absolute;
    top: 50%;
    left: 47%;
    transform: translate(-45%, -50%);
    /* display: flex; */
    /* justify-self: center; */
    justify-content: center;
}
.rank-string{
  font-family: "Quattrocento", sans-serif;
  font-size: 2.7rem !important;
  width: 4rem;
  text-align: center;
}

.rank-bloodpoints-img{
    height: 3rem;
    width: auto;
}

.bloodpoints-score, .rank-score-status{
    font-size: 2.2rem;
    color: var(--general-stats-color);
}

.bloodpoints-score{
    margin-top: .2rem;
}
.rank-score {
    align-self: center;
    justify-self: center;
}


/* rate skillchecks */
.skill-color-size {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
}

.great-skill-color {
    background: #04b608;
    border: .6rem dashed #07860b;
}

.good-skill-color {
    background: #2f61e0;
    border: .6rem dashed #1943e5;
}

.fail-skill-color {
    background: #f60f0f;
    border: .6rem dashed #c50026;
}

.over-rate-background {
    border-radius: 50%;
    position: absolute;
    /* bottom: 0; */
    opacity: 0.65;
    top: 0px;
    left: 0px;
    height: 8rem;
    width: 8rem;
}

.great-skill-rate-icon {
    position: relative;
}

.skill-rate-score {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: black;
    border-radius: 50px;
    padding: .1em .2em;
    color: #fff;
    font-size: 2rem;

}

.rate-normal-skillchecks, .rate-ds-skillchecks {
    display: grid;
    grid-template-columns: repeat(3, 8rem);
    grid-gap: 2rem;
    justify-content: center;
    text-align: center;
}

.rate-ds-skillchecks{
    grid-template-columns: repeat(2, 8rem);
    justify-content: center;
}

.rate-skill-title {
    margin-bottom: 1rem;
}

.rate-score {
    margin-top: 1rem;
}


.rate-score,
.rate-skill-title {
    font-size: 2rem;
    color: var(--general-stats-color);
    font-weight: 100;
}

.rate-normal-skillchecks, .rate-ds-skillchecks {
    padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
