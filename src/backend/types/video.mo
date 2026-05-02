import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type VideoId = Nat;

  public type Genre = {
    #Action;
    #Adventure;
    #Comedy;
    #Romance;
    #Fantasy;
    #SciFi;
    #Drama;
    #School;
    #Supernatural;
  };

  // Internal type — uses ExternalBlob (not shared via var fields)
  public type VideoInternal = {
    id : VideoId;
    title : Text;
    description : Text;
    genre : Genre;
    episodeCount : Nat;
    uploadedAt : Int;
    videoFile : Storage.ExternalBlob;
    coverImage : Storage.ExternalBlob;
  };

  // Shared-safe type for API boundary
  public type Video = {
    id : VideoId;
    title : Text;
    description : Text;
    genre : Genre;
    episodeCount : Nat;
    uploadedAt : Int;
    videoFile : Storage.ExternalBlob;
    coverImage : Storage.ExternalBlob;
  };

  public type VideoSummary = {
    id : VideoId;
    title : Text;
    genre : Genre;
    episodeCount : Nat;
    uploadedAt : Int;
    coverImage : Storage.ExternalBlob;
  };

  public type CreateVideoRequest = {
    title : Text;
    description : Text;
    genre : Genre;
    episodeCount : Nat;
    videoFile : Storage.ExternalBlob;
    coverImage : Storage.ExternalBlob;
  };

  public type UpdateVideoRequest = {
    title : Text;
    description : Text;
    genre : Genre;
    episodeCount : Nat;
    coverImage : Storage.ExternalBlob;
  };

  public type AdminDashboard = {
    totalVideos : Nat;
    genreCounts : [(Genre, Nat)];
  };
};
