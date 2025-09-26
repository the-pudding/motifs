<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import _ from "lodash";

	let { favorites } = $props();

	let musicalOptions = [
		{ label: "Hamilton", value: "hamilton" },
		{ label: "Wicked", value: "wicked" },
		{ label: "Les Misérables", value: "lesmis" }
	];

	let musical = $state("hamilton");
	let song = $state("All Songs");
	let character = $state("All Characters");

	let allMotifs = $derived(
		musical === "hamilton"
			? hamiltonMotifs
			: musical === "wicked"
				? wickedMotifs
				: lesMisMotifs
	);
	let tracks = $derived(
		musical === "hamilton"
			? hamiltonTracks
			: musical === "wicked"
				? wickedTracks
				: lesMisTracks
	);
	let songOptions = $derived([
		"All Songs",
		...allMotifs.reduce((acc, motif) => {
			const newTracks = motif.regions.flatMap((r) => r["track-name"]);
			for (const t of newTracks) {
				if (t && !acc.includes(t)) {
					acc = [...acc, t].sort();
				}
			}
			return acc;
		}, [])
	]);

	let characterOptions = $derived([
		"All Characters",
		...allMotifs.reduce((acc, motif) => {
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
		character = "All Characters";
		song = "All Songs";
	};

	const newMusical = () => {
		character = "All Characters";
		song = "All Songs";
	};

	const displaySong = (option) => {
		const trackData = tracks.find((t) => t.name.includes(option));
		return trackData?.displayName || option.replace(/^\d+-+\d+\s+/, "");
	};

	$effect(() => newMusical(musical));
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
		<label for="song-select">Filter by Song</label>
		<select
			bind:value={song}
			id="song-select"
			disabled={character !== "All Characters"}
		>
			{#each songOptions as option}
				<option
					value={option}
					selected={song === option}
					onclick={() => (song = option.value)}>{displaySong(option)}</option
				>
			{/each}
		</select>
	</div>

	<div class="select-wrapper">
		<label for="character-select">Filter by Character</label>
		<select
			bind:value={character}
			id="character-select"
			disabled={song !== "All Songs"}
		>
			{#each characterOptions as option}
				<option
					value={option}
					selected={character.includes(option)}
					onclick={() => (character = option.value)}
					>{option === "marquis de lafayette"
						? "Marquis de Lafayette"
						: _.startCase(option)}</option
				>
			{/each}
		</select>
	</div>

	<button class="reset" onclick={reset}>Reset</button>
</div>

<ArcViz
	id="explore"
	bind:musical
	{song}
	{character}
	title={`${musicalOptions.find((d) => d.value === musical).label}: All motifs`}
	{favorites}
/>

<style>
	.filters {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
		max-width: 700px;
		margin: 0 auto;
		margin-bottom: 1rem;
	}

	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		max-width: calc((100% - 6rem) / 3);
	}

	label {
		text-transform: uppercase;
		font-weight: bold;
	}

	button.reset {
		font-size: var(--14px);
	}

	@media (max-width: 600px) {
		.filters {
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.select-wrapper {
			max-width: calc((100% - 1.5rem) / 3);
		}
	}

	@media (max-width: 400px) {
		label,
		.select-wrapper,
		button.reset {
			font-size: var(--12px);
		}
	}
</style>
