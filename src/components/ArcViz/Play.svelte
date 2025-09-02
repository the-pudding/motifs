<script>
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import prevSvg from "$svg/prev.svg";
	import nextSvg from "$svg/next.svg";
	import _ from "lodash";
	import { onMount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";

	let { tracks, top, left, color, chartId, motifId } = $props();

	const audio = audioApi();
	let smooth;
	onMount(() => {
		smooth = audio.subscribeSmooth();
	});
	onDestroy(() => smooth?.());

	const stroke = 4;
	const size = 48;

	let i = $state(0);
	let src = $derived(tracks[i]?.src || "");
	let start = $derived(tracks[i]?.start || 0);
	let duration = $derived(tracks[i] ? tracks[i].end - tracks[i].start : 0);
	let mePlaying = $derived(
		audio.figureId === chartId &&
			audio.src === src &&
			audio.motifData.motifId === motifId
	);
	let label = $derived(mePlaying ? "Pause" : "Play");
	let progress = $derived(
		duration && mePlaying
			? ((audio.smoothTime || audio.currentTime) - start) / duration
			: 0
	);
	let r = $derived(size / 2 - stroke / 2);
	let circumference = $derived(2 * Math.PI * r);
	let dashoffset = $derived(
		circumference - Math.max(0, Math.min(1, progress)) * circumference
	);

	const onClick = (e) => {
		e.stopPropagation();

		if (mePlaying) {
			audio.pauseAndClear();
		} else {
			audio.load(src, {
				figure: chartId,
				motif: {
					start,
					end: start + duration,
					motifId: motifId,
					motifI: i
				}
			});
			audio.play();
		}
	};

	const next = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI < tracks.length - 1) {
			i += 1;
		} else {
			i = 0;
		}

		audio.load(src, {
			figure: chartId,
			motif: {
				start,
				end: start + duration,
				motifId: motifId,
				motifI: i
			}
		});
		audio.play();
	};

	const prev = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI > 0) {
			i -= 1;
		} else {
			i = tracks.length - 1;
		}

		audio.load(src, {
			figure: chartId,
			motif: {
				start,
				end: start + duration,
				motifId: motifId,
				motifI: i
			}
		});
		audio.play();
	};
</script>

<div
	class="play-container"
	style:top
	style:left
	style:active={mePlaying}
	class:faded={audio.figureId === chartId && !mePlaying}
>
	<div class="song-name" class:visible={mePlaying}>{audio.trackName}</div>
	<div class="controls" style={`--color: ${color}`}>
		<button
			type="button"
			class="advance"
			class:visible={mePlaying}
			onclick={prev}
		>
			{@html prevSvg}
		</button>

		<button
			type="button"
			class="pp"
			aria-pressed={mePlaying}
			aria-label={label}
			aria-describedby="pp-progress"
			onclick={onClick}
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

		<button
			type="button"
			class="advance"
			class:visible={mePlaying}
			onclick={next}
		>
			{@html nextSvg}
		</button>
	</div>
</div>

<style>
	.play-container {
		position: absolute;
		pointer-events: none;
		transform: translate(-50%, calc(-100% - 1rem));
		transition:
			opacity 0.2s ease-in-out,
			transform 0.2s ease-in-out;
	}

	.play-container.active {
		z-index: 100000;
	}

	.play-container.faded {
		opacity: 0.1;
	}

	.song-name {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, 100%);
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		font-family: var(--mono);
	}

	.song-name.visible {
		opacity: 1;
	}

	.pp {
		inline-size: var(--size);
		block-size: var(--size);
		border: 0;
		border-radius: 50%;
		padding: 0;
		background: var(--color-gray-800);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		touch-action: manipulation;
		transform: translate(0, 0rem);
		pointer-events: auto;
		transition:
			opacity 0.2s ease-in-out,
			transform 0.2s ease-in-out;
	}

	.faded .pp {
		pointer-events: none;
	}

	.pp:hover,
	button.advance:hover {
		transform: translate(0, -0.25rem);
		z-index: 100000;
	}

	.pp-ring {
		position: absolute;
		inset: 0;
	}

	.pp-track {
		stroke: var(--color-gray-100);
	}

	.pp-progress {
		stroke: var(--color);
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}

	.pp-face {
		inline-size: calc(var(--size) - (var(--stroke) * 6));
		block-size: calc(var(--size) - (var(--stroke) * 6));
		border-radius: 50%;
		background: var(--color-gray-800);
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
		display: flex;
		align-items: center;
		pointer-events: none;
	}

	button.advance {
		background: none;
		height: 44px;
		width: 44px;
		display: flex;
		visibility: hidden;
		pointer-events: none;
		transition: transform 0.2s ease-in-out;
	}

	button.advance.visible {
		pointer-events: auto;
		visibility: visible;
	}
</style>
