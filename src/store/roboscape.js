import axios from 'axios'

const findRobot = (state, robotId) => {
  // there is no access to getters in mutations
  return state.robots.find(r => r.robotId === robotId)
};

const userChangeableAttrs = ['hasAccess'],
  robotChangeableAttrs = ['isPublic', 'users'];

export default {
  state: {
    robots: [],
  },

  mutations: {
    setRobots(state, robots) {
      state.robots = robots;
    },

    updateRobot(state, robot) {
      let targetRobot = findRobot(state, robot._id);
      console.assert(targetRobot, 'robot is missing');
      targetRobot.name = robot.name;
      targetRobot.users = robot.users || [];
    },

    setRobotUsers(state, payload) {
      const { robotId, users } = payload;
      findRobot(state, robotId).users = users;
    },

    // update a single user
    // payload user should have a robotId
    patchRobotUser(state, user) {
      const { robotId, username } = user;
      let robotUsers = findRobot(state, robotId).users;
      let targetUser = robotUsers.find(u => u.username = username);
      userChangeableAttrs.forEach(att => {
        if (user[att] !== undefined) {
          targetUser[att] = user[att];
        }
      })
    },

    deleteRobotUser(state, user) {
      console.debug(`deleting ${user.username}`);
      let robot = findRobot(state, user.robotId);
      let targetIndex = robot.users.findIndex(u => u._id === user._id);
      robot.users.splice(targetIndex, 1);
    },

    addRobotUser(state, user) {
      let robot = findRobot(state, user.robotId);
      if (!robot.users) robot.users = [];
      robot.users.push(user);
    },

  },

  getters: {
    getRobotById(state) {
      return robotId => {
        return state.robots.find(g => g._id === robotId)
      }
    },

    getUserByUsername(state, getters) {
      return (robotId, username) => {
        return getters.getRobotById(robotId).users.find(u => u.username === username);
      }
    },

    getUserById(state, getters) {
      return (robotId, userId) => {
        return getters.getRobotById(robotId).users.find(u => u._id === userId);
      }
    },

    getUsers(state, getters) {
      return robotId => {
        console.log('getting users for', robotId);
        return getters.getRobotById(robotId).users;
      }
    },

  },

  actions: {
    // WARN probably shouldn't use the return values from actions as they are not a reference  to the store
    async fetchRobots(context) {
      const endpoint = context.state.SERVER_ADDRESS + '/api/robots'
      let { data: robots } = await axios.get(endpoint, {
        withCredentials: true,
      })
      context.commit('setRobots', robots);
      return robots;
    },

    async fetchRobot(context, robotId) {
      const endpoint = context.state.SERVER_ADDRESS + '/api/robots/' + robotId
      let { data: robot } = await axios.get(endpoint, {
        withCredentials: true,
      })
      let existingRobot = findRobot(context.state, robotId);
      if (existingRobot) {
        context.commit('updateRobot', robot);
      } else {
        context.commit('addRobot', robot);
      }
      return robot;
    },

    async fetchUsers(context, robotId) { // gets robot details
      if (!robotId || robotId.length !== 24) throw new Error('invalid robot id', robotId);
      console.log('fetching users', robotId);
      const endpoint = context.state.SERVER_ADDRESS + `/api/robots/${robotId}/members`
      let { data: users } = await axios.get(endpoint, {
        withCredentials: true,
      })
      let targetRobot = context.getters.getRobotById(robotId);
      console.assert(targetRobot.name, 'invalid robot');
      context.commit('setRobotUsers', {robotId, users});
      return users;
    },

    async createUser(context, user) {
      console.debug(`creating user ${user.username}`);
      if (!user || !user.username || !user.robotId || !user.email || !user.password) throw new Error(`missing user data, ${user.username}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/robots/${user.robotId}/members`
      let response = await axios.post(endpoint, user, {
        withCredentials: true
      })
      let createdUser = response.data;
      console.debug(`created user ${createdUser}`);
      console.assert(createdUser._id !== undefined, 'malformed user response');
      console.assert(createdUser.robotId !== undefined, 'malformed user response');
      console.assert(createdUser.username === user.username, 'malformed user response');
      context.commit('addRobotUser', createdUser);
      return createdUser;
    },

    async updateUser(context, user) {
      console.log(`updating user ${user.username}`);
      if (!user || !user.username || !user.email) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/robots/${user.robotId}/members/${user._id}`;
      let response = await axios.patch(endpoint, user, {
        withCredentials: true
      })
      context.commit('patchRobotUser', user);
      return response.data;
    },

    async deleteUser(context, user) {
      console.log(`deleting user ${user.username}`);
      if (!user || !user.username || !user.email) throw new Error(`missing user data, ${user}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/robots/${user.robotId}/members/${user._id}`;
      let response = await axios.delete(endpoint, {
        withCredentials: true
      })
      context.commit('deleteRobotUser', user);
      return response.data;
    },

    async updateRobot(context, robot) {
      console.log(`updating robot ${robot.name}`);
      if (!robot || !robot.name) throw new Error(`missing robot data, ${robot}}`);
      const endpoint = context.state.SERVER_ADDRESS + `/api/robots/${robot._id}`;
      let response = await axios.patch(endpoint, robot, {
        withCredentials: true
      })
      context.commit('patchRobot', robot);
      return response.data;
    },

    async deleteRobot(context, robot) {
      console.log('deleting robot', robot.name);
      const endpoint = context.state.SERVER_ADDRESS + '/api/robots/' + robot._id;
      let { data: resp } = await axios.delete(endpoint, {
        withCredentials: true
      })
      context.commit('deleteRobot', robot);
      return resp;
    },

  },
}
