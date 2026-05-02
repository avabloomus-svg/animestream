import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: VideoId;
    title: string;
    episodeCount: bigint;
    description: string;
    videoFile: ExternalBlob;
    coverImage: ExternalBlob;
    genre: Genre;
    uploadedAt: bigint;
}
export interface CreateVideoRequest {
    title: string;
    episodeCount: bigint;
    description: string;
    videoFile: ExternalBlob;
    coverImage: ExternalBlob;
    genre: Genre;
}
export interface AdminDashboard {
    genreCounts: Array<[Genre, bigint]>;
    totalVideos: bigint;
}
export type VideoId = bigint;
export interface VideoSummary {
    id: VideoId;
    title: string;
    episodeCount: bigint;
    coverImage: ExternalBlob;
    genre: Genre;
    uploadedAt: bigint;
}
export interface UpdateVideoRequest {
    title: string;
    episodeCount: bigint;
    description: string;
    coverImage: ExternalBlob;
    genre: Genre;
}
export enum Genre {
    SciFi = "SciFi",
    Adventure = "Adventure",
    Action = "Action",
    Drama = "Drama",
    School = "School",
    Romance = "Romance",
    Supernatural = "Supernatural",
    Fantasy = "Fantasy",
    Comedy = "Comedy"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToWatchlist(videoId: VideoId): Promise<void>;
    adminCreateVideo(req: CreateVideoRequest): Promise<VideoId>;
    adminDeleteVideo(id: VideoId): Promise<boolean>;
    adminGetDashboard(): Promise<AdminDashboard>;
    adminListVideos(): Promise<Array<Video>>;
    adminUpdateVideo(id: VideoId, req: UpdateVideoRequest): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getMyWatchlist(): Promise<Array<VideoSummary>>;
    getVideo(id: VideoId): Promise<Video | null>;
    isCallerAdmin(): Promise<boolean>;
    listVideos(): Promise<Array<VideoSummary>>;
    listVideosByGenre(genre: Genre): Promise<Array<VideoSummary>>;
    removeFromWatchlist(videoId: VideoId): Promise<void>;
    searchVideos(searchTerm: string): Promise<Array<VideoSummary>>;
    seedSampleData(): Promise<void>;
}
