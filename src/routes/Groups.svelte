<script>
    import Fab, { Label, Icon } from '@smui/fab';
    import GroupsList from '../components/GroupsList.svelte';
    import { createGroup } from '../stores/groups';
</script>

<h2>
    Your Groups:
    <Fab
        on:click={() => {
            createGroup('New Group');
        }}><Icon class="material-icons">add</Icon></Fab
    >
</h2>

<GroupsList />
