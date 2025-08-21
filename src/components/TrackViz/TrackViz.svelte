<script>
	import Chart from "$components/TrackViz/Chart.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { id, title, musical, interactive = true } = $props();
	const sound = getContext("sound");

	let currentTrack = $derived(
		sound.isPlaying && sound.chartId && sound.motifId
			? dataMap[sound.chartId].motifs.find(
					(m) => _.kebabCase(m.name) === sound.motifId
				).regions[sound.motifI]["track-name"]
			: undefined
	);

	const sortMotifRegions = (motifs) => {
		const parseTrackName = (trackName) => {
			const match = trackName.match(/^(\d+)-(\d+)/);
			if (!match) return { act: Infinity, song: Infinity };
			return {
				act: parseInt(match[1], 10),
				song: parseInt(match[2], 10)
			};
		};

		return motifs.map((motif) => {
			const sortedRegions = [...motif.regions].sort((a, b) => {
				const A = parseTrackName(a["track-name"]);
				const B = parseTrackName(b["track-name"]);
				if (A.act !== B.act) return A.act - B.act;
				if (A.song !== B.song) return A.song - B.song;
				return a["track-name"].localeCompare(b["track-name"]);
			});

			return { ...motif, regions: sortedRegions };
		});
	};

	const dataMap = {
		// unlimited: {
		// 	motifs: sortMotifRegions(
		// 		wickedMotifs.filter((d) => d.name === "unlimited")
		// 	),
		// 	tracks: wickedTracks
		// },
		// wicked: {
		// 	motifs: sortMotifRegions(wickedMotifs),
		// 	tracks: wickedTracks
		// },
		// lesmis: {
		// 	motifs: sortMotifRegions(lesMisMotifs),
		// 	tracks: lesMisTracks
		// },
		// hamilton: {
		// 	motifs: sortMotifRegions(hamiltonMotifs),
		// 	tracks: hamiltonTracks
		// },
		"character-motif": {
			motifs: sortMotifRegions(
				lesMisMotifs.filter(
					(d) =>
						d.name === "jvj 1" ||
						d.name === "jvj 2" ||
						d.name === "eponine 1" ||
						d.name === "eponine 2" ||
						d.name === "thenardier waltz" ||
						d.name === "cosette" ||
						d.name === "cosette 2" ||
						d.name === "little people"
				)
			),
			tracks: lesMisTracks
		},
		"character-switch": {
			motifs: sortMotifRegions(
				wickedMotifs.filter((d) => d.name === "i'm not that girl")
			),
			tracks: wickedTracks
		}
	};
</script>

<figure {id} class="arc-viz">
	<h3>{title}</h3>
	<h4 class:visible={currentTrack}>Now playing: {currentTrack}</h4>
	<Chart
		{id}
		{musical}
		motifs={dataMap[id].motifs}
		tracks={dataMap[id].tracks}
	/>
</figure>

<style>
	figure {
		background: var(--color-gray-100);
		max-width: 1000px;
		margin: 3rem auto;
		padding: 1rem 2rem;
	}

	h3 {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 20px;
	}

	h4 {
		font-size: 14px;
		font-family: var(--mono);
		visibility: hidden;
	}

	h4.visible {
		visibility: visible;
	}
</style>
