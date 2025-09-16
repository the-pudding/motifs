<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import _ from "lodash";

	let musicalOptions = [
		{ label: "Hamilton", value: "hamilton" },
		{ label: "Wicked", value: "wicked" },
		{ label: "Les Misérables", value: "lesmis" }
	];

	let musical = $state("hamilton");
	let character = $state(["All characters"]);
	let motif = $state();

	let motifs = $derived(
		musical === "hamilton"
			? hamiltonMotifs
			: musical === "wicked"
				? wickedMotifs
				: lesMisMotifs
	);
	let characterOptions = $derived([
		"All characters",
		...motifs.reduce((acc, motif) => {
			const newChars = motif.regions.flatMap((r) => r.character);
			for (const c of newChars) {
				if (c && !acc.includes(c)) {
					acc = [...acc, c].sort();
				}
			}
			return acc;
		}, [])
	]);

	const reset = () => {
		character = ["All characters"];
	};
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
		<select bind:value={character[0]} id="character-select">
			{#each characterOptions as option}
				<option
					value={option}
					selected={character.includes(option)}
					onclick={() => (character = [option.value])}
					>{_.startCase(option)}</option
				>
			{/each}
		</select>
	</div>

	<button class="reset" onclick={reset}>Reset filters</button>
</div>

<ArcViz
	id="explore"
	{musical}
	{character}
	title={`${musicalOptions.find((d) => d.value === musical).label}: All motifs`}
/>

<style>
	.filters {
		display: flex;
		align-items: end;
		gap: 3rem;
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

	button.reset {
		font-size: var(--14px);
	}
</style>
