<script>
	import { scaleLinear } from "d3-scale";

	let { motifs = [], tracks = [], alternate = false } = $props();

	const getFullTimestamp = (trackName, timestamp) => {
		const track = tracks.find((t) => t.name === trackName);
		if (!track) return 0;
		const trackStart = tracks
			.slice(0, tracks.indexOf(track))
			.reduce((total, track) => total + track.duration, 0);
		return trackStart + timestamp;
	};

	const totalMusicalDuration = tracks.reduce(
		(total, track) => total + track.duration,
		0
	);

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

	const height = 300;
	const curvature = 0.35;
	const firstSongOfAct2 = tracks.find((d) => d.name.includes("2-01")).name;

	const midY = $derived(height / 2);
	let width = $state();
	let xScale = $derived(
		scaleLinear().domain([0, totalMusicalDuration]).range([0, width])
	);
	let pointsByMotif = $derived(
		motifs.reduce((acc, motif) => {
			const pts = motif.regions
				? motif.regions
						.map((region) => ({
							x: xScale(getFullTimestamp(region["track-name"], region.start)),
							y: midY
						}))
						.sort((a, b) => a.x - b.x)
				: [];

			acc[motif.name] = pts;
			return acc;
		}, {})
	);
	let pointsReady = $derived(
		Object.values(pointsByMotif).every((points) =>
			points.every((p) => p.x && p.y)
		)
	);

	const arcPath = (p1, p2, i) => {
		const dx = Math.max(0, p2.x - p1.x);
		if (dx === 0) return "";

		const h = Math.min(80, dx * curvature);
		const dir = alternate ? (i % 2 === 0 ? -1 : 1) : -1;

		const cx = (p1.x + p2.x) / 2;
		const cy = midY + dir * h;

		return `M ${p1.x},${p1.y} Q ${cx},${cy} ${p2.x},${p2.y}`;
	};
</script>

<div
	class="chart-container"
	style:height={`${height}px`}
	bind:clientWidth={width}
>
	<svg>
		<line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" />
		<line
			x1={xScale(getFullTimestamp(firstSongOfAct2, 0))}
			y1="20%"
			x2={xScale(getFullTimestamp(firstSongOfAct2, 0))}
			y2="80%"
			stroke="var(--color-gray-500)"
			stroke-width="1"
			stroke-dasharray="4"
		/>

		{#if pointsReady}
			{#each Object.entries(pointsByMotif) as [name, points]}
				{#each points as p}
					<circle
						cx={p.x}
						cy={p.y}
						r="4"
						fill={motifColors[name]}
						stroke="var(--color-gray-500)"
						stroke-width="1"
					/>
				{/each}

				{#each points as p, i (i)}
					{#if i < points.length - 1}
						<path
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
	</svg>
</div>

<style>
	.chart-container {
		width: 100%;
	}

	svg {
		height: 100%;
		width: 100%;
	}
</style>
