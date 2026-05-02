import type { Genre } from "@/backend";
import { GenreFilter } from "@/components/GenreFilter";
import { VideoCard } from "@/components/VideoCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useSearchVideos,
  useVideos,
  useVideosByGenre,
} from "@/hooks/useVideos";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { BookOpen, Play, Tv } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function BrowsePage() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(
    search.genre ? (search.genre as Genre) : null,
  );
  const gridRef = useRef<HTMLDivElement>(null);

  const searchTerm = search.q || "";
  const isSearching = searchTerm.length > 0;
  const isFiltering = selectedGenre !== null;

  const { data: allVideos = [], isLoading: loadingAll } = useVideos();
  const { data: genreVideos = [], isLoading: loadingGenre } =
    useVideosByGenre(selectedGenre);
  const { data: searchResults = [], isLoading: loadingSearch } =
    useSearchVideos(searchTerm);

  const baseVideos = isSearching
    ? searchResults
    : isFiltering
      ? genreVideos
      : allVideos;

  const videos =
    isSearching && isFiltering
      ? baseVideos.filter((v) => v.genre === selectedGenre)
      : baseVideos;

  const isLoading = isSearching
    ? loadingSearch
    : isFiltering
      ? loadingGenre
      : loadingAll;

  const featuredVideo = allVideos[0] ?? null;

  function handleGenreChange(genre: Genre | null) {
    setSelectedGenre(genre);
    navigate({ search: (prev) => ({ ...prev, genre: genre ?? "" }) });
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  useEffect(() => {
    setSelectedGenre(search.genre ? (search.genre as Genre) : null);
  }, [search.genre]);

  return (
    <div data-ocid="browse.page">
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/50 border-b border-border"
        data-ocid="browse.hero.section"
        style={{ minHeight: 420 }}
      >
        {/* Background image */}
        <img
          src="/assets/generated/anime-hero-banner.dim_1400x500.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 select-none pointer-events-none"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Light overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center gap-10">
          {/* Text block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                <Tv className="w-3 h-3" />
                Free Streaming
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Watch Anime
              <br />
              <span className="text-primary">Anywhere, Anytime.</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
              Discover thousands of anime series and movies across Action,
              Fantasy, Romance, Sci-Fi, and more — all in one place.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                type="button"
                onClick={() =>
                  gridRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded font-semibold text-sm hover:bg-primary/90 transition-smooth shadow-sm"
                data-ocid="hero.browse_button"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Browsing
              </button>
              {allVideos.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {allVideos.length} titles available
                </span>
              )}
            </div>
          </div>

          {/* Featured video card */}
          {featuredVideo && (
            <div
              className="shrink-0 w-full max-w-[200px] md:max-w-[220px]"
              data-ocid="hero.featured_card"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                Featured
              </p>
              <a
                href={`/watch/${featuredVideo.id.toString()}`}
                className="group block rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-smooth shadow-card hover:shadow-elevated bg-card"
                data-ocid="hero.featured.link"
              >
                <div className="relative aspect-[2/3] bg-accent/40 overflow-hidden">
                  <img
                    src={featuredVideo.coverImage.getDirectURL()}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-card/90 border-border backdrop-blur-sm text-primary font-semibold"
                    >
                      {featuredVideo.genre}
                    </Badge>
                  </div>
                </div>
                <div className="p-2.5 bg-card">
                  <p className="font-display font-semibold text-sm text-foreground line-clamp-1">
                    {featuredVideo.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <BookOpen className="w-3 h-3" />
                    <span>
                      {Number(featuredVideo.episodeCount)}{" "}
                      {Number(featuredVideo.episodeCount) === 1 ? "ep" : "eps"}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Browse Section ─────────────────────────────────────────── */}
      <section
        className="bg-background min-h-[60vh]"
        ref={gridRef}
        data-ocid="browse.grid.section"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          {/* Genre filter */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-sm font-semibold text-primary uppercase tracking-widest">
                Browse by Genre
              </h2>
            </div>
            <div className="overflow-x-auto -mx-4 px-4">
              <div
                className="flex gap-2 pb-1"
                style={{ minWidth: "max-content" }}
              >
                <GenreFilter
                  selected={selectedGenre}
                  onChange={handleGenreChange}
                />
              </div>
            </div>
          </div>

          {/* Section title + count */}
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {isSearching
                  ? `Results for "${searchTerm}"`
                  : isFiltering
                    ? `${selectedGenre} Anime`
                    : "All Anime"}
              </h2>
              {isSearching && isFiltering && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Filtered by genre: {selectedGenre}
                </p>
              )}
            </div>
            {!isLoading && (
              <span
                className="text-sm text-muted-foreground tabular-nums"
                data-ocid="browse.count"
              >
                {videos.length} {videos.length === 1 ? "title" : "titles"}
              </span>
            )}
          </div>

          {/* Video grid */}
          {isLoading ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-ocid="browse.loading_state"
            >
              {SKELETON_KEYS.map((k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="aspect-[2/3] rounded-lg bg-accent/60" />
                  <Skeleton className="h-3 w-full bg-accent/40" />
                  <Skeleton className="h-3 w-2/3 bg-accent/40" />
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
              data-ocid="browse.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-accent/60 border border-border flex items-center justify-center text-3xl">
                🎌
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                No anime found
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                {isSearching
                  ? `No results for "${searchTerm}". Try a different search term or clear the genre filter.`
                  : isFiltering
                    ? `No videos in the ${selectedGenre} genre yet.`
                    : "No videos have been uploaded yet. Check back soon!"}
              </p>
              {(isSearching || isFiltering) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre(null);
                    navigate({ search: { q: "", genre: "" } });
                  }}
                  className="mt-2 text-sm text-primary underline underline-offset-4 hover:text-primary/70 transition-smooth"
                  data-ocid="browse.clear_filters_button"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
              data-ocid="browse.list"
            >
              {videos.map((video, i) => (
                <VideoCard key={video.id.toString()} video={video} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
