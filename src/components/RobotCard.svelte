<script lang="ts">
    import Card, { Content, Actions } from '@smui/card';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content as DialogContent, Actions as DialogActions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import { deleteGroup, renameGroup } from '../stores/groups';
    import { createEventDispatcher } from 'svelte';

    export let robot;

    let releaseDialog;
    let dispatcher = createEventDispatcher();
</script>

<Dialog bind:this={releaseDialog}>
    <Title id="simple-title">Release Robot {robot.robotId}</Title>
    <Content id="simple-content">Are you sure you wish to release ownership of this robot? You can always reclaim it using the RoboScape app after.</Content>
    <Actions>
        <Button
            on:click={() => {
                renameGroup(group._id, newName);
                releaseDialog.close();
            }}
        >
            <Label>Release</Label>
        </Button>
        <Button on:click={() => releaseDialog.close()}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<Card style="width: 320px;">
    <Content
        >{robot.robotId}
        <div>{robot.isPublic ? 'Public' : 'Protected'}</div></Content
    >
    <Actions>
        <Button on:click={() => dispatcher('beginEdit', robot)}>
            <Label>Configure</Label>
        </Button>
        <Button on:click={() => releaseDialog.open()}>
            <Label>Release</Label>
        </Button>
    </Actions>
</Card>
