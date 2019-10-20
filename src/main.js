import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router.js'
import store from './store.js'
import '@/plugins/element.js'
import Util from '@/helpers/util.js'
import ElementUI from 'element-ui'

Vue.use(Util)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })