<script lang="ts">
    import Card, { Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons } from '@smui/card';
    import Button, { Label } from '@smui/button';
    import IconButton, { Icon } from '@smui/icon-button';
    import List, { Item, Text } from '@smui/list';
    import { deleteGroup } from '../stores/groups';

    export let group;
</script>

<div class="card-container short">
    <Card style="width: 320px;">
        <Content>{group.name}</Content>
        <Actions>
            <Button on:click={() => editGroup(group._id)}>
                <Label>Edit</Label>
            </Button>
            <Button on:click={() => deleteGroup(group._id)}>
                <Label>Delete</Label>
            </Button>
        </Actions>
    </Card>
</div>
