import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SERVER_ADDRESS: 'http://localhost:8080',
    user: undefined,
    groups: [],
  },

  mutations: {
    setGroups(state, groups) {
      state.groups = groups;
    },

    updateGroupMembers(state, groupId, members) {
      state.groups.find(g => g._id === groupId).members = members;
    }
  },

  actions: {
    async fetchGroups(context) {
      const endpoint = context.state.SERVER_ADDRESS + '/api/groups'
      let { data: groups } = await axios.get(endpoint, {
        withCredentials: true,
      })
      context.commit('setGroups', groups);
    },

  }
})
