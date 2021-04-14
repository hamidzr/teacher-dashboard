<script lang="ts">
    import Fab, { Icon } from '@smui/fab';
    import ApiKeyListItem from './APIKeyListItem.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Select, { Option } from '@smui/select';
    import Textfield from '@smui/textfield';
    import { onMount } from 'svelte';
    import { refreshAPIKeys, addNewKey, apiKeys, groups } from '../stores/groups';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

    export let group;
    let newDialog;

    let newKey = '';
    let newProvider = '';
    let keys = [];
    let providers = [];

    onMount(async () => {
        // Load API providers
        const response = await fetch(process.env.SERVER + `/services/keys/providers`, { credentials: 'include' });
        providers = await response.json();
        // Load API keys 
        await refreshAPIKeys();
    });
</script>

<Dialog bind:this={newDialog}>
    <Title id="simple-title">New API Key</Title>
    <Content id="simple-content">
        <Select class="shaped-outlined" variant="outlined" bind:value={newProvider} label="Provider">
            <Option value="" />
            {#each providers as provider}
                <Option value={provider.provider}>{provider.provider}</Option>
            {/each}
        </Select>
        {#if newProvider != ''}
            <a href={providers.find((p) => p.provider == newProvider).url} target="_blank">Need an API key?</a>
        {/if}
        <Textfield fullwidth bind:value={newKey} label="Key" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />
    </Content>
    <Actions>
        <Button on:click={async () => 
        {
            if(await addNewKey({
                value: newKey,
                provider: newProvider,
                groups: [
                    group._id
                ]
            })) { 
                newDialog.close();
            }
        }} 
            disabled={newKey.length < 1}>
            <Label>Submit</Label>
        </Button>
        <Button on:click={() => {}}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<h2>
    API Keys:
    <Fab
        on:click={() => {
            newDialog.open();
        }}><Icon class="material-icons">add</Icon></Fab
    >
</h2>

<DataTable>
    <Head>
        <Row>
            <Cell>Provider</Cell>
            <Cell>Key</Cell>
            <Cell>Actions</Cell>
        </Row>
    </Head>
    <Body>
        {#each $apiKeys as key}
            {#if key.groups.indexOf(group._id) > -1}
                <ApiKeyListItem {key} />
            {/if}
        {/each}
    </Body>
</DataTable>
