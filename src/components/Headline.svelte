<script>
	import hedSvg from "$svg/playbill-hed.svg";
	let { hed, dek, byline } = $props();
</script>

<div id="headline">
	<div class="border">
		<div class="playbill">
			<h1 class="sr-only">Common Threads</h1>
			{@html hedSvg}

			{#if dek}
				<h2>{dek}</h2>
			{/if}
		</div>
	</div>

	{#if byline}
		<p class="byline">{@html byline}</p>
	{/if}
</div>

<style>
	#headline {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 6rem auto 3rem auto;
	}

	.border {
		padding: 8px;
		background: var(--color-white);
		width: fit-content;
	}

	.playbill {
		background: var(--color-playbill-yellow);
		color: var(--color-bg);
		position: relative;
		text-align: center;
		max-width: 1000px;
		padding: 2rem 3rem;
		border: 1px solid var(--color-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		font-weight: normal;
		font-size: var(--18px);
		text-transform: uppercase;
		margin: 1.5rem 0 0 0;
	}

	.byline {
	}

	:global(#headline-wrapper a) {
		color: var(--color-bg);
		border-bottom: 1px solid var(--color-bg);
	}
</style>
