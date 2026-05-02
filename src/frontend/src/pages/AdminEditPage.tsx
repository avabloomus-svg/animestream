import { ExternalBlob, Genre } from "@/backend";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAdminDeleteVideo, useAdminUpdateVideo } from "@/hooks/useVideos";
import { useVideo } from "@/hooks/useVideos";
import { AdminNav } from "@/pages/AdminPage";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon, Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminEditPage() {
  const { videoId } = useParams({ from: "/admin/edit/$videoId" });
  const navigate = useNavigate();
  const updateVideo = useAdminUpdateVideo();
  const deleteVideo = useAdminDeleteVideo();

  const id = BigInt(videoId);
  const { data: video, isLoading } = useVideo(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [episodeCount, setEpisodeCount] = useState("1");
  const [genre, setGenre] = useState<Genre | "">("");
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setEpisodeCount(String(Number(video.episodeCount)));
      setGenre(video.genre);
    }
  }, [video]);

  const handleCoverChange = (file: File | null) => {
    setNewCoverFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    } else {
      setCoverPreview(null);
    }
  };

  const isSubmitting = updateVideo.isPending;
  const isDeleting = deleteVideo.isPending;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!video || !genre) return;

    try {
      let coverImage = video.coverImage;
      if (newCoverFile) {
        const bytes = new Uint8Array(await newCoverFile.arrayBuffer());
        coverImage = ExternalBlob.fromBytes(bytes);
      }

      await updateVideo.mutateAsync({
        id,
        req: {
          title: title.trim(),
          description: description.trim(),
          genre: genre as Genre,
          episodeCount: BigInt(episodeCount),
          coverImage,
        },
      });

      toast.success("Video updated successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Please try again.");
    }
  }

  async function handleDelete() {
    if (!video) return;
    try {
      await deleteVideo.mutateAsync(video.id);
      toast.success(`"${video.title}" deleted`);
      navigate({ to: "/admin" });
    } catch {
      toast.error("Delete failed. Please try again.");
    }
  }

  return (
    <AdminGuard>
      <div data-ocid="edit.page" className="min-h-screen bg-background">
        <AdminNav />
        <div className="max-w-2xl mx-auto px-6 py-8">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm mb-6"
            data-ocid="edit.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Edit Video
            </h1>
            {video && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    data-ocid="edit.delete_button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  data-ocid="edit.delete_dialog"
                  className="bg-card border-border shadow-elevated"
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">
                      Delete Video
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Are you sure you want to delete{" "}
                      <strong className="text-foreground">
                        "{video.title}"
                      </strong>
                      ? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      data-ocid="edit.delete_dialog_cancel_button"
                      className="bg-accent/40 border-border text-foreground hover:bg-accent"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="edit.confirm_button"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                      onClick={handleDelete}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {isLoading ? (
            <div className="bg-card border border-border rounded-lg p-6 space-y-5 shadow-card">
              {["f1", "f2", "f3", "f4"].map((k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-accent/60" />
                  <Skeleton className="h-10 w-full bg-accent/40" />
                </div>
              ))}
            </div>
          ) : !video ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center shadow-card">
              <p className="text-muted-foreground">Video not found.</p>
              <Button
                className="mt-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                onClick={() => navigate({ to: "/admin" })}
              >
                Back to Admin
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-card"
            >
              {/* Title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="edit-title"
                  className="text-sm text-foreground font-medium"
                >
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-title"
                  data-ocid="edit.title.input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-accent/30 border-border focus:border-primary/50 focus:bg-card"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="edit-desc"
                  className="text-sm text-foreground font-medium"
                >
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="edit-desc"
                  data-ocid="edit.description.textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-accent/30 border-border resize-none min-h-[100px] focus:border-primary/50 focus:bg-card"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Genre + Episodes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground font-medium">
                    Genre <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={genre}
                    onValueChange={(v) => setGenre(v as Genre)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      data-ocid="edit.genre.select"
                      className="bg-accent/30 border-border"
                    >
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border shadow-elevated">
                      {Object.values(Genre).map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="edit-eps"
                    className="text-sm text-foreground font-medium"
                  >
                    Episode Count <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-eps"
                    data-ocid="edit.episodes.input"
                    type="number"
                    min="1"
                    value={episodeCount}
                    onChange={(e) => setEpisodeCount(e.target.value)}
                    className="bg-accent/30 border-border focus:border-primary/50 focus:bg-card"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Replace cover image */}
              <div className="space-y-1.5">
                <Label className="text-sm text-foreground font-medium">
                  Cover Image{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional — replaces current)
                  </span>
                </Label>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-24 rounded overflow-hidden bg-accent/40 flex-shrink-0 border border-border">
                    <img
                      src={coverPreview ?? video.coverImage.getDirectURL()}
                      alt="Cover preview"
                      className="w-16 h-24 object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity =
                          "0.3";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <button
                      type="button"
                      data-ocid="edit.cover.upload_button"
                      className="w-full border-2 border-dashed border-primary/30 rounded-lg p-5 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10"
                      onClick={() => coverRef.current?.click()}
                    >
                      <input
                        ref={coverRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleCoverChange(e.target.files?.[0] ?? null)
                        }
                      />
                      <ImageIcon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                      {newCoverFile ? (
                        <p className="text-sm font-medium text-foreground">
                          {newCoverFile.name}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Click to replace cover
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="edit.cancel_button"
                  className="border-border text-foreground hover:bg-accent/40"
                  onClick={() => navigate({ to: "/admin" })}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-ocid="edit.save_button"
                  disabled={
                    isSubmitting ||
                    !title.trim() ||
                    !description.trim() ||
                    !genre
                  }
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
