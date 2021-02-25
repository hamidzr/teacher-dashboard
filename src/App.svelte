<script lang="ts">
    import MobileMenuBar from './MobileMenuBar.svelte';
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Tab, { Icon, Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Footer from './components/Footer.svelte';
    import Snackbar, { Actions } from '@smui/snackbar';
    import { onMount } from 'svelte';

    import Home from './routes/Home.svelte';
    import Help from './routes/Help.svelte';
    import Groups from './routes/Groups.svelte';
    import RoboScape from './routes/RoboScape.svelte';
    import Login from './routes/Login.svelte';
    import { refreshGroups } from './stores/groups';
    import { message } from './stores/message';
    import { loggedIn } from './stores/loggedIn';

    async function checkForLogin() {
        try {
            const previousState = $loggedIn;
            let apiRes = await self.fetch(process.env.SERVER + '/api', { credentials: 'include' });
            $loggedIn = (await apiRes.text()) !== 'No session found';

            if ($loggedIn && !previousState) {
                refreshGroups();
            }

            $message = '';
        } catch (error) {
            $message = 'Failed to connect to server';
        }
    }

    onMount(async () => {
        await checkForLogin();
    });

    let loginText = 'Login';
    let loginIcon = 'login';
    $: loginIcon = $loggedIn ? 'logout' : 'login';
    $: loginText = $loggedIn ? 'Logout' : 'Login';

    // Check for login on occasion
    setInterval(() => {
        if (!$loggedIn) {
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
                if (!$loggedIn) {
                    // Redirect to login form
                    let destination = location.href;
                    location.href = `https://login.netsblox.org?url=${process.env.SERVER}&redirect=${destination}`;
                } else {
                    // Send logout request
                    self.fetch(process.env.SERVER + '/api/logout', { method: 'POST', credentials: 'include' });
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
    let snackbar;
    $: if ($message != '') snackbar.open();
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
                        disabled={tab.requiresLogin && !$loggedIn}
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
                                <MobileMenuBar {tabs} bind:activeTab bind:menu />
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
            <Home />
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

    <Snackbar bind:this={snackbar}>
        <Label>{$message}</Label>
        <Actions>
            <IconButton
                class="material-icons"
                title="Dismiss"
                on:click={() => {
                    $message = '';
                }}>close</IconButton
            >
        </Actions>
    </Snackbar>
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
