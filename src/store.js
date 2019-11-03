import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/assets/moudles/auth'
import blog from '@/assets/moudles/blog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    blog
  }
})
