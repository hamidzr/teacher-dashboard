<script lang="ts">
    import { Row, Cell } from '@smui/data-table';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import { updateKey, deleteKey } from '../stores/groups';

    export let key;
    let modifyDialog;
    let deleteDialog;
    let newKey = key.value ?? '';
</script>

<Dialog bind:this={modifyDialog}>
    <Title id="simple-title">Modify Key for {key.provider}</Title>
    <Content id="simple-content">
        <Textfield
            fullwidth
            bind:value={newKey}
            type="text"
            updateInvalid
            label="New Key"
            input$aria-controls="helper-text-standard-a"
            input$aria-describedby="helper-text-standard-a"
        />
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                if (await updateKey({...key, value: newKey})) {
                    key.value = newKey;
                    modifyDialog.close();
                }
            }}
            disabled={newKey.length < 5}
        >
            <Label>Submit</Label>
        </Button>
        <Button on:click={() => modifyDialog.close()}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<Dialog bind:this={deleteDialog}>
    <Title id="simple-title">Confirm Deletion</Title>

    <Content id="simple-content">
        Are you sure you want to delete this key?
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                if (await deleteKey(key)) {
                    user.deleted = true;
                }
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

<Row>
    <Cell>{key.provider}</Cell>
    <Cell>{key.value}</Cell>
    <Cell>
        <Button on:click={() => modifyDialog.open()}>
            <Label>Modify</Label>
        </Button> <br />
        <Button on:click={() => deleteDialog.open()}>
            <Label>Delete</Label>
        </Button></Cell
    >
</Row>
