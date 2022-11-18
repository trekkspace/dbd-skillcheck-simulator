<template>
    <div>
        <h1 class="s-title">About</h1>
        <hr>
        <p class="s-about">
            Dead by Daylight Skillcheck Simulator.
        </p>

        <p class="s-about">
            This project is made and maintained by <a class="creator" href="https://steamcommunity.com/id/tomb-tomb-virus/">wølf.py</a>.</p>
        <p>
            &copy;2020-2022.
        </p>
        <!-- <p class="s-about">
            Killer perks that can be tested here. You can select TRAINING mode
            in order to activate or dezactivate the following perks. Or you
            can leave it to NORMAL mode, and the perks will randomly be
            selected or not.
        </p> -->

        <h1 class="s-title">Perks</h1>
        <hr>

        <p class="s-about">The Killer Perks can be activated/dezactivated using CUSTOM mode from the GAME MODE menu. Selecting CUSTOM mode, will activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby). There are 3 preset modes EASY MEDIUM and HARD</p>

        <h2 class="s-title">Killer Perks</h2>
        <ul class="s-about-list">
            <h3>Hex: Ruin - **Version 2.6.0** *(got nurfed in **Version 3.5.0**)*</h3>
            <ul>
                <li>  - Good Skill Checks result in 3/4/5 % regression on the Generator.</li>
                <li>  - Great Skill Checks grant 0 % bonus progression on the Generator.</li>
            </ul>
            <h3>Hex: Huntress Lullaby</h3>
            <ul>
                <li>1 to 4 Tokens: Time between the Skill Check warning sound and the Skill Check becomes shorter.</li>
                <li>5 Tokens: No Skill Check warning.</li>
            </ul>
            <h3>Unnerving Presence</h3>
            <ul>
                <li>Triggered Skill Checks' success zones are reduced by 40/50/60 %.</li>
            </ul>
            <h3>Oppression</h3>
            <ul>
                <li>A hard Skill Check is made after killer kicks a generator.</li>
            </ul>
        </ul>

        <h2 class="s-title">Survivor perks</h2>
         <ul class="s-about-list">
             <h3>This is not happening</h3>
             <ul>
                 <li>Increase the great area when injured</li>
             </ul>
         </ul>

        <h1 class="s-title">Items</h1>
        <hr>
        <p class="s-about">The Toolbox is an item that can be used to repair generators more quickly. Different Toolboxes have different uses and not all of them are good for both uses. Add-ons can be equipped to enhance their speed and durability. Toolboxes and add-ons can be bought with bloodpoints. You can gain bloodpoins fast by hitting great skillchecks multiple times. You can gain free Bloodpoints by finding the secret :)
        </p>
        
        <h1 class="s-title">Future Updates</h1>
        <hr>
        <ul class="s-about-list">
            <li>Add 'New Brand Tool' (Item)</li>
            <li>Add 'Overcharge' Killer Perk</li>
            <li>Wiggle Skill Check</li>
            <li>Glyph mode</li>
        </ul>
        <h1 @click='gain()' class="s-title">
            Bugs / Update Requests / Feedback
        </h1>
        <hr>
        <ul class="s-about-list">
            <li>You can add me on Steam: <a href="https://steamcommunity.com/id/tomb-tomb-virus/" @click="gain()" class="creator">wølf.py</a></li>
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
    color: aqua;
    cursor: pointer;
}

</style>
