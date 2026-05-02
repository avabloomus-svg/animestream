import { VideoCard } from "@/components/VideoCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useVideo,
  useVideosByGenre,
  useWatchlist,
} from "@/hooks/useVideos";
import type { Genre, VideoId } from "@/types";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  Calendar,
  ChevronDown,
  ChevronUp,
  Layers,
  LogIn,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Custom video player ──────────────────────────────────────────────────────

function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
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

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    if (!v) return;
    const val = Number.parseFloat(e.target.value);
    v.currentTime = val * v.duration;
    setProgress(val);
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function formatTime(s: number) {
    if (!s || Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const currentTime = duration * progress;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-foreground/5 aspect-video"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      data-ocid="watch.player"
    >
      {/* biome-ignore lint/a11y/useMediaCaption: user-uploaded content may not have captions */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setPlaying(false);
          setShowControls(true);
        }}
        onClick={togglePlay}
        onKeyDown={(e) => e.key === " " && togglePlay()}
      />

      {/* Paused overlay */}
      {!playing && (
        <button
          type="button"
          aria-label="Play video"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-foreground/5"
          data-ocid="watch.play_overlay"
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated hover:bg-primary transition-smooth">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-primary-foreground ml-1"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </button>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Seek bar */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={handleSeek}
          aria-label="Seek"
          className="w-full h-1 appearance-none bg-primary-foreground/30 rounded-full cursor-pointer mb-3 accent-foreground-color"
          data-ocid="watch.progress_bar"
        />

        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className="text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0"
            data-ocid="watch.play_button"
          >
            {playing ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          {/* Mute */}
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0"
            data-ocid="watch.mute_button"
          >
            {muted ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5" />
                <path d="M19.07,4.93a10,10 0,0,1 0,14.14" />
                <path d="M15.54,8.46a5,5 0,0,1 0,7.07" />
              </svg>
            )}
          </button>

          {/* Volume */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="w-20 h-1 appearance-none bg-primary-foreground/30 rounded-full cursor-pointer accent-foreground-color"
            data-ocid="watch.volume_slider"
          />

          {/* Time */}
          <span className="text-xs text-primary-foreground/70 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Fullscreen */}
          <button
            type="button"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleFullscreen}
            className="text-primary-foreground hover:text-primary-foreground/70 transition-smooth shrink-0"
            data-ocid="watch.fullscreen_button"
          >
            {fullscreen ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function WatchSkeleton() {
  return (
    <div data-ocid="watch.loading_state">
      <div className="w-full bg-accent/40">
        <Skeleton className="w-full aspect-video bg-accent/60 rounded-none" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <Skeleton className="h-4 w-28 bg-accent/60" />
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <Skeleton className="h-8 w-3/4 bg-accent/60" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-20 bg-accent/40 rounded-full" />
            <Skeleton className="h-6 w-28 bg-accent/40" />
            <Skeleton className="h-6 w-32 bg-accent/40" />
          </div>
          <Skeleton className="h-4 w-full bg-accent/40" />
          <Skeleton className="h-4 w-5/6 bg-accent/40" />
          <Skeleton className="h-4 w-4/6 bg-accent/40" />
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WatchPage() {
  const { videoId } = useParams({ from: "/watch/$videoId" });
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  const parsedId: VideoId = BigInt(videoId);
  const { data: video, isLoading, isError } = useVideo(parsedId);

  const genreValue = video?.genre as Genre | undefined;
  const { data: relatedVideos = [] } = useVideosByGenre(genreValue ?? null);
  const { data: watchlist = [] } = useWatchlist(isAuthenticated);
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();

  const [descExpanded, setDescExpanded] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const isInWatchlist = watchlist.some((v) => v.id === video?.id);
  const isWatchlistPending = addMutation.isPending || removeMutation.isPending;

  const related = relatedVideos.filter((v) => v.id !== video?.id).slice(0, 8);

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

  const videoUrl = video?.videoFile?.getDirectURL() ?? "";
  const posterUrl = video?.coverImage?.getDirectURL() ?? "";
  const uploadDate = video?.uploadedAt
    ? new Date(Number(video.uploadedAt) / 1_000_000).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : "";

  const DESC_THRESHOLD = 200;
  const isLongDesc = (video?.description?.length ?? 0) > DESC_THRESHOLD;
  const displayDesc = video?.description
    ? descExpanded || !isLongDesc
      ? video.description
      : `${video.description.slice(0, DESC_THRESHOLD)}…`
    : "";

  if (isLoading) return <WatchSkeleton />;

  if (isError || video === null || video === undefined) {
    return (
      <div
        className="max-w-screen-xl mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center"
        data-ocid="watch.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-accent/60 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Video not found
        </h2>
        <p className="text-muted-foreground max-w-xs text-sm">
          The video you're looking for doesn't exist or may have been removed.
        </p>
        <Button
          variant="outline"
          onClick={() =>
            router.navigate({ to: "/", search: { q: "", genre: "" } })
          }
          className="gap-2 border-border hover:border-primary/40 hover:text-primary"
          data-ocid="watch.back_to_browse_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="watch.page">
      {/* Full-width player block */}
      <div className="w-full bg-foreground/5">
        <div className="max-w-screen-2xl mx-auto">
          <VideoPlayer src={videoUrl} poster={posterUrl} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
        {/* Back */}
        <button
          type="button"
          onClick={() =>
            router.navigate({ to: "/", search: { q: "", genre: "" } })
          }
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
          data-ocid="watch.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </button>

        {/* Video metadata card */}
        <div
          className="bg-card border border-border rounded-xl p-5 space-y-5 shadow-card"
          data-ocid="watch.meta_panel"
        >
          {/* Title + watchlist button */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words">
                {video.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold bg-primary/10 border-primary/20 text-primary uppercase tracking-wider"
                  data-ocid="watch.genre_badge"
                >
                  {video.genre}
                </Badge>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>
                    {Number(video.episodeCount)}{" "}
                    {Number(video.episodeCount) === 1 ? "episode" : "episodes"}
                  </span>
                </div>

                {uploadDate && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{uploadDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Watchlist CTA */}
            <div className="shrink-0">
              <Button
                onClick={handleWatchlist}
                disabled={isWatchlistPending}
                variant={isInWatchlist ? "default" : "outline"}
                className={`gap-2 ${
                  isInWatchlist
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}
                data-ocid="watch.watchlist_button"
              >
                {isInWatchlist ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <BookmarkPlus className="w-4 h-4" />
                )}
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </Button>
            </div>
          </div>

          {/* Login prompt */}
          {showLoginPrompt && !isAuthenticated && (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20"
              data-ocid="watch.login_prompt"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Login required
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Login with Internet Identity to save videos to your watchlist.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  onClick={() => login()}
                  className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                  data-ocid="watch.login_prompt_button"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login with Internet Identity
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                  data-ocid="watch.login_prompt_dismiss"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}

          {/* Description */}
          {video.description && (
            <div data-ocid="watch.description_section">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Synopsis
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {displayDesc}
              </p>
              {isLongDesc && (
                <button
                  type="button"
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="flex items-center gap-1 mt-2 text-xs text-primary hover:text-primary/70 font-medium transition-smooth"
                  data-ocid="watch.description_toggle"
                >
                  {descExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" /> Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" /> Show more
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Related videos */}
        {related.length > 0 && (
          <section data-ocid="watch.related_section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                More{" "}
                <span className="text-primary font-normal">{video.genre}</span>
              </h2>
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground"
              >
                {related.length} titles
              </Badge>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-ocid="watch.related_list"
            >
              {related.map((v, i) => (
                <VideoCard key={v.id.toString()} video={v} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
