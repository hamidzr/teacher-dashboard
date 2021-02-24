<script lang="ts">
    import MobileMenuBar from './MobileMenuBar.svelte';

    let server = process.env.SERVER ?? 'https://editor.netsblox.org';

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Tab, { Icon, Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Footer from './components/Footer.svelte';
    import { onMount } from 'svelte';

    import Home from './routes/Home.svelte';
    import Help from './routes/Help.svelte';
    import Groups from './routes/Groups.svelte';
    import RoboScape from './routes/RoboScape.svelte';
    import Login from './routes/Login.svelte';

    async function checkForLogin() {
        let apiRes = await self.fetch(server + '/api', { credentials: 'include' });
        loggedIn = (await apiRes.text()) !== 'No session found';
    }

    let loggedIn = false;

    onMount(async () => {
        await checkForLogin();
    });

    let loginText = 'Login';
    let loginIcon = 'login';
    $: loginIcon = loggedIn ? 'logout' : 'login';
    $: loginText = loggedIn ? 'Logout' : 'Login';

    // Check for login on occasion
    setInterval(() => {
        if (!loggedIn) {
            checkForLogin();
        }
    }, 5000);

    let tabs = [
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
            handleSpecific: () => {
                if (!loggedIn) {
                    // Redirect to login form
                    let destination = location.href;
                    location.href = `https://login.netsblox.org?url=${server}&redirect=${destination}`;
                } else {
                    // Send logout request
                    self.fetch(server + '/api/logout', { method: 'POST', credentials: 'include' });
                    activeTab = tabs[0];
                    checkForLogin();
                }
            },
        },
    ];

    $: tabs[4].icon = loginIcon;
    $: tabs[4].label = loginText;

    let activeTab = tabs[0];
    let menu;
</script>

<div id="container">
    <header>
        <nav>
            <div id="tabbar">
                <TabBar {tabs} let:tab key={(tab) => tab.k} bind:active={activeTab}>
                    <Tab
                        {tab}
                        stacked={true}
                        indicatorSpanOnlyContent={true}
                        tabIndicator$transition="fade"
                        disabled={tab.requiresLogin && !loggedIn}
                        on:click={() => {
                            if (activeTab.handleSpecific != undefined) {
                                activeTab.handleSpecific();
                            }
                        }}
                    >
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
                                {#if loggedIn}
                                    <MobileMenuBar {tabs} bind:activeTab loggedIn="true" bind:menu />
                                {:else}
                                    <MobileMenuBar {tabs} bind:activeTab loggedIn="false" bind:menu />
                                {/if}
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
        {:else if activeTab.k == 2}
            <Groups />
        {:else if activeTab.k == 3}
            <RoboScape />
        {:else if activeTab.k == 4}
            <Help />
        {:else if activeTab.k == 5}
            <Login />
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
