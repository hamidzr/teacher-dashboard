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
    addGroup(state, group) {
      state.groups.push(group);
    },

    setGroups(state, groups) {
      state.groups = groups;
    },

    // TODO rename member to user?
    setGroupMembers(state, groupId, members) {
      state.groups.find(g => g._id === groupId).members = members;
    },

    addGroupMember(state, groupId, member) {
      state.groups.find(g => g._id === groupId).members.push(member);
    },
  },

  actions: {
    async fetchGroups(context) {
      const endpoint = context.state.SERVER_ADDRESS + '/api/groups'
      let { data: groups } = await axios.get(endpoint, {
        withCredentials: true,
      })
      context.commit('setGroups', groups);
      return groups;
    },

    async fetchGroup(context, groupId) {
      const endpoint = context.state.SERVER_ADDRESS + '/api/groups/' + groupId
      let { data: group } = await axios.get(endpoint, {
        withCredentials: true,
      })
      context.commit('addGroup', group);
      return group;
    },

    async fetchMembers(context, groupId) { // gets group details
      if (!groupId || groupId.length !== 24) throw new Error('invalid group id', groupId);
      console.log('fetching members', groupId);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let { data: members } = await axios.get(endpoint, {
        withCredentials: true,
      })
      if (context.state.groups.find(g => g._id === groupId)) context.commit('setGroupMembers', groupId, members);
      return members;
    },

    async addMember(context, groupId, user) {
      // TODO validate user
      console.log(`adding member ${user} to ${groupId}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let response = await axios.post(endpoint, user, {
        withCredentials: true
      })
      context.commit('addGroupMember', groupId, user);
      return response.data;
    },

    async createGroup(context, name) {
      console.log('creating group', name);
      const endpoint = context.state.SERVER_ADDRESS + '/api/groups'
      let { data: group } = await axios.post(endpoint, {name: name}, {
        withCredentials: true
      })
      context.commit('addGroup', group);
      return group;
    },

  }
})
