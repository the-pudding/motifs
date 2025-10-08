<script>
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";
	import copy from "$data/copy.json";

	let {
		selectedMotif = $bindable(),
		filteredMotifs,
		tracks,
		musical,
		character
	} = $props();
	const audio = audioApi();

	let percentsDone = $derived.by(() => {
		if (!selectedMotif) return [];
		const motif = filteredMotifs.find((m) => m.name === selectedMotif);
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

	const scrollToMotif = () => {
		const container = document.querySelector(".motifs");
		const motifEl = document.getElementById(
			`motif-${_.kebabCase(selectedMotif)}`
		);
		if (container && motifEl) {
			const elOffset = motifEl.offsetTop - container.offsetTop;
			const scrollTarget =
				elOffset - container.clientHeight / 2 + motifEl.clientHeight / 2;
			container.scrollTo({
				top: scrollTarget,
				behavior: "smooth"
			});
		}
	};

	const getDisplaySongName = (trackName) => {
		const trackData = tracks.find((t) => t.name.includes(trackName));
		return trackData?.displayName || trackName;
	};

	$effect(() => scrollToMotif(selectedMotif));
</script>

<div class="motifs">
	{#each filteredMotifs as motif (motif.name)}
		{@const selected = selectedMotif && selectedMotif === motif.name}
		{@const description =
			copy.descriptions?.[musical]?.[_.kebabCase(motif.name)] || ""}
		<div
			id={`motif-${_.kebabCase(motif.name)}`}
			class="motif"
			class:selected
			role="button"
			tabindex="0"
			onclick={() => (selectedMotif = motif.name)}
			onkeydown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					selectedMotif = motif.name;
				}
			}}
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
		max-height: 400px;
		overflow-y: scroll;
		padding: 0 2rem 2rem 2rem;
		margin-bottom: 4rem;
		background: var(--color-gray-800);
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

	:global(.description button[class^="goto-"]) {
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
	:global(.description button[class^="goto-"]:hover) {
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

	@media (max-width: 600px) {
		.motifs {
			padding: 0 0.5rem 1rem 0.5rem;
		}

		button.instance {
			padding: 6px;
		}
	}

	@media (max-width: 400px) {
		.name {
			font-size: var(--14px);
		}

		.selected .name {
			font-size: var(--24px);
		}

		.motif {
			padding: 4px;
		}

		.motif.selected {
			padding: 8px;
		}
	}
</style>
