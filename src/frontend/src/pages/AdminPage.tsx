import { AdminGuard } from "@/components/AdminGuard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminDashboard,
  useAdminDeleteVideo,
  useAdminVideos,
} from "@/hooks/useVideos";
import type { Video } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Film,
  Grid3X3,
  LayoutDashboard,
  Lock,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminNav() {
  return (
    <div className="bg-card border-b border-border px-6">
      <div className="max-w-screen-xl mx-auto flex items-center gap-1 py-0">
        <div className="flex items-center gap-2 pr-6 mr-2 border-r border-border py-4">
          <Lock className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-sm text-primary">
            Admin Panel
          </span>
        </div>
        <Link to="/admin">
          {({ isActive }) => (
            <span
              data-ocid="admin.dashboard_tab"
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-smooth cursor-pointer ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </span>
          )}
        </Link>
        <Link to="/admin/upload">
          {({ isActive }) => (
            <span
              data-ocid="admin.upload_tab"
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-smooth cursor-pointer ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Plus className="w-4 h-4" />
              Upload New Video
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

function StatsRow() {
  const { data: dashboard, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <Card key={k} className="bg-card border-border shadow-card">
            <CardContent className="pt-5 pb-4">
              <Skeleton className="h-7 w-12 mb-1.5 bg-accent/60" />
              <Skeleton className="h-3.5 w-20 bg-accent/40" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const total = Number(dashboard?.totalVideos ?? 0);
  const genreCounts = dashboard?.genreCounts ?? [];
  const activeGenres = genreCounts.filter(([, c]) => Number(c) > 0).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      <Card
        data-ocid="admin.total_videos_card"
        className="bg-card border-border shadow-card"
      >
        <CardHeader className="pb-1 pt-5 px-4">
          <CardTitle className="text-xs text-primary font-semibold uppercase tracking-wide flex items-center gap-1.5">
            <Film className="w-3 h-3" /> Total Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-2xl font-display font-bold text-foreground">
            {total}
          </p>
        </CardContent>
      </Card>

      <Card
        data-ocid="admin.genre_count_card"
        className="bg-card border-border shadow-card"
      >
        <CardHeader className="pb-1 pt-5 px-4">
          <CardTitle className="text-xs text-primary font-semibold uppercase tracking-wide flex items-center gap-1.5">
            <Grid3X3 className="w-3 h-3" /> Genres
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-2xl font-display font-bold text-foreground">
            {activeGenres}
          </p>
        </CardContent>
      </Card>

      {genreCounts.slice(0, 4).map(([genre, count]) => (
        <Card key={genre} className="bg-card border-border shadow-card">
          <CardHeader className="pb-1 pt-5 px-4">
            <CardTitle className="text-xs text-muted-foreground font-normal uppercase tracking-wide">
              {genre}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-display font-bold text-foreground">
              {Number(count)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeleteDialog({
  video,
  open,
  onOpenChange,
  onConfirm,
}: {
  video: Video;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        data-ocid="admin.delete_dialog"
        className="bg-card border-border shadow-elevated"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Delete Video
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">"{video.title}"</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-ocid="admin.cancel_button"
            className="bg-accent/40 border-border text-foreground hover:bg-accent"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            data-ocid="admin.confirm_button"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function VideoRow({
  video,
  index,
  onDelete,
}: {
  video: Video;
  index: number;
  onDelete: (v: Video) => void;
}) {
  const navigate = useNavigate();
  const uploadDate = new Date(
    Number(video.uploadedAt / 1_000_000n),
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr data-ocid={`admin.item.${index + 1}`} className="admin-table-row">
      <td className="px-4 py-3">
        <div className="w-10 h-14 rounded overflow-hidden bg-accent/40 flex-shrink-0 border border-border">
          <img
            src={video.coverImage.getDirectURL()}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
          {video.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">
          {video.description.slice(0, 50)}
          {video.description.length > 50 ? "…" : ""}
        </p>
      </td>
      <td className="px-4 py-3">
        <Badge
          variant="secondary"
          className="bg-primary/10 border-primary/20 text-primary text-xs font-semibold"
        >
          {video.genre}
        </Badge>
      </td>
      <td className="px-4 py-3 text-center font-mono text-sm text-muted-foreground">
        {Number(video.episodeCount)}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
        {uploadDate}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            data-ocid={`admin.edit_button.${index + 1}`}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10 text-muted-foreground hover:text-primary"
            onClick={() =>
              navigate({
                to: "/admin/edit/$videoId",
                params: { videoId: video.id.toString() },
              })
            }
            aria-label="Edit video"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            data-ocid={`admin.delete_button.${index + 1}`}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(video)}
            aria-label="Delete video"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function DashboardContent() {
  const { data: videos = [], isLoading } = useAdminVideos();
  const deleteMutation = useAdminDeleteVideo();
  const [toDelete, setToDelete] = useState<Video | null>(null);

  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteMutation.mutateAsync(toDelete.id);
      toast.success(`"${toDelete.title}" deleted`);
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <StatsRow />

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold text-foreground uppercase tracking-wide">
          Video List
        </h2>
        <Link to="/admin/upload">
          <Button
            data-ocid="admin.upload_new_button"
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Upload New
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {["r1", "r2", "r3", "r4"].map((k) => (
              <div key={k} className="flex items-center gap-4">
                <Skeleton className="w-10 h-14 rounded bg-accent/60" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40 bg-accent/40" />
                  <Skeleton className="h-3 w-28 bg-accent/40" />
                </div>
                <Skeleton className="h-5 w-16 bg-accent/40" />
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                No videos uploaded
              </p>
              <p className="text-sm text-muted-foreground">
                Start by uploading your first video
              </p>
            </div>
            <Link to="/admin/upload">
              <Button
                data-ocid="admin.empty_upload_button"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload First Video
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table" data-ocid="admin.table">
              <thead>
                <tr className="border-b border-border bg-accent/30">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-primary font-semibold">
                    Cover
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-primary font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-primary font-semibold">
                    Genre
                  </th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-primary font-semibold">
                    Eps
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-primary font-semibold">
                    Uploaded
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-primary font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, i) => (
                  <VideoRow
                    key={video.id.toString()}
                    video={video}
                    index={i}
                    onDelete={setToDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toDelete && (
        <DeleteDialog
          video={toDelete}
          open={!!toDelete}
          onOpenChange={(open) => !open && setToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <div data-ocid="admin.page" className="min-h-screen bg-background">
        <AdminNav />
        <DashboardContent />
      </div>
    </AdminGuard>
  );
}
