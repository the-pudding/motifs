<script>
	import Chart from "$components/ArcViz/Chart.svelte";
	import Motifs from "$components/ArcViz/Motifs.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";

	let { id, title, musical, song, character, animate, notes } = $props();

	const audio = audioApi();

	let note = $derived(
		notes && audio.motifData ? notes[audio.motifData.motifId] : null
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

		return _.orderBy(
			motifs.map((motif) => {
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
			}),
			// 3) Sort motifs by first region start time
			(d) => [d.regions[0]["track-name"], d.regions[0].start],
			["asc", "asc"]
		);
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
		headline: {
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
						d.name === "cosette"
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
	{#if note}
		<div class="border" class:visible={audio.figureId === id}>
			<div class="note">
				🎧 {@html note}
			</div>
		</div>
	{/if}

	{#if title}<h3>{title}</h3>{/if}
	<Chart
		{id}
		{musical}
		{song}
		{character}
		{animate}
		motifs={dataMap[id].motifs}
		tracks={dataMap[id].tracks}
	/>

	{#if id === "explore"}
		<Motifs motifs={dataMap[id].motifs} {musical} {song} {character} />
	{/if}
</figure>

<style>
	figure {
		position: relative;
		background: var(--color-gray-800);
		max-width: 1000px;
		margin: 3rem auto;
		padding: 2rem;
	}

	:global(figure#headline) {
		background: none;
		margin: 0 auto;
		padding: 0;
	}

	h3 {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 20px;
		margin: 0;
	}

	.border {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 2px;
		max-width: 40%;
		background: var(--color-white);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.border.visible {
		opacity: 1;
	}

	.note {
		background: var(--color-playbill-yellow);
		color: var(--color-bg);
		padding: 1rem;
		font-size: var(--14px);
		border: 1px solid var(--color-bg);
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
