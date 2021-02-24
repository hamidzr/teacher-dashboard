<script lang="ts">
    export let server;
</script>

<img src="images/logo.png" id="nb-logo" alt="NetsBlox Logo" />

<h2>Welcome to the NetsBlox teacher dashboard!</h2>

<p>
    Server address: <a href={server} target="blank">{server}</a>
</p>

<style>
    #nb-logo {
        width: 192px;
    }
</style>
