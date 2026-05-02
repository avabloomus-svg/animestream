// ═══════════════════════════════════════════════════════════════════════════
// ADMIN ACCESS — HOW IT WORKS (READ THIS CAREFULLY)
// ═══════════════════════════════════════════════════════════════════════════
//
// The site has exactly ONE admin: the very first user who logs in.
//
// How it is set:
//   - When the canister is first deployed, there is no admin yet.
//   - The authorization extension (MixinAuthorization) exposes an
//     `initialize()` function. The frontend calls this automatically when
//     the first non-anonymous user logs in.
//   - Inside the extension, `AccessControl.initializeAccessControl()` checks:
//       if (adminAlreadyExists) return false;  // ← already locked, no-op
//       else assignAdminRole(caller);           // ← sets the one and only admin
//   - After the first call succeeds, every subsequent call to `initialize()`
//     is a silent no-op — no second admin can ever be assigned through this path.
//
// What this means for you (the site owner):
//   - Log in FIRST, before anyone else, and you become the permanent admin.
//   - No other user can ever gain admin access through any normal flow.
//   - Admin access cannot be transferred or overridden from the frontend.
//   - To change the admin you would need to redeploy the canister (full reset).
//
// What the admin can do:
//   - Upload new videos (adminCreateVideo)
//   - Edit any video's details (adminUpdateVideo)
//   - Delete any video (adminDeleteVideo)
//   - View full video list with all details (adminListVideos)
//   - View the admin dashboard with stats (adminGetDashboard)
//   - Seed sample content (seedSampleData)
//
// All of these functions perform an explicit isAdmin check server-side and
// will trap (reject the call) for any non-admin caller.
// ═══════════════════════════════════════════════════════════════════════════

import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import VideoTypes "types/video";
import VideoMixin "mixins/video-api";

actor {
  // ── Authorization ─────────────────────────────────────────────────────────
  // accessControlState holds the admin principal once set. It is set once,
  // by the first non-anonymous caller via MixinAuthorization.initialize().
  // After that it is permanently locked — no further admin assignment is possible.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object Storage ────────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── Video state ───────────────────────────────────────────────────────────
  let videos = List.empty<VideoTypes.VideoInternal>();
  let watchlists = Map.empty<Principal, Set.Set<VideoTypes.VideoId>>();

  include VideoMixin(accessControlState, videos, watchlists);
};
