import axios from 'axios'

const BASE_ENDPOINT = '/api/roboscape/robots';

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

    addRobot(state, robot) {
      if (!findRobot(state, robot.robotId)) {
        state.robots.push(robot);
      } else {
        console.log('refused to add duplicate robot');
      }
    },

    updateRobot(state, robot) {
      let targetRobot = findRobot(state, robot.robotId);
      console.assert(targetRobot, 'robot is missing');
      robotChangeableAttrs.forEach(att => {
        if (robot[att] !== undefined) {
          targetRobot[att] = robot[att];
        }
      })
      targetRobot.users = robot.users || [];
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

    addRobotUser(state, user) {
      let robot = findRobot(state, user.robotId);
      if (!robot.users) robot.users = [];
      robot.users.push(user);
    },

    deleteRobotUser(state, user) {
      console.debug(`deleting ${user.username}`);
      let robot = findRobot(state, user.robotId);
      let targetIndex = robot.users.findIndex(u => u._id === user._id);
      robot.users.splice(targetIndex, 1);
    },

  },

  getters: {
    getRobotById(state) {
      return robotId => {
        return state.robots.find(r => r.robotId === robotId);
      }
    },

    getRobotByMongoId(state) {
      return mongoId => {
        return state.robots.find(r => r._id === mongoId);
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
    async fetchRobots(context) {
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT;
      let { data: robots } = await axios.get(endpoint, {
        withCredentials: true,
      })
      context.commit('setRobots', robots);
      return robots;
    },

    async fetchRobot(context, mongoId) {
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + '/' + mongoId;
      let { data: robot } = await axios.get(endpoint, {
        withCredentials: true,
      })
      let existingRobot = findRobot(context.state, robot.robotId);
      if (existingRobot) {
        context.commit('updateRobot', robot);
      } else {
        context.commit('addRobot', robot);
      }
      return robot;
    },

    async addUser(context, user) {
      console.debug(`creating user ${user.username}`);
      if (!user || !user.username || !user.robotId || !user.email || !user.password) throw new Error(`missing user data, ${user.username}`);
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + `/${user.robotId}/members`
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
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + `/${user.robotId}/members/${user._id}`;
      let response = await axios.patch(endpoint, user, {
        withCredentials: true
      })
      context.commit('patchRobotUser', user);
      return response.data;
    },

    async updateRobot(context, robot) {
      console.log(`updating robot ${robot.name}`);
      if (!robot || !robot.name) throw new Error(`missing robot data, ${robot}}`);
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + `/${robot._id}`;
      let response = await axios.patch(endpoint, robot, {
        withCredentials: true
      })
      context.commit('patchRobot', robot);
      return response.data;
    },

  },
}
