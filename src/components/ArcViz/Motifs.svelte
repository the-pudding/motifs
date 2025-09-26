<script>
	import _ from "lodash";
	import { onMount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import copy from "$data/copy.json";

	let { motifs, tracks, musical = $bindable(), song, character } = $props();
	const audio = audioApi();
	let smooth;
	onMount(() => {
		smooth = audio.subscribeSmooth();
	});
	onDestroy(() => smooth?.());

	let selectedMotif = $state(motifs[0].name);
	let filteredMotifs = $derived(
		motifs.filter((d) =>
			d.regions.some(
				(r) =>
					(r?.character?.includes(character) ||
						character === "All Characters") &&
					(r["track-name"] === song || song === "All Songs")
			)
		)
	);
	let percentsDone = $derived.by(() => {
		if (!selectedMotif) return [];
		const motif = motifs.find((m) => m.name === selectedMotif);
		if (!motif) return [];
		return motif.regions.map((region, i) => {
			const src = `assets/audio/${musical}/${region["track-name"]}.mp3`;
			const active = audio.src === src;
			const time = active ? audio.smoothTime || audio.currentTime : 0;
			const duration = audio.motifData
				? audio.motifData.end - audio.motifData.start
				: 0;
			return time && duration
				? Math.min(100, ((time - audio.motifData.start) / duration) * 100)
				: 0;
		});
	});

	const playMotif = (e, region, i, motifId) => {
		e.stopPropagation();

		const src = `assets/audio/${musical}/${region["track-name"]}.mp3`;
		const start = region.start;
		const end = region.end;
		const motifI = i;

		if (audio.src === src) {
			audio.pauseAndClear();
		} else {
			audio.load(src, {
				figure: "explore",
				motif: {
					start,
					end,
					motifId,
					motifI
				}
			});
			audio.play();
		}
	};

	$inspect({ selectedMotif });

	const filterUpdate = () => {
		if (filteredMotifs.length === 0) return;

		selectedMotif = filteredMotifs[0].name;
	};

	const getDisplaySongName = (trackName) => {
		const trackData = tracks.find((t) => t.name.includes(trackName));
		return trackData?.displayName || trackName;
	};

	$effect(() => filterUpdate(musical, character));
</script>

<div class="motifs">
	{#each filteredMotifs as motif (motif.name)}
		{@const selected = selectedMotif && selectedMotif === motif.name}
		{@const description =
			copy.descriptions?.[musical]?.[_.kebabCase(motif.name)] || ""}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="motif"
			class:selected
			onclick={() => (selectedMotif = motif.name)}
		>
			<div class="name">
				{motif.emoji}
				{motif.name}
				<div class="description">{@html description}</div>
			</div>

			{#if selected}
				<div class="instances">
					{#each motif.regions as region, i}
						{@const trackName = getDisplaySongName(
							region["track-name"]
								// .replace(/_/g, " ")
								.replace(/^\d+-\d+ /, "")
								.replace(/\.mp3$/, "")
						)}
						{@const hasCharacter =
							(character && region.character.includes(character)) ||
							character === "All Characters"}
						<button
							class="instance"
							onclick={(e) => playMotif(e, region, i, _.kebabCase(motif.name))}
							disabled={!hasCharacter}
						>
							<span>{trackName}</span>
							<div
								class="play-pause"
								style:background-image={`url(assets/svg/play-circle.svg)`}
							></div>
							<div class="progress" style:width={`${percentsDone[i]}%`}></div>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.motifs {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		max-height: 350px;
		overflow: scroll;
		margin-top: 2rem;
	}

	.motif {
		padding: 8px;
	}

	.name {
		font-family: var(--mono);
		color: var(--color-gray-300);
		text-transform: uppercase;
	}

	.selected .name {
		color: var(--color-white);
		font-size: var(--28px);
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.motif:hover {
		cursor: pointer;
		background: var(--color-gray-700);
	}

	.motif.selected {
		border: 1px solid var(--color-gray-400);
		border-radius: 3px;
		background: var(--color-gray-600);
	}

	.description {
		display: none;
		text-transform: none;
		font-weight: normal;
		font-size: var(--12px);
		margin-top: 0.5rem;
	}

	.selected .description {
		display: inline-block;
	}

	.instances {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	button.instance {
		position: relative;
		display: inline-flex;
		align-items: center;
		background: var(--color-gray-100);
		color: var(--color-bg);
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--14px);
		transition: all calc(var(--1s) * 0.25) ease-in-out;
	}

	:global(button#drink-with-me, button#raise-a-glass) {
		background: var(--color-gray-100);
		color: var(--color-bg);
		text-transform: uppercase;
		font-weight: bold;
		transition: all calc(var(--1s) * 0.25) ease-in-out;
	}

	.play-pause {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		margin-left: 0.25rem;
		background-position: center;
		background-size: 1.25rem;
		background-repeat: no-repeat;
		z-index: 2;
	}

	button.instance:hover:not(:disabled),
	:global(button#drink-with-me:hover, button#raise-a-glass:hover) {
		background: var(--color-gray-300);
		transform: translateY(-1px);
		box-shadow: rgba(0, 0, 0, 0.25) 0 2px 8px;
	}

	span {
		z-index: 2;
	}

	.progress {
		background: var(--color-playbill-yellow);
		height: 100%;
		border-radius: 0.25rem;
		position: absolute;
		left: 0;
	}
</style>
