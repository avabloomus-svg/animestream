import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, I as Input, G as Genre, B as Button, E as ExternalBlob } from "./index-CvJhbmSF.js";
import { A as AdminGuard, a as AdminNav, F as Film } from "./AdminPage-BDC5Z4CC.js";
import { L as Label, T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, I as Image, e as LoaderCircle } from "./textarea-BPRP9iOh.js";
import { g as useAdminCreateVideo } from "./useVideos-CsyQrgvc.js";
import { u as ue } from "./index-C4VoOnSg.js";
import { A as ArrowLeft } from "./chevron-up-Cd0wrV4Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
async function fileToBlob(file, onProgress) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let blob = ExternalBlob.fromBytes(bytes);
  if (onProgress) blob = blob.withUploadProgress(onProgress);
  return blob;
}
function AdminUploadPage() {
  const navigate = useNavigate();
  const createVideo = useAdminCreateVideo();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [episodeCount, setEpisodeCount] = reactExports.useState("1");
  const [genre, setGenre] = reactExports.useState("");
  const [coverFile, setCoverFile] = reactExports.useState(null);
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const coverRef = reactExports.useRef(null);
  const videoRef = reactExports.useRef(null);
  const isSubmitting = createVideo.isPending;
  const canSubmit = !isSubmitting && !!title.trim() && !!description.trim() && !!genre && !!coverFile && !!videoFile;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || !genre || !coverFile || !videoFile) return;
    try {
      setUploadProgress(0);
      const [cover, video] = await Promise.all([
        fileToBlob(coverFile),
        fileToBlob(videoFile, (p) => setUploadProgress(p))
      ]);
      await createVideo.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        genre,
        episodeCount: BigInt(episodeCount),
        coverImage: cover,
        videoFile: video
      });
      ue.success("Video uploaded successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error(err);
      ue.error("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "upload.page", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm mb-6",
          "data-ocid": "upload.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "Upload New Video" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-6 bg-card border border-border rounded-lg p-6 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "title",
                  className: "text-sm text-foreground font-medium",
                  children: [
                    "Title ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  "data-ocid": "upload.title.input",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  placeholder: "e.g. Attack on Titan",
                  className: "bg-accent/30 border-border focus:border-primary/50 focus:bg-card",
                  required: true,
                  disabled: isSubmitting
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "description",
                  className: "text-sm text-foreground font-medium",
                  children: [
                    "Description ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  "data-ocid": "upload.description.textarea",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Brief synopsis of the anime...",
                  className: "bg-accent/30 border-border resize-none min-h-[100px] focus:border-primary/50 focus:bg-card",
                  required: true,
                  disabled: isSubmitting
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm text-foreground font-medium", children: [
                  "Genre ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: genre,
                    onValueChange: (v) => setGenre(v),
                    disabled: isSubmitting,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "upload.genre.select",
                          className: "bg-accent/30 border-border",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select genre" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border shadow-elevated", children: Object.values(Genre).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "episodes",
                    className: "text-sm text-foreground font-medium",
                    children: [
                      "Episode Count ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "episodes",
                    "data-ocid": "upload.episodes.input",
                    type: "number",
                    min: "1",
                    value: episodeCount,
                    onChange: (e) => setEpisodeCount(e.target.value),
                    className: "bg-accent/30 border-border focus:border-primary/50 focus:bg-card",
                    required: true,
                    disabled: isSubmitting
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm text-foreground font-medium", children: [
                "Cover Image ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "upload.cover.dropzone",
                  className: "w-full border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10 disabled:opacity-50",
                  onClick: () => {
                    var _a;
                    return (_a = coverRef.current) == null ? void 0 : _a.click();
                  },
                  disabled: isSubmitting,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: coverRef,
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: (e) => {
                          var _a;
                          return setCoverFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-7 h-7 text-primary mx-auto mb-2" }),
                    coverFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: coverFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to select cover image" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: "JPG, PNG, WEBP" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm text-foreground font-medium", children: [
                "Video File ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "upload.video.dropzone",
                  className: "w-full border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10 disabled:opacity-50",
                  onClick: () => {
                    var _a;
                    return (_a = videoRef.current) == null ? void 0 : _a.click();
                  },
                  disabled: isSubmitting,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: videoRef,
                        type: "file",
                        accept: "video/*",
                        className: "hidden",
                        onChange: (e) => {
                          var _a;
                          return setVideoFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-7 h-7 text-primary mx-auto mb-2" }),
                    videoFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: videoFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to select video file" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: "MP4, MKV, WEBM" })
                    ] })
                  ]
                }
              )
            ] }),
            isSubmitting && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "upload.loading_state", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading video..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  Math.round(uploadProgress),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-accent rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary transition-all duration-300 rounded-full",
                  style: { width: `${uploadProgress}%` }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "upload.cancel_button",
                  className: "border-border text-foreground hover:bg-accent/40",
                  onClick: () => navigate({ to: "/admin" }),
                  disabled: isSubmitting,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "upload.submit_button",
                  disabled: !canSubmit,
                  className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 shadow-sm",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Uploading..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                    "Upload Video"
                  ] })
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  AdminUploadPage as default
};
