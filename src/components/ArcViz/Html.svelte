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
		motifColors
	} = $props();

	const audio = audioApi();
	let isMobile = $derived(dimensions.width <= 600);

	let playEls = $state({});

	const lesMisPlayable = $derived(
		isMobile
			? ["on my own"]
			: ["god on high", "on my own", "police", "the people b"]
	);

	const onKeyDown = (e) => {
		if (audio.figureId === id && id !== "explore") {
			const playEl = playEls[audio.motifData.motifId];
			if (!playEl) return;

			if (e.key === "ArrowLeft") {
				playEl.prev(e);
			} else if (e.key === "ArrowRight") {
				playEl.next(e);
			}
		}
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="html-layer"
	style:width={`${chartWidth}px`}
	style:height={`${chartHeight}px`}
	style:transform={`translate(${padding.left}px, ${padding.top}px)`}
	onkeydown={onKeyDown}
	tabindex="0"
	role="application"
	aria-label="keyboard arrow key controls"
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
		{@const actOfFirstOccurence = +motifs.find((m) => m.name === motifName)
			.regions[0]["track-name"][0]}
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
				{actOfFirstOccurence}
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
