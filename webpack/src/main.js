
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
