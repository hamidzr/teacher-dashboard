import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function findGroup(state, groupId) {
  // there is no access to getters in mutations
  return state.groups.find(g => g._id === groupId)
}


const userChangeableAttrs = ['username', 'email'];

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

    setGroupUsers(state, payload) {
      const { groupId, users } = payload;
      findGroup(state, groupId).users = users;
    },

    // update a single user
    // payload user should have a groupId
    patchGroupUser(state, user) {
      const { groupId, username } = user;
      let groupUsers = findGroup(state, groupId).users;
      let targetUser = groupUsers.find(u => u.username = username);
      userChangeableAttrs.forEach(att => {
        if (user[att]) {
          targetUser[att] = user[att];
        }
      })
    },

    addGroupUser(state, payload) {
      const { groupId, user } = payload;
      let group = findGroup(state, groupId);
      if (!group.users) group.users = [];
      group.users.push(user);
    },
  },

  getters: {
    getGroupById(state) {
      return groupId => {
        return state.groups.find(g => g._id === groupId)
      }
    },

    getUserByUsername(state, getters) {
      return (groupId, username) => {
        return getters.getGroupById(groupId).users.find(u => u.username === username);
      }
    },

    getUserById(state, getters) {
      return (groupId, userId) => {
        return getters.getGroupById(groupId).users.find(u => u._id === userId);
      }
    }
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
      if (context.getters.getGroupById(groupId)) context.commit('setGroupUsers', {groupId, users});
      return users;
    },

    async createUser(context, payload) {
      const { user, groupId } = payload;
      console.log(`adding user ${user} to ${groupId}`);
      if (!user || !user.username || !user.email || !user.password) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let response = await axios.post(endpoint, user, {
        withCredentials: true
      })
      console.log(context.state.groups);
      context.commit('addGroupUser', {groupId, user});
      return response.data;
    },

    async updateUser(context, user) {
      console.log(`updating user ${user}`);
      if (!user || !user.username || !user.email) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${user.groupId}/members/${user._id}`;
      let response = await axios.put(endpoint, user, {
        withCredentials: true
      })
      context.commit('patchGroupUser', user);
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
