import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward'
}

const getters = {}

const actions = {}

const mutations = {
  UPDATE_LOADING (state, status) {
    state.isLoading = status
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
