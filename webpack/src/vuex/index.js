require('es6-promise').polyfill();
import Vue from 'vue'
import Vuex from 'vuex'
import family from './modules/family'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const Store =  new Vuex.Store({
  actions,
  getters,
  modules: {
    family
  },
  strict: debug,
})

export default Store;