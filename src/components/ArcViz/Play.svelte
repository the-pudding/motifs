<script>
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import prevSvg from "$svg/prev.svg";
	import nextSvg from "$svg/next.svg";
	import _ from "lodash";
	import { onMount, onDestroy } from "svelte";
	import { audioApi } from "$runes/audio.svelte.js";

	let {
		top,
		left,
		regions,
		tracks,
		chartWidth,
		padding,
		color,
		chartId,
		motifId,
		emoji,
		actOfFirstOccurence
	} = $props();

	let smooth;
	const audio = audioApi();
	const stroke = 4;
	const size = 48;

	let unlimitedPlayClicked = $state(false);
	let motifLabelWidth = $state(0);
	let songLabelWidth = $state(0);

	let start = $derived(audio.motifData?.start || 0);
	let duration = $derived(
		audio.motifData ? audio.motifData.end - audio.motifData.start : 0
	);
	let mePlaying = $derived(
		audio.figureId === chartId &&
			audio.motifData &&
			audio.motifData.motifId === motifId
	);
	let loading = $derived(mePlaying && !audio.ready);
	let motifLabelCentered = $derived(
		mePlaying || chartId === "unlimited" || chartId === "lesmis"
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
	let songLabelOverflowing = $derived(
		mePlaying
			? {
					left: +left.replace("px", "") - songLabelWidth / 2 < 0,
					right: +left.replace("px", "") + songLabelWidth > chartWidth
				}
			: { left: false, right: false }
	);
	let songLeft = $derived(
		songLabelOverflowing.left
			? 0
			: songLabelOverflowing.right
				? chartWidth - songLabelWidth
				: +left.replace("px", "")
	);

	const playRecursive = (diff) => {
		let playTrack = async (change) => {
			const newI = audio.motifData?.motifI + change || 0;

			if (newI >= regions.length) {
				audio.pauseAndClear();
				return;
			}

			const newSrc = regions[newI]?.src;
			const newStart = regions[newI]?.start;
			const newEnd =
				chartId === "unlimited"
					? regions[newI]["end-short"]
					: regions[newI]?.end;

			audio.load(newSrc, {
				figure: chartId,
				motif: {
					start: newStart,
					end: newEnd,
					motifId,
					motifI: newI || 0
				}
			});

			await audio.play();
			if (!mePlaying) return;
			await playTrack(1);
		};

		playTrack(diff);
	};

	const onClick = (e) => {
		e.stopPropagation();

		if (chartId === "unlimited" && !unlimitedPlayClicked) {
			unlimitedPlayClicked = true;
		}

		if (mePlaying) {
			audio.pauseAndClear();
		} else {
			playRecursive(0);
		}
	};

	const next = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI < regions.length - 1) {
			playRecursive(1);
		} else {
			playRecursive(0);
		}
	};

	const prev = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI > 0) {
			playRecursive(-1);
		} else {
			playRecursive(regions.length - 1);
		}
	};

	const getDisplaySongName = (trackName) => {
		const trackData = tracks.find((t) => t.name.includes(trackName));
		return trackData?.displayName || trackName;
	};

	onMount(() => {
		smooth = audio.subscribeSmooth();
	});
	onDestroy(() => smooth?.());
</script>

<div
	class="song-name"
	class:visible={mePlaying}
	style:left={`${songLeft}px`}
	style:bottom={`${padding.top}px`}
	style:transform={songLeft === 0 || songLeft === chartWidth - songLabelWidth
		? "translate(0, 4px)"
		: "translate(-50%, 4px)"}
	bind:clientWidth={songLabelWidth}
>
	{getDisplaySongName(audio.trackName)}
</div>

{#if chartId !== "explore"}
	<div
		class="play-container"
		style:top
		style:left
		class:active={mePlaying}
		class:loading
		class:faded={audio.figureId === chartId && !mePlaying}
	>
		<div
			class="motif-name"
			class:centered={motifLabelCentered}
			class:left={!motifLabelCentered && actOfFirstOccurence === 2}
			class:right={!motifLabelCentered && actOfFirstOccurence === 1}
			bind:clientWidth={motifLabelWidth}
		>
			{chartId === "lesmis" && motifId === "the-people-b"
				? "the people"
				: _.startCase(motifId).toLowerCase()}
			{emoji}
		</div>
		<div class="controls" style={`--color: ${color}`}>
			<button
				type="button"
				class="advance"
				class:visible={mePlaying && !loading}
				onclick={prev}
			>
				{@html prevSvg}
			</button>

			<button
				type="button"
				class="pp"
				class:bounce={chartId === "unlimited" && !unlimitedPlayClicked}
				aria-pressed={mePlaying}
				aria-label={label}
				aria-describedby="pp-progress"
				onclick={onClick}
				style={`--size:${size}px; --c: ${2 * Math.PI * (size / 2)}; --stroke:${stroke}px; --color: ${color}`}
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
					{#if loading}
						<text>loading</text>
					{:else}
						{@html mePlaying ? pauseSvg : playSvg}
					{/if}
				</span>
			</button>

			<button
				type="button"
				class="advance"
				class:visible={mePlaying && !loading}
				onclick={next}
			>
				{@html nextSvg}
			</button>
		</div>
	</div>
{/if}

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
		width: fit-content;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		font-weight: bold;
	}

	.song-name.visible {
		opacity: 1;
	}

	.motif-name {
		position: absolute;
		white-space: nowrap;
		font-family: var(--mono);
		font-size: var(--14px);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: var(--color-gray-900);
		padding: 2px 6px;
	}

	.motif-name.left {
		top: 50%;
		right: 75%;
		transform: translate(0, -50%);
	}

	.motif-name.right {
		top: 50%;
		left: 75%;
		transform: translate(0, -50%);
	}

	.motif-name.centered {
		top: 0;
		left: 50%;
		transform: translate(-40%, calc(-100% - 6px));
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
		animation: none;
	}

	.loading .pp-progress {
		animation: spin 1.2s ease-in-out infinite;
	}

	@keyframes spin {
		0% {
			stroke-dashoffset: 390px;
			transform: rotate(-90deg);
		}
		100% {
			stroke-dashoffset: 390px;
			transform: rotate(270deg);
		}
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
		stroke: var(--color-white);
	}

	.pp.bounce {
		animation: bounce 1s infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10%);
		}
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

	@media (max-width: 400px) {
		.motif-name {
			font-size: var(--12px);
		}

		.motif-name.left {
			right: 70%;
		}

		.motif-name.right {
			left: 70%;
		}
	}
</style>
