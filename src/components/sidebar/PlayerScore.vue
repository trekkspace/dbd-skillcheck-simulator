<template>
    <div class="player_score">
        <h1 class="s-title">Stats</h1>
        <hr>
        <div class="s-template" v-for="(value, key, index) in show_player_score.stats" :key="index+key">
            <h2 class="s-left player-score-name s-text">{{key.split(/(?=[A-Z])/).join(' ').toUpperCase().split('SCORE').join(' ')}}</h2>
            <span class="border-line"></span>
            <h2 class="s-right player_score_points">{{value}}</h2>
        </div>
    </div>
</template>

<script>

export default {
    computed:{

        show_player_score(){
            return this.$store.state.playerStats
        }
    }

    
}
</script>

<style scoped>


.player_score_points{
    color: #EFE81A;
}


.player-score-name{
    border-radius: 2px;
    padding: 0.4rem 0.4rem;
    background: #72fa76;
    color: #2A812D;
    border: 2px solid #28f82e;
}


</style>
