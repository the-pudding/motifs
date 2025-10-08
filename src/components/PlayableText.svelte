<script>
	import { audioApi } from "$runes/audio.svelte.js";
	import { unlimited } from "$runes/misc.svelte.js";

	let { id, src, text, onClick } = $props();

	const audio = audioApi();

	let isPlaying = $derived(audio.src === `assets/audio/${src}`);
	let percentDone = $derived.by(() => {
		const active = audio.src === `assets/audio/${src}`;
		const time = active ? audio.smoothTime || audio.currentTime : 0;

		let percent;

		if (id.startsWith("playable") || id.includes("piano-")) {
			percent = audio.duration ? (time / audio.duration) * 100 : 0;
		} else {
			percent = audio.motifData
				? ((time - audio.motifData.start) /
						(audio.motifData.end - audio.motifData.start)) *
					100
				: 0;
		}
		return Math.min(Math.max(percent, 0), 100);
	});

	const defaultClick = async (e) => {
		e.stopPropagation();
		if (!src) return;

		if (audio.src === `assets/audio/${src}`) {
			audio.pauseAndClear();
		} else {
			audio.load(`assets/audio/${src}`, { name: text, figure: id });

			if (id === "playable-0") {
				await audio.play();
				unlimited.isClicked = true;
			} else {
				audio.play();
			}
		}
	};
</script>

<button onclick={onClick || defaultClick}>
	<span>{text}</span>
	<div
		class="play-pause"
		style:background-image={`url(assets/svg/${isPlaying ? "pause" : "play"}-circle.svg)`}
	></div>
	<div class="progress" style:width={`${percentDone}%`}></div>
</button>

<style>
	button {
		position: relative;
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		font-family: var(--sans);
		background: var(--color-gray-100);
		color: var(--color-bg);
		text-transform: uppercase;
		font-weight: bold;
		margin: 0;
		padding: 0.25rem 0.35rem 0.25rem 0.5rem;
		border-radius: 0.25rem;
		white-space: nowrap;
		transition: all calc(var(--1s) * 0.25) ease-in-out;
		background-size: 1rem;
	}

	button:hover {
		background: var(--color-gray-300);
		transform: translateY(-1px);
		box-shadow: rgba(0, 0, 0, 0.25) 0 2px 8px;
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
		button {
			padding: 0.125rem 0.35rem 0.125rem 0.5rem;
			font-size: var(--14px);
		}
	}
</style>
