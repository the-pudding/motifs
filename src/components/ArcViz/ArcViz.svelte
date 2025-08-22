<script>
	import Chart from "$components/ArcViz/Chart.svelte";
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
		sound.isPlaying && sound.chartId && sound.chartId === id && sound.motifId
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
			// 1) Keep only one region per track-name: the one with the lowest start
			const byTrack = new Map();
			for (const r of motif.regions) {
				const key = r["track-name"];
				const prev = byTrack.get(key);
				if (
					!prev ||
					Number(r.start) < Number(prev.start) ||
					(Number(r.start) === Number(prev.start) &&
						Number(r.end) < Number(prev.end))
				) {
					byTrack.set(key, r);
				}
			}

			const filtered = Array.from(byTrack.values());

			// 2) Sort by act, then song, then track-name
			const sortedRegions = filtered.sort((a, b) => {
				const A = parseTrackName(a["track-name"]);
				const B = parseTrackName(b["track-name"]);
				if (A.act !== B.act) return A.act - B.act;
				if (A.song !== B.song) return A.song - B.song;
				if (a["track-name"] !== b["track-name"]) {
					return a["track-name"].localeCompare(b["track-name"]);
				}
				return Number(a.start) - Number(b.start);
			});

			return { ...motif, regions: sortedRegions };
		});
	};

	const dataMap = $derived({
		unlimited: {
			motifs: sortMotifRegions(
				wickedMotifs.filter((d) => d.name === "unlimited")
			),
			tracks: wickedTracks
		},
		wicked: {
			motifs: sortMotifRegions(wickedMotifs),
			tracks: wickedTracks
		},
		lesmis: {
			motifs: sortMotifRegions(lesMisMotifs),
			tracks: lesMisTracks
		},
		hamilton: {
			motifs: sortMotifRegions(hamiltonMotifs),
			tracks: hamiltonTracks
		},
		"character-motif": {
			motifs: sortMotifRegions(
				lesMisMotifs.filter(
					(d) =>
						d.name === "jvj 1" ||
						d.name === "jvj 2" ||
						d.name === "thenardier waltz" ||
						d.name === "cosette" ||
						d.name === "little people"
				)
			),
			tracks: lesMisTracks
		},
		"character-motif-hamilton": {
			motifs: sortMotifRegions(
				hamiltonMotifs.filter(
					(d) =>
						d.name === "alexander hamilton" ||
						d.name === "angelica" ||
						d.name === "eliza" ||
						d.name === "schuyler sisters" ||
						d.name === "phillip rap"
				)
			),
			tracks: hamiltonTracks
		},
		idea: {
			motifs: sortMotifRegions(
				lesMisMotifs.filter(
					(d) =>
						d.name === "anguish" ||
						d.name === "god on high" ||
						d.name === "drink with me" ||
						d.name === "look down"
				)
			),
			tracks: lesMisTracks
		},
		"idea-ab": {
			motifs: sortMotifRegions(
				lesMisMotifs.filter(
					(d) => d.name === "police 1" || d.name === "police 2"
				)
			),
			tracks: lesMisTracks
		},
		"new-emotion": {
			motifs: sortMotifRegions(
				lesMisMotifs.filter(
					(d) =>
						d.name === "friendship" ||
						d.name === "little people" ||
						d.name === "lovely ladies" ||
						d.name === "rain"
				)
			),
			tracks: lesMisTracks
		},
		"new-emotion-hamilton": {
			motifs: sortMotifRegions(
				hamiltonMotifs.filter(
					(d) => d.name === "counting" || d.name === "i imagine death"
				)
			),
			tracks: hamiltonTracks
		},
		nonstop: {
			motifs: sortMotifRegions(
				hamiltonMotifs.filter((d) =>
					d.regions.some((r) => r["track-name"] === "1-23 Non-Stop")
				)
			).map((d) => ({
				...d,
				regions: d.regions.filter((r) => r["track-name"].startsWith("1"))
			})),
			tracks: hamiltonTracks
		},
		"one-day-more": {
			motifs: sortMotifRegions(
				lesMisMotifs
					.filter((d) =>
						d.regions.some((r) => r["track-name"] === "1-23 One Day More")
					)
					.map((d) => ({
						...d,
						regions: d.regions.filter((r) => r["track-name"].startsWith("1"))
					}))
			),
			tracks: lesMisTracks
		},
		explore: {
			motifs:
				musical === "hamilton"
					? sortMotifRegions(hamiltonMotifs)
					: musical === "wicked"
						? sortMotifRegions(wickedMotifs)
						: sortMotifRegions(lesMisMotifs),
			tracks:
				musical === "hamilton"
					? hamiltonTracks
					: musical === "wicked"
						? wickedTracks
						: lesMisTracks
		}
	});
</script>

<figure {id} class="arc-viz">
	{#if title}<h3>{title}</h3>{/if}
	<h4 class:visible={currentTrack}>Now playing: {currentTrack}</h4>
	<Chart
		{id}
		{musical}
		motifs={dataMap[id].motifs}
		tracks={dataMap[id].tracks}
		interactive={interactive === true}
	/>
</figure>

<style>
	figure {
		background: var(--color-gray-100);
		max-width: 1000px;
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
