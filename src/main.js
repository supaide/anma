import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

store.commit(store.types.CONFIG_INIT, {bgWidth: 1920, bgHeight: 1080})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
