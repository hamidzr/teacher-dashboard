import axios from 'axios'

// custom routes endpoint
const BASE_ENDPOINT = '/api/roboscape/robots';

// service endpoint
const SERVICE_ENDPOINT = '/rpc//RoboScape';


const findRobot = (state, robotId) => {
  // there is no access to getters in mutations
  return state.robots.find(r => r.robotId === robotId)
};

const robotChangeableAttrs = ['isPublic', 'users'];

export default {
  state: {
    robots: [],
    liveRobots: [], // mostly alive, 2min timeout
  },

  mutations: {
    setRobots(state, robots) {
      state.robots = robots;
    },

    addRobot(state, robot) {
      if (!findRobot(state, robot.robotId)) {
        state.robots.push(robot);
      } else {
        console.error('refused to add duplicate robot');
      }
    },

    setAliveRobots(state, robots) {
      state.liveRobots = robots;
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

  // TODO actions shouldn't return anything ( all goes through the state)
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

    // adds or updates the robot
    ensureRobot(context, robot) {
      if (!findRobot(context.state, robot.robotId)) {
        context.commit('addRobot', robot);
      } else {
        context.commit('updateRobot', robot);
      }
    },

    // updates the user access to robot creating an entry if needed
    // user should have a username and a hasAccess field
    // ensures that user has the requested access
    async updateUserAccess(context, payload) {
      let { robotMongoId, user } = payload;
      if (typeof user.hasAccess === 'string') {
        user.hasAccess = user.hasAccess === 'true' ?  true : false;
      }
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + `/${robotMongoId}/users`;
      let { data: robot } = await axios.put(endpoint, user, {
        withCredentials: true
      })
      context.dispatch('ensureRobot', robot);
      return robot;
    },

    async updateRobot(context, robot) {
      if (!robot || !robot.robotId) throw new Error('missing robot data');
      const endpoint = context.state.SERVER_ADDRESS + BASE_ENDPOINT + `/${robot._id}`;
      let response = await axios.patch(endpoint,
        { // data / body
          isPublic: robot.isPublic,
          users: robot.users,
        },
        {
          withCredentials: true
        })
      context.commit('updateRobot', robot);
      return response.data;
    },

    async fetchAliveRobots(context) {
      // FIXME can't fetch protected robots since caller isn't ever set for this client
      const clientId = navigator.userAgent.replace(/ /g, '_');
      const endpoint = context.state.SERVER_ADDRESS + SERVICE_ENDPOINT + `/getRobots?uuid=${clientId}&projectId=NB_DASHBOARD`;
      let {data} = await axios.post(endpoint,
        {
          withCredentials: true
        })
      context.commit('setAliveRobots', data);
      return data;
    }

  },
}
