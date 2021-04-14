<script lang="ts">
    import { onMount } from 'svelte';
    import Fab, { Icon } from '@smui/fab';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import UserListItem from './UserListItem.svelte';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import { getUsers, addNewUser } from '../stores/groups';

    export let group;
    let newDialog;

    let users = [];

    let newUsername = '';
    let newEmail = '';
    let emailInvalid = true;
    let newPassword = '';

    onMount(async () => {
        users = await getUsers(group._id);
    });
</script>

<h2>
    Users:
    <Fab
        on:click={() => {
            newDialog.open();
        }}><Icon class="material-icons">add</Icon></Fab
    >
</h2>

<Dialog bind:this={newDialog}>
    <Title id="simple-title">New User</Title>
    <Content id="simple-content">
        <Textfield fullwidth bind:value={newUsername} label="Username" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
        <Textfield
            fullwidth
            bind:value={newEmail}
            label="Email"
            type="email"
            updateInvalid
            bind:invalid={emailInvalid}
            input$aria-controls="helper-text-standard-a"
            input$aria-describedby="helper-text-standard-a"
        />
        <Textfield fullwidth bind:value={newPassword} label="Password" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                await addNewUser(group._id, newUsername, newEmail, newPassword);
                newDialog.close();
                users = await getUsers(group._id);
                newUsername = '';
                newEmail = '';
                newPassword = '';
            }}
            disabled={emailInvalid || newUsername.trim().length < 1 || newEmail.trim().length < 1 || newPassword.trim().length < 1}
        >
            <Label>Submit</Label>
        </Button>
        <Button
            on:click={() => {
                newDialog.close();
                newUsername = '';
                newEmail = '';
                newPassword = '';
            }}
        >
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<DataTable>
    <Head>
        <Row>
            <Cell>Username</Cell>
            <Cell>Email</Cell>
            <Cell>Actions</Cell>
        </Row>
    </Head>
    <Body>
        {#each users as user}
            <UserListItem {user} />
        {/each}
    </Body>
</DataTable>
