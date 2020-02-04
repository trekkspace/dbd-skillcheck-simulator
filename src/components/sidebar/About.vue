<template>
    <div>
        <h1 class="s-title">About</h1>
        <hr>
        <p class="s-about">
            Dead by Daylight Skillcheck Simulator. Killer perks and items that can
            affect the generator progress can be tested and learned here.
        </p>
        
        <!-- <p class="s-about">
            Killer perks that can be tested here. You can select TRAINING mode
            in order to activate or dezactivate the following perks. Or you
            can leave it to NORMAL mode, and the perks will randomly be
            selected or not.
        </p> -->

        <h1 class="s-title">Perks</h1>
        <hr>

        <p class="s-about">The Killer Perks can be activated/dezactivated using 'Training' mode
            from the 'Game Mode' menu. Selecting 'Training' mode, will
            activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby).
            Each Killer Perk in 'Normal' mode will have 50% changes to activate,
            when starting a generator, then the perks will have 10% changes to activate/dezativate the effect during the game. 
            For 'Decisive Strike' all perks will remain inactive.
        </p>

        <ul class="s-about-list">
            <li>Hex: Ruin</li>
            <li>Hex: Huntress Lullaby</li>
            <li>Unnerving Presence</li>
        </ul>

        <h1 class="s-title">Items</h1>
        <hr>
        <p class="s-about">You can also buy Items(Toolbox/Add-ons). The items have the same effect
            as in Dead By Daylight. You can gain free Bloodpoints by finding the secret :)
        </p>
        
        <h1 class="s-title">Future Updates</h1>
        <hr>
        <ul class="s-about-list">
            <li>Add 'New Brand Tool' (Item)</li>
            <li>Add 'Overcharge' Killer Perk</li>
        </ul>
        <h1 @click='gain()' class="s-title">
            Bugs / Update Requests / Feedback
        </h1>
        <hr>
        <ul class="s-about-list">
            <li>You can add me on discord: <span @click="gain()" class="creator">trekkspace#6914</span></li>
        </ul>
    </div>
</template>

<script>
export default {
            methods: {
                gain(){
                    this.$store.state.playerStats.stats.bloodpoints += 1000
                }
            },
}
</script>

<style>

.s-about{
    font-size: .9vw;
}

.s-about-list{
    margin: 0.4vw 0px;
    font-size: .9vw;
    margin-left: 1vw;
}

.creator{
    cursor: pointer;
}

</style>
