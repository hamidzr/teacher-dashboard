import { writable, get } from 'svelte/store';
import { loggedIn } from './loggedIn';

const groups = writable(
    []
);

const apiKeys = writable(
    []
);

function handleErrors(response)
{
    if(!response.ok)
    {
        throw new Error("Server response failed.");
    }

    if(response.status == 404)
    {
        throw new Error("Bad server request. Endpoint doesn't exist.");
    }
        
    return response;
}

async function requestAsync(url, actionType, body)
{
    try
    {
        await fetch(process.env.SERVER + url, { method: actionType, credentials: 'include', headers: {
            "Content-type": "application/json"
        }, body: body})
        .then(handleErrors)
        .then(response => response.json())
        .then(data => console.log(data));
    }
    catch(err)
    {
        throw new Error("Server disconnected.");
    }
}

/**
 * Request a fresh version of the user's groups
 */
const refreshGroups = async () => {
    if(get(loggedIn)){
        groups.set(await (await fetch(process.env.SERVER + '/api/groups', { credentials: 'include' })).json());
    }
};

/**
 * Request a fresh version of the user's groups
 */
const refreshAPIKeys = async () => {
    if(get(loggedIn)){
        apiKeys.set(await (await fetch(process.env.SERVER + '/services/keys/', { credentials: 'include' })).json());
    }
};

/**
 * Create a new group
 * @param {string} name Name of new group
 */
const createGroup = async (name) => {
    if(get(loggedIn)){
        await requestAsync('/api/groups', 'POST', JSON.stringify({name: name}));
        refreshGroups();
    }
};

/**
 * Delete a group
 * @param {string} id ID of group to delete
 */
const deleteGroup = async (id) => {
    if(get(loggedIn)){
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + id, { method: 'DELETE', credentials: 'include'})).text();
        
            console.log(response);
            refreshGroups();
        } catch (err) {
            throw new Error('Delete group error. Server disconnected.');
        }
    }
};


const renameGroup = async (id, newName) => {
    if(get(loggedIn)){
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + id, { method: 'PATCH', credentials: 'include', headers: {
                "Content-type": "application/json"
            },  body: JSON.stringify({name: newName})})).text();
            
            console.log(response);
            refreshGroups();
        } catch (err) {
            throw new Error('Rename group error. Server disconnected.');
        }
    }
};

const getUsers = async (id) => {
    if(get(loggedIn)){
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + id + '/members', { method: 'GET', credentials: 'include'})).json();
            return response;
        } catch (err) {
            throw new Error('Get users error. Server disconnected.');
        }
    }

    return [];
}

const addNewUser = async (id, username, email, password) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + id + '/members', {
                method: 'POST', credentials: 'include', headers: {
                    "Content-type": "application/json"
                }, body: JSON.stringify({ username, email, password })
            })).text();
            
            console.log(response);
        } catch (err) {
            throw new Error('Add new user error. Server disconnected.');
        }
    }
};

const updateUser = async (user) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + user.groupId + '/members/' + user._id, {
                method: 'PATCH', credentials: 'include', headers: {
                    "Content-type": "application/json"
                }, body: JSON.stringify(user)
            })).text();
        } catch (err) {
            throw new Error('Update user error. Server disconnected.');
        }
    }

    return true;
};

const deleteUser = async (user) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/api/groups/' + user.groupId + '/members/' + user._id, { method: 'DELETE', credentials: 'include' })).text();
        } catch (err) {
            throw new Error('Delete user error. Server disconnected.');
        }
    }

    return true;
};

const getAPIKeys = async (id) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/services/keys', { method: 'GET', credentials: 'include' })).json();
        } catch (err) {
            throw new Error('Get API keys error. Server disconnected.');
        }

        return response.filter(key => key.groups.includes(id))
    }

    return [];
};


const addNewKey = async (key) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/services/keys/' + key.provider, {
                method: 'POST', credentials: 'include', headers: {
                    "Content-type": "application/json"
                }, body: JSON.stringify(key)
            })).text();
            refreshAPIKeys();
        } catch (err) {
            throw new Error('Add new key error. Server disconnected.');
        }        
    }

    return true;
};

const updateKey = async (key) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/services/keys/', {
                method: 'PATCH', credentials: 'include', headers: {
                    "Content-type": "application/json"
                }, body: JSON.stringify({value:key.value, id:key._id})
            })).text();
            refreshAPIKeys();
            return true;
        } catch (err) {
            throw new Error('Update key error. Server disconnected.');
        }

        
    }
};

const deleteKey = async (key) => {
    if (get(loggedIn)) {
        try
        {
            let response = await (await fetch(process.env.SERVER + '/services/keys/' + key._id, { method: 'DELETE', credentials: 'include' })).text();
            refreshAPIKeys();
            return response == 'true';
        } catch (err) {
            throw new Error('Delete key error. Server disconnected.');
        }     
    }

    return false;
};

export {groups, apiKeys, refreshGroups, refreshAPIKeys, createGroup, deleteGroup, renameGroup, getUsers, addNewUser, updateUser, deleteUser, addNewKey, updateKey, deleteKey};