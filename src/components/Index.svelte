<script>
	import copy from "$data/copy.json";
	import CMS from "$components/helpers/CMS.svelte";
	import Headline from "$components/Headline.svelte";
	import PlayableText from "$components/PlayableText.svelte";
	import Piano from "$components/Piano.svelte";
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import Explore from "$components/Explore/Explore.svelte";
	import Image from "$components/Image.svelte";
	import Footer from "$components/Footer.svelte";
	import Carousel from "$components/Carousel.svelte";
	import { onMount, mount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import { unlimited } from "$runes/misc.svelte.js";

	const { body } = copy;
	const components = { Headline, Piano, ArcViz, Carousel, Explore, Image };

	const audio = audioApi();
	let audioEl;

	const onClick = () => {
		if (
			audio.src === "assets/audio/intro/unlimited.mp3" &&
			!unlimited.isClicked
		) {
			unlimited.isClicked = true;
		}

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

<article onclick={onClick} class:unlimited-clicked={unlimited.isClicked}>
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

	:global(h4) {
		font-weight: bold;
		font-size: var(--28px);
		max-width: 700px;
		margin: 2rem auto;
	}

	:global(span.note) {
		font-size: var(--14px);
		color: var(--color-gray-300);
	}

	:global(section#explore) {
		margin-top: 8rem;
	}

	:global(p.spotlight) {
		text-align: center;
		margin-bottom: 5rem;
	}

	:global(article section > *) {
		opacity: 0;
	}

	:global(article.unlimited-clicked section > *) {
		opacity: 1;
		transition: opacity calc(var(--1s) * 0.5) ease-in-out;
	}

	:global(main) {
		height: calc(100vh - 102.08px);
		overflow: hidden;
	}

	:global(main:has(> article.unlimited-clicked)) {
		height: auto;
		overflow: visible;
	}

	:global(#intro p:first-of-type, #intro p:first-of-type *) {
		opacity: 1;
	}
</style>
