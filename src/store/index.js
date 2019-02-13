import Vue from 'vue'
import Vuex from 'vuex'
import sandboxStore from '@/store/sandbox';
import roboscapeStore from '@/store/roboscape';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SERVER_ADDRESS: 'https://editor2.vandycloud.tk',
    user: undefined,
    ...sandboxStore.state,
    ...roboscapeStore.state,
  },

  mutations: {
    ...sandboxStore.mutations,
    ...roboscapeStore.mutations,
  },

  getters: {
    ...sandboxStore.getters,
    ...roboscapeStore.getters,
  },

  actions: {
    ...sandboxStore.actions,
    ...roboscapeStore.actions,
  }
})

// TODO fetchRobots and updateRobot
