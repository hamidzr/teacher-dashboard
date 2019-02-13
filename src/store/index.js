import Vue from 'vue'
import Vuex from 'vuex'
import sandboxStore from '@/store/sandbox';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SERVER_ADDRESS: 'https://editor2.vandycloud.tk',
    user: undefined,
    ...sandboxStore.state,
  },

  mutations: {
    ...sandboxStore.mutations,
  },

  getters: {
    ...sandboxStore.getters,
  },

  actions: {
    ...sandboxStore.actions,
  }
})

// TODO fetchRobots and updateRobot
