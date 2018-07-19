import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function findGroup(state, groupId) {
  return state.groups.find(g => g._id === groupId)
}

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

    // TODO rename user to user?
    setGroupUsers(state, groupId, users) {
      findGroup(state, groupId).users = users;
    },

    addGroupUser(state, groupId, user) {
      findGroup(state, groupId).users.push(user);
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

    async fetchUsers(context, groupId) { // gets group details
      if (!groupId || groupId.length !== 24) throw new Error('invalid group id', groupId);
      console.log('fetching users', groupId);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let { data: users } = await axios.get(endpoint, {
        withCredentials: true,
      })
      if (findGroup(context.state, groupId)) context.commit('setGroupUsers', groupId, users);
      return users;
    },

    async createUser(context, groupId, user) {
      if (!user.username || user.email || user.password) throw new Error('missing user data', user);
      console.log(`adding user ${user} to ${groupId}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let response = await axios.post(endpoint, user, {
        withCredentials: true
      })
      context.commit('addGroupUser', groupId, user);
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
