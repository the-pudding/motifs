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
		if (el) {
			smoothTime = el.currentTime ? Math.max(smoothTime, el.currentTime) : 0;
			// smoothTime = el.currentTime || 0;
		}
		rafId = requestAnimationFrame(tick);
	};

	const startTicker = () => {
		if (typeof window === "undefined") return;
		if (rafId == null) rafId = requestAnimationFrame(tick);
	};

	const stopTicker = () => {
		if (typeof window === "undefined") return;
		if (rafId != null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
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

		if (typeof window !== "undefined" && !rafId) startTicker();
	};

	const load = (newSrc, { figure, motif } = {}) => {
		ready = false;

		src = newSrc;
		trackName = newSrc
			?.split("/")
			.pop()
			.replace(/^\d+-\d+ /, "")
			.replace(/\.mp3$/, "");
		figureId = figure ?? null;
		motifData = motif ?? null;

		// ✅ Reset smoothTime whenever a new source is loaded
		smoothTime = motif?.start || 0;

		// ✅ remove explicit .load() to prevent Safari double request
		el.src = newSrc;
		el.preload = "auto";

		el.addEventListener(
			"canplaythrough",
			() => {
				ready = true;
			},
			{ once: true }
		);
	};

	const play = () => {
		return new Promise((resolve, reject) => {
			const onTimeUpdate = () => {
				if (
					motifData &&
					(el.currentTime >= motifData.end || el.currentTime >= duration)
				) {
					el.pause();
					el.removeEventListener("timeupdate", onTimeUpdate);
					resolve();
				}
			};
			const onEnded = () => {
				el.removeEventListener("ended", onEnded);
				clear();
				resolve();
			};

			if (motifData) {
				el.currentTime = motifData.start;
				currentTime = el.currentTime || 0;
				el.addEventListener("timeupdate", onTimeUpdate);
			} else {
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
		stopTicker();
	};

	audioManager = {
		setup,
		destroy,
		load,
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
