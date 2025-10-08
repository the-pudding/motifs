<script>
	import PlayableText from "$components/PlayableText.svelte";
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";

	let { top, left, regions, tracks, chartWidth, chartId, motifId, emoji } =
		$props();

	const audio = audioApi();

	let unlimitedPlayClicked = $state(false);
	let motifLabelWidth = $state(0);
	let songLabelWidth = $state(0);

	let mePlaying = $derived(
		audio.figureId === chartId &&
			audio.motifData &&
			audio.motifData.motifId === motifId
	);
	let src = $derived(
		mePlaying ? audio.src.replace("assets/audio/", "") : regions[0]?.src
	);
	let loading = $derived(mePlaying && !audio.ready);
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
	let motifLabelOverflowing = $derived({
		left: +left.replace("px", "") - motifLabelWidth / 2 < 0,
		right: +left.replace("px", "") + motifLabelWidth / 2 > chartWidth
	});

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

	export const next = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI < regions.length - 1) {
			playRecursive(1);
		} else {
			playRecursive(audio.motifData.motifI * -1); // back to 0
		}
	};

	export const prev = (e) => {
		e.stopPropagation();

		if (audio.motifData.motifI > 0) {
			playRecursive(-1);
		} else {
			playRecursive(regions.length - 1); // to end
		}
	};

	const getDisplaySongName = (trackName) => {
		const trackData = tracks.find((t) => t.name.includes(trackName));
		return trackData?.displayName || trackName;
	};
</script>

<div
	class="song-name"
	class:visible={mePlaying}
	style:left={`${songLeft}px`}
	style:bottom={`${0}px`}
	style:transform={songLeft === 0 || songLeft === chartWidth - songLabelWidth
		? "translate(0, calc(100% + 8px))"
		: "translate(-50%, calc(100% + 8px))"}
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
		class:faded={(audio.figureId && audio.figureId !== chartId) ||
			(audio.figureId === chartId && !mePlaying)}
	>
		<div
			class="text-wrapper"
			style:transform={motifLabelOverflowing.left
				? "translate(-15%, calc(-100% - 6px))"
				: motifLabelOverflowing.right
					? "translate(-85%, calc(-100% - 6px))"
					: "translate(-50%, calc(-100% - 6px))"}
			bind:clientWidth={motifLabelWidth}
		>
			<PlayableText
				id={`${chartId}_${motifId}`}
				text={`${
					chartId === "lesmis" && motifId === "the-people-b"
						? "the people"
						: _.startCase(motifId).toLowerCase()
				} ${emoji}`}
				{src}
				{onClick}
			/>
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
		z-index: 1000;
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

	.text-wrapper {
		position: absolute;
		top: 0;
		left: 50%;
	}

	@media (max-width: 400px) {
		.song-name {
			font-size: var(--14px);
		}
	}
</style>
