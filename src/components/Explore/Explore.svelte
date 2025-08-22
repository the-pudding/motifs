<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";

	let musical = $state("hamilton");
	let musicalOptions = [
		{ label: "Hamilton", value: "hamilton" },
		{ label: "Wicked", value: "wicked" },
		{ label: "Les Misérables", value: "lesmis" }
	];
</script>

<div class="filters">
	<select bind:value={musical} id="musical-select">
		{#each musicalOptions as option}
			<option
				value={option.value}
				selected={option.value === musical}
				onclick={() => (musical = option.value)}>{option.label}</option
			>
		{/each}
	</select>

	<div>Filter by character Tk</div>
	<div>Filter by motif Tk</div>
</div>

<ArcViz id="explore" {musical} title={musical} />

<style>
	.filters {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-bottom: 1rem;
	}
</style>
