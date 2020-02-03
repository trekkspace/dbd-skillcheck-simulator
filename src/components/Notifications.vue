<template>
    <div class="notification">
        <div ref='notification' class="new-notification">
            <h1>{{ notification }}</h1>
        </div>
    </div>
</template>

<script>

import anime from 'animejs/lib/anime.es.js'

export default {
    computed: {
        notification(){
            return this.$store.state.gameNotifications.notification
        }
    },
    updated(){
        anime.timeline({
            targets: this.$refs['notification'],
            duration: 8000,
            easing: 'easeOutExpo',
            direction: 'alternate',
            autoplay: true,
            loop: false
        })
        .add({
            opacity: [0, 1],
            translateY: [-50, 0],
            // override the easing parameter
            easing: 'spring',
        })
        .add({
            delay: 4000, // hold the message for 4 seconds
            translateY: [0, -50],
            opacity: 0,
        })
    }
}
</script>

<style>
.notification{
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.new-notification{
    opacity: 0;
    background: #FF1654;
    font-size: 1.2rem;
    padding: .4rem 1rem;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}
</style>
