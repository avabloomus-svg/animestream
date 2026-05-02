import { c as createLucideIcon, e as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, S as Skeleton, f as Link, X, P as Play } from "./index-CvJhbmSF.js";
import { d as useWatchlist, f as useRemoveFromWatchlist, B as Badge } from "./useVideos-CsyQrgvc.js";
import { u as ue } from "./index-C4VoOnSg.js";
import { B as BookOpen } from "./book-open-uhnKLvA-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
const BookmarkX = createLucideIcon("bookmark-x", __iconNode);
function WatchlistCard({
  video,
  index,
  onRemove,
  isRemoving
}) {
  const coverUrl = video.coverImage.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-200 shadow-card hover:shadow-elevated",
      "data-ocid": `watchlist.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onRemove(video.id),
            disabled: isRemoving,
            "aria-label": `Remove ${video.title} from watchlist`,
            className: "absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-card/90 border border-border flex items-center justify-center opacity-50 hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:bg-destructive/10 hover:border-destructive/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
            "data-ocid": `watchlist.delete_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/watch/$videoId",
            params: { videoId: video.id.toString() },
            className: "block",
            "data-ocid": `watchlist.link.${index + 1}`,
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" }) }) }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200", children: video.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    Number(video.episodeCount),
                    " ",
                    Number(video.episodeCount) === 1 ? "episode" : "episodes"
                  ] })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function WatchlistSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
      "data-ocid": "watchlist.loading_state",
      children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
        (k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-lg bg-accent/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-accent/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 bg-accent/40" })
        ] }, k)
      )
    }
  );
}
function EmptyWatchlist() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 px-4 text-center",
      "data-ocid": "watchlist.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "w-9 h-9 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No saved videos yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6", children: "Browse anime and add to your watchlist to find them quickly later." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "border-border hover:bg-accent/60 hover:border-primary/40 hover:text-primary",
            "data-ocid": "watchlist.browse_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", search: { q: "", genre: "" }, children: "Browse Anime" })
          }
        )
      ]
    }
  );
}
function LoginRequired({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 px-4 text-center",
      "data-ocid": "watchlist.login_required",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "w-9 h-9 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Login required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6", children: "Sign in with Internet Identity to view and manage your personal watchlist." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onLogin,
            className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            "data-ocid": "watchlist.login_button",
            children: "Sign In"
          }
        )
      ]
    }
  );
}
function WatchlistPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: watchlist = [], isLoading } = useWatchlist(isAuthenticated);
  const removeFromWatchlist = useRemoveFromWatchlist();
  const [removingId, setRemovingId] = reactExports.useState(null);
  const handleRemove = async (videoId) => {
    const idKey = videoId.toString();
    setRemovingId(idKey);
    try {
      await removeFromWatchlist.mutateAsync(videoId);
      ue.success("Removed from watchlist");
    } catch {
      ue.error("Failed to remove video");
    } finally {
      setRemovingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "watchlist.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 mb-8",
        "data-ocid": "watchlist.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "My Watchlist" }),
          isAuthenticated && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "bg-primary/10 border-primary/20 text-primary text-xs font-mono tabular-nums",
              "data-ocid": "watchlist.count_badge",
              children: [
                watchlist.length,
                " saved"
              ]
            }
          )
        ]
      }
    ),
    !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoginRequired, { onLogin: login }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistSkeleton, {}) : watchlist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyWatchlist, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        "data-ocid": "watchlist.list",
        children: watchlist.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WatchlistCard,
          {
            video,
            index: i,
            onRemove: handleRemove,
            isRemoving: removingId === video.id.toString()
          },
          video.id.toString()
        ))
      }
    )
  ] }) });
}
export {
  WatchlistPage as default
};
