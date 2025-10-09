<script>
	import { onMount } from "svelte";

	let { src, alt, caption } = $props();

	let prefersReducedMotion = $state(false);

	onMount(() => {
		prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
	});
</script>

<div class="img-wrapper">
	<div class="border">
		{#if src.includes("gif") && prefersReducedMotion}
			<img src={`assets/img/married-life-still.png`} {alt} loading="lazy" />
		{:else}
			<img src={`assets/img/${src}`} {alt} loading="lazy" />
		{/if}
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
