<template>
    <div v-show="rank.showRank" class="rank-show-status">
        <div style="opacity: 0;" ref="rank-points" class="rank-points">
            <h2>{{ checkPipLevel }}</h2>
        </div>
        <div style="opacity: 0;" ref="rank-status" class="rank-status">
            <div class="rank-bar">
                <div style="width:0%;" ref="rank-progress" class="rank-progress"></div>
                <div ref="pip1" class="pip1"></div>
                <div ref="pip2" class="pip2"></div>
                <div ref="pip3" class="pip3"></div>
            </div>
        </div>
        <div v-show="rank.buttonArea.showButton" style="opacity: 0;" ref="rank-next" class="rank-next">
            <button :disabled='rank.buttonArea.disableButton' @click='continueBtn'  class="resumeBtn2">Continue</button>
        </div>
    </div>
</template>

<script>

import {initDom} from '@/js/domElements'
import {reverseOpacity} from '@/js/rank.js'

export default {
    computed:{
        rank(){
            return this.$store.state.gameStatus.rank
        },

        checkPipLevel(){
            const m = 'Rank Point'
            switch (this.rank.pipLevel){
                case 'unknown':
                    return m
                case 0:
                    return `- 2 ${m}s`
                case 1:
                    return 'Safe Pip\'d'
                case 2:
                    return `+ 1 ${m}`
                case 3:
                    return `+ 2 ${m}s`
                default:
                    return ''
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            initDom('rank', this.$refs)
        })
    },
    methods: {
        continueBtn(){
            this.$store.state.gameStatus.now.generatorsLeft = 2
            reverseOpacity()
        }
    }
}
</script>

<style>
.rank-show-status{
    opacity: .5;
    position: absolute;
    top: 45%;
    left: 50%;
}

.rank-status, .rank-next, .rank-points{
    width: 25vw;
    transform: translateX(-50%);
    background: #383838;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
}

.rank-status{
    height: 7vw;
}

.rank-bar{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 25%;
    width: 90%;
    background: #707070;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
}

.pip1, .pip2, .pip3{
    border-radius: 2px; 
    position: absolute;
    transform-origin: top;
    top: -50%;
    left: 25%;
    background: #D9D9D9;
    height: 200%;
    transform: translateX(-50%);
    width: 1.5vw;
}

.green-pip{
    background: #00FF3B;
}

.pip2{
    left: 50%;
}

.pip3{
    left: 75%;
}

.rank-progress{
    border-radius: 2px;
    /* position: absolute; */
    background: #F75959;
    height: 100%;
}

/* rank points */

.rank-points{
    margin-bottom: 1rem;
    padding: 1rem 0;
    font-size: 1rem;
    text-align: center;
}

/* buttons */

.rank-next{
    margin-top: 1rem;
    display: flex;
    height: 5rem;
    align-content: center;
    justify-content: center;
    padding: 1rem 0;
}

.resumeBtn2{
    background: #EFE81A;
    /* z-index: 3; */
    /* color: #fff; */

}

</style>
