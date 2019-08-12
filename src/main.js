import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store.js'
import '@/plugins/element.js'
import Util from '@/helpers/util.js'
import './plugins/element.js'

Vue.use(Util)
Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: function (h) { return h(App) }
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})