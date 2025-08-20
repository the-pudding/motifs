<script>
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import prevSvg from "$svg/prev.svg";
	import nextSvg from "$svg/next.svg";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { top, left, color, motifName, chartId, tracks } = $props();
	const sound = getContext("sound");

	const stroke = 4;
	const size = 48;

	let audioEl;
	let mePlaying = $state(false);
	let meActive = $state(false);
	let start = $state(0);
	let duration = $state(0);
	let currentTime = $state(0);
	let motifI = $state(0);

	let label = $derived(mePlaying ? "Pause" : "Play");
	let progress = $derived(
		currentTime && duration ? (currentTime - start) / duration : 0
	);
	let r = $derived(size / 2 - stroke / 2);
	let circumference = $derived(2 * Math.PI * r);
	let dashoffset = $derived(
		circumference - Math.max(0, Math.min(1, progress)) * circumference
	);

	const loadTrack = async (i) => {
		if (!audioEl) return;

		const nextSrc = tracks[i]?.src;
		if (!nextSrc) return;

		const normalizedNext = encodeURI(
			new URL(nextSrc, window.location.href).href
		);
		const normalizedCurrent = encodeURI(audioEl.currentSrc || audioEl.src);

		if (normalizedNext === normalizedCurrent) {
			return;
		}

		audioEl.src = nextSrc;
		await audioEl.load();
	};

	const playTrack = (i) => {
		start = tracks[i].start;
		duration = tracks[i].end - tracks[i].start;

		audioEl.currentTime = tracks[i].start;
		audioEl.play();
		audioEl.onended = () => {
			mePlaying = false;
			sound.isPlaying = false;
			audioEl.currentTime = 0;
		};
		const onTimeUpdate = () => {
			if (motifI !== i) audioEl.removeEventListener("timeupdate", onTimeUpdate);
			else if (audioEl.currentTime >= tracks[i].end - 0.02) {
				console.log("pause, ended", i);
				audioEl.pause();
				audioEl.removeEventListener("timeupdate", onTimeUpdate);
			}
		};

		audioEl.addEventListener("timeupdate", onTimeUpdate);
	};

	const onClick = (e, motifName) => {
		if (!audioEl) return;

		e.stopPropagation();

		if (mePlaying) {
			sound.chartId = undefined;
			sound.motifId = undefined;
			sound.motifI = undefined;
			sound.isPlaying = false;
		} else {
			sound.chartId = chartId;
			sound.motifId = _.kebabCase(motifName);
			sound.motifI = motifI;
			sound.isPlaying = true;
		}
	};

	const next = (e) => {
		e.stopPropagation();

		if (sound.motifI < tracks.length - 1) {
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
			sound.motifI = tracks.length - 1;
		}
	};

	$effect(async () => {
		if (!audioEl) return;

		if (
			// It's my time!
			sound.chartId === chartId &&
			sound.motifId === _.kebabCase(motifName) &&
			sound.isPlaying &&
			!mePlaying
		) {
			await loadTrack(sound.motifI);

			mePlaying = true;
			meActive = true;

			playTrack(sound.motifI);
		} else if (
			// Step aside!
			(sound.chartId !== chartId || sound.motifId !== _.kebabCase(motifName)) &&
			(meActive || mePlaying)
		) {
			mePlaying = false;
			meActive = false;

			audioEl.pause();
			audioEl.currentTime = 0;
		} else if (
			// Change track
			meActive &&
			sound.chartId === chartId &&
			sound.motifId === _.kebabCase(motifName) &&
			sound.motifI !== motifI
		) {
			audioEl.pause();
			audioEl.currentTime = 0;

			await loadTrack(sound.motifI);

			motifI = sound.motifI;
			mePlaying = true;

			playTrack(sound.motifI);
		}
	});
</script>

<button
	type="button"
	class="pp"
	class:active={meActive}
	class:faded={sound.chartId === chartId &&
		sound.motifId !== _.kebabCase(motifName)}
	aria-pressed={mePlaying}
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
		{@html mePlaying ? pauseSvg : playSvg}
	</span>
</button>

<div
	class="controls"
	style:top
	style:left
	style={`--color: ${color}`}
	class:visible={meActive}
>
	<button type="button" class="advance" onclick={prev}>
		{@html prevSvg}
	</button>
	<button type="button" class="advance" onclick={next}>
		{@html nextSvg}
	</button>
</div>

<audio bind:this={audioEl} bind:currentTime preload="none" />

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

	:global(.advance svg polyline) {
		stroke: var(--color);
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
