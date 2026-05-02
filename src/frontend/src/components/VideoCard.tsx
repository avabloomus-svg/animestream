import { Badge } from "@/components/ui/badge";
import type { VideoSummary } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Play } from "lucide-react";

interface VideoCardProps {
  video: VideoSummary;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const coverUrl = video.coverImage.getDirectURL();

  return (
    <Link
      to="/watch/$videoId"
      params={{ videoId: video.id.toString() }}
      className="group block rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-smooth shadow-card hover:shadow-elevated"
      data-ocid={`video.item.${index + 1}`}
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
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
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
        <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-smooth">
          {video.title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <BookOpen className="w-3 h-3" />
          <span>
            {Number(video.episodeCount)}{" "}
            {Number(video.episodeCount) === 1 ? "episode" : "episodes"}
          </span>
        </div>
      </div>
    </Link>
  );
}
