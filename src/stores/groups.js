import { writable, get } from 'svelte/store';
import { loggedIn } from './loggedIn';

const groups = writable(
    []
);

/**
 * Request a fresh version of the user's groups
 */
const refreshGroups = async () => {
    if(get(loggedIn)){
        groups.set(await (await fetch(process.env.SERVER + '/api/groups', { credentials: 'include' })).json());
    }
};

/**
 * Create a new group
 * @param {string} name Name of new group
 */
const createGroup = async (name) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups', { method: 'POST', credentials: 'include', headers: {
            "Content-type": "application/json"
        },  body: JSON.stringify({name: name})})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/

        refreshGroups();
    }
};

/**
 * Delete a group
 * @param {string} id ID of group to delete
 */
const deleteGroup = async (id) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + id, { method: 'DELETE', credentials: 'include'})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/

        refreshGroups();
    }
};


const renameGroup = async (id, newName) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + id, { method: 'PATCH', credentials: 'include', headers: {
            "Content-type": "application/json"
        },  body: JSON.stringify({name: newName})})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/

        refreshGroups();
    }
};

export {groups, refreshGroups, createGroup, deleteGroup, renameGroup};