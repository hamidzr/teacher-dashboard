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

const updateRobot = async (robot) => {
    if(get(loggedIn)){
        await fetch(process.env.SERVER + '/api/roboscape/robots/' + robot._id, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                "Content-type": "application/json"
            },  
            body: JSON.stringify(robot)
         });
    }
}

export { robots, refreshRobots, updateRobot }