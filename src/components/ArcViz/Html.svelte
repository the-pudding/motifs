<script>
	import Play from "$components/ArcViz/Play.svelte";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { id, motifs, motifPoints, motifColors, midY } = $props();
	const sound = getContext("sound");

	const onClick = () => {
		sound.chartId = undefined;
		sound.motifId = undefined;
		sound.motifI = undefined;
		sound.isPlaying = false;
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="html-layer" onclick={onClick}>
	{#each Object.keys(motifPoints) as motifName}
		{@const i =
			sound.chartId === id && sound.motifId === _.kebabCase(motifName)
				? sound.motifI
				: 0}
		{@const left = motifPoints[motifName][i].x}
		{@const tracks = motifs
			.find((m) => m.name === motifName)
			.regions.map((r) => ({
				start: r.start,
				end: r.end,
				src: `assets/audio/${id === "unlimited" || id === "wicked" ? "wicked" : "lesmis"}/${r["track-name"]}.mp3`
			}))}
		<Play
			top={`${midY}px`}
			left={`${left}px`}
			color={motifColors[motifName]}
			chartId={id}
			{motifName}
			{tracks}
		/>
	{/each}
</div>

<style>
	.html-layer {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
