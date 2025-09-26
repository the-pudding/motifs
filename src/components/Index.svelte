<script>
	import copy from "$data/copy.json";
	import Header from "$components/Header.svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import Headline from "$components/Headline.svelte";
	import PlayableText from "$components/PlayableText.svelte";
	import Piano from "$components/Piano.svelte";
	import ArcViz from "$components/ArcViz/ArcViz.svelte";
	import Explore from "$components/Explore/Explore.svelte";
	import Image from "$components/Image.svelte";
	import Summary from "$components/Summary.svelte";
	import Footer from "$components/Footer.svelte";
	import Carousel from "$components/Carousel.svelte";
	import { onMount, mount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import { unlimited } from "$runes/misc.svelte.js";
	import { base } from "$app/paths";

	const { body } = copy;
	const components = {
		Headline,
		Piano,
		ArcViz,
		Carousel,
		Explore,
		Image,
		Summary
	};

	const audio = audioApi();
	let audioEl;
	let articleHeight = $state(0);
	let articleReady = $state(false);

	const onClick = () => {
		unlimited.isClicked = true;
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

		articleReady = true;
	});

	onDestroy(() => audio.destroy());
</script>

<div
	class="curtain"
	class:open={unlimited.isClicked}
	style:height={unlimited.isClicked ? `${articleHeight}px` : "auto"}
	style={`--curtain-src: url(${base}/assets/img/curtain.jpeg)`}
>
	<div class="curtain-wrapper">
		<Header />

		<div class="panel left"></div>

		<article
			onclick={onClick}
			class:unlimited-clicked={unlimited.isClicked}
			class:visible={articleReady}
			bind:clientHeight={articleHeight}
		>
			<CMS {components} {body} />
		</article>

		<div class="panel right"></div>
	</div>
</div>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Footer recirc={true} />
</svelte:boundary>

<audio bind:this={audioEl}></audio>

<style>
	article {
		padding: 2rem;
		padding-top: 12rem;
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	article.visible {
		opacity: 1;
	}

	.open article {
		height: auto;
	}

	.curtain {
		width: 100%;
		height: 100svh;
		overflow: hidden;
		position: relative;
	}

	.curtain.open {
		overflow: auto;
	}

	.curtain-wrapper {
		width: 100%;
		height: 100%;
	}

	.panel {
		width: 50%;
		height: 100svh;
		float: left;
		position: relative;
		z-index: 1;
		transition: transform var(--1s) ease-in-out;
		background-image:
			linear-gradient(to bottom, rgba(37, 34, 34, 1), rgba(37, 34, 34, 0.25)),
			var(--curtain-src);
		background-size: 200% 100%;
		background-repeat: no-repeat;
		background-position-y: top;
		pointer-events: none;
	}

	.left {
		transform: translateX(0);
		background-position-x: left;
	}

	.right {
		transform: translateX(0);
		background-position-x: right;
	}

	.open .left {
		transform: translateX(-100%);
	}

	.open .right {
		transform: translateX(100%);
	}

	:global(p, h2) {
		max-width: 700px;
		margin: 16px auto;
	}

	:global(p) {
		line-height: 1.8;
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

	:global(p.callout) {
		font-weight: bold;
		margin-top: 1.5rem;
	}

	:global(span.green) {
		color: var(--color-wicked-green);
		text-transform: uppercase;
	}

	:global(span.note) {
		font-size: var(--14px);
		color: var(--color-gray-300);
	}

	:global(section#intro) {
		margin-bottom: 0;
	}

	:global(section#motifs) {
		margin-top: 0;
	}

	:global(section#explore) {
		margin-top: 8rem;
	}

	:global(p.spotlight) {
		text-align: center;
		margin-bottom: 3rem;
		width: fit-content;
	}

	:global(p.begin) {
		text-align: center;
		width: fit-content;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		font-size: var(--12px);
		color: var(--color-gray-200);
	}

	:global(.open .begin) {
		display: none;
	}

	:global(article section > *) {
		opacity: 0;
	}

	:global(article.unlimited-clicked section > *) {
		opacity: 1;
		transition: opacity calc(var(--1s) * 0.5) calc(var(--1s) * 0.5) ease-in-out;
	}

	:global(main) {
		height: 100svh;
		overflow: hidden;
	}

	:global(main:has(> .curtain.open)) {
		height: auto;
		overflow: visible;
	}

	:global(
		#intro p:first-of-type,
		#intro p:first-of-type *,
		#intro p:nth-of-type(2)
	) {
		opacity: 1;
	}

	@media (max-width: 600px) {
		article {
			padding: 1rem;
			padding-top: 8rem;
		}
	}
</style>
