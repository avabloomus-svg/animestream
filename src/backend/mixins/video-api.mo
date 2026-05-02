import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/video";
import VideoLib "../lib/video";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : List.List<Types.VideoInternal>,
  watchlists : Map.Map<Principal, Set.Set<Types.VideoId>>,
) {

  var nextVideoId : Nat = 0;

  // ── Public Browse & Discovery ─────────────────────────────────────────────

  public query func listVideos() : async [Types.VideoSummary] {
    VideoLib.listAll(videos);
  };

  public query func listVideosByGenre(genre : Types.Genre) : async [Types.VideoSummary] {
    VideoLib.listByGenre(videos, genre);
  };

  public query func searchVideos(searchTerm : Text) : async [Types.VideoSummary] {
    VideoLib.searchByTitle(videos, searchTerm);
  };

  public query func getVideo(id : Types.VideoId) : async ?Types.Video {
    VideoLib.getById(videos, id);
  };

  // ── Watchlist (login required) ────────────────────────────────────────────

  public shared ({ caller }) func addToWatchlist(videoId : Types.VideoId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to use watchlist");
    };
    VideoLib.addToWatchlist(watchlists, caller, videoId);
  };

  public shared ({ caller }) func removeFromWatchlist(videoId : Types.VideoId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to use watchlist");
    };
    VideoLib.removeFromWatchlist(watchlists, caller, videoId);
  };

  public query ({ caller }) func getMyWatchlist() : async [Types.VideoSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to view watchlist");
    };
    VideoLib.getWatchlist(watchlists, videos, caller);
  };

  // ── Admin: Video Management ───────────────────────────────────────────────
  //
  // ADMIN LOCK — belt-and-suspenders enforcement
  // ─────────────────────────────────────────────
  // Every function in this section performs TWO layers of access control:
  //
  //   1. AccessControl.hasPermission(accessControlState, caller, #admin)
  //      This is the authoritative check. It verifies the caller's Principal
  //      matches the one-and-only admin stored in accessControlState.
  //      If the check fails the call is immediately trapped (rejected).
  //
  //   2. The authorization extension itself ensures only ONE admin ever exists:
  //      the first non-anonymous user who called initialize(). All subsequent
  //      initialize() calls are no-ops. There is no "promote to admin" endpoint.
  //
  // Together these two layers guarantee that no caller other than the original
  // site owner can ever invoke any admin_ function.

  // Private helper — used by every admin function below for a clean,
  // consistent guard. Traps immediately if caller is not the site admin.
  func requireAdmin(caller : Principal) {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admin access only. Only the site owner can perform this action.");
    };
  };

  public shared ({ caller }) func adminCreateVideo(req : Types.CreateVideoRequest) : async Types.VideoId {
    requireAdmin(caller);
    let video = VideoLib.create(videos, nextVideoId, req);
    nextVideoId += 1;
    video.id;
  };

  public shared ({ caller }) func adminUpdateVideo(
    id : Types.VideoId,
    req : Types.UpdateVideoRequest,
  ) : async Bool {
    requireAdmin(caller);
    VideoLib.update(videos, id, req);
  };

  public shared ({ caller }) func adminDeleteVideo(id : Types.VideoId) : async Bool {
    requireAdmin(caller);
    VideoLib.delete(videos, id);
  };

  public query ({ caller }) func adminListVideos() : async [Types.Video] {
    requireAdmin(caller);
    videos.map<Types.VideoInternal, Types.Video>(VideoLib.toPublic).toArray();
  };

  public query ({ caller }) func adminGetDashboard() : async Types.AdminDashboard {
    requireAdmin(caller);
    VideoLib.getDashboard(videos);
  };

  // ── Seed sample data (admin only, idempotent guard in main.mo) ─────────────

  public shared ({ caller }) func seedSampleData() : async () {
    requireAdmin(caller);
    if (videos.size() == 0) {
      nextVideoId := VideoLib.seedSampleData(videos, nextVideoId);
    };
  };
};
