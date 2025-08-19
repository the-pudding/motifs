<script>
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import prevSvg from "$svg/prev.svg";
	import nextSvg from "$svg/next.svg";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { top, left, color, motifName, chartId, srcs } = $props();
	const sound = getContext("sound");

	const stroke = 4;
	const size = 48;

	let audioEl;
	let isPlaying = $state(false);
	let isActive = $state(false);
	let duration = $state(0);
	let currentTime = $state(0);
	let motifI = $state(0);

	let label = $derived(isPlaying ? "Pause" : "Play");
	let progress = $derived(currentTime && duration ? currentTime / duration : 0);
	let r = $derived(size / 2 - stroke / 2);
	let circumference = $derived(2 * Math.PI * r);
	let dashoffset = $derived(
		circumference - Math.max(0, Math.min(1, progress)) * circumference
	);

	const loadTrack = async (i) => {
		if (!audioEl) return;

		if (srcs[i]) {
			audioEl.src = srcs[i];
			await audioEl.load();
		} else {
			console.warn(`No audio source found for index ${i}`);
		}
	};

	// TODO: when you re-click play after a motif is done, it doesn't play again
	const onClick = (e, motifName) => {
		if (!audioEl) return;

		e.stopPropagation();

		if (isPlaying) {
			sound.chartId = undefined;
			sound.motifId = undefined;
			sound.motifI = undefined;
		} else {
			sound.chartId = chartId;
			sound.motifId = _.kebabCase(motifName);
			sound.motifI = motifI;
		}
	};

	const next = (e) => {
		e.stopPropagation();

		if (sound.motifI < srcs.length - 1) {
			sound.motifI = sound.motifI + 1;
		} else {
			sound.motifI = 0;
		}
	};

	const prev = (e) => {
		e.stopPropagation();

		if (sound.motifI > 0) {
			sound.motifI = sound.motifI - 1;
		} else {
			sound.motifI = srcs.length - 1;
		}
	};

	$effect(async () => {
		if (!audioEl) return;

		if (
			// It's my time!
			sound.chartId === chartId &&
			sound.motifId === _.kebabCase(motifName) &&
			!isActive &&
			!isPlaying
		) {
			await loadTrack(sound.motifI);

			isPlaying = true;
			isActive = true;

			audioEl.currentTime = 0;
			audioEl.play();
			audioEl.onended = () => {
				isPlaying = false;
				audioEl.currentTime = 0;
			};
		} else if (
			// Step aside!
			(isActive || isPlaying) &&
			(sound.chartId !== chartId || sound.motifId !== _.kebabCase(motifName))
		) {
			isPlaying = false;
			isActive = false;

			audioEl.pause();
			audioEl.currentTime = 0;
		} else if (
			// Change track
			isActive &&
			sound.chartId === chartId &&
			sound.motifId === _.kebabCase(motifName) &&
			sound.motifI !== motifI
		) {
			audioEl.pause();
			audioEl.currentTime = 0;

			await loadTrack(sound.motifI);

			motifI = sound.motifI;
			isPlaying = true;

			audioEl.currentTime = 0;
			audioEl.play();
			audioEl.onended = () => {
				isPlaying = false;
				audioEl.currentTime = 0;
			};
		}
	});
</script>

<button
	type="button"
	class="pp"
	class:active={isActive}
	class:faded={sound.chartId === chartId &&
		sound.motifId !== _.kebabCase(motifName)}
	aria-pressed={isPlaying}
	aria-label={label}
	aria-describedby="pp-progress"
	onclick={(e) => onClick(e, motifName)}
	style:top
	style:left
	style={`--size:${size}px; --stroke:${stroke}px; --color: ${color}`}
>
	<svg
		class="pp-ring"
		width={size}
		height={size}
		viewBox={`0 0 ${size} ${size}`}
		role="img"
		aria-hidden="true"
	>
		<circle
			cx={size / 2}
			cy={size / 2}
			{r}
			class="pp-track"
			stroke-width={stroke}
			fill="none"
		/>
		<circle
			cx={size / 2}
			cy={size / 2}
			{r}
			class="pp-progress"
			stroke-width={stroke}
			stroke-dasharray={circumference}
			stroke-dashoffset={dashoffset}
			stroke-linecap="round"
			fill="none"
		/>
	</svg>

	<span class="pp-face" aria-hidden="true">
		{@html isPlaying ? pauseSvg : playSvg}
	</span>
</button>

<div class="controls" style:top style:left class:visible={isActive}>
	<button type="button" class="advance" onclick={prev}>
		{@html prevSvg}
	</button>
	<button type="button" class="advance" onclick={next}>
		{@html nextSvg}
	</button>
</div>

<audio bind:this={audioEl} bind:duration bind:currentTime preload="none" />

<style>
	.pp {
		position: absolute;
		inline-size: var(--size);
		block-size: var(--size);
		border: 0;
		border-radius: 50%;
		padding: 0;
		transform: translate(-50%, calc(-100% - 1rem));
		background: var(--color-gray-100);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		touch-action: manipulation;
		transition:
			opacity 0.2s ease-in-out,
			transform 0.2s ease-in-out;
	}

	.pp:hover {
		transform: translate(-50%, calc(-100% - 1.25rem));
		z-index: 100000;
	}

	.pp.active {
		z-index: 100000;
	}

	.pp.faded {
		opacity: 0.3;
	}

	.pp-ring {
		position: absolute;
		inset: 0;
	}

	.pp-track {
		stroke: var(--color-gray-400);
	}

	.pp-progress {
		stroke: var(--color);
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
		transition: stroke-dashoffset 160ms linear;
	}

	.pp-face {
		inline-size: calc(var(--size) - (var(--stroke) * 6));
		block-size: calc(var(--size) - (var(--stroke) * 6));
		border-radius: 50%;
		background: var(--color-gray-100);
		display: grid;
		place-items: center;
	}

	:global(.pp-face svg path, .pp-face svg rect:not(.bg)) {
		fill: var(--color);
		stroke: none;
	}

	.controls {
		position: absolute;
		display: flex;
		transform: translate(-50%, 0);
		visibility: hidden;
	}

	.controls.visible {
		visibility: visible;
	}

	button.advance {
		background: none;
		height: 44px;
		width: 44px;
		display: flex;
	}
</style>
