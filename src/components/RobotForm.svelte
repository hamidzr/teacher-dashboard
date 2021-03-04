<script lang="ts">
    import Button, { Label } from '@smui/button';
    import FormField from '@smui/form-field';
    import Checkbox from '@smui/checkbox';
    import Fab, { Icon } from '@smui/fab';
    import { createEventDispatcher } from 'svelte';
    import RobotUsersList from './RobotUsersList.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import { addRobotUsers, getRobot, setPublic } from '../stores/roboscape';

    let dispatch = createEventDispatcher();

    export let robot;

    let newDialog;
    let newUsers = '';
    let isPublic = robot.isPublic;

    $: setPublic(robot._id, isPublic);
</script>

<div>
    <FormField align="end">
        <span slot="label">Public:</span>
        <Checkbox bind:checked={isPublic} />
    </FormField>
</div>

<Dialog bind:this={newDialog}>
    <Title id="simple-title">New User</Title>
    <Content id="simple-content">
        <Textfield fullwidth bind:value={newUsers} label="Usernames (e.g. user1,user2)" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                await addRobotUsers(
                    robot._id,
                    newUsers.split(',').map((username) => username.trim())
                );
                newDialog.close();

                newUsers = '';
                robot = await getRobot(robot._id);
            }}
            disabled={newUsers.trim().length < 1}
        >
            <Label>Submit</Label>
        </Button>
        <Button
            on:click={() => {
                newDialog.close();
                newUsers = '';
            }}
        >
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<div>
    <h2>
        Users:
        <Fab
            on:click={() => {
                newDialog.open();
            }}><Icon class="material-icons">add</Icon></Fab
        >
    </h2>

    <RobotUsersList {robot} />
</div>

<Button
    on:click={() => {
        dispatch('finishEdit');
    }}>Close</Button
>
