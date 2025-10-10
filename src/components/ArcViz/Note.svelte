<script>
	let { note, visible, longest, next, previous } = $props();

	let noteStripped = $derived(
		note?.replace(/<[^/][^>]*>/g, "<strong>").replace(/<\/[^>]+>/g, "</strong>")
	);

	const onClickNext = (e) => {
		e.stopPropagation();
		next(e);
	};
	const onClickPrev = (e) => {
		e.stopPropagation();
		previous(e);
	};
</script>

<div class="border" class:longest class:visible>
	<div class="note">
		{@html noteStripped}

		<div class="buttons">
			<button class="next" onclick={onClickPrev}>Previous</button>
			<button class="next" onclick={onClickNext}>Next</button>
		</div>
	</div>
</div>

<style>
	.border {
		position: absolute;
		top: 0;
		right: 0;
		max-width: 100%;
		padding: 4px;
		background: rgba(255, 255, 255, 0.9);
		pointer-events: none;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.2) ease-in-out;
	}

	.border.visible {
		pointer-events: auto;
		opacity: 1;
	}

	.longest {
		position: static;
	}

	.note {
		background: rgba(253, 227, 0, 0.85);
		color: var(--color-bg);
		padding: 0.75rem;
		font-size: var(--14px);
		border: 1px solid var(--color-bg);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	button.next {
		background: var(--color-gray-50);
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--12px);
		padding: 0.3rem 0.4rem;
	}

	button.next:hover {
		background: var(--color-gray-200);
		cursor: pointer;
	}

	@media (max-width: 400px) {
		.note {
			font-size: var(--12px);
		}
	}
</style>
