<script>
	let { title, content, components } = $props();
</script>

<details>
	<summary>
		<h2>{title}</h2>
	</summary>

	{#each content as { type, value }}
		{@const C = components[type]}
		{@const isString = typeof value === "string"}
		{#if type === "CollapsibleSection"}
			<C {...value} {components} />
		{:else if C}
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
	h2 {
		display: inline;
		margin: 0;
		font-weight: bold;
		font-size: 24px;
	}

	details {
		max-width: 1000px;
		margin: 0 auto;
		border: 1px solid var(--color-gray-400);
		border-bottom: none;
	}

	details:last-of-type {
		border-bottom: 1px solid var(--color-gray-400);
	}

	summary {
		padding: 0.5rem 1rem;
		background: var(--color-gray-200);
	}

	summary:hover {
		cursor: pointer;
	}
</style>
