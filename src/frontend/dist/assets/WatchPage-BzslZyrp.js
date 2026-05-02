import { c as createLucideIcon, b as useParams, d as useRouter, e as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, L as LogIn, S as Skeleton } from "./index-CvJhbmSF.js";
import { V as VideoCard } from "./VideoCard-Gt-g9Zrp.js";
import { c as useVideo, a as useVideosByGenre, d as useWatchlist, e as useAddToWatchlist, f as useRemoveFromWatchlist, B as Badge } from "./useVideos-CsyQrgvc.js";
import { A as ArrowLeft, C as ChevronUp, a as ChevronDown } from "./chevron-up-Cd0wrV4Z.js";
import "./book-open-uhnKLvA-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
  ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
];
const BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function VideoPlayer({ src, poster }) {
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const hideTimer = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [muted, setMuted] = reactExports.useState(false);
  const [volume, setVolume] = reactExports.useState(1);
  const [progress, setProgress] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const [showControls, setShowControls] = reactExports.useState(true);
  const resetHideTimer = reactExports.useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);
  reactExports.useEffect(() => {
    const onFS = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFS);
    return () => document.removeEventListener("fullscreenchange", onFS);
  }, []);
  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
    resetHideTimer();
  }
  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  }
  function handleLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
  }
  function handleSeek(e) {
    const v = videoRef.current;
    if (!v) return;
    const val = Number.parseFloat(e.target.value);
    v.currentTime = val * v.duration;
    setProgress(val);
  }
  function handleVolumeChange(e) {
    const v = videoRef.current;
    if (!v) return;
    const val = Number.parseFloat(e.target.value);
    v.volume = val;
    setVolume(val);
    setMuted(val === 0);
  }
  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    if (muted) {
      v.muted = false;
      const vol = volume > 0 ? volume : 0.7;
      v.volume = vol;
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }
  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      void containerRef.current.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  }
  function formatTime(s) {
    if (!s || Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }
  const currentTime = duration * progress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative w-full bg-foreground/5 aspect-video",
      onMouseMove: resetHideTimer,
      onMouseLeave: () => playing && setShowControls(false),
      "data-ocid": "watch.player",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src,
            poster,
            className: "w-full h-full object-contain cursor-pointer",
            onTimeUpdate: handleTimeUpdate,
            onLoadedMetadata: handleLoadedMetadata,
            onEnded: () => {
              setPlaying(false);
              setShowControls(true);
            },
            onClick: togglePlay,
            onKeyDown: (e) => e.key === " " && togglePlay()
          }
        ),
        !playing && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Play video",
            onClick: togglePlay,
            className: "absolute inset-0 flex items-center justify-center bg-foreground/5",
            "data-ocid": "watch.play_overlay",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated hover:bg-primary transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                "aria-hidden": "true",
                viewBox: "0 0 24 24",
                className: "w-7 h-7 fill-primary-foreground ml-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "5,3 19,12 5,21" })
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 1e-3,
                  value: progress,
                  onChange: handleSeek,
                  "aria-label": "Seek",
                  className: "w-full h-1 appearance-none bg-primary-foreground/30 rounded-full cursor-pointer mb-3 accent-foreground-color",
                  "data-ocid": "watch.progress_bar"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": playing ? "Pause" : "Play",
                    onClick: togglePlay,
                    className: "text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0",
                    "data-ocid": "watch.play_button",
                    children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-current",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-current",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "5,3 19,12 5,21" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": muted ? "Unmute" : "Mute",
                    onClick: toggleMute,
                    className: "text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0",
                    "data-ocid": "watch.mute_button",
                    children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-none stroke-current stroke-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "11,5 6,9 2,9 2,15 6,15 11,19 11,5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-none stroke-current stroke-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "11,5 6,9 2,9 2,15 6,15 11,19 11,5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.07,4.93a10,10 0,0,1 0,14.14" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.54,8.46a5,5 0,0,1 0,7.07" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: muted ? 0 : volume,
                    onChange: handleVolumeChange,
                    "aria-label": "Volume",
                    className: "w-20 h-1 appearance-none bg-primary-foreground/30 rounded-full cursor-pointer accent-foreground-color",
                    "data-ocid": "watch.volume_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary-foreground/70 tabular-nums", children: [
                  formatTime(currentTime),
                  " / ",
                  formatTime(duration)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": fullscreen ? "Exit fullscreen" : "Enter fullscreen",
                    onClick: toggleFullscreen,
                    className: "text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0",
                    "data-ocid": "watch.fullscreen_button",
                    children: fullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-none stroke-current stroke-2",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" })
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        "aria-hidden": "true",
                        viewBox: "0 0 24 24",
                        className: "w-5 h-5 fill-none stroke-current stroke-2",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" })
                      }
                    )
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function WatchSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "watch.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-accent/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video bg-accent/60 rounded-none" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 bg-accent/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4 bg-accent/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 bg-accent/40 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28 bg-accent/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 bg-accent/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-accent/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 bg-accent/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6 bg-accent/40" })
      ] })
    ] })
  ] });
}
function WatchPage() {
  var _a, _b, _c;
  const { videoId } = useParams({ from: "/watch/$videoId" });
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const parsedId = BigInt(videoId);
  const { data: video, isLoading, isError } = useVideo(parsedId);
  const genreValue = video == null ? void 0 : video.genre;
  const { data: relatedVideos = [] } = useVideosByGenre(genreValue ?? null);
  const { data: watchlist = [] } = useWatchlist(isAuthenticated);
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();
  const [descExpanded, setDescExpanded] = reactExports.useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = reactExports.useState(false);
  const isInWatchlist = watchlist.some((v) => v.id === (video == null ? void 0 : video.id));
  const isWatchlistPending = addMutation.isPending || removeMutation.isPending;
  const related = relatedVideos.filter((v) => v.id !== (video == null ? void 0 : video.id)).slice(0, 8);
  function handleWatchlist() {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    if (!video) return;
    if (isInWatchlist) {
      removeMutation.mutate(video.id);
    } else {
      addMutation.mutate(video.id);
    }
  }
  const videoUrl = ((_a = video == null ? void 0 : video.videoFile) == null ? void 0 : _a.getDirectURL()) ?? "";
  const posterUrl = ((_b = video == null ? void 0 : video.coverImage) == null ? void 0 : _b.getDirectURL()) ?? "";
  const uploadDate = (video == null ? void 0 : video.uploadedAt) ? new Date(Number(video.uploadedAt) / 1e6).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ) : "";
  const DESC_THRESHOLD = 200;
  const isLongDesc = (((_c = video == null ? void 0 : video.description) == null ? void 0 : _c.length) ?? 0) > DESC_THRESHOLD;
  const displayDesc = (video == null ? void 0 : video.description) ? descExpanded || !isLongDesc ? video.description : `${video.description.slice(0, DESC_THRESHOLD)}…` : "";
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(WatchSkeleton, {});
  if (isError || video === null || video === void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-screen-xl mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center",
        "data-ocid": "watch.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Video not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs text-sm", children: "The video you're looking for doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => router.navigate({ to: "/", search: { q: "", genre: "" } }),
              className: "gap-2 border-border hover:border-primary/40 hover:text-primary",
              "data-ocid": "watch.back_to_browse_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Browse"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "watch.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-foreground/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-screen-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { src: videoUrl, poster: posterUrl }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 py-6 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => router.navigate({ to: "/", search: { q: "", genre: "" } }),
          className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth",
          "data-ocid": "watch.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Browse"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 space-y-5 shadow-card",
          "data-ocid": "watch.meta_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words", children: video.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs font-semibold bg-primary/10 border-primary/20 text-primary uppercase tracking-wider",
                      "data-ocid": "watch.genre_badge",
                      children: video.genre
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      Number(video.episodeCount),
                      " ",
                      Number(video.episodeCount) === 1 ? "episode" : "episodes"
                    ] })
                  ] }),
                  uploadDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: uploadDate })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleWatchlist,
                  disabled: isWatchlistPending,
                  variant: isInWatchlist ? "default" : "outline",
                  className: `gap-2 ${isInWatchlist ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"}`,
                  "data-ocid": "watch.watchlist_button",
                  children: [
                    isInWatchlist ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4" }),
                    isInWatchlist ? "In Watchlist" : "Add to Watchlist"
                  ]
                }
              ) })
            ] }),
            showLoginPrompt && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20",
                "data-ocid": "watch.login_prompt",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Login required" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Login with Internet Identity to save videos to your watchlist." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        onClick: () => login(),
                        className: "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs",
                        "data-ocid": "watch.login_prompt_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-3.5 h-3.5" }),
                          "Login with Internet Identity"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        onClick: () => setShowLoginPrompt(false),
                        className: "text-xs text-muted-foreground hover:text-foreground",
                        "data-ocid": "watch.login_prompt_dismiss",
                        children: "Dismiss"
                      }
                    )
                  ] })
                ]
              }
            ),
            video.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "watch.description_section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-2", children: "Synopsis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: displayDesc }),
              isLongDesc && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDescExpanded(!descExpanded),
                  className: "flex items-center gap-1 mt-2 text-xs text-primary hover:text-primary/70 font-medium transition-smooth",
                  "data-ocid": "watch.description_toggle",
                  children: descExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }),
                    " Show less"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }),
                    " Show more"
                  ] })
                }
              )
            ] })
          ]
        }
      ),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "watch.related_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground", children: [
            "More",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-normal", children: video.genre })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-border text-muted-foreground",
              children: [
                related.length,
                " titles"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
            "data-ocid": "watch.related_list",
            children: related.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video: v, index: i }, v.id.toString()))
          }
        )
      ] })
    ] })
  ] });
}
export {
  WatchPage as default
};
