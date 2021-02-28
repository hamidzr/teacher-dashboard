<script lang="ts">
    import Card, { Content, Actions } from '@smui/card';
    import Button, { Label } from '@smui/button';
    import { createEventDispatcher } from 'svelte';
    export let robot;

    let dispatcher = createEventDispatcher();
</script>

<Card style="width: 320px;">
    <Content
        >{robot.robotId}
        <div>{robot.isPublic ? 'Public' : 'Protected'}, {robot.users.length} User{robot.users.length != 1 ? 's' : ''}</div></Content
    >
    <Actions>
        <Button on:click={() => dispatcher('beginEdit', robot)}>
            <Label>Configure</Label>
        </Button>
    </Actions>
</Card>
