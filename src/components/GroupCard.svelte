<script lang="ts">
    import Card, { Content, Actions } from '@smui/card';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content as DialogContent, Actions as DialogActions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import { deleteGroup, renameGroup } from '../stores/groups';
    import { createEventDispatcher } from 'svelte';

    export let group;

    let renameDialog;
    let deleteDialog;
    let newName: string = '';
    let newNameValid = false;

    $: newNameValid = newName.trim().length > 0;

    let dispatcher = createEventDispatcher();
</script>

<div class="card-container short">
    <Dialog bind:this={renameDialog}>
        <Title id="simple-title">Rename Group {group.name}</Title>
        <Content id="simple-content">
            <Textfield fullwidth bind:value={newName} label="New Name" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
        </Content>
        <Actions>
            <Button
                on:click={() => {
                    renameGroup(group._id, newName);
                    renameDialog.close();
                }}
                disabled={!newNameValid}
            >
                <Label>Submit</Label>
            </Button>
            <Button on:click={() => renameDialog.close()}>
                <Label>Cancel</Label>
            </Button>
        </Actions>
    </Dialog>

    <Dialog bind:this={deleteDialog}>
        <Title id="simple-title">Confirm Deletion</Title>

        <Content id="simple-content">
            Are you sure you want to delete {group.name}?
        </Content>
        <Actions>
            <Button
                on:click={() => {
                    deleteGroup(group._id);
                    deleteDialog.close();
                }}
            >
                <Label>Delete</Label>
            </Button>
            <Button on:click={() => deleteDialog.close()}>
                <Label>Cancel</Label>
            </Button>
        </Actions>
    </Dialog>

    <Card style="width: 320px;">
        <Content>{group.name}</Content>
        <Actions>
            <Button on:click={() => dispatcher('beginEdit', group)}>
                <Label>Edit</Label>
            </Button>
            <Button
                on:click={() => {
                    newName = group.name;
                    renameDialog.open();
                }}
            >
                <Label>Rename</Label>
            </Button>
            <Button on:click={() => deleteDialog.open()}>
                <Label>Delete</Label>
            </Button>
        </Actions>
    </Card>
</div>
