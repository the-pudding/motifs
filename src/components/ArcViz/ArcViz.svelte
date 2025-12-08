<script>
	import Chart from "$components/ArcViz/Chart.svelte";
	import Note from "$components/ArcViz/Note.svelte";
	import lesMisMotifs from "$data/motifs/lesmis-motifs.json";
	import wickedMotifs from "$data/motifs/wicked-motifs.json";
	import hamiltonMotifs from "$data/motifs/hamilton-motifs.json";
	import hamiltonTracks from "$data/tracks/hamilton-tracks.json";
	import lesMisTracks from "$data/tracks/lesmis-tracks.json";
	import wickedTracks from "$data/tracks/wicked-tracks.json";
	import _ from "lodash";
	import copy from "$data/copy.json";
	import { fly } from "svelte/transition";
	import { cubicOut, cubicIn } from "svelte/easing";
	import { audioApi } from "$runes/audio.svelte.js";
	import sortMotifRegions from "$utils/sortMotifRegions.js";
	import inView from "$actions/inView.js";
	import { onMount } from "svelte";

	let { id, title, musical = $bindable(), song, character, animate } = $props();

	const audio = audioApi();

	let playEls = $state({});
	let prefersReducedMotion = $state(false);

	const dataMap = $derived({
		unlimited: {
			motifs: wickedMotifs.filter((d) => d.name === "unlimited"),
			tracks: wickedTracks
		},
		wicked: {
			motifs: wickedMotifs,
			tracks: wickedTracks
		},
		lesmis: {
			motifs: lesMisMotifs,
			tracks: lesMisTracks
		},
		hamilton: {
			motifs: hamiltonMotifs,
			tracks: hamiltonTracks
		},
		headline: {
			motifs: hamiltonMotifs,
			tracks: hamiltonTracks
		},
		"character-motif": {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "valjean rising" ||
					d.name === "valjean rising 2" ||
					d.name === "thenardier waltz" ||
					d.name === "cosette"
			),
			tracks: lesMisTracks
		},
		"character-motif-hamilton": {
			motifs: hamiltonMotifs.filter(
				(d) =>
					d.name === "alexander hamilton" ||
					d.name === "angelica" ||
					d.name === "eliza" ||
					d.name === "schuyler sisters" ||
					d.name === "phillip rap"
			),
			tracks: hamiltonTracks
		},
		idea: {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "anguish" ||
					d.name === "god on high" ||
					d.name === "drink with me" ||
					d.name === "look down"
			),
			tracks: lesMisTracks
		},
		"idea-ab": {
			motifs: lesMisMotifs.filter(
				(d) => d.name === "police 1" || d.name === "police 2"
			),
			tracks: lesMisTracks
		},
		"new-emotion": {
			motifs: lesMisMotifs.filter(
				(d) =>
					d.name === "friendship" ||
					d.name === "little people" ||
					d.name === "lovely ladies" ||
					d.name === "rain"
			),
			tracks: lesMisTracks
		},
		"new-emotion-hamilton": {
			motifs: hamiltonMotifs.filter(
				(d) => d.name === "counting" || d.name === "i imagine death"
			),
			tracks: hamiltonTracks
		},
		nonstop: {
			motifs: hamiltonMotifs.filter((d) =>
				d.regions.some((r) => r["track-name"] === "1-23 Non-Stop")
			),
			tracks: hamiltonTracks
		},
		"one-day-more": {
			motifs: lesMisMotifs.filter((d) =>
				d.regions.some((r) => r["track-name"] === "1-23 One Day More")
			),
			tracks: lesMisTracks
		},
		explore: {
			motifs:
				musical === "hamilton"
					? hamiltonMotifs
					: musical === "wicked"
						? wickedMotifs
						: lesMisMotifs,
			tracks:
				musical === "hamilton"
					? hamiltonTracks
					: musical === "wicked"
						? wickedTracks
						: lesMisTracks
		}
	});
	const motifs = $derived(sortMotifRegions(dataMap[id].motifs));
	const tracks = $derived(dataMap[id].tracks);
	let notes = $derived(
		motifs.map((m) => ({
			motifId: _.kebabCase(m.name),
			note: copy.descriptions[musical]?.[_.kebabCase(m.name)] || null
		}))
	);
	const longestIndex = $derived(
		notes.findIndex(
			(d) => d.note.length === _.maxBy(notes, (d) => d.note.length).note.length
		)
	);

	const onExit = () => {
		if (audio.figureId === id) {
			audio.pauseAndClear();
		}
	};
	const onKeyDown = (e) => {
		if (audio.figureId === id && id !== "explore") {
			const playEl = playEls[audio.motifData.motifId];
			if (!playEl) return;

			if (e.key === "ArrowLeft") {
				playEl.prev(e);
			} else if (e.key === "ArrowRight") {
				playEl.next(e);
			}
		}
	};

	onMount(() => {
		prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<figure
	{id}
	class="arc-viz"
	use:inView
	onexit={onExit}
	onkeydown={onKeyDown}
	tabindex="0"
	role="application"
	aria-label="keyboard arrow key controls"
>
	<div class="header" class:sticky={audio.figureId === id}>
		<div class="titles">
			{#if title.split(":").length === 2}
				<h4>{title.split(":")[1].trim()}</h4>
			{:else}
				<h4>All motifs</h4>
			{/if}
			<h3>{title.split(":")[0]}</h3>
		</div>

		{#if id !== "explore" && id !== "lesmis"}
			<div class="note-wrapper">
				{#each notes as { note, motifId }, i}
					<Note
						{note}
						visible={audio.figureId === id &&
							audio.motifData?.motifId === motifId}
						longest={i === longestIndex}
						next={(e) => {
							const playEl = playEls[audio.motifData.motifId];
							if (!playEl) return;
							playEl.next(e);
						}}
						previous={(e) => {
							const playEl = playEls[audio.motifData.motifId];
							if (!playEl) return;
							playEl.prev(e);
						}}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<Chart
		{id}
		{musical}
		{song}
		{character}
		{animate}
		{motifs}
		{tracks}
		bind:playEls
	/>

	{#if id === "explore"}
		{#key musical}
			<img
				class="playbill"
				src={`assets/img/${musical}.png`}
				alt={`${musical} playbill program`}
				in:fly={{
					x: 200,
					duration: prefersReducedMotion ? 0 : 500,
					delay: prefersReducedMotion ? 0 : 550,
					easing: cubicOut
				}}
				out:fly={{
					x: 200,
					duration: prefersReducedMotion ? 0 : 500,
					easing: cubicIn
				}}
			/>
		{/key}
	{/if}

	<figcaption class="sr-only">
		A chart with time on the x-axis depicting the occurence of {motifs.length ===
		1
			? "the"
			: motifs.length}
		{title.toLowerCase().includes("all motifs")
			? "total motifs"
			: id === "explore"
				? "motifs"
				: title.toLowerCase().includes("one day more") ||
					  title.toLowerCase().includes("non-stop")
					? `motifs from ${title.split(":")[1].trim().toLowerCase()}`
					: title.split(":")[1].trim().toLowerCase()} in {musical}.
	</figcaption>
</figure>

<style>
	figure {
		position: relative;
		background: var(--color-gray-800);
		max-width: 1000px;
		margin: 3rem auto;
		padding: 2rem;
		border: 4px solid var(--color-fg);
	}

	:global(figure#headline) {
		background: none;
		margin: 0 auto;
		padding: 0;
	}

	:global(figure#explore) {
		margin-bottom: 0;
		border: none;
		width: 100%;
	}

	h3 {
		font-weight: bold;
		margin: 0;
	}

	.titles {
		flex-shrink: 0;
	}

	.header {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		z-index: 2;
		pointer-events: none;
	}

	.sticky {
		position: sticky;
		top: 1rem;
	}

	img.playbill {
		position: absolute;
		right: 2rem;
		top: 2rem;
		height: 100px;
		transform: rotate(2deg);
	}

	img.playbill:hover {
		transform: rotate(-1deg);
	}

	.note-wrapper {
		position: relative;
		display: flex;
		align-items: end;
		justify-content: end;
		max-width: 500px;
		flex: 1;
	}

	@media (max-width: 600px) {
		figure {
			padding: 1rem;
		}

		.note-wrapper {
			max-width: none;
			width: 100%;
		}

		.header {
			flex-direction: column;
		}
	}

	@media (max-width: 400px) {
		img.playbill {
			top: 1rem;
			right: 1rem;
		}

		figure#explore {
			padding: 1rem 0;
		}

		figure#explore h3,
		figure#explore h4 {
			padding: 0 1rem;
		}
	}
</style>
