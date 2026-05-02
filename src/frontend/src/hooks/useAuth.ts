import { createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { identity, loginStatus, login, clear, isAuthenticated } =
    useInternetIdentity();
  const { actor } = useActor(createActor);

  const { data: isAdmin = false } = useQuery({
    queryKey: ["isAdmin", isAuthenticated],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && isAuthenticated,
  });

  return {
    identity,
    loginStatus,
    isAuthenticated,
    isAdmin,
    login,
    logout: clear,
  };
}
