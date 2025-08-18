<script>
	import playSvg from "$svg/play.svg";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { chartId, top, left, motifName, color, i } = $props();
	const playing = getContext("playing");

	let audioEl;
	let playingMe = $state(false);

	const onClick = (motifName, i) => {
		playing.chartId = chartId;
		playing.motifId = `${_.kebabCase(motifName)}-${i}`;

		if (audioEl && !playingMe) {
			audioEl.currentTime = 0;
			audioEl.play();
			audioEl.onended = () => {
				playing.chartId = undefined;
				playing.motifId = undefined;
			};
			playingMe = true;
		} else if (audioEl && playingMe) {
			audioEl.pause();
			playing.chartId = undefined;
			playing.motifId = undefined;
			playingMe = false;
		}
	};

	$effect(() => {
		if (
			playing.chartId !== chartId ||
			playing.motifId !== `${_.kebabCase(motifName)}-${i}`
		) {
			playingMe = false;
			if (audioEl) {
				audioEl.pause();
				audioEl.currentTime = 0;
			}
		}
	});
</script>

<button
	class="play"
	class:faded={playing.chartId !== undefined &&
		playing.chartId === chartId &&
		playing.motifId !== `${_.kebabCase(motifName)}-${i}`}
	style={`--color: ${color}`}
	style:top
	style:left
	onclick={() => onClick(motifName, i)}
>
	{@html playSvg}
</button>

<audio bind:this={audioEl} src="assets/audio/test.mp3" />

<style>
	button.play {
		position: absolute;
		height: 32px;
		width: 32px;
		padding: 6px;
		border-radius: 50%;
		background: var(--color);
		transform: translate(-50%, calc(-100% - 1rem));
		transform-origin: center;
		transition: transform 0.2s ease-in-out;
	}

	button.play:hover {
		transform: translate(-50%, calc(-100% - 1rem)) scale(1.15);
	}

	.faded {
		opacity: 0.1;
	}

	:global(button.play svg) {
		fill: var(--color-bg);
	}

	:global(button.play svg path) {
		fill: var(--color-gray-100);
		stroke-width: 0;
		stroke: none;
	}
</style>
