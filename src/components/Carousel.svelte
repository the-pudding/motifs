<script>
	let { sections, components } = $props();

	let selectedSection = $state(0);
</script>

<div class="carousel">
	<div class="nav">
		{#each sections as { title, content }, i}
			<div class="section-name" class:selected={selectedSection === i}>
				<div>{title}</div>
				<div class="circle" onclick={() => (selectedSection = i)} />
			</div>
		{/each}
	</div>

	{#each sections[selectedSection].content as { type, value }}
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
</div>

<style>
	.carousel {
		max-width: 1000px;
		margin: 5rem auto;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		max-width: 700px;
		margin: 0 auto;
		margin-bottom: 3rem;
	}

	.section-name {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		color: var(--color-gray-400);
	}

	.circle {
		height: 25px;
		width: 25px;
		border-radius: 50%;
		background: var(--color-gray-500);
	}

	.circle:hover {
		cursor: pointer;
	}

	.selected .circle {
		height: 50px;
		width: 50px;
		margin: 0;
		background: var(--color-playbill-yellow);
		filter: blur(3px);
	}

	.selected {
		font-size: var(--20px);
		font-weight: bold;
		color: var(--color-fg);
		gap: 1rem;
	}
</style>
