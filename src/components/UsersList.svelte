<script lang="ts">
    import { onMount } from 'svelte';
    import List, { Group, Item, Graphic, Meta, Label, Separator, Subheader, Text, PrimaryText, SecondaryText } from '@smui/list';

    export let group;
    let users = [];

    onMount(() => {});
</script>

<h2>Users:</h2>
<List>
    {#each users as user}
        <Item>user</Item>
    {/each}
</List>
