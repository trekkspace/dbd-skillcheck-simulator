<template>
    <div>
        <h2 class="s-title">Killer Perk Effects</h2>
        <hr>
        <div class="killer-perks-showcase">
            <div @click='changeKillerPerk(perk)' class="killer-perk-box" v-for="(value, perk, index) in killerPerks" :key='index'>
                <img class="training-killer-perks" :src="require(`@/assets/perks/killer/${value.icon}.png`)" alt="">
                <h2>{{ value.active ? 'ON': 'OFF' }}</h2>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        killerPerks(){
            return this.$store.state.gameStatus.killerPerks
        }
    },
    methods:{
        changeKillerPerk(perk){
            this.$store.state.gameStatus.killerPerks[perk].active = !this.$store.state.gameStatus.killerPerks[perk].active
        }
    }
}
</script>

<style>

.training-killer-perks{
    width: 4vw;
    height: 4vw;
}

.killer-perks-showcase{
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;
    text-align: center;
}

.killer-perk-box{
    background: #1B1B1B;
    cursor: pointer;
}

hr{
    margin-bottom: 1rem !important;
}

</style>
