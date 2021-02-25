import { writable } from 'svelte/store';

const groups = writable(
    []
);

const updateGroups = async () => {
    groups.set(await (await fetch(process.env.SERVER + '/api/groups', { credentials: 'include' })).json());
};


const createGroup = async (name) => {
    console.log('creating group', name);
    let response = await (await fetch(process.env.SERVER + '/api/groups', { method: 'POST', credentials: 'include', body: JSON.stringify({name: name})})).text();
    
    console.log(response);
    /*if(){
        throw Error('malformed group response');
    }*/

    updateGroups();
    return group;
};

export {groups, updateGroups, createGroup};