<script>
    import GroupForm from '../components/GroupForm.svelte';
    import GroupsList from '../components/GroupsList.svelte';
    let editing = null;
</script>

{#if editing == null}
    <GroupsList
        on:beginEdit={(e) => {
            editing = e.detail;
        }}
    />
{:else}
    <h2>
        Editing {editing.name}
    </h2>
    <GroupForm
        group={editing}
        on:finishEdit={() => {
            editing = null;
        }}
    />
{/if}
