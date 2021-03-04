<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import { getRobot, removeRobotUser, updateUser } from '../stores/roboscape';

    export let robot;
    let deleteDialog;
    let toDelete = { username: '', _id: '' };
</script>

<Dialog bind:this={deleteDialog}>
    <Title id="simple-title">Delete User</Title>
    <Content id="simple-content">
        Are you sure you want to delete {toDelete.username}?
    </Content>
    <Actions>
        <Button
            on:click={async () => {
                await removeRobotUser(robot._id, toDelete._id);
                robot = await getRobot(robot._id);
            }}
        >
            <Label>Confirm</Label>
        </Button>
        <Button
            on:click={() => {
                deleteDialog.close();
                toDelete = undefined;
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
            <Cell>Has Access</Cell>
            <!--<Cell>Updated At</Cell>-->
            <Cell>Actions</Cell>
        </Row>
    </Head>
    <Body>
        {#each robot.users as user (user._id)}
            <Row>
                <Cell>{user.username}</Cell>
                <Cell>
                    <Checkbox
                        bind:checked={user.hasAccess}
                        on:change={(e) => {
                            updateUser(robot._id, user);
                        }}
                    />
                </Cell>
                <!--<Cell>{user.updatedAt}</Cell>-->
                <Cell>
                    <Button
                        on:click={async () => {
                            toDelete = user;
                            deleteDialog.open();
                        }}
                    >
                        Remove
                    </Button>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>
