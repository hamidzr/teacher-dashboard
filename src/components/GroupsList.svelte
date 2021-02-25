<script lang="ts">
    import { groups } from '../stores/groups';

    import GroupCard from './GroupCard.svelte';
</script>

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
