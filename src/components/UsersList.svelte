<script lang="ts">
    import { onMount } from 'svelte';
    import Fab, { Icon } from '@smui/fab';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import UserListItem from './UserListItem.svelte';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import { getUsers, addNewUser } from '../stores/groups';
    import { loggedIn } from '../stores/loggedIn';
    import { listen } from 'svelte/internal';

    export let group;
    let newDialog;
    let bulkDialog;

    let users = [];

    let newUsername = '';
    let newEmail = '';
    let emailInvalid = true;
    let newPassword = '';
    let newUsersBulk = '';
    let bulkUsersInvalid = true;
    let bulkInputError = '';

    onMount(async () => {
        users = await getUsers(group._id);
    });

    // Check that bulk user input is valid
    $: newUsersBulk && (async () => {
        let valid = newUsersBulk.length > 10;
        bulkInputError = '';

        // Test each CSV entry
        newUsersBulk.split('\n').forEach((line, idx) => {
            let parts = line.split(',');

            // Skip incomplete/invalid lines
            if(parts.length != 3)
            {
                if(line.length > 1){
                    bulkInputError += `Row ${idx + 1} incomplete/invalid\n`;
                }
                
                return;
            }

            // Ensure something has been input for each section
            if(parts.some(part => part.length < 1)){
                valid = false;
                bulkInputError += `Missing fields for user ${parts[0]}\n`;
            }

            // Bare minimum on password requirement
            if(parts[2].length < 6){
                valid = false;
                bulkInputError +=`Password for user ${parts[0]} too short\n`;
            }

            console.log([parts[0], parts[1], parts[2]]);
        });

        bulkUsersInvalid = !valid;
        
    })();

</script>

<h2>
    Users:
    <Fab
        on:click={() => {
            newDialog.open();
        }}><Icon class="material-icons">person_add</Icon></Fab
    >
    <Fab
        on:click={() => {
            bulkDialog.open();
        }}><Icon class="material-icons">group_add</Icon></Fab
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


<Dialog bind:this={bulkDialog}>
    <Title id="simple-title">Add Multiple Users</Title>
    <Content>
        Input new users in a CSV format, one user per line.<br />
        username,email,password
    </Content> 

    <Content id="simple-content">
        <Textfield textarea fullwidth bind:value={newUsersBulk} input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" bind:invalid={bulkUsersInvalid} />
    </Content>

    <Content>
        {bulkInputError}
    </Content> 
     
  <Actions>
        <Button
            on:click={async () => {
                newUsersBulk.split('\n').forEach(async line => {
                    let parts = line.split(',');

                    if(parts.length != 3)
                    {
                        return;
                    }

                    await addNewUser(group._id, parts[0], parts[1], parts[2]);
                });

                bulkDialog.close();
                users = await getUsers(group._id);
                newUsersBulk = '';
            }}
            disabled={bulkUsersInvalid}
        >
            <Label>Submit</Label>
        </Button>
        <Button
            on:click={() => {
                bulkDialog.close();
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
