export type {
  Video,
  VideoSummary,
  VideoId,
  CreateVideoRequest,
  UpdateVideoRequest,
  AdminDashboard,
  ExternalBlob,
} from "./backend";

export { Genre, UserRole } from "./backend";

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Romance",
  "Fantasy",
  "SciFi",
  "Drama",
  "School",
  "Supernatural",
] as const;

export type GenreName = (typeof GENRES)[number];
