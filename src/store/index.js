import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import country from './country'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    country
  }
})
