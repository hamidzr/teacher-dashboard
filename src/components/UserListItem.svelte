<script lang="ts">
    export let user;
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import { updateUser, deleteUser } from '../stores/groups';

    let newEmail = user.email ?? '';
    let emailInvalid = true;
    let modifyDialog;
    let deleteDialog;
</script>

<Dialog bind:this={modifyDialog}>
    <Title id="simple-title">Modify User</Title>
    <Content id="simple-content">
        <Textfield
            fullwidth
            bind:value={newEmail}
            bind:invalid={emailInvalid}
            type="email"
            updateInvalid
            label="Email Address"
            input$aria-controls="helper-text-standard-a"
            input$aria-describedby="helper-text-standard-a"
        />
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                if (await updateUser({ ...user, email: newEmail })) {
                    user.email = newEmail;
                    modifyDialog.close();
                }
            }}
            disabled={emailInvalid || newEmail.length < 5}
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
        Are you sure you want to delete {user.username}?
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                if (await deleteUser(user)) {
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

{#if !user.deleted}
    <Row>
        <Cell>{user.username}</Cell>
        <Cell>{user.email}</Cell>
        <Cell>
            <Button
                on:click={() => {
                    newEmail = user.email ?? '';
                    modifyDialog.open();
                }}
            >
                <Label>Modify</Label>
            </Button>
            <Button on:click={() => deleteDialog.open()}>
                <Label>Delete</Label>
            </Button>
        </Cell>
    </Row>
{/if}
