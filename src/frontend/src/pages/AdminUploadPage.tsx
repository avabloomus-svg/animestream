import { ExternalBlob, Genre } from "@/backend";
import { AdminGuard } from "@/components/AdminGuard";
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
import { Textarea } from "@/components/ui/textarea";
import { useAdminCreateVideo } from "@/hooks/useVideos";
import { AdminNav } from "@/pages/AdminPage";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Film, ImageIcon, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

async function fileToBlob(
  file: File,
  onProgress?: (p: number) => void,
): Promise<ExternalBlob> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let blob = ExternalBlob.fromBytes(bytes);
  if (onProgress) blob = blob.withUploadProgress(onProgress);
  return blob;
}

export default function AdminUploadPage() {
  const navigate = useNavigate();
  const createVideo = useAdminCreateVideo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [episodeCount, setEpisodeCount] = useState("1");
  const [genre, setGenre] = useState<Genre | "">("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const coverRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const isSubmitting = createVideo.isPending;
  const canSubmit =
    !isSubmitting &&
    !!title.trim() &&
    !!description.trim() &&
    !!genre &&
    !!coverFile &&
    !!videoFile;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !genre || !coverFile || !videoFile) return;

    try {
      setUploadProgress(0);
      const [cover, video] = await Promise.all([
        fileToBlob(coverFile),
        fileToBlob(videoFile, (p) => setUploadProgress(p)),
      ]);

      await createVideo.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        genre: genre as Genre,
        episodeCount: BigInt(episodeCount),
        coverImage: cover,
        videoFile: video,
      });

      toast.success("Video uploaded successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  }

  return (
    <AdminGuard>
      <div data-ocid="upload.page" className="min-h-screen bg-background">
        <AdminNav />
        <div className="max-w-2xl mx-auto px-6 py-8">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm mb-6"
            data-ocid="upload.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <h1 className="font-display text-2xl font-bold text-foreground mb-6">
            Upload New Video
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-card"
          >
            {/* Title */}
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-sm text-foreground font-medium"
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                data-ocid="upload.title.input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Attack on Titan"
                className="bg-accent/30 border-border focus:border-primary/50 focus:bg-card"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-sm text-foreground font-medium"
              >
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                data-ocid="upload.description.textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief synopsis of the anime..."
                className="bg-accent/30 border-border resize-none min-h-[100px] focus:border-primary/50 focus:bg-card"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Genre + Episodes row */}
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
                    data-ocid="upload.genre.select"
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
                  htmlFor="episodes"
                  className="text-sm text-foreground font-medium"
                >
                  Episode Count <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="episodes"
                  data-ocid="upload.episodes.input"
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

            {/* Cover Image upload */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                Cover Image <span className="text-destructive">*</span>
              </Label>
              <button
                type="button"
                data-ocid="upload.cover.dropzone"
                className="w-full border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10 disabled:opacity-50"
                onClick={() => coverRef.current?.click()}
                disabled={isSubmitting}
              >
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                />
                <ImageIcon className="w-7 h-7 text-primary mx-auto mb-2" />
                {coverFile ? (
                  <p className="text-sm font-medium text-foreground">
                    {coverFile.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Click to select cover image
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">
                      JPG, PNG, WEBP
                    </p>
                  </>
                )}
              </button>
            </div>

            {/* Video File upload */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                Video File <span className="text-destructive">*</span>
              </Label>
              <button
                type="button"
                data-ocid="upload.video.dropzone"
                className="w-full border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10 disabled:opacity-50"
                onClick={() => videoRef.current?.click()}
                disabled={isSubmitting}
              >
                <input
                  ref={videoRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                />
                <Film className="w-7 h-7 text-primary mx-auto mb-2" />
                {videoFile ? (
                  <p className="text-sm font-medium text-foreground">
                    {videoFile.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Click to select video file
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">
                      MP4, MKV, WEBM
                    </p>
                  </>
                )}
              </button>
            </div>

            {/* Upload progress bar */}
            {isSubmitting && uploadProgress > 0 && (
              <div data-ocid="upload.loading_state" className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading video...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                data-ocid="upload.cancel_button"
                className="border-border text-foreground hover:bg-accent/40"
                onClick={() => navigate({ to: "/admin" })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="upload.submit_button"
                disabled={!canSubmit}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
