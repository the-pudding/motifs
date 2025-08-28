<script>
	// shadow, plain, line, bubble
	import wordmark from "$svg/pudding-playbill.svg";
</script>

<header>
	<div class="border">
		<div class="wordmark">
			<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
				>{@html wordmark}</a
			>
			<div class="presents">Presents</div>
		</div>
	</div>
</header>

<style>
	header {
		padding: 1rem;
		padding-top: 4rem;
		display: flex;
		justify-content: center;
	}

	.border {
		background: white;
		padding: 4px;
	}

	.wordmark {
		padding: 2rem 4rem;
		border: 1px solid var(--color-black);
		background: var(--color-playbill-yellow);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.presents {
		font-size: var(--14px);
		text-transform: uppercase;
		color: var(--color-black);
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}
</style>
