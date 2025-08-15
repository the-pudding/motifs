<script>
	import copy from "$data/copy.json";
	import raw from "$data/copy.json?raw";
	import CMS from "$components/helpers/CMS.svelte";
	import ArcViz from "$components/ArcViz.svelte";
	import Footer from "$components/Footer.svelte";

	const { body } = copy;
	const components = { ArcViz };
</script>

<article>
	<CMS {components} {body} />
</article>

<!-- <svelte:boundary onerror={(e) => console.error(e)}>
	<Footer recirc={true} />
</svelte:boundary> -->

<style>
	article {
		padding: 2rem;
	}

	:global(p, h2, h3) {
		max-width: 700px;
		margin: 16px auto;
	}
</style>
