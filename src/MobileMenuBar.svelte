<script lang="ts">
    import Menu from '@smui/menu';
    import List, { Item, Separator, Text, Graphic } from '@smui/list';

    export let loggedIn;
    export let tabs: any[];
    export let activeTab;
    export let menu;
</script>

<Menu bind:this={menu}>
    <List>
        {#each tabs as tab, index (tab.k)}
            <Item
                on:SMUI:action={() => {
                    if (tabs[index].handleSpecific != undefined) {
                        tabs[index].handleSpecific();
                    } else {
                        activeTab = tab;
                    }
                }}
                disabled={tabs[index].requiresLogin && !(loggedIn === 'true')}
                activated={tabs[index].k == (activeTab?.k ?? 1)}
            >
                <Graphic class="material-icons">{tabs[index].icon}</Graphic>
                <Text>{tabs[index].label}</Text>
            </Item>
        {/each}
    </List>
</Menu>
