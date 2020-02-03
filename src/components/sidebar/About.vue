<template>
    <div>
        <h1 class="s-title">About</h1>
        <hr>
        <p class="s-about">
            Skill Check Simulator for the original game Dead By Daylight.
            Currently there are 3/4 Killer Perks added in the game that can affect a generator.
        </p>

        <ul class="s-about-list">
            <li>Hex: Ruin</li>
            <li>Hex: Huntress Lullaby</li>
            <li>Unnerving Presence</li>
        </ul>

        <p class="s-about">The Killer Perks can be activated/dezactivated using 'Training' mode
            from the 'Game Mode' menu. Selecting 'Training' mode, will
            activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby).
            Each Killer Perk in 'Normal' mode will have 50% changes to activate,
            when starting a generator, then the perks will have 10% changes to activate/dezativate the effect during the game. 
            For 'Decisive Strike' all perks will remain inactive.
        </p>

        <h1 class="s-title">Items</h1>
        <hr>
        <p class="s-about">You can also buy Items(Toolbox/Add-ons). The items have the same effect
            as in the original game Dead By Daylight. All items will remain free
            until 'Local Storage' will be added.
        </p>
        
        <h1 class="s-title">Future Updates</h1>
        <hr>
        <ul class="s-about-list">
            <li>Add 'New Brand Tool' (Item)</li>
            <li>Add 'Overcharge' Killer Perk</li>
        </ul>
        <h1 class="s-title">
            Bugs / Update Requests
        </h1>
        <hr>
        <ul class="s-about-list">
            <li>Discord: trekkspace#6914</li>
        </ul>
        <h1 class="s-title">Feedback</h1>
        <hr>
        <p class="s-about">Feedback will help me understand what is good or wrong with this 
            simulator. So if you have something to say don't hesitate to 
            contact me :) Thanks!
        </p>
        <ul class="s-about-list">
            <li>Discord: trekkspace#6914</li>
        </ul>
    </div>
</template>

<script>
export default {

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

</style>
