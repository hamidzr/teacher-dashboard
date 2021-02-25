<script lang="ts">
    import { loggedIn } from '../stores/loggedIn';

    if (!$loggedIn) {
        // Redirect to login form
        let destination = location.href;
        location.href = `https://login.netsblox.org?url=${process.env.SERVER}&redirect=${destination}`;
    } else {
        // Send logout request
        (async () => {
            await fetch(process.env.SERVER + '/api/logout', { method: 'POST', credentials: 'include' });
            location.href = location.href;
        })();
    }
</script>
