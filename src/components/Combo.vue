<template>
    <div ref="combo-element" style="opacity: 0;" class="combo-stats-position">
            <p class="combo-text">Combo</p>
            <div id='id1' class="combo-status">
                <img src="@/assets/icons/buff_combo.png" alt="">
                <h2 class="combo-status-score">{{ row }}</h2>
            </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
    name: "Combo",

    computed: {
        row(){
            return this.$store.state.playerStats.stats.rowScore
        }
    },
    methods: {
        comboAnimation(){
            anime.timeline({
                targets: this.$refs['combo-element'],
                delay: function(el, i) { return i * 500 },
                duration: 1000,
                easing: 'easeOutExpo',
                direction: 'alternate',
                autoplay: true,
                loop: false
            })
            .add({
                top: ['-5%', '5%'],
                opacity: [0, 1],
                // override the easing parameter
                easing: 'spring',
            })
            .add({
                opacity: 0,
                top: ['5%', '10%']
            })
        }
    },
    watch: {
        row(){
            if (this.row !== 0) {
                this.comboAnimation()
            }
        }
    }
    
}
</script>

<style>
/* combo */

.combo-text{
    margin-bottom: 1rem;
    font-size: 1.6rem;
}

.combo-stats-position{
    position: absolute;
    top: -5%;
    left: 50%;
    transform: translateX(-50%);

    /* display: flex;
    flex-direction: column; */
    text-align: center;
}

.combo-status{
    position: relative;
    height: 8rem;
    width: 8rem;
}

.combo-status img{
    height: 8rem;
    width: 8rem;
}

.combo-status-score{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}
</style>
