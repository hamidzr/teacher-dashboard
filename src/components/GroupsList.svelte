<script lang="ts">
    import Fab, { Icon } from '@smui/fab';
    import { onMount } from 'svelte';
    import { createGroup, refreshGroups } from '../stores/groups';
    import { groups } from '../stores/groups';

    import GroupCard from './GroupCard.svelte';

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

<div id="cards">
    {#if $groups.length == 0}
        Add a group to see it here.
    {:else}
        {#each $groups as group}
            <GroupCard {group} on:beginEdit />
        {/each}
    {/if}
</div>

<style>
    #cards {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
