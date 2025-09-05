<script>
	let { hed, dek, byline } = $props();
</script>

<section class="headline">
	<h1>{hed}</h1>
	{#if dek}
		<h2>{dek}</h2>
	{/if}
	{#if byline}
		<p class="byline">{@html byline}</p>
	{/if}
</section>

<style>
	h1 {
		font-weight: bold;
	}

	h2 {
		font-weight: normal;
		font-size: var(--24px);
	}

	section {
		text-align: center;
		max-width: 700px;
		margin: 10rem auto 5rem auto;
	}
</style>
