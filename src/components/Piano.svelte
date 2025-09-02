<script>
	import PlayableText from "$components/PlayableText.svelte";
	import pianoSvg from "$svg/piano.svg";

	let timestamps = {
		unlimited: [2.249, 2.831, 3.622, 3.892],
		rainbow: [0.788, 2.043, 3.373, 4.326, 4.565, 4.812, 5.501]
	};
</script>

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

<style>
	figure {
		max-width: 600px;
		margin: 3rem auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
</style>
