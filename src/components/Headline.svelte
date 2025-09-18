<script>
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	let { hed, dek, byline } = $props();
</script>

<div id="headline-wrapper">
	<h1>{hed}</h1>
	{#if dek}
		<h2>{dek}</h2>
	{/if}
	{#if byline}
		<p class="byline">{@html byline}</p>
	{/if}

	<div class="viz">
		<ArcViz id="headline" musical="les mis" animate={true} />
	</div>
</div>

<style>
	h1 {
		font-weight: bold;
		font-size: 90px;
	}

	h2 {
		font-weight: normal;
		font-size: var(--24px);
	}

	#headline-wrapper {
		position: relative;
		text-align: center;
		max-width: 1000px;
		height: 300px;
		margin: 8rem auto 4rem auto;
	}

	.viz {
		position: absolute;
		top: 0;
		width: 100%;
		max-height: 100%;
		opacity: 0.2;
	}

	@media (max-width: 400px) {
		h1 {
			font-size: 64px;
		}
	}
</style>
