<template>
        <div style="opacity: 0;" v-show="showGenerator" ref="border" class="progress-elements">

        <!-- <img class="generator-progress-icon" src="@/assets/icons/on_gen.png" alt=""> -->
            <div ref="repair-message" class="repair-message">Repair Progress > {{ (generatorStatus).toFixed(1) + '%' }}</div>

            <div class="progress-elemens-position">
                <div ref="progress-bar" class="progress-bar">
                    <div :style="{ width: generatorStatus + '%' }" :class="[toolboxOn ? 'progress-bar-bonus-left' : 'progress-bar-completed']"></div>
                </div>
            </div>

        </div>
</template>

<script>
import {initDom} from '@/js/domElements'

export default {
    name: "Generator",
    computed: {
        generatorStatus(){
            const charges = this.$store.state.gameStatus.now.charges
            return (charges / 80) * 100
        },
        showGenerator(){
            return this.$store.state.gameEvents.events.generator
        },
        toolboxOn(){
            return this.$store.state.gameStatus.item
        }
    },
    mounted(){
        this.$nextTick(() => {
            initDom('generator', this.$refs)
        })
    }
}
</script>

<style scoped>
/* progress bar */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform : translateX(-20px);

}

.time-buttons{
    margin-left: 2rem;
}

.time-buttons button{
    position: absolute;
}

.progress-elements{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* background: #383838; */
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
    z-index: 2;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
}

.progress-elemens-position{
    /* width: 15vw; */
    padding: .8vw .25vw;
    text-align: center;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);

    background: rgba(27, 27, 27, 0.33);
    background-size: cover;
    background-blend-mode: multiply;
    width: 25vw;
    border-radius: 4px;
}

.progress-bar{
    height: 1.3rem;
    width: 40rem;
    background-color: #525252;
    display: flex;
    padding: .3rem;
    border-radius: 4px;
    background-image: url("../assets/backgrounds/asfalt-dark.png");
    margin: 0 auto;
}

.progress-bar-completed{
    background-color: #ababab;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 0%;
    background-image: url("../assets/backgrounds/asfalt-dark.png");

}

.progress-bar-bonus-left{
    background: #72fa76 !important;
}

/* // */

.progress-elements{
    display: flex;
    align-items: flex-end;
    grid-auto-flow: column;
}

.repair-message{
    font-size: 2rem;
    margin-bottom: 1rem;
    width: 25vw;
    padding: .1vw 0;
    border-radius: 2px;
    text-align: center;

    background: var(--texture-one) center center var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;
}

.generator-progress-icon{
    height: 8rem;
    width: auto;
}

.get_time{
    font-size: 1.8rem;
    padding: .6rem 0px;
    margin-left: .2rem;
}



</style>


