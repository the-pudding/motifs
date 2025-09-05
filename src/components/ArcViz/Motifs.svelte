<script>
	import _ from "lodash";
	import { onMount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";
	import copy from "$data/copy.json";

	let { motifs, musical } = $props();
	const audio = audioApi();
	let smooth;
	onMount(() => {
		smooth = audio.subscribeSmooth();
	});
	onDestroy(() => smooth?.());

	let selectedMotif = $state(motifs[0].name);
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
				? ((time - audio.motifData.start) / duration) * 100
				: 0;
		});
	});

	const newMusical = () => {
		selectedMotif = motifs[0].name;
	};

	$effect(() => newMusical(musical));

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
</script>

<div class="motifs">
	<div style="margin-bottom: 1rem">Instructions Tk</div>

	{#each motifs as motif}
		{@const selected = selectedMotif && selectedMotif === motif.name}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="motif"
			class:selected
			onclick={() => (selectedMotif = motif.name)}
		>
			<div class="name">{motif.emoji} {motif.name}</div>

			{#if selected}
				<div class="instances">
					{#each motif.regions as region, i}
						{@const trackName = region["track-name"]
							.replace(/_/g, " ")
							.replace(/^\d+-\d+ /, "")
							.replace(/\.mp3$/, "")}
						<button
							class="instance"
							onclick={(e) => playMotif(e, region, i, _.kebabCase(motif.name))}
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
	}

	.motif {
		padding: 8px;
	}

	.name {
		font-size: var(--14px);
		text-transform: uppercase;
	}

	.selected .name {
		font-size: var(--20px);
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
		font-family: var(--mono);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: bold;
		font-size: var(--14px);
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

	button.instance:hover {
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
