<script>
	import Play from "$components/ArcViz/Play.svelte";

	let { id, motifPoints, motifColors, midY } = $props();
</script>

<div class="html-layer">
	{#each Object.keys(motifPoints) as motifName}
		{@const firstOccurence = motifPoints[motifName][0]}
		<Play
			chartId={id}
			top={`${midY}px`}
			left={`${firstOccurence.x}px`}
			{motifName}
			color={motifColors[motifName]}
			i={0}
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
