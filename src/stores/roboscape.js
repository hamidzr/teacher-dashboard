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


export { robots, refreshRobots }