import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    num: 0
  },
  mutations: {
    add (state) {
      state.count++
      state.num+=2
    }
  },
  actions: {
    add ({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.count * 4
    },
    doubleNum: state => {
      return state.num * 4
    }
  },
  modules: {
  }
})
