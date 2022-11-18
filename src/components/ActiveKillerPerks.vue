<template>
    <div :class="[gameOn.generatorStarted == true ? 'active-killer-perks': 'active-killer-perks gone-killer-perks']">
        <div v-for="(value, key, index) in killerPerks" :key='index' >
            <div v-if="value.active == true">

                <div  style="position: relative;">
                    <img class="killer-perks-icon" :src="require(`@/assets/perks/killer/${value.icon}.png`)" alt="">
                    <h2 class="killer-perks-tokens">{{ value.currentTokens }}</h2>
                </div>
                <div class="killer-perk-tier">{{ value.tier == 'tier3'? 'III' : value.tier == 'tier2'? 'II' : 'I' }}</div>
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
        gameOn(){
            return this.$store.state.gameStatus.now
        }
    }
}
</script>

<style>

.active-killer-perks{
    transition: 800ms;
    position: absolute;
    right: 2%;
    bottom: 2%;
    background: rgba(56, 56, 56, .5);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-auto-flow: column;


    background: var(--texture-one) center center var(--font-color-one);
    background-size: cover;
    background-blend-mode: multiply;
}

.killer-perks-tokens{
    position: absolute;
    bottom: 20%;
    left: 5%;
}

.killer-perks-icon{
    /* position: relative; */
    height: 10rem;
    width: 10rem;
}

.killer-perk-tier{
    margin-top: -1rem;
    font-size: 2rem;
    text-align: center;
}

.gone-killer-perks{
    opacity: 0;
}

</style>
