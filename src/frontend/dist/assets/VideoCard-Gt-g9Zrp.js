import { j as jsxRuntimeExports, f as Link, P as Play } from "./index-CvJhbmSF.js";
import { B as Badge } from "./useVideos-CsyQrgvc.js";
import { B as BookOpen } from "./book-open-uhnKLvA-.js";
function VideoCard({ video, index = 0 }) {
  const coverUrl = video.coverImage.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/watch/$videoId",
      params: { videoId: video.id.toString() },
      className: "group block rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-smooth shadow-card hover:shadow-elevated",
      "data-ocid": `video.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] overflow-hidden bg-accent/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: coverUrl,
              alt: video.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy",
              onError: (e) => {
                e.currentTarget.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs bg-card/90 border-border backdrop-blur-sm text-primary font-semibold",
              children: video.genre
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-smooth", children: video.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(video.episodeCount),
              " ",
              Number(video.episodeCount) === 1 ? "episode" : "episodes"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  VideoCard as V
};
