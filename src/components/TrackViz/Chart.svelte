<script>
	import { scaleLinear } from "d3-scale";
	import { timeFormat } from "d3-time-format";
	import { getContext } from "svelte";
	import _ from "lodash";

	let { id, musical, motifs = [], tracks = [] } = $props();
	const sound = getContext("sound");

	const getFullTimestamp = (trackName, timestamp) => {
		const track = tracks.find((t) => t.name === trackName);
		if (!track) return 0;
		const trackStart = tracks
			.slice(0, tracks.indexOf(track))
			.reduce((total, track) => total + track.duration, 0);
		return trackStart + timestamp;
	};
	const timeFormatter = (sec) => {
		const h = Math.floor(sec / 3600);
		const m = Math.floor((sec % 3600) / 60);
		const parts = [];
		if (h > 0) parts.push(`${h}h`);
		if (m > 0) parts.push(`${m}m`);
		return parts.join("") || "0m";
	};

	const colorPalette = [
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
	];
	const motifColors = $derived(
		motifs.reduce((acc, motif, i) => {
			acc[motif.name] = colorPalette[i % colorPalette.length];
			return acc;
		}, {})
	);
	const totalMusicalDuration = tracks.reduce(
		(total, track) => total + track.duration,
		0
	);

	const midpoint = tracks.find((d) => d.name.includes("2-01")).name;
	const height = 300;
	const midY = height;
	let width = $state();
	let xScale = $derived(
		scaleLinear().domain([0, totalMusicalDuration]).range([0, width])
	);
	let yScale = $derived(
		scaleLinear()
			.domain([0, motifs.length - 1])
			.range([20, height - 20])
	);
	let motifPoints = $derived(
		motifs.reduce((acc, motif) => {
			const pts = motif.regions
				? motif.regions
						.map((region) => ({
							x: xScale(getFullTimestamp(region["track-name"], region.start)),
							y: 0
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

	$inspect({ motifs, motifPoints });
</script>

<div
	class="chart-container"
	style:height={`${height + 40}px`}
	bind:clientWidth={width}
>
	{#if width}
		<svg>
			<line x1="0" y1={midY} x2="100%" y2={midY} stroke="black" />
			<line
				x1={xScale(getFullTimestamp(midpoint, 0))}
				y1="0%"
				x2={xScale(getFullTimestamp(midpoint, 0))}
				y2="100%"
				stroke="var(--color-gray-500)"
				stroke-width="1"
				stroke-dasharray="4"
			/>
			<text
				class="act-label"
				x={xScale(getFullTimestamp(midpoint, 0)) + 10}
				y={midY + 10}>Act 2 {"->"}</text
			>
			<text
				class="act-label anchor-end"
				x={xScale(getFullTimestamp(midpoint, 0)) - 10}
				y={midY + 10}
				>{"<-"} Act 1
			</text>

			<text class="time-label" x={xScale(0)} y={midY + 10}>0h0m</text>
			<text
				class="time-label anchor-end"
				x={xScale(totalMusicalDuration)}
				y={midY + 10}
			>
				{timeFormatter(totalMusicalDuration)}
			</text>

			{#each Object.entries(motifPoints) as [name, points], i}
				<text class="motif-name" x={0} y={yScale(i)}>{name}</text>
				{#each points as { x, y }}
					<circle cx={x} cy={yScale(i)} r={5} fill={motifColors[name]} />
				{/each}
			{/each}
		</svg>
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
		fill: var(--color-gray-800);
	}

	text.act-label {
		alignment-baseline: before-edge;
		text-anchor: start;
	}

	text.time-label {
		text-anchor: start;
		alignment-baseline: before-edge;
	}

	text.anchor-end {
		text-anchor: end;
	}
</style>
