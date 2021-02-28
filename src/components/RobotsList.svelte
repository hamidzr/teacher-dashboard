<script lang="ts">
    import { onMount } from 'svelte';
    import { refreshRobots, robots } from '../stores/roboscape';

    import RobotCard from './RobotCard.svelte';

    onMount(async () => {
        await refreshRobots();
    });
</script>

<h2>Your Robots:</h2>

<div id="cards">
    {#if $robots.length == 0}
        Register robots using the RoboScape App to edit their settings here.
    {:else}
        {#each $robots as robot}
            <RobotCard {robot} on:beginEdit />
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
