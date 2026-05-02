import { c as createLucideIcon, b as useParams, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, S as Skeleton, I as Input, G as Genre, E as ExternalBlob } from "./index-CvJhbmSF.js";
import { A as AdminGuard, a as AdminNav, b as AlertDialog, c as AlertDialogTrigger, T as Trash2, d as AlertDialogContent, e as AlertDialogHeader, f as AlertDialogTitle, g as AlertDialogDescription, h as AlertDialogFooter, i as AlertDialogCancel, j as AlertDialogAction } from "./AdminPage-BDC5Z4CC.js";
import { L as Label, T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, I as Image, e as LoaderCircle } from "./textarea-BPRP9iOh.js";
import { h as useAdminUpdateVideo, i as useAdminDeleteVideo, c as useVideo } from "./useVideos-CsyQrgvc.js";
import { u as ue } from "./index-C4VoOnSg.js";
import { A as ArrowLeft } from "./chevron-up-Cd0wrV4Z.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function AdminEditPage() {
  const { videoId } = useParams({ from: "/admin/edit/$videoId" });
  const navigate = useNavigate();
  const updateVideo = useAdminUpdateVideo();
  const deleteVideo = useAdminDeleteVideo();
  const id = BigInt(videoId);
  const { data: video, isLoading } = useVideo(id);
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [episodeCount, setEpisodeCount] = reactExports.useState("1");
  const [genre, setGenre] = reactExports.useState("");
  const [newCoverFile, setNewCoverFile] = reactExports.useState(null);
  const [coverPreview, setCoverPreview] = reactExports.useState(null);
  const coverRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setEpisodeCount(String(Number(video.episodeCount)));
      setGenre(video.genre);
    }
  }, [video]);
  const handleCoverChange = (file) => {
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
  async function handleSubmit(e) {
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
          genre,
          episodeCount: BigInt(episodeCount),
          coverImage
        }
      });
      ue.success("Video updated successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error(err);
      ue.error("Update failed. Please try again.");
    }
  }
  async function handleDelete() {
    if (!video) return;
    try {
      await deleteVideo.mutateAsync(video.id);
      ue.success(`"${video.title}" deleted`);
      navigate({ to: "/admin" });
    } catch {
      ue.error("Delete failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "edit.page", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm mb-6",
          "data-ocid": "edit.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Edit Video" }),
        video && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "edit.delete_button",
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2",
              disabled: isDeleting,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                "Delete"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogContent,
            {
              "data-ocid": "edit.delete_dialog",
              className: "bg-card border-border shadow-elevated",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-foreground", children: "Delete Video" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-muted-foreground", children: [
                    "Are you sure you want to delete",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                      '"',
                      video.title,
                      '"'
                    ] }),
                    "? This action cannot be undone."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogCancel,
                    {
                      "data-ocid": "edit.delete_dialog_cancel_button",
                      className: "bg-accent/40 border-border text-foreground hover:bg-accent",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      "data-ocid": "edit.confirm_button",
                      className: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
                      onClick: handleDelete,
                      children: "Delete"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg p-6 space-y-5 shadow-card", children: ["f1", "f2", "f3", "f4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 bg-accent/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full bg-accent/40" })
      ] }, k)) }) : !video ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-12 text-center shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Video not found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "mt-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
            onClick: () => navigate({ to: "/admin" }),
            children: "Back to Admin"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-6 bg-card border border-border rounded-lg p-6 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "edit-title",
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
                  id: "edit-title",
                  "data-ocid": "edit.title.input",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
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
                  htmlFor: "edit-desc",
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
                  id: "edit-desc",
                  "data-ocid": "edit.description.textarea",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
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
                          "data-ocid": "edit.genre.select",
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
                    htmlFor: "edit-eps",
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
                    id: "edit-eps",
                    "data-ocid": "edit.episodes.input",
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
                "Cover Image",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional — replaces current)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-24 rounded overflow-hidden bg-accent/40 flex-shrink-0 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: coverPreview ?? video.coverImage.getDirectURL(),
                    alt: "Cover preview",
                    className: "w-16 h-24 object-cover",
                    onError: (e) => {
                      e.currentTarget.style.opacity = "0.3";
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "edit.cover.upload_button",
                    className: "w-full border-2 border-dashed border-primary/30 rounded-lg p-5 text-center cursor-pointer hover:border-primary/60 transition-smooth bg-primary/5 hover:bg-primary/10",
                    onClick: () => {
                      var _a;
                      return (_a = coverRef.current) == null ? void 0 : _a.click();
                    },
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
                            return handleCoverChange(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-primary mx-auto mb-1.5" }),
                      newCoverFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: newCoverFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to replace cover" })
                    ]
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "edit.cancel_button",
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
                  "data-ocid": "edit.save_button",
                  disabled: isSubmitting || !title.trim() || !description.trim() || !genre,
                  className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 shadow-sm",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Saving..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    "Save Changes"
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
  AdminEditPage as default
};
