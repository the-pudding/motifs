<script>
	let { src, alt, caption } = $props();
</script>

<div class="img-wrapper">
	<div class="border">
		<img src={`assets/img/${src}`} {alt} loading="lazy" />
	</div>

	{#if caption}
		<div class="caption">{@html caption}</div>
	{/if}
</div>

<style>
	.img-wrapper {
		max-width: 450px;
		margin: 3rem auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img,
	.caption {
		width: 450px;
	}

	.border {
		padding: 4px;
		background: var(--color-white);
		width: fit-content;
	}

	.caption {
		margin-top: 0.5rem;
		font-size: var(--14px);
		font-style: italic;
		color: var(--color-gray-200);
		width: 100%;
	}
</style>
