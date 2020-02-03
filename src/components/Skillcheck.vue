<template>
  <div ref="skill-check-element" class="skillcheck">
    <div ref="skill-check" class="skillcheckM">
      <div ref="skill-check-needle" class="skillcheck-center">
        <div class="skillcheck-bar"></div>
      </div>
      <div class="skillcheck-button">{{touch? 'Touch': keyboard[stopNeedleKey]+'/'+ mouse || String.fromCharCode(stopNeedleKey) || 'Unknown' }}</div>
      <canvas ref="skill-check-circle" height="145px" width="145px"></canvas>
    </div>
  </div>
</template>

<script>

  import {initDom} from '@/js/domElements'
  import keyCodes from '@/js/events/keyboard.js'
  import mouseCodes from '@/js/events/mouse.js'

  // import {drawSkillCheck} from '@/js/drawSkillCheck.js'

  export default {
    name: 'Skillcheck',
    computed: {
      stopNeedleKey(){
        return this.$store.state.playerSettings.keyboard.skillCheckKey
      },
      keyboard(){
        return keyCodes
      },
      mouse(){
        return mouseCodes.mouseCodes[this.$store.state.playerSettings.mouse.skillCheckKey]
      },
      touch(){
        let s = ('ontouchstart' in document.documentElement || navigator.maxTouchPoints) 
        return s == 1 || s == true ? true: false
      }
    },  
    mounted() {
      this.$nextTick(() => {
        initDom('skillcheck', this.$refs)
      })
    }
  }
</script>

<style scoped>
  .skillcheck {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    height: var(--circle-height);
    width: var(--circle-width);
    z-index: 0;
    /* opacity: 0; */
  }
  
  .skillcheck-center {
    position: absolute;
    height: var(--circle-height);
    width: var(--circle-width);
    z-index: 1;
  }
  
  .skillcheck-bar {
    position: absolute;
    width: var(--skillcheck-bar-width);
    height: var(--skillcheck-bar-height);
    background: var(--skillcheck-bar-gradient);
    bottom: 60%;
    left: calc(50% - (var(--skillcheck-bar-width) / 2));
  }
  
  .skillcheck-button {
    position: absolute;
    color: var(--skillcheck-button-color);
    border: var(--skillcheck-button-border);
    border-radius: var(--skillcheck-button-borderRadius);
    padding: var(--skillcheck-button-padding);
    top: 50%;
    left: 50%;
    background: rgb(44, 44, 44);
    font-size: 20px;
    transform: translate(-50%, -50%);
  }

  .wiggleSkillCheck{
    animation: shake 1.1s cubic-bezier(.4,.1,.2, 1) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }

  @keyframes shake {
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
        transform: translate3d(1px, 1px, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-1px, -1px, 0);
    }

    5%, 15%, 25%, 35%, 45%, 65%, 75%, 85%, 95%{
        transform: translate3d(-1px, 1px, 0);
    }

    40%, 60% {
        transform: translate3d(1px, -1px, 0);
    }
  }
</style>
