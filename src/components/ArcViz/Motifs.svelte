<script>
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";

	let { motifs, musical } = $props();
	const audio = audioApi();

	let selectedMotif = $state();

	const playMotif = (e, region, i, motifId) => {
		e.stopPropagation();

		const src = `assets/audio/${musical}/${region["track-name"]}.mp3`;
		const start = region.start;
		const end = region.end;
		const motifI = i;

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
	};
</script>

<div class="motifs">
	{#each motifs as motif}
		{@const selected = selectedMotif && selectedMotif === motif.name}
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
							{trackName}
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
		color: var(--color-fg);
		background: var(--color-gray-800);
		font-family: var(--mono);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: bold;
		font-size: var(--14px);
	}

	button.instance:hover {
		cursor: pointer;
		background: var(--color-gray-700);
	}
</style>
