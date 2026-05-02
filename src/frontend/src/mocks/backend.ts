import type { backendInterface } from "../backend";
import { ExternalBlob, Genre, UserRole } from "../backend";

const makeCoverImage = () =>
  ExternalBlob.fromURL(
    "https://placehold.co/400x225/1a1a1a/555555?text=Cover"
  );

const makeVideoFile = () =>
  ExternalBlob.fromURL(
    "https://www.w3schools.com/html/mov_bbb.mp4"
  );

const sampleSummaries = [
  {
    id: BigInt(1),
    title: "Neo Tokyo 2049",
    episodeCount: BigInt(12),
    coverImage: makeCoverImage(),
    genre: Genre.SciFi,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    title: "Steel Samurai",
    episodeCount: BigInt(24),
    coverImage: makeCoverImage(),
    genre: Genre.Action,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    title: "Void Echoes",
    episodeCount: BigInt(13),
    coverImage: makeCoverImage(),
    genre: Genre.Fantasy,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    title: "Ghost Divide",
    episodeCount: BigInt(26),
    coverImage: makeCoverImage(),
    genre: Genre.Fantasy,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    title: "Shadow Protocol",
    episodeCount: BigInt(12),
    coverImage: makeCoverImage(),
    genre: Genre.Action,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    title: "Lunar Chronicles",
    episodeCount: BigInt(24),
    coverImage: makeCoverImage(),
    genre: Genre.Adventure,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(7),
    title: "Digital Phantoms",
    episodeCount: BigInt(13),
    coverImage: makeCoverImage(),
    genre: Genre.Supernatural,
    uploadedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(8),
    title: "Crimson Arc",
    episodeCount: BigInt(12),
    coverImage: makeCoverImage(),
    genre: Genre.Drama,
    uploadedAt: BigInt(Date.now()),
  },
];

const sampleVideos = sampleSummaries.map((s) => ({
  ...s,
  description: `A captivating ${s.genre} series with ${s.episodeCount} episodes of intense storytelling.`,
  videoFile: makeVideoFile(),
}));

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({
    method: "",
    blob_hash: "",
  }),
  _immutableObjectStorageRefillCashier: async () => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  addToWatchlist: async () => undefined,
  adminCreateVideo: async () => BigInt(sampleVideos.length + 1),
  adminDeleteVideo: async () => true,
  adminGetDashboard: async () => ({
    genreCounts: [
      [Genre.SciFi, BigInt(2)],
      [Genre.Action, BigInt(2)],
      [Genre.Fantasy, BigInt(2)],
      [Genre.Adventure, BigInt(1)],
      [Genre.Supernatural, BigInt(1)],
    ],
    totalVideos: BigInt(sampleVideos.length),
  }),
  adminListVideos: async () => sampleVideos,
  adminUpdateVideo: async () => true,
  assignCallerUserRole: async () => undefined,
  getCallerUserRole: async () => UserRole.admin,
  getMyWatchlist: async () => sampleSummaries.slice(0, 2),
  getVideo: async (id) => sampleVideos.find((v) => v.id === id) ?? null,
  isCallerAdmin: async () => true,
  listVideos: async () => sampleSummaries,
  listVideosByGenre: async (genre) =>
    sampleSummaries.filter((v) => v.genre === genre),
  removeFromWatchlist: async () => undefined,
  searchVideos: async (term) =>
    sampleSummaries.filter((v) =>
      v.title.toLowerCase().includes(term.toLowerCase())
    ),
  seedSampleData: async () => undefined,
};
