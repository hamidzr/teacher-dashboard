<script lang="ts">
    import Button, { Label } from '@smui/button';
    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    export let robot;
</script>

<Button
    on:click={() => {
        dispatch('finishEdit');
    }}>Close</Button
>
