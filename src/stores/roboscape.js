import { writable, get } from 'svelte/store';
import { loggedIn } from './loggedIn';

const robots = writable(
    []
);


/**
 * Request a fresh version of the user's groups
 */
const refreshRobots = async () => {
    if(get(loggedIn)){
        robots.set(await (await fetch(process.env.SERVER + '/api/roboscape/robots', { credentials: 'include' })).json());
    }
};

/**
 * Request a fresh version of a robot's information
 */
const getRobot = async (id) => {
    if(get(loggedIn)){
        await refreshRobots();
        return get(robots).find(robot => robot._id == id);
    }
};

/**
 * Update a robot's information on the server
 * @param {object} robot 
 */
const updateRobot = async (robot) => {
    let newRobot = {...robot};

    // Remove unchangeable attributes
    delete newRobot._id;
    delete newRobot.__v;
    delete newRobot.robotId;
    delete newRobot.owner;
    delete newRobot.ownedAt;

    if(get(loggedIn)){
        await fetch(process.env.SERVER + '/api/roboscape/robots/' + robot._id, {
            method: 'PATCH',
            credentials: 'include', 
            headers: {
                "Content-type": "application/json"
            },  
            body: JSON.stringify(newRobot)
         });
         await refreshRobots();
    }
}

/**
 * Add users to a robot's access control list
 * @param {string} id Robot to add to
 * @param {string|string[]} newUsers Usernames of new user(s) to add
 */
const addRobotUsers = async (id, newUsers) => {
    if(get(loggedIn)){
        if(typeof(newUsers) === 'string'){
            newUsers = [newUsers];
        }

        for(let user of newUsers) {
            await fetch(process.env.SERVER + '/api/roboscape/robots/' + id + '/users', {
                method: 'PUT',
                credentials: 'include', 
                headers: {
                    "Content-type": "application/json"
                },  
                body: JSON.stringify({username: user, hasAccess: true})
            });
        };
        
        await refreshRobots();
    }
}

/**
 * Remove a user from a robot's access control list
 * @param {string} id Robot to add to
 * @param {string} user User ID to remove
 */
const removeRobotUser = async (id, userID) => {
    if(get(loggedIn)){
        var robot = {...(get(robots).find(robot => robot._id == id))};
        var users = robot.users.filter(user => user._id != userID);
        robot.users = users;

        await updateRobot(robot);
    }
}

/**
 * Change a robot to be public or not
 * @param {string} id Robot to change status of
 * @param {boolean} isPublic If robot should be public or not
 */
const setPublic = async (id, isPublic) => {
    if(get(loggedIn)){
        await updateRobot({
            _id: id,
            isPublic
        });
    }
}

const updateUser = async (robotId, user) => {
    if(get(loggedIn)){
        await fetch(process.env.SERVER + '/api/roboscape/robots/' + robotId + '/users', {
            method: 'PUT',
            credentials: 'include', 
            headers: {
                "Content-type": "application/json"
            },  
            body: JSON.stringify(user)
        });
    }
}

export { robots, refreshRobots, updateRobot, addRobotUsers, getRobot, removeRobotUser, setPublic, updateUser}