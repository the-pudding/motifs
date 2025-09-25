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

	let open = $state(false);
	let circleGroups = $state([]);
	let shown = $state(new Set());

	const ts = {
		"unlimited-piano": [2.042, 2.834, 3.622, 3.893],
		"rainbow-piano": [0.784, 2.042, 3.376, 4.326]
	};

	const clear = (track) => {
		if (
			track === null ||
			(track !== "unlimited-piano" && track === "unlimited-piano")
		)
			return;

		shown.clear();
		circleGroups.forEach((circle) => {
			circle.style.opacity = 0;
		});
	};

	const timeChange = () => {
		if (
			audio.trackName === null ||
			(audio.trackName !== "unlimited-piano" &&
				audio.trackName === "unlimited-piano")
		)
			return;

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

<details bind:open>
	<summary>{open ? "Told ya." : "I don't believe you."}</summary>

	<figure id="piano">
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
</details>

<style>
	details {
		max-width: 700px;
		margin: 3rem auto;
		transform: translate(0, 0);
	}

	summary {
		font-size: var(--12px);
		margin-bottom: 1rem;
		transition: transform 0.2s ease !important;
	}

	summary:hover {
		cursor: pointer;
		transform: translate(0.1rem, 0);
	}

	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		width: 100%;
	}
</style>
