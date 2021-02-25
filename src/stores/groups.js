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

const getUsers = async (id) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + id + '/members', { method: 'GET', credentials: 'include'})).json();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/

        return response;
    }

    return [];
}

const getAPIKeys = async (id) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + id + '/keys', { method: 'GET', credentials: 'include'})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/
    }

    return [];
}


const addNewUser = async (id, username, email, password) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + id + '/members', { method: 'POST', credentials: 'include', headers: {
            "Content-type": "application/json"
        },  body: JSON.stringify({username, email, password})})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
        }*/
    }
}


const updateUser = async(user) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + user.groupId + '/members/' + user._id, { method: 'PATCH', credentials: 'include', headers: {
            "Content-type": "application/json"
        },  body: JSON.stringify(user)})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
            return false;
        }*/
    }

    return true;

}

const deleteUser = async (user) => {
    if(get(loggedIn)){
        let response = await (await fetch(process.env.SERVER + '/api/groups/' + user.groupId + '/members/' + user._id, { method: 'DELETE', credentials: 'include'})).text();
        
        console.log(response);
        /*if(){
            throw Error('malformed group response');
            return false;
        }*/
    }

    return true;
}

export {groups, refreshGroups, createGroup, deleteGroup, renameGroup, getUsers, getAPIKeys, addNewUser, updateUser, deleteUser};