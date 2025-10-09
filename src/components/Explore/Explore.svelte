<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import Motifs from "$components/Explore/Motifs.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import sortMotifRegions from "$utils/sortMotifRegions.js";
	import _ from "lodash";
	import { onMount } from "svelte";

	let { favorites } = $props();

	let musicalOptions = [
		{ label: "Hamilton", value: "hamilton" },
		{ label: "Les Misérables", value: "lesmis" },
		{ label: "Wicked", value: "wicked" }
	];

	let musical = $state("hamilton");
	let song = $state("All Songs");
	let character = $state("All Characters");

	let allMotifs = $derived(
		musical === "hamilton"
			? sortMotifRegions(hamiltonMotifs)
			: musical === "wicked"
				? sortMotifRegions(wickedMotifs)
				: sortMotifRegions(lesMisMotifs)
	);
	let filteredMotifs = $derived(
		allMotifs.filter((d) =>
			d.regions.some(
				(r) =>
					(r?.character?.includes(character) ||
						character === "All Characters") &&
					(r["track-name"] === song || song === "All Songs")
			)
		)
	);
	let selectedMotif = $state(filteredMotifs[0].name);
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
		selectedMotif = filteredMotifs[0]?.name;
	};

	const musicalChange = () => {
		song = "All Songs";
		character = "All Characters";
		selectedMotif = filteredMotifs[0]?.name;
	};

	const songChange = () => {
		selectedMotif = filteredMotifs[0]?.name;
	};

	const characterChange = () => {
		selectedMotif = filteredMotifs[0]?.name;
	};

	const displaySong = (option) => {
		const trackData = tracks.find((t) => t.name.includes(option));
		return trackData?.displayName || option.replace(/^\d+-+\d+\s+/, "");
	};

	onMount(() => {
		const container = document.body;

		const handler = (e) => {
			if (
				e.target &&
				e.target.className &&
				e.target.className.includes("goto-")
			) {
				e.stopPropagation();

				if (
					e.target.parentElement &&
					e.target.parentElement.classList.contains("note")
				) {
					const exploreSection = document.getElementById("explore");
					if (exploreSection) {
						exploreSection.scrollIntoView({ behavior: "smooth" });
					}
				}

				musical = e.target.dataset.musical;
				song = "All Songs";
				character = "All Characters";
				selectedMotif = _.lowerCase(e.target.className.replace("goto-", ""));
			}
		};

		container.addEventListener("click", handler);

		return () => {
			container.removeEventListener("click", handler);
		};
	});
</script>

<div class="container">
	<div class="filters">
		<div class="select-wrapper">
			<label for="musical-select">Choose a musical</label>
			<select bind:value={musical} id="musical-select" onchange={musicalChange}>
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
				onchange={songChange}
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
				onchange={characterChange}
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
		title={`${musicalOptions.find((d) => d.value === musical).label}`}
		{favorites}
	/>

	<Motifs bind:selectedMotif {filteredMotifs} {tracks} {musical} {character} />

	<div class="fade-bottom" />
</div>

<style>
	.container {
		position: relative;
		max-width: 1000px;
		margin: 0 auto;
	}

	.filters {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
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

	.fade-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: linear-gradient(
			180deg,
			rgba(55, 55, 55, 0) 0%,
			rgba(55, 55, 55, 0.8) 50%,
			rgba(55, 55, 55, 1) 90%
		);
	}

	@media (max-width: 600px) {
		.filters {
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.select-wrapper {
			max-width: calc((100% - 1.5rem) / 3);
		}

		.fade-bottom {
			height: 30px;
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
