<script>
	import Viz from "$components/ArcViz.Viz.svelte";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";

	let { id } = $props();

	const dataMap = {
		unlimited: {
			motifs: wickedMotifs.filter((d) => d.name === "unlimited"),
			tracks: wickedTracks
		},
		wicked: {
			motifs: wickedMotifs,
			tracks: wickedTracks
		},
		"les-mis": {
			motifs: lesMisMotifs,
			tracks: lesMisTracks
		}
	};
</script>

<figure {id} class="arc-viz">
	<Viz motifs={dataMap[id].motifs} tracks={dataMap[id].tracks} />
</figure>

<style>
	.arc-viz {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
