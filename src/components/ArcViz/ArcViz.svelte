<script>
	import Chart from "$components/ArcViz/Chart.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";
	import sortMotifRegions from "$utils/sortMotifRegions.js";
	import inView from "$actions/inView.js";

	let { id, title, musical = $bindable(), song, character, animate } = $props();

	const audio = audioApi();

	const dataMap = $derived({
		unlimited: {
			motifs: wickedMotifs.filter((d) => d.name === "unlimited"),
			tracks: wickedTracks
		},
		wicked: {
			motifs: wickedMotifs,
			tracks: wickedTracks
		},
		lesmis: {
			motifs: lesMisMotifs,
			tracks: lesMisTracks
		},
		hamilton: {
			motifs: hamiltonMotifs,
			tracks: hamiltonTracks
		},
		headline: {
			motifs: hamiltonMotifs,
			tracks: hamiltonTracks
		},
		"character-motif": {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "valjean rising" ||
					d.name === "valjean rising 2" ||
					d.name === "thenardier waltz" ||
					d.name === "cosette"
			),
			tracks: lesMisTracks
		},
		"character-motif-hamilton": {
			motifs: hamiltonMotifs.filter(
				(d) =>
					d.name === "alexander hamilton" ||
					d.name === "angelica" ||
					d.name === "eliza" ||
					d.name === "schuyler sisters" ||
					d.name === "phillip rap"
			),
			tracks: hamiltonTracks
		},
		idea: {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "anguish" ||
					d.name === "god on high" ||
					d.name === "drink with me" ||
					d.name === "look down"
			),
			tracks: lesMisTracks
		},
		"idea-ab": {
			motifs: lesMisMotifs.filter(
				(d) => d.name === "police 1" || d.name === "police 2"
			),
			tracks: lesMisTracks
		},
		"new-emotion": {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "friendship" ||
					d.name === "little people" ||
					d.name === "lovely ladies" ||
					d.name === "rain"
			),
			tracks: lesMisTracks
		},
		"new-emotion-hamilton": {
			motifs: hamiltonMotifs.filter(
				(d) => d.name === "counting" || d.name === "i imagine death"
			),
			tracks: hamiltonTracks
		},
		nonstop: {
			motifs: hamiltonMotifs
				.filter((d) =>
					d.regions.some((r) => r["track-name"] === "1-23 Non-Stop")
				)
				.map((d) => ({
					...d,
					regions: d.regions.filter((r) => r["track-name"].startsWith("1"))
				})),
			tracks: hamiltonTracks
		},
		"one-day-more": {
			motifs: lesMisMotifs.filter((d) =>
				d.regions.some((r) => r["track-name"] === "1-23 One Day More")
			),
			// .map((d) => ({
			// 	...d,
			// 	regions: d.regions.filter((r) => r["track-name"].startsWith("1"))
			// })),
			tracks: lesMisTracks
		},
		explore: {
			motifs:
				musical === "hamilton"
					? hamiltonMotifs
					: musical === "wicked"
						? wickedMotifs
						: lesMisMotifs,
			tracks:
				musical === "hamilton"
					? hamiltonTracks
					: musical === "wicked"
						? wickedTracks
						: lesMisTracks
		}
	});

	const motifs = $derived(
		_.orderBy(
			sortMotifRegions(dataMap[id].motifs).filter((d) => d.regions.length > 1),
			[(d) => d.regions[0]["track-name"], (d) => +d.regions[0].start],
			["asc", "asc"]
		)
	);
	const tracks = $derived(dataMap[id].tracks);

	const onExit = () => {
		if (audio.figureId === id) {
			audio.pauseAndClear();
		}
	};
</script>

<figure {id} class="arc-viz" use:inView onexit={onExit}>
	{#if title.split(":").length === 2}
		<h4>{title.split(":")[1].trim()}</h4>
	{:else}
		<h4>All motifs</h4>
	{/if}
	<h3>{title.split(":")[0]}</h3>

	<Chart {id} {musical} {song} {character} {animate} {motifs} {tracks} />

	<figcaption class="sr-only">
		A chart with time on the x-axis depicting the occurence of {motifs.length ===
		1
			? "the"
			: motifs.length}
		{title.toLowerCase().includes("all motifs")
			? "total motifs"
			: id === "explore"
				? "motifs"
				: title.toLowerCase().includes("one day more") ||
					  title.toLowerCase().includes("non-stop")
					? `motifs from ${title.split(":")[1].trim().toLowerCase()}`
					: title.split(":")[1].trim().toLowerCase()} in {musical}.
	</figcaption>
</figure>

<style>
	figure {
		position: relative;
		background: var(--color-gray-800);
		max-width: 1000px;
		margin: 3rem auto;
		padding: 2rem;
		overflow: hidden;
		border: 4px solid var(--color-fg);
	}

	:global(figure#headline) {
		background: none;
		margin: 0 auto;
		padding: 0;
	}

	:global(figure#explore) {
		margin-bottom: 0;
		border: none;
	}

	h3 {
		font-weight: bold;
		margin: 0;
	}

	@media (max-width: 400px) {
		figure {
			padding: 1rem;
		}

		figure#explore {
			padding: 1rem 0;
		}

		figure#explore h3 {
			padding: 0 1rem;
		}
	}
</style>
