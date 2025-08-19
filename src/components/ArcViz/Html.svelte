<script>
	import Play from "$components/ArcViz/Play.svelte";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { id, motifPoints, motifColors, midY } = $props();
	const sound = getContext("sound");

	const onClick = () => {
		sound.chartId = undefined;
		sound.motifId = undefined;
		sound.motifI = undefined;
		sound.active = false;
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
		<Play
			top={`${midY}px`}
			left={`${left}px`}
			color={motifColors[motifName]}
			chartId={id}
			{motifName}
			srcs={Array(motifPoints[motifName].length).fill("assets/audio/test.mp3")}
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
