<script>
	import Html from "$components/ArcViz/Html.svelte";
	import { scaleLinear } from "d3-scale";
	import _ from "lodash";
	import { audioApi } from "$runes/audio.svelte.js";

	let {
		id,
		musical,
		character,
		motifs = [],
		tracks = [],
		alternate = false,
		useYAxis = id !== "unlimited" &&
			id !== "headline" &&
			id !== "lesmis" &&
			id !== "hamilton" &&
			id !== "explore"
	} = $props();

	const audio = audioApi();

	const getFullTimestamp = (trackName, timestamp) => {
		const track = tracks.find((t) => t.name === trackName);
		if (!track) return 0;
		const trackStart = tracks
			.slice(0, tracks.indexOf(track))
			.reduce((total, track) => total + track.duration, 0);
		return trackStart + timestamp;
	};

	const colorPalette = _.shuffle([
		"#e6194b",
		"#3cb44b",
		"#ffe119",
		"#4363d8",
		"#f58231",
		"#911eb4",
		"#46f0f0",
		"#f032e6",
		"#bcf60c",
		"#fabebe",
		"#008080",
		"#e6beff",
		"#9a6324",
		"#fffac8",
		"#800000",
		"#aaffc3",
		"#808000",
		"#ffd8b1",
		"#000075",
		"#808080",
		"#ff4500",
		"#32cd32",
		"#1e90ff",
		"#ff69b4",
		"#8b4513",
		"#00ced1",
		"#ff6347",
		"#7cfc00",
		"#ba55d3",
		"#ffb6c1",
		"#20b2aa",
		"#ff00ff",
		"#adff2f",
		"#0000cd",
		"#ffa500",
		"#4b0082",
		"#40e0d0",
		"#b22222",
		"#8a2be2",
		"#deb887",
		"#5f9ea0",
		"#d2691e",
		"#6495ed",
		"#dc143c",
		"#2e8b57",
		"#ff1493",
		"#7fffd4",
		"#b8860b",
		"#c71585",
		"#6a5acd"
	]);
	const motifColors = $derived(
		motifs.reduce((acc, motif, i) => {
			if (motif.name === "unlimited")
				acc[motif.name] = "var(--color-wicked-green)";
			else acc[motif.name] = colorPalette[i % colorPalette.length];

			return acc;
		}, {})
	);

	const padding = { top: 40, right: 10, bottom: 0, left: 10 };
	let svgWidth = $state();
	const svgHeight = useYAxis
		? Math.max(300, Math.min(motifs.length * 80, 700))
		: 300;
	let width = $derived(svgWidth - padding.left - padding.right);
	let height = $derived(svgHeight - padding.top - padding.bottom);
	let filteredMotifNamesByCharacter = $derived(
		!character || character.includes("All characters")
			? motifs.map((d) => d.name)
			: motifs
					.filter((d) =>
						d.regions.some((r) => r?.character?.includes(character))
					)
					.map((d) => d.name)
	);

	const curvature = 0.35;
	const midpoint = $derived(tracks.find((d) => d.name.includes("2-01")).name);
	const totalMusicalDuration = $derived(
		tracks.reduce((total, track) => total + track.duration, 0)
	);
	const timeFormatter = (sec) => {
		const h = Math.floor(sec / 3600);
		const m = Math.floor((sec % 3600) / 60);
		const parts = [];
		if (h > 0) parts.push(`${h}h`);
		if (m > 0) parts.push(`${m}m`);
		return parts.join("") || "0m";
	};

	let xScale = $derived(
		scaleLinear().domain([0, totalMusicalDuration]).range([0, width])
	);
	const midY = $derived(height * 0.9);
	let yScale = $derived(
		useYAxis
			? scaleLinear()
					.domain([0, motifs.length - 1])
					.range([midY, height * 0.2])
			: () => midY
	);

	let motifPoints = $derived(
		motifs.reduce((acc, motif, motifI) => {
			const pts = motif.regions
				? motif.regions
						.map((region) => ({
							x: xScale(getFullTimestamp(region["track-name"], region.start)),
							y: yScale(motifI)
						}))
						.sort((a, b) => a.x - b.x)
				: [];

			acc[motif.name] = pts;
			return acc;
		}, {})
	);
	let pointsReady = $derived(
		Object.values(motifPoints).every((points) =>
			points.every((p) => p.x && p.y)
		)
	);

	const arcPath = (p1, p2, i) => {
		const dx = Math.max(0, p2.x - p1.x);
		if (dx === 0) return "";

		const maxHeight = useYAxis ? height * 0.5 : height * 0.9;
		const h = Math.min(maxHeight, dx * curvature);
		const dir = alternate ? (i % 2 === 0 ? -1 : 1) : -1;

		const cx = (p1.x + p2.x) / 2;
		const cy = p1.y + dir * h;

		return `M ${p1.x},${p1.y} Q ${cx},${cy} ${p2.x},${p2.y}`;
	};
