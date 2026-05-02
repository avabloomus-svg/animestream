import { c as createLucideIcon, j as jsxRuntimeExports, G as Genre, u as useSearch, a as useNavigate, r as reactExports, P as Play, S as Skeleton } from "./index-CvJhbmSF.js";
import { V as VideoCard } from "./VideoCard-Gt-g9Zrp.js";
import { u as useVideos, a as useVideosByGenre, b as useSearchVideos, B as Badge } from "./useVideos-CsyQrgvc.js";
import { B as BookOpen } from "./book-open-uhnKLvA-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
];
const Tv = createLucideIcon("tv", __iconNode);
const GENRE_LABELS = {
  [Genre.Action]: "Action",
  [Genre.Adventure]: "Adventure",
  [Genre.Comedy]: "Comedy",
  [Genre.Romance]: "Romance",
  [Genre.Fantasy]: "Fantasy",
  [Genre.SciFi]: "Sci-Fi",
  [Genre.Drama]: "Drama",
  [Genre.School]: "School",
  [Genre.Supernatural]: "Supernatural"
};
function GenreFilter({ selected, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", "data-ocid": "genre.filter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(null),
        className: `px-3 py-1.5 rounded text-sm font-medium transition-smooth border ${selected === null ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/40 hover:bg-accent/40"}`,
        "data-ocid": "genre.all.tab",
        children: "All"
      }
    ),
    Object.values(Genre).map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(selected === genre ? null : genre),
        className: `px-3 py-1.5 rounded text-sm font-medium transition-smooth border ${selected === genre ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/40 hover:bg-accent/40"}`,
        "data-ocid": `genre.${genre.toLowerCase()}.tab`,
        children: GENRE_LABELS[genre]
      },
      genre
    ))
  ] });
}
const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];
function BrowsePage() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [selectedGenre, setSelectedGenre] = reactExports.useState(
    search.genre ? search.genre : null
  );
  const gridRef = reactExports.useRef(null);
  const searchTerm = search.q || "";
  const isSearching = searchTerm.length > 0;
  const isFiltering = selectedGenre !== null;
  const { data: allVideos = [], isLoading: loadingAll } = useVideos();
  const { data: genreVideos = [], isLoading: loadingGenre } = useVideosByGenre(selectedGenre);
  const { data: searchResults = [], isLoading: loadingSearch } = useSearchVideos(searchTerm);
  const baseVideos = isSearching ? searchResults : isFiltering ? genreVideos : allVideos;
  const videos = isSearching && isFiltering ? baseVideos.filter((v) => v.genre === selectedGenre) : baseVideos;
  const isLoading = isSearching ? loadingSearch : isFiltering ? loadingGenre : loadingAll;
  const featuredVideo = allVideos[0] ?? null;
  function handleGenreChange(genre) {
    setSelectedGenre(genre);
    navigate({ search: (prev) => ({ ...prev, genre: genre ?? "" }) });
    setTimeout(() => {
      var _a;
      (_a = gridRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  reactExports.useEffect(() => {
    setSelectedGenre(search.genre ? search.genre : null);
  }, [search.genre]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "browse.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/50 border-b border-border",
        "data-ocid": "browse.hero.section",
        style: { minHeight: 420 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/anime-hero-banner.dim_1400x500.jpg",
              alt: "",
              "aria-hidden": "true",
              className: "absolute inset-0 w-full h-full object-cover opacity-10 select-none pointer-events-none",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-screen-xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-3 h-3" }),
                "Free Streaming"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight", children: [
                "Watch Anime",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Anywhere, Anytime." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground max-w-md leading-relaxed", children: "Discover thousands of anime series and movies across Action, Fantasy, Romance, Sci-Fi, and more — all in one place." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = gridRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded font-semibold text-sm hover:bg-primary/90 transition-smooth shadow-sm",
                    "data-ocid": "hero.browse_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
                      "Start Browsing"
                    ]
                  }
                ),
                allVideos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  allVideos.length,
                  " titles available"
                ] })
              ] })
            ] }),
            featuredVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "shrink-0 w-full max-w-[200px] md:max-w-[220px]",
                "data-ocid": "hero.featured_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-3", children: "Featured" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `/watch/${featuredVideo.id.toString()}`,
                      className: "group block rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-smooth shadow-card hover:shadow-elevated bg-card",
                      "data-ocid": "hero.featured.link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] bg-accent/40 overflow-hidden", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: featuredVideo.coverImage.getDirectURL(),
                              alt: featuredVideo.title,
                              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                              onError: (e) => {
                                e.currentTarget.src = "/assets/images/placeholder.svg";
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" }) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-xs bg-card/90 border-border backdrop-blur-sm text-primary font-semibold",
                              children: featuredVideo.genre
                            }
                          ) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-card", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground line-clamp-1", children: featuredVideo.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              Number(featuredVideo.episodeCount),
                              " ",
                              Number(featuredVideo.episodeCount) === 1 ? "ep" : "eps"
                            ] })
                          ] })
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background min-h-[60vh]",
        ref: gridRef,
        "data-ocid": "browse.grid.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-primary uppercase tracking-widest", children: "Browse by Genre" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 pb-1",
                style: { minWidth: "max-content" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GenreFilter,
                  {
                    selected: selectedGenre,
                    onChange: handleGenreChange
                  }
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: isSearching ? `Results for "${searchTerm}"` : isFiltering ? `${selectedGenre} Anime` : "All Anime" }),
              isSearching && isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Filtered by genre: ",
                selectedGenre
              ] })
            ] }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm text-muted-foreground tabular-nums",
                "data-ocid": "browse.count",
                children: [
                  videos.length,
                  " ",
                  videos.length === 1 ? "title" : "titles"
                ]
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
              "data-ocid": "browse.loading_state",
              children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-lg bg-accent/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-accent/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 bg-accent/40" })
              ] }, k))
            }
          ) : videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
              "data-ocid": "browse.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/60 border border-border flex items-center justify-center text-3xl", children: "🎌" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "No anime found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs leading-relaxed", children: isSearching ? `No results for "${searchTerm}". Try a different search term or clear the genre filter.` : isFiltering ? `No videos in the ${selectedGenre} genre yet.` : "No videos have been uploaded yet. Check back soon!" }),
                (isSearching || isFiltering) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSelectedGenre(null);
                      navigate({ search: { q: "", genre: "" } });
                    },
                    className: "mt-2 text-sm text-primary underline underline-offset-4 hover:text-primary/70 transition-smooth",
                    "data-ocid": "browse.clear_filters_button",
                    children: "Clear all filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5",
              "data-ocid": "browse.list",
              children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: i }, video.id.toString()))
            }
          )
        ] })
      }
    )
  ] });
}
export {
  BrowsePage as default
};
