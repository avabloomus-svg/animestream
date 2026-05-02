import { createActor } from "@/backend";
import type { Genre, VideoId } from "@/backend";
import type { CreateVideoRequest, UpdateVideoRequest } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Public hooks ────────────────────────────────────────────────────────────

export function useVideos() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVideosByGenre(genre: Genre | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "genre", genre],
    queryFn: async () => {
      if (!actor || !genre) return [];
      return actor.listVideosByGenre(genre);
    },
    enabled: !!actor && !isFetching && genre !== null,
  });
}

export function useSearchVideos(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchVideos(term.trim());
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useVideo(id: VideoId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["video", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getVideo(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

// ─── Watchlist hooks ──────────────────────────────────────────────────────────

export function useWatchlist(isAuthenticated: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWatchlist();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useAddToWatchlist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: VideoId) => {
      if (!actor) throw new Error("Not connected");
      return actor.addToWatchlist(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}

export function useRemoveFromWatchlist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: VideoId) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromWatchlist(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}

// ─── Admin hooks ──────────────────────────────────────────────────────────────

export function useAdminVideos() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "videos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.adminGetDashboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminCreateVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateVideoRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminCreateVideo(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useAdminUpdateVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      req,
    }: { id: VideoId; req: UpdateVideoRequest }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUpdateVideo(id, req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useAdminDeleteVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: VideoId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteVideo(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}
