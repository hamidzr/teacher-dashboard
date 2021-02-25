import { writable } from 'svelte/store';

/**
 * Stores if the user is currently logged in
 */
export const loggedIn = writable(false);