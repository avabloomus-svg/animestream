import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useRemoveFromWatchlist, useWatchlist } from "@/hooks/useVideos";
import type { VideoId, VideoSummary } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, BookmarkX, Play, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Watchlist Video Card ────────────────────────────────────────────────────

interface WatchlistCardProps {
  video: VideoSummary;
  index: number;
  onRemove: (id: VideoId) => void;
  isRemoving: boolean;
}

function WatchlistCard({
  video,
  index,
  onRemove,
  isRemoving,
}: WatchlistCardProps) {
  const coverUrl = video.coverImage.getDirectURL();

  return (
    <div
      className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-200 shadow-card hover:shadow-elevated"
      data-ocid={`watchlist.item.${index + 1}`}
    >
      {/* Remove button — visible on hover */}
      <button
        type="button"
        onClick={() => onRemove(video.id)}
        disabled={isRemoving}
        aria-label={`Remove ${video.title} from watchlist`}
        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-card/90 border border-border flex items-center justify-center opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:bg-destructive/10 hover:border-destructive/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
        data-ocid={`watchlist.delete_button.${index + 1}`}
      >
        <X className="w-3.5 h-3.5 text-foreground" />
      </button>

      {/* Card link */}
      <Link
        to="/watch/$videoId"
        params={{ videoId: video.id.toString() }}
        className="block"
        data-ocid={`watchlist.link.${index + 1}`}
      >
        {/* Cover image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-accent/40">
          <img
            src={coverUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Play overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated">
              <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </div>
          {/* Genre badge */}
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="text-xs bg-card/90 border-border backdrop-blur-sm text-primary font-semibold"
            >
              {video.genre}
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <BookOpen className="w-3 h-3 flex-shrink-0" />
            <span>
              {Number(video.episodeCount)}{" "}
              {Number(video.episodeCount) === 1 ? "episode" : "episodes"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function WatchlistSkeleton() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      data-ocid="watchlist.loading_state"
    >
      {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
        (k) => (
          <div key={k} className="space-y-2">
            <Skeleton className="aspect-[2/3] rounded-lg bg-accent/60" />
            <Skeleton className="h-3 w-full bg-accent/40" />
            <Skeleton className="h-3 w-2/3 bg-accent/40" />
          </div>
        ),
      )}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyWatchlist() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      data-ocid="watchlist.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6">
        <BookmarkX className="w-9 h-9 text-primary" />
      </div>
      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
        No saved videos yet
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Browse anime and add to your watchlist to find them quickly later.
      </p>
      <Button
        asChild
        variant="outline"
        className="border-border hover:bg-accent/60 hover:border-primary/40 hover:text-primary"
        data-ocid="watchlist.browse_link"
      >
        <Link to="/" search={{ q: "", genre: "" }}>
          Browse Anime
        </Link>
      </Button>
    </div>
  );
}

// ─── Login Required ──────────────────────────────────────────────────────────

function LoginRequired({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      data-ocid="watchlist.login_required"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6">
        <BookmarkX className="w-9 h-9 text-primary" />
      </div>
      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
        Login required
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Sign in with Internet Identity to view and manage your personal
        watchlist.
      </p>
      <Button
        onClick={onLogin}
        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
        data-ocid="watchlist.login_button"
      >
        Sign In
      </Button>
    </div>
  );
}

// ─── WatchlistPage ────────────────────────────────────────────────────────────

export default function WatchlistPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: watchlist = [], isLoading } = useWatchlist(isAuthenticated);
  const removeFromWatchlist = useRemoveFromWatchlist();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (videoId: VideoId) => {
    const idKey = videoId.toString();
    setRemovingId(idKey);
    try {
      await removeFromWatchlist.mutateAsync(videoId);
      toast.success("Removed from watchlist");
    } catch {
      toast.error("Failed to remove video");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="watchlist.page">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Page header */}
        <div
          className="flex items-center gap-3 mb-8"
          data-ocid="watchlist.section"
        >
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            My Watchlist
          </h1>
          {isAuthenticated && !isLoading && (
            <Badge
              variant="secondary"
              className="bg-primary/10 border-primary/20 text-primary text-xs font-mono tabular-nums"
              data-ocid="watchlist.count_badge"
            >
              {watchlist.length} saved
            </Badge>
          )}
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <LoginRequired onLogin={login} />
        ) : isLoading ? (
          <WatchlistSkeleton />
        ) : watchlist.length === 0 ? (
          <EmptyWatchlist />
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            data-ocid="watchlist.list"
          >
            {watchlist.map((video, i) => (
              <WatchlistCard
                key={video.id.toString()}
                video={video as VideoSummary}
                index={i}
                onRemove={handleRemove}
                isRemoving={removingId === video.id.toString()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
