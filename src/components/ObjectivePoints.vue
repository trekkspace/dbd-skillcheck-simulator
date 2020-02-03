<template>
<div class="objectivePointsPosition">
  <div class="sm">
    <div :ref="'animation'+index" :class="'animation' + index" :key="index" v-for="(a, index) in objectivePointsList">

      <div class="objective_stats">
        <img class="objective_img" src="@/assets/icons/target.png">
        <div>
            <p class="objective_font">{{ a.objective }}</p>
            <p class="objective_font">{{ a.points }}</p>
        </div>
      </div>

    </div>
  </div>

  </div>
</template>

<script>

import * as ffs from '../js/library/math.js'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: "ObjectivePoints",
  data(){
    return{
      arr: this.$store.state.gameNotifications.objectivePoints,
      removeArrayAt: 0,
      objective_points_showing: false,
      show_objective_points_score: false
    }
  },
  computed: {
    objectivePointsList(){
      return this.arr
    }
  },
  watch: {
    async arr(){

        if (this.arr.length > 0) {

          if (this.objective_points_showing) {
            this.show_objective_points_score = true
          }

          for (; 3000 > this.removeArrayAt;) {
            if (this.show_objective_points_score) {
              this.removeArrayAt = 0
              this.show_objective_points_score = false
              return
            }

            
            this.objective_points_showing = true
            this.removeArrayAt += 10
            await ffs.delay(10)
          }

          this.$store.commit('removeObjectivePoints')

          this.arr = this.$store.state.gameNotifications.objectivePoints

          this.objective_points_showing = false
          this.show_objective_points_score = false
          this.removeArrayAt = 0
        }
    }
  },

  updated(){
    // animation for points
    anime.timeline({
      loop: false,
      autoplay: true,
    })
    .add({
      targets: this.$refs['animation0'],
      opacity: [0, 1],
      translateY: [0, 20],
    }, 0)
    .add({
      targets: this.$refs['animation1'],
      translateY: [0, 20],
      scale: [1, .8],
    }, 0)
    .add({
      targets: this.$refs['animation2'],
      easing: 'easeInOutQuad',
      duration: 300,
      opacity: [1, 0],
      scale: [.8, .8],
      translateY: [0, 40],
    }, 0)
  }
}
</script>

<style>
    .objectivePointsPosition{
        z-index: 2;
        position: absolute;
        top: 40%;
    }

    .sm{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .sm div{
      width: fit-content;
    }

    .animation1, .animation2{
      margin-left: .6rem;
    }

    .animation0, .animation1, .animation2{
      transform-origin: left;
    }

    .objective_img{
      height: 6rem;
      width: auto;
    }

    .objective_stats{
      display: flex;
      align-items: center;
    }

    .objective_font{
      font-size: 1.6rem;
    }
</style>
