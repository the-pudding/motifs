<script>
	import PlayableText from "$components/PlayableText.svelte";
	import pianoSvg from "$svg/piano.svg";
	import { audioApi } from "$runes/audio.svelte.js";
	import { onMount, onDestroy } from "svelte";

	const audio = audioApi();
	let smooth;
	onMount(() => {
		smooth = audio.subscribeSmooth();
	});
	onDestroy(() => smooth?.());

	let { figcaption } = $props();

	let circleGroups = $state([]);
	let shown = $state(new Set());

	const ts = {
		"unlimited-piano": [2.042, 2.834, 3.622, 3.893],
		"rainbow-piano": [0.784, 2.042, 3.376, 4.326]
	};

	const clear = () => {
		if (audio.trackName === null && shown.size > 0) {
			shown.clear();
			circleGroups.forEach((circle) => {
				circle.style.opacity = 0;
			});
			return;
		}

		if (
			audio.trackName === "unlimited-piano" ||
			audio.trackName === "rainbow-piano"
		) {
			shown.clear();
			circleGroups.forEach((circle) => {
				circle.style.opacity = 0;
			});
		}
	};

	const timeChange = () => {
		if (
			audio.trackName === null ||
			(audio.trackName !== "unlimited-piano" &&
				audio.trackName !== "rainbow-piano")
		)
			return;

		if (audio.smoothTime < ts[audio.trackName][0] && shown.size > 0) {
			shown.clear();
			circleGroups.forEach((circle) => {
				circle.style.opacity = 0;
			});
			return;
		}

		ts[audio.trackName].forEach((t, i) => {
			if (audio.smoothTime >= t && !shown.has(i)) {
				circleGroups[i].style.opacity = 1;
				shown.add(i);
			}
		});
	};

	onMount(() => {
		const g = document.querySelectorAll("#piano svg g");
		g.forEach((circle) => {
			circle.style.opacity = 0;
		});
		circleGroups = g;
	});

	$effect(() => clear(audio.trackName));
	$effect(() => timeChange(audio.smoothTime));
</script>

<figure id="piano">
	<figcaption class="sr-only">{figcaption}</figcaption>
	<div class="buttons">
		<div class="button">
			<PlayableText
				id={"piano-unlimited"}
				src="text/unlimited-piano.mp3"
				text={`"Unlimited"`}
			/>
			<div class="source">From <i>Wicked</i></div>
		</div>

		<div class="button">
			<PlayableText
				id={"piano-rainbow"}
				src="text/rainbow-piano.mp3"
				text={`"Somewhere over the rainbow"`}
			/>
			<div class="source">From <i>The Wizard of Oz</i></div>
		</div>
	</div>
	{@html pianoSvg}
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 600px;
		margin: 2rem auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		width: 100%;
	}

	.button {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	@media (max-width: 600px) {
		.buttons {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}

		.source {
			font-size: var(--14px);
		}

		.button {
			align-items: center;
		}
	}
</style>
