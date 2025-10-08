<script>
	let { note, visible, top, next, previous } = $props();

	let noteStripped = $derived(note?.replace(/<[^>]*>/g, ""));

	const onClickNext = (e) => {
		e.stopPropagation();
		next(e);
	};
	const onClickPrev = (e) => {
		e.stopPropagation();
		previous(e);
	};
</script>

<div class="note-wrapper" class:visible class:top>
	<div class="border">
		<div class="note">
			<span class="listening">Listening notes:</span>
			{@html noteStripped}

			<div class="buttons">
				<button class="next" onclick={onClickPrev}>Previous</button>
				<button class="next" onclick={onClickNext}>Next</button>
			</div>
		</div>
	</div>
</div>

<style>
	.note-wrapper {
		position: absolute;
		bottom: 35px;
		left: 50%;
		transform: translate(-50%, 0);
		width: fit-content;
		min-width: 250px;
		max-width: 600px;
		margin: 0 auto;
		margin-top: 1rem;
		z-index: 1000;
		display: flex;
		align-items: end;
		pointer-events: none;
		opacity: 0;
		transition: none;
	}

	.border {
		width: 100%;
		padding: 4px;
		background: rgba(255, 255, 255, 0.9);
	}

	.note-wrapper.visible {
		pointer-events: auto;
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.note-wrapper.top {
		bottom: auto;
		top: 0;
		transform: translate(-50%, -50%);
	}

	.note {
		background: rgba(253, 227, 0, 0.9);
		color: var(--color-bg);
		padding: 0.75rem;
		font-size: var(--14px);
		border: 1px solid var(--color-bg);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	button.next {
		font-family: var(--mono);
		background: var(--color-gray-50);
		border: 1px solid var(--color-gray-300);
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--12px);
	}

	button.next:hover {
		background: var(--color-gray-200);
		cursor: pointer;
	}

	span.listening {
		font-family: var(--mono);
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: var(--12px);
		display: block;
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.note-wrapper {
			width: 95%;
			max-width: none;
		}
	}

	@media (max-height: 800px) {
		.note-wrapper,
		.note-wrapper.top {
			position: fixed;
			top: auto;
			bottom: 50px;
		}
	}
</style>
