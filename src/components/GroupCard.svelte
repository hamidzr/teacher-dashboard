<script lang="ts">
    import Card, { Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons } from '@smui/card';
    import Button, { Label } from '@smui/button';
    import IconButton, { Icon } from '@smui/icon-button';
    import List, { Item, Text } from '@smui/list';
    import Dialog, { Title, Content as DialogContent, Actions as DialogActions, InitialFocus } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import { deleteGroup, renameGroup } from '../stores/groups';

    export let group;

    let renameDialog;
    let newName: string = '';
    let newNameValid = false;

    $: newNameValid = newName.trim().length > 0;
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

    <Card style="width: 320px;">
        <Content>{group.name}</Content>
        <Actions>
            <Button on:click={() => editGroup(group._id)}>
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
            <Button on:click={() => deleteGroup(group._id)}>
                <Label>Delete</Label>
            </Button>
        </Actions>
    </Card>
</div>
