<script>
	import Play from "$components/ArcViz/Play.svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import _ from "lodash";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";

	let dimensions = new useWindowDimensions();

	let {
		id,
		chartWidth,
		chartHeight,
		padding,
		motifs,
		tracks,
		musical,
		motifPoints,
		motifColors,
		playEls = $bindable()
	} = $props();

	const audio = audioApi();
	let isMobile = $derived(dimensions.width <= 600);

	const lesMisPlayable = $derived(
		isMobile
			? ["on my own"]
			: dimensions.width < 960
				? ["god on high", "on my own"]
				: ["god on high", "on my own", "police", "the people b"]
	);
</script>

<div
	class="html-layer"
	style:width={`${chartWidth}px`}
	style:height={`${chartHeight}px`}
	style:transform={`translate(${padding.left}px, ${padding.top}px)`}
>
	{#each Object.keys(motifPoints) as motifName, motifI}
		{@const i =
			audio.figureId === id &&
			audio.motifData &&
			audio.motifData.motifId === _.kebabCase(motifName)
				? audio.motifData.motifI
				: 0}
		{@const left = motifPoints[motifName][i].x}
		{@const top =
			id === "lesmis"
				? motifPoints[motifName][i].y
				: motifPoints[motifName][i].y}
		{@const regions = motifs
			.find((m) => m.name === motifName)
			.regions.map((r) => ({
				src: `assets/audio/${musical}/${r["track-name"]}.mp3`,
				...r
			}))}
		{#if id !== "lesmis" || lesMisPlayable.includes(motifName)}
			<Play
				bind:this={playEls[_.kebabCase(motifName)]}
				top={`${top}px`}
				left={`${left}px`}
				{regions}
				{tracks}
				{chartWidth}
				{padding}
				color={motifColors[motifName]}
				chartId={id}
				motifId={_.kebabCase(motifName)}
				emoji={motifs.find((m) => m.name === motifName).emoji}
			/>
		{/if}
	{/each}
</div>

<style>
	.html-layer {
		position: absolute;
		top: 0;
	}
</style>
