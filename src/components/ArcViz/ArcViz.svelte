<script>
	import Chart from "$components/ArcViz/Chart.svelte";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";

	let { id, title } = $props();

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
		"les-mis": {
			motifs: sortMotifRegions(lesMisMotifs),
			tracks: lesMisTracks
		}
	};
</script>

<figure {id} class="arc-viz">
	<h3>{title}</h3>
	<Chart {id} motifs={dataMap[id].motifs} tracks={dataMap[id].tracks} />
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
</style>
