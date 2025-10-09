<script>
	import Piano from "$components/Piano.svelte";

	let { summary, summaryOpen, summaryClosed, content = [] } = $props();

	let open = $state(false);

	const components = { Piano };
</script>

<details bind:open>
	<summary
		>{summaryOpen && summaryClosed
			? open
				? summaryOpen
				: summaryClosed
			: summary}</summary
	>

	{#each content as { type, value }}
		{@const C = components[type]}
		{@const isString = typeof value === "string"}
		{#if C}
			<C {...value} />
		{:else if type === "text"}
			<p>{@html value}</p>
		{:else if isString}
			<svelte:element this={type}>
				{@html value}
			</svelte:element>
		{:else}
			<svelte:element this={type} {...value}></svelte:element>
		{/if}
	{/each}
</details>

<style>
	details {
		max-width: 700px;
		margin: 2rem auto 1rem;
		transform: translate(0, 0);
	}

	/* details:open {
		border: 4px solid var(--color-fg);
		padding: 1rem;
	} */

	details * {
		font-size: var(--14px);
	}

	summary {
		font-weight: bold;
		font-size: var(--12px);
		margin-bottom: 1rem;
		transition: transform calc(var(--1s) * 0.2) ease !important;
	}

	summary:hover {
		cursor: pointer;
		transform: translate(0.1rem, 0);
	}
</style>
