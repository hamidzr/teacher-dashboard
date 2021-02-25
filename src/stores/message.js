import { writable } from 'svelte/store';

/**
 * Stores a message to be displayed in the page's SnackBar
 */
export const message = writable("");