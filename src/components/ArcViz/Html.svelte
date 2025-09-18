<script>
	import Play from "$components/ArcViz/Play.svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import _ from "lodash";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";

	let dimensions = new useWindowDimensions();

	let { id, padding, motifs, musical, motifPoints, motifColors } = $props();

	const audio = audioApi();
	let isMobile = $derived(dimensions.width <= 600);

	const lesMisPlayable = $derived(
		isMobile
			? ["on my own"]
			: ["god on high", "on my own", "police 1", "the people 2"]
	);

	const onClick = () => {
		audio.pauseAndClear();
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="html-layer"
	onclick={onClick}
	style:transform={`translate(${padding.left}px, ${padding.top}px)`}
>
	{#each Object.keys(motifPoints) as motifName}
		{@const i =
			audio.figureId === id &&
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
		{@const tracks = motifs
			.find((m) => m.name === motifName)
			.regions.map((r) => ({
				src: `assets/audio/${musical}/${r["track-name"]}.mp3`,
				...r
			}))}
		{#if id !== "lesmis" || lesMisPlayable.includes(motifName)}
			<Play
				{tracks}
				top={`${top}px`}
				left={`${left}px`}
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
		width: 100%;
		height: 100%;
	}
</style>
