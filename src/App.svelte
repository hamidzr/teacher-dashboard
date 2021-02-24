<script lang="ts">
    let server = 'https://editor.netsblox.org';
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Tab, { Icon, Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Footer from './components/Footer.svelte';
    import Menu from '@smui/menu';
    import List, { Item, Separator, Text, PrimaryText, SecondaryText, Graphic } from '@smui/list';
    import Button from '@smui/button';

    import Home from './routes/Home.svelte';
    import Help from './routes/Help.svelte';

    let loggedIn = false;

    let loginText = 'Login';
    let loginIcon = 'login';
    $: loginIcon = loggedIn ? 'logout' : 'login';
    $: loginText = loggedIn ? 'Logout' : 'Login';

    let tabs = [];
    $: tabs = [
        {
            k: 1,
            icon: 'home',
            label: 'Home',
            requiresLogin: false,
        },
        {
            k: 2,
            icon: 'group',
            label: 'Groups',
            requiresLogin: true,
        },
        {
            k: 3,
            icon: 'android',
            label: 'RoboScape',
            requiresLogin: true,
        },
        {
            k: 4,
            icon: 'help',
            requiresLogin: false,
            label: 'Help',
        },
        {
            k: 5,
            icon: loginIcon,
            label: loginText,
            requiresLogin: false,
        },
    ];
    let activeTab = tabs[0];
    let menu;
</script>

<div id="container">
    <header>
        <nav>
            <div id="tabbar">
                <TabBar {tabs} let:tab key={(tab) => tab.k} bind:active={activeTab}>
                    <Tab {tab} stacked={true} indicatorSpanOnlyContent={true} tabIndicator$transition="fade" disabled={tab.requiresLogin && !loggedIn}>
                        <Icon class="material-icons">{tab.icon}</Icon>
                        <Label>{tab.label}</Label>
                    </Tab>
                </TabBar>
            </div>
            <div id="mobilenav">
                <TopAppBar variant="static" color="secondary">
                    <Row>
                        <Section>
                            <div id="menubutton">
                                <IconButton class="material-icons" on:click={() => menu.setOpen(true)}>menu</IconButton>
                                <Menu bind:this={menu}>
                                    <List>
                                        {#each tabs as tab}
                                            <Item on:SMUI:action={() => (activeTab = tab)} disabled={tab.requiresLogin && !loggedIn} activated={tab.k == (activeTab?.k ?? 1)}>
                                                <Graphic class="material-icons">{tab.icon}</Graphic>
                                                <Text>{tab.label}</Text>
                                            </Item>
                                        {/each}
                                    </List>
                                </Menu>
                            </div>
                            <Title>NetsBlox Dashboard</Title>
                        </Section>
                    </Row>
                </TopAppBar>
            </div>
        </nav>
    </header>

    <main>
        {#if activeTab == null || activeTab.k == 1}
            <Home {server} />
        {/if}

        {#if activeTab != null && activeTab.k == 4}
            <Help />
        {/if}
    </main>

    <footer>
        <Footer />
    </footer>
</div>

<style>
    #container {
        max-width: 960px;
        margin: 0 auto;
    }

    #mobilenav {
        display: none;
    }

    main {
        text-align: center;
        padding: 1em;
        width: 100%;
        margin: 0 auto;
    }

    footer {
        text-align: center;
    }

    @media (max-width: 640px) {
        #tabbar {
            display: none;
        }

        #mobilenav {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
        }

        #container {
            padding-top: 64px;
            width: 100%;
        }

        #menubutton {
            padding-top: 12px;
        }
    }
</style>
