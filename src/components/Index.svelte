<script>
	import copy from "$data/copy.json";
	import raw from "$data/copy.json?raw";
	import CMS from "$components/helpers/CMS.svelte";
	import PlayableText from "$components/PlayableText.svelte";
	import ArcViz from "$components/ArcViz.svelte";
	import Footer from "$components/Footer.svelte";
	import { onMount, mount } from "svelte";

	const { body } = copy;
	const components = { ArcViz };

	onMount(() => {
		const playable = document.querySelectorAll("span.playable");
		console.log({ playable });

		playable.forEach((el) => {
			const text = el.innerText;
			const id = el.dataset.id;
			el.innerText = "";

			const newComponent = mount(PlayableText, {
				target: el,
				props: { id, text }
			});
		});
	});
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
