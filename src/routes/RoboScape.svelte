<script>
    import RobotForm from '../components/RobotForm.svelte';
    import RobotsList from '../components/RobotsList.svelte';

    let editing = null;
</script>

{#if editing == null}
    <RobotsList
        on:beginEdit={(e) => {
            editing = e.detail;
        }}
    />
{:else}
    <h2>
        Editing {editing.robotId}
    </h2>
    <RobotForm
        robot={editing}
        on:finishEdit={() => {
            editing = null;
        }}
    />
{/if}
