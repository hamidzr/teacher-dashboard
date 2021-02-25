<script>
    import Fab, { Label, Icon } from '@smui/fab';
    import { onMount } from 'svelte';
    import GroupsList from '../components/GroupsList.svelte';
    import { createGroup, refreshGroups } from '../stores/groups';

    onMount(async () => {
        await refreshGroups();
    });
</script>

<h2>
    Your Groups:
    <Fab
        on:click={() => {
            createGroup('New Group ' + new Date().toLocaleString());
        }}><Icon class="material-icons">add</Icon></Fab
    >
</h2>

<GroupsList />
