<script>
	import copy from "$data/copy.json";
	import CMS from "$components/helpers/CMS.svelte";
	import PlayableText from "$components/PlayableText.svelte";
	import Piano from "$components/Piano.svelte";
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import Explore from "$components/Explore/Explore.svelte";
	import Footer from "$components/Footer.svelte";
	import { onMount, mount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import CollapsibleSection from "$components/CollapsibleSection.svelte";

	const { body } = copy;
	const components = { Piano, ArcViz, CollapsibleSection, Explore };

	const audio = audioApi();
	let audioEl;

	onMount(() => {
		audio.setup(audioEl);

		const playable = document.querySelectorAll("span.playable");

		playable.forEach((el, i) => {
			const text = el.innerText;
			const src = el.dataset.src;
			el.innerText = "";

			mount(PlayableText, {
				target: el,
				props: { id: `playable-${i}`, src, text }
			});
		});
	});

	onDestroy(() => audio.destroy());
</script>

<article>
	<CMS {components} {body} />
</article>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Footer recirc={true} />
</svelte:boundary>

<audio bind:this={audioEl}></audio>

<style>
	article {
		padding: 2rem;
	}

	:global(p) {
		max-width: 700px;
	}

	:global(p) {
		margin: 16px auto;
	}
</style>
