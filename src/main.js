import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import router from './router'
// import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Vue.use(VueAnalytics, {
//   id: 'UA-135609415-1',
//   router
// })



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
