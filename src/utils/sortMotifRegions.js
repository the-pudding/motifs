const sortMotifRegions = (motifs) => {
	const parseTrackName = (trackName) => {
		const match = trackName.match(/^(\d+)-(\d+)/);
		if (!match) return { act: Infinity, song: Infinity };
		return {
			act: parseInt(match[1], 10),
			song: parseInt(match[2], 10)
		};
	};

	return motifs
		.map((motif) => {
			// 1) Keep only one region per track-name: the one with the lowest start
			const byTrack = new Map();
			for (const r of motif.regions) {
				const key = r["track-name"];
				const prev = byTrack.get(key);
				if (
					!prev ||
					Number(r.start) < Number(prev.start) ||
					(Number(r.start) === Number(prev.start) &&
						Number(r.end) < Number(prev.end))
				) {
					byTrack.set(key, r);
				}
			}

			const filtered = Array.from(byTrack.values());

			// 2) Sort by act, then song, then track-name
			const sortedRegions = filtered.sort((a, b) => {
				const A = parseTrackName(a["track-name"]);
				const B = parseTrackName(b["track-name"]);
				if (A.act !== B.act) return A.act - B.act;
				if (A.song !== B.song) return A.song - B.song;
				if (a["track-name"] !== b["track-name"]) {
					return a["track-name"].localeCompare(b["track-name"]);
				}
				return Number(a.start) - Number(b.start);
			});

			return { ...motif, regions: sortedRegions };
		})
		.filter((motif) => motif.regions.length > 1);
};

export default sortMotifRegions;
