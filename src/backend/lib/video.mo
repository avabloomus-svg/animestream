import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/video";

module {

  // ── Helpers ───────────────────────────────────────────────────────────────

  public func toSummary(v : Types.VideoInternal) : Types.VideoSummary {
    {
      id = v.id;
      title = v.title;
      genre = v.genre;
      episodeCount = v.episodeCount;
      uploadedAt = v.uploadedAt;
      coverImage = v.coverImage;
    };
  };

  public func toPublic(v : Types.VideoInternal) : Types.Video {
    {
      id = v.id;
      title = v.title;
      description = v.description;
      genre = v.genre;
      episodeCount = v.episodeCount;
      uploadedAt = v.uploadedAt;
      videoFile = v.videoFile;
      coverImage = v.coverImage;
    };
  };

  // ── Query helpers ─────────────────────────────────────────────────────────

  public func listAll(videos : List.List<Types.VideoInternal>) : [Types.VideoSummary] {
    videos.map<Types.VideoInternal, Types.VideoSummary>(toSummary).toArray();
  };

  public func listByGenre(
    videos : List.List<Types.VideoInternal>,
    genre : Types.Genre,
  ) : [Types.VideoSummary] {
    videos.filter(func(v) { v.genre == genre })
      .map<Types.VideoInternal, Types.VideoSummary>(toSummary)
      .toArray();
  };

  public func searchByTitle(
    videos : List.List<Types.VideoInternal>,
    searchTerm : Text,
  ) : [Types.VideoSummary] {
    let lower = searchTerm.toLower();
    videos.filter(func(v) { v.title.toLower().contains(#text lower) })
      .map<Types.VideoInternal, Types.VideoSummary>(toSummary)
      .toArray();
  };

  public func getById(
    videos : List.List<Types.VideoInternal>,
    id : Types.VideoId,
  ) : ?Types.Video {
    switch (videos.find(func(v) { v.id == id })) {
      case (?v) ?toPublic(v);
      case null null;
    };
  };

  // ── Mutation helpers ──────────────────────────────────────────────────────

  public func create(
    videos : List.List<Types.VideoInternal>,
    nextId : Nat,
    req : Types.CreateVideoRequest,
  ) : Types.VideoInternal {
    let video : Types.VideoInternal = {
      id = nextId;
      title = req.title;
      description = req.description;
      genre = req.genre;
      episodeCount = req.episodeCount;
      uploadedAt = Time.now();
      videoFile = req.videoFile;
      coverImage = req.coverImage;
    };
    videos.add(video);
    video;
  };

  public func update(
    videos : List.List<Types.VideoInternal>,
    id : Types.VideoId,
    req : Types.UpdateVideoRequest,
  ) : Bool {
    var found = false;
    videos.mapInPlace(func(v) {
      if (v.id == id) {
        found := true;
        {
          v with
          title = req.title;
          description = req.description;
          genre = req.genre;
          episodeCount = req.episodeCount;
          coverImage = req.coverImage;
        };
      } else {
        v;
      };
    });
    found;
  };

  public func delete(
    videos : List.List<Types.VideoInternal>,
    id : Types.VideoId,
  ) : Bool {
    let sizeBefore = videos.size();
    let filtered = videos.filter(func(v) { v.id != id });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      videos.clear();
      videos.append(filtered);
      true;
    } else {
      false;
    };
  };

  // ── Watchlist helpers ─────────────────────────────────────────────────────

  public func addToWatchlist(
    watchlists : Map.Map<Principal, Set.Set<Types.VideoId>>,
    user : Principal,
    videoId : Types.VideoId,
  ) {
    let userSet = switch (watchlists.get(user)) {
      case (?s) s;
      case null {
        let s = Set.empty<Types.VideoId>();
        watchlists.add(user, s);
        s;
      };
    };
    userSet.add(videoId);
  };

  public func removeFromWatchlist(
    watchlists : Map.Map<Principal, Set.Set<Types.VideoId>>,
    user : Principal,
    videoId : Types.VideoId,
  ) {
    switch (watchlists.get(user)) {
      case (?s) s.remove(videoId);
      case null {};
    };
  };

  public func getWatchlist(
    watchlists : Map.Map<Principal, Set.Set<Types.VideoId>>,
    videos : List.List<Types.VideoInternal>,
    user : Principal,
  ) : [Types.VideoSummary] {
    switch (watchlists.get(user)) {
      case null [];
      case (?userSet) {
        videos.filter(func(v) { userSet.contains(v.id) })
          .map<Types.VideoInternal, Types.VideoSummary>(toSummary)
          .toArray();
      };
    };
  };

  // ── Admin helpers ─────────────────────────────────────────────────────────

  public func getDashboard(videos : List.List<Types.VideoInternal>) : Types.AdminDashboard {
    let total = videos.size();
    let genres : [Types.Genre] = [
      #Action, #Adventure, #Comedy, #Romance, #Fantasy,
      #SciFi, #Drama, #School, #Supernatural,
    ];
    let counts = genres.map(func(g) : (Types.Genre, Nat) {
      let count = videos.filter(func(v) { v.genre == g }).size();
      (g, count);
    });
    { totalVideos = total; genreCounts = counts };
  };

  // ── Sample data ───────────────────────────────────────────────────────────

  // Placeholder ExternalBlob — a zero-byte blob (no real file until admin uploads)
  let emptyBlob : Storage.ExternalBlob = "" : Blob;

  public func seedSampleData(
    videos : List.List<Types.VideoInternal>,
    nextId : Nat,
  ) : Nat {
    let samples : [(Text, Text, Types.Genre, Nat)] = [
      (
        "Attack on Titan",
        "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason.",
        #Action,
        87,
      ),
      (
        "Demon Slayer",
        "A young boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.",
        #Supernatural,
        44,
      ),
      (
        "My Hero Academia",
        "In a world where most people have superpowers known as Quirks, a boy born without one dreams of becoming the greatest hero.",
        #Action,
        138,
      ),
      (
        "Your Lie in April",
        "A piano prodigy who lost his ability to hear the piano after his mother's death meets a free-spirited violinist.",
        #Romance,
        22,
      ),
      (
        "Sword Art Online",
        "Players of a virtual reality MMORPG find themselves trapped inside the game where death in-game means death in real life.",
        #Fantasy,
        96,
      ),
    ];

    var id = nextId;
    for ((title, description, genre, episodes) in samples.values()) {
      let video : Types.VideoInternal = {
        id = id;
        title = title;
        description = description;
        genre = genre;
        episodeCount = episodes;
        uploadedAt = Time.now();
        videoFile = emptyBlob;
        coverImage = emptyBlob;
      };
      videos.add(video);
      id += 1;
    };
    id;
  };
};
