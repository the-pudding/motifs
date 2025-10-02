<script>
	import svg1 from "$svg/technique1.svg";
	import svg2 from "$svg/technique2.svg";
	import svg3 from "$svg/technique3.svg";
	import svg4 from "$svg/technique4.svg";
	import svgExplore from "$svg/explore.svg";

	let { id } = $props();

	const svgMap = {
		technique1: svg1,
		technique2: svg2,
		technique3: svg3,
		technique4: svg4,
		explore: svgExplore
	};
</script>

<div class="border" id={`playbill-header-${id}`}>
	<div class="wrapper">
		{@html svgMap[id] || ""}
	</div>
</div>

<style>
	.border {
		max-width: 200px;
		padding: 4px;
		margin: 0 auto;
		background: white;
	}

	.wrapper {
		background: var(--color-playbill-yellow);
		padding: 1rem 1rem 0.75rem 1rem;
		border: 1px solid var(--color-bg);
	}

	:global(#playbill-header-explore) {
		margin-bottom: 3rem;
		max-width: 300px;
	}

	:global(#playbill-header-explore .wrapper) {
		padding: 1.5rem 1.5rem 1.25rem 1.25rem;
	}
</style>
