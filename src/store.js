import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function findGroup(state, groupId) {
  // there is no access to getters in mutations
  return state.groups.find(g => g._id === groupId)
}


const userChangeableAttrs = ['username', 'email'],
  groupChangeableAttrs = ['name'];

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

    deleteGroup(state, group) {
      let targetIndex = state.groups.findIndex(g => g._id = group._id);
      state.groups.splice(targetIndex, 1);
    },

    patchGroup(state, group) {
      let targetGroup = findGroup(state, group._id);
      groupChangeableAttrs.forEach(attr => {
        if (group[attr] !== undefined) targetGroup[attr] = group[attr];
      })
    },

    setGroups(state, groups) {
      state.groups = groups;
    },

    updateGroup(state, group) {
      let targetGroup = findGroup(state, group._id);
      console.assert(targetGroup, 'group is missing');
      targetGroup.name = group.name;
      targetGroup.users = group.users || [];
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
        if (user[att] !== undefined) {
          targetUser[att] = user[att];
        }
      })
    },

    deleteGroupUser(state, user) {
      let group = findGroup(state, user.groupId);
      let targetIndex = group.users.findIndex(u => u._id = user._id);
      group.users.splice(targetIndex, 1);
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
    },

    getUsers(state, getters) {
      return groupId => {
        console.log('getting users for', groupId);
        return getters.getGroupById(groupId).users;
      }
    },
  },

  actions: {
    // WARN probably shouldn't use the return values from actions as they are not a reference  to the store
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
      let existingGroup = findGroup(context.state, groupId);
      if (existingGroup) {
        context.commit('updateGroup', group);
      } else {
        context.commit('addGroup', group);
      }
      return group;
    },

    async fetchUsers(context, groupId) { // gets group details
      if (!groupId || groupId.length !== 24) throw new Error('invalid group id', groupId);
      console.log('fetching users', groupId);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${groupId}/members`
      let { data: users } = await axios.get(endpoint, {
        withCredentials: true,
      })
      let targetGroup = context.getters.getGroupById(groupId);
      console.assert(targetGroup.name, 'invalid group');
      context.commit('setGroupUsers', {groupId, users});
      return users;
    },

    async createUser(context, user) {
      console.log(`creating user ${user.username}`);
      if (!user || !user.username || !user.groupId || !user.email || !user.password) throw new Error(`missing user data, ${user.username}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${user.groupId}/members`
      let response = await axios.post(endpoint, user, {
        withCredentials: true
      })
      context.commit('addGroupUser', {groupId: user.groupId, user});
      return response.data;
    },

    async updateUser(context, user) {
      console.log(`updating user ${user.username}`);
      if (!user || !user.username || !user.email) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${user.groupId}/members/${user._id}`;
      let response = await axios.patch(endpoint, user, {
        withCredentials: true
      })
      context.commit('patchGroupUser', user);
      return response.data;
    },

    async deleteUser(context, user) {
      console.log(`deleting user ${user.username}`);
      if (!user || !user.username || !user.email) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${user.groupId}/members/${user._id}`;
      let response = await axios.delete(endpoint, {
        withCredentials: true
      })
      context.commit('deleteGroupUser', user);
      return response.data;
    },

    async updateGroup(context, group) {
      console.log(`updating group ${group.name}`);
      if (!group || !group.name) throw new Error(`missing group data, ${group}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/groups/${group._id}`;
      let response = await axios.patch(endpoint, group, {
        withCredentials: true
      })
      context.commit('patchGroup', group);
      return response.data;
    },

    async deleteGroup(context, group) {
      console.log('deleting group', group.name);
      const endpoint = context.state.SERVER_ADDRESS + '/api/groups/' + group._id;
      let { data: resp } = await axios.delete(endpoint, {
        withCredentials: true
      })
      context.commit('deleteGroup', group);
      return resp;
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
