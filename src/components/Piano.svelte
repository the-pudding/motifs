<script>
	import PlayableText from "$components/PlayableText.svelte";
	import pianoSvg from "$svg/piano.svg";

	let open = $state(false);
</script>

<details bind:open>
	<summary>{open ? "Told ya." : "I don't believe you."}</summary>

	<figure id="piano">
		<div class="buttons">
			<div class="button">
				<PlayableText
					id={"piano-unlimited"}
					src="intro/unlimited-piano.mp3"
					text={`"Unlimited"`}
				/>
				<div class="source">From <i>Wicked</i></div>
			</div>

			<div class="button">
				<PlayableText
					id={"piano-rainbow"}
					src="intro/rainbow-piano.mp3"
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
		transition: transform 0.2s ease !important;
	}

	details:hover {
		cursor: pointer;
		transform: translate(0.1rem, 0);
	}

	summary {
		font-size: var(--12px);
		margin-bottom: 1rem;
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
