<script>
	import Play from "$components/ArcViz/Play.svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import _ from "lodash";

	let { id, motifs, musical, motifPoints, motifColors, midY } = $props();

	const audio = audioApi();

	const onClick = () => {
		audio.pauseAndClear();
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="html-layer" onclick={onClick}>
	{#each Object.keys(motifPoints) as motifName}
		{@const i =
			audio.figureId === id &&
			audio.motifData.motifId === _.kebabCase(motifName)
				? audio.motifData.motifI
				: 0}
		{@const left = motifPoints[motifName][i].x}
		{@const tracks = motifs
			.find((m) => m.name === motifName)
			.regions.map((r) => ({
				start: r.start,
				end: r.end,
				src: `assets/audio/${musical}/${r["track-name"]}.mp3`
			}))}
		<Play
			{tracks}
			top={`${midY}px`}
			left={`${left}px`}
			color={motifColors[motifName]}
			chartId={id}
			motifId={_.kebabCase(motifName)}
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
