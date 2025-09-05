<script>
	import copy from "$data/copy.json";
	import CMS from "$components/helpers/CMS.svelte";
	import PlayableText from "$components/PlayableText.svelte";
	import Piano from "$components/Piano.svelte";
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import Explore from "$components/Explore/Explore.svelte";
	import Image from "$components/Image.svelte";
	import Footer from "$components/Footer.svelte";
	import Carousel from "$components/Carousel.svelte";
	import { onMount, mount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";

	const { body } = copy;
	const components = { Piano, ArcViz, Carousel, Explore, Image };

	const audio = audioApi();
	let audioEl;

	const onClick = () => {
		audio.pauseAndClear();
	};

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

<article onclick={onClick}>
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

	:global(p, h2) {
		max-width: 700px;
		margin: 16px auto;
	}

	:global(p) {
		line-height: 1.6;
		font-size: var(--16px);
	}

	:global(h2) {
		font-weight: bold;
		font-size: var(--32px);
	}

	:global(section#explore) {
		margin-top: 8rem;
	}
</style>
