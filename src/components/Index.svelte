<script>
	import copy from "$data/copy.json";
	import raw from "$data/copy.json?raw";
	import CMS from "$components/helpers/CMS.svelte";
	import Test from "$components/demo/Demo.MicroCMSTest.svelte";
	import Footer from "$components/Footer.svelte";

	const { body } = copy;
	const components = { Test };
</script>

<article>
	<CMS {components} {body} />
</article>

<!-- <svelte:boundary onerror={(e) => console.error(e)}>
	<Footer recirc={true} />
</svelte:boundary> -->

<style>
	article {
		margin: 0 auto;
		max-width: 800px;
	}
</style>
