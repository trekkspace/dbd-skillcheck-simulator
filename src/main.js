import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import router from './router'
import VueTilt from 'vue-tilt.js'
// import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Vue.use(VueAnalytics, {
//   id: 'UA-135609415-1',
//   router
// })

Vue.use(VueTilt)


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
