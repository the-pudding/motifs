let audioManager;

export function audioApi() {
	if (audioManager) return audioManager;

	let el = $state(null); // single <audio> element
	let ready = $state(false); // whether the element exists and is ready to play fully
	let src = $state(null); // audio file source
	let trackName = $state(null); // track name
	let currentTime = $state(0); // playback time in seconds
	let smoothTime = $state(0); // more updates for animations (only when requested)
	let duration = $state(0); // duration in seconds
	let figureId = $state(null); // associated figure ID
	let motifData = $state(null); // associated motif data (for ArcViz)

	let rafId = null;
	let smoothRefCount = 0;

	const onMeta = () => {
		duration = el?.duration || 0;
	};

	const onTime = () => {
		currentTime = el?.currentTime || 0;
	};

	const tick = () => {
		if (el) smoothTime = el.currentTime || 0;
		rafId = requestAnimationFrame(tick);
	};

	const startTicker = () => {
		if (rafId == null) rafId = requestAnimationFrame(tick);
	};

	const stopTicker = () => {
		if (rafId != null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};

	const subscribeSmooth = () => {
		smoothRefCount++;
		if (smoothRefCount === 1) startTicker();
		return () => {
			smoothRefCount = Math.max(0, smoothRefCount - 1);
			if (smoothRefCount === 0) stopTicker();
		};
	};

	const attach = () => {
		if (!el) return;
		el.addEventListener("timeupdate", onTime);
		el.addEventListener("loadedmetadata", onMeta);
	};

	const detach = () => {
		if (!el) return;
		el.removeEventListener("timeupdate", onTime);
		el.removeEventListener("loadedmetadata", onMeta);
	};

	const setup = (node) => {
		if (el === node) return;
		detach();
		el = node || null;
		attach();
	};

	const load = (newSrc, { figure, motif } = {}) => {
		ready = false;

		src = newSrc;
		trackName = newSrc
			?.split("/")
			.pop()
			// .replace(/_/g, " ")
			.replace(/^\d+-\d+ /, "")
			.replace(/\.mp3$/, "");
		figureId = figure ?? null;
		motifData = motif ?? null;
		el.src = newSrc;
		el.load();

		el.addEventListener("canplaythrough", () => {
			ready = true;
		});
	};

	const play = () => {
		return new Promise((resolve, reject) => {
			if (motifData) {
				el.currentTime = motifData.start;
				currentTime = el.currentTime || 0;

				const onTimeUpdate = () => {
					if (motifData && el.currentTime >= motifData.end) {
						el.pause();
						el.removeEventListener("timeupdate", onTimeUpdate);
						resolve();
					}
				};

				el.addEventListener("timeupdate", onTimeUpdate);
			} else {
				const onEnded = () => {
					el.removeEventListener("ended", onEnded);
					clear();
					resolve();
				};
				el.addEventListener("ended", onEnded);
			}

			const playPromise = el.play();
			if (playPromise !== undefined) {
				playPromise.catch((err) => {
					el.removeEventListener("timeupdate", onTimeUpdate);
					el.removeEventListener("ended", onEnded);
					reject(err);
				});
			}
		});
	};

	const pause = () => {
		el.pause();
	};

	const clear = () => {
		src = null;
		el.src = "";
		duration = 0;
		trackName = null;
		figureId = null;
		motifData = null;
	};

	const pauseAndClear = () => {
		el.pause();
		clear();
	};

	const seek = (t) => {
		const d = el.duration || t;
		el.currentTime = Math.max(0, Math.min(t, d));
		currentTime = el.currentTime;
	};

	const destroy = () => {
		detach();
		el = null;
	};

	audioManager = {
		setup,
		destroy,
		load,
		subscribeSmooth,
		play,
		pause,
		pauseAndClear,
		seek,

		get ready() {
			return ready;
		},
		get src() {
			return src;
		},
		set src(v) {
			src = v;
		},
		get trackName() {
			return trackName;
		},
		set trackName(v) {
			trackName = v;
		},
		get currentTime() {
			return currentTime;
		},
		get smoothTime() {
			return smoothTime;
		},
		get duration() {
			return duration;
		},
		get figureId() {
			return figureId;
		},
		set figureId(v) {
			figureId = v;
		},
		get motifData() {
			return motifData;
		},
		set motifData(v) {
			motifData = v;
		}
	};

	return audioManager;
}
