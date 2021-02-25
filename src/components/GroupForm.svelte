<script lang="ts">
    import Button, { Label } from '@smui/button';
    import { createEventDispatcher } from 'svelte';
    import ApiKeysList from './APIKeysList.svelte';
    import UsersList from './UsersList.svelte';

    let dispatch = createEventDispatcher();

    export let group;
</script>

<ApiKeysList {group} />

<UsersList {group} />

<Button
    on:click={() => {
        dispatch('finishEdit');
    }}>Close</Button
>