</script>

<div
	class="chart-container"
	style:height={`${svgHeight}px`}
	bind:clientWidth={svgWidth}
>
	{#if width}
		<svg>
			<g style:transform={`translate(${padding.left}px, ${padding.top}px)`}>
				<line
					x1="0"
					y1={midY}
					x2="100%"
					y2={midY}
					stroke="var(--color-gray-400)"
				/>
				<line
					x1={xScale(getFullTimestamp(midpoint, 0))}
					y1={0}
					x2={xScale(getFullTimestamp(midpoint, 0))}
					y2={svgHeight - padding.top - padding.bottom}
					stroke="var(--color-gray-400)"
					stroke-width="1"
					stroke-dasharray="4"
					class:faded={audio.figureId && audio.figureId === id}
				/>
				<text
					class="act-label"
					class:faded={audio.figureId && audio.figureId === id}
					x={xScale(getFullTimestamp(midpoint, 0)) + 10}
					y={midY + 10}>Act 2 {"->"}</text
				>
				<text
					class="act-label anchor-end"
					class:faded={audio.figureId && audio.figureId === id}
					x={xScale(getFullTimestamp(midpoint, 0)) - 10}
					y={midY + 10}
					>{"<-"} Act 1
				</text>

				<text
					class="time-label"
					class:faded={audio.figureId && audio.figureId === id}
					x={xScale(0)}
					y={midY + 10}>0h0m</text
				>
				<text
					class="time-label anchor-end"
					class:faded={audio.figureId && audio.figureId === id}
					x={xScale(totalMusicalDuration)}
					y={midY + 10}
				>
					{timeFormatter(totalMusicalDuration)}
				</text>

				{#if pointsReady}
					{#each Object.entries(motifPoints) as [name, points]}
						{#each points as p, i}
							{@const motifId = `${_.kebabCase(name)}`}
							{@const active =
								audio.figureId &&
								audio.figureId === id &&
								audio.motifData.motifId === motifId &&
								audio.motifData.motifI === i}
							{@const faded =
								(audio.figureId !== undefined &&
									audio.figureId === id &&
									!audio.motifData.motifId.includes(_.kebabCase(name))) ||
								!filteredMotifNamesByCharacter.includes(name)}
							<circle
								class:active
								class:faded
								cx={p.x}
								cy={p.y}
								r="4"
								fill={motifColors[name]}
							/>

							{#if i < points.length - 1}
								<path
									class:faded
									d={arcPath(points[i], points[i + 1], i)}
									fill="none"
									stroke={motifColors[name]}
									stroke-width="1"
									vector-effect="non-scaling-stroke"
								/>
							{/if}
						{/each}
					{/each}
				{/if}
			</g>
		</svg>

		{#if id !== "headline"}
			<Html {id} {padding} {musical} {motifPoints} {motifColors} {motifs} />
		{/if}
	{/if}
</div>

<style>
	.chart-container {
		width: 100%;
		position: relative;
	}

	svg {
		height: 100%;
		width: 100%;
	}

	text {
		font-family: var(--mono);
		font-size: 12px;
		fill: var(--color-gray-100);
	}

	text.act-label {
		alignment-baseline: before-edge;
		text-anchor: start;
	}

	text.time-label {
		text-anchor: start;
		alignment-baseline: before-edge;
	}

	:global(#headline text, #headline line) {
		display: none;
	}

	text.anchor-end {
		text-anchor: end;
	}

	circle {
		transition:
			r 0.2s ease-in-out,
			opacity 0.2s ease-in-out;
	}

	circle.active {
		r: 8;
	}

	.faded {
		opacity: 0.1;
	}
</style>
