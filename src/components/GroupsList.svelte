<script lang="ts">
    import { groups } from '../stores/groups';

    import GroupCard from './GroupCard.svelte';
</script>

{#if $groups.length == 0}
    Add a group to see it here.
{:else}
    {#each $groups as group}
        <GroupCard {group} />
    {/each}
{/if}
