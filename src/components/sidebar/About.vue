<template>
    <div class="content" v-html="contentHtml">
      <h2>DBD Skill Check Simulator</h2>

    </div>
</template>

<script>
import {marked} from 'marked';
export default {
  data() {
    return {
      contentHtml:  "Loading...",
    };
  },
  mounted() {
    var t = this;
    (async function (){
      fetch("https://raw.githubusercontent.com/lucafont2/dbd-skillcheck-simulator/master/README.md").then(async (data)=>{
        t.contentHtml = marked(await data.text());
      }).catch(console.log);
    })();
  }
}
</script>

<style>

.content {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
  margin-top: 60px;
  font-size: 1.3rem;

}
.content li {
  margin: .3rem 1rem;
}
.content h2 {
  margin:  1rem .3rem;
  text-align: center;
}
.content h1 {
  margin:  1rem .3rem;
  text-align: center;
}

</style>
