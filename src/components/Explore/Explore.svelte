<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";

	let musical = $state("hamilton");
	let character = $state();
	let motif = $state();
	let musicalOptions = [
		{ label: "Hamilton", value: "hamilton" },
		{ label: "Wicked", value: "wicked" },
		{ label: "Les Misérables", value: "lesmis" }
	];
</script>

<div class="filters">
	<div class="select-wrapper">
		<label for="musical-select">Choose a musical</label>
		<select bind:value={musical} id="musical-select">
			{#each musicalOptions as option}
				<option
					value={option.value}
					selected={option.value === musical}
					onclick={() => (musical = option.value)}>{option.label}</option
				>
			{/each}
		</select>
	</div>

	<div class="select-wrapper">
		<label for="character-select">Filter by Character</label>
		<select bind:value={character} id="character-select"> </select>
	</div>

	<div class="select-wrapper">
		<label for="motif-select">Filter by motif</label>
		<select bind:value={motif} id="motif-select"> </select>
	</div>
</div>

<ArcViz
	id="explore"
	{musical}
	title={`${musicalOptions.find((d) => d.value === musical).label}: All motifs`}
/>

<style>
	.filters {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 700px;
		margin: 0 auto;
		margin-bottom: 1rem;
	}

	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		text-transform: uppercase;
		font-weight: bold;
	}
</style>
