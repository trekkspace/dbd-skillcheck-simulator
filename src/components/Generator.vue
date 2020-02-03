<template>
        <div style="opacity: 0;" v-show="showGenerator" ref="border" class="progress-elements">

        <!-- <img class="generator-progress-icon" src="@/assets/icons/on_gen.png" alt=""> -->
            <div class="progress-elemens-position">
                <div ref="repair-message" class="repair-message">Repair</div>
                <div ref="progress-bar" class="progress-bar">
                    <div :style="{ width: generatorStatus + '%' }" :class="[toolboxOn ? 'progress-bar-bonus-left' : 'progress-bar-completed']"></div>
                    <div :style="{ width: (100 - generatorStatus) + '%' }" class="progress-bar-left"></div>
                </div>
                <h4 ref="progress-text" class="get_time">{{ (generatorStatus).toFixed(1) + '%' }}</h4>
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
    width: 15vw;
    display: flex;
    justify-content: center;
    background: #383838;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
    z-index: 2;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
}

.progress-bar{
    height: 2.5rem;
    width: 25rem;
    background: #355284;
    display: flex;
    padding: .4rem;
    border-radius: 2px;
}

.progress-bar-completed{
    background: #EFE81A;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 0%;
}

.progress-bar-left, .progress-bar-bonus-left{
    background: #842CE9;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;        
    width: 100%;
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


