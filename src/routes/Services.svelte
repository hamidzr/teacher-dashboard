<script>
    import RoboScape from './RoboScape.svelte';

	let services = [
		{ id: 1, text: `Roboscape` },
        { id: 2, text: `IoTScape` }
	];

	let selected = services[0];
</script>

<form>
    <select bind:value={selected}>
		{#each services as service}
			<option value={service}>
				{service.text}
			</option>
		{/each}
	</select>
</form>

{#if selected.text == 'Roboscape'}
    <RoboScape/>
{/if}
