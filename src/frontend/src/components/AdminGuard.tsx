import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, isAdmin, loginStatus } = useAuth();

  if (loginStatus === "initializing" || loginStatus === "logging-in") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="space-y-3 w-48">
          <Skeleton className="h-4 w-full bg-accent" />
          <Skeleton className="h-4 w-3/4 bg-accent" />
          <Skeleton className="h-4 w-1/2 bg-accent" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" search={{ q: "", genre: "" }} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <Lock className="w-9 h-9 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Admin Access Only
          </h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            This panel is restricted to authorized administrators only. Please
            contact the site owner if you believe you should have access.
          </p>
        </div>
        <div className="mt-2 px-5 py-2.5 bg-accent/60 border border-border rounded-lg text-sm text-muted-foreground">
          🔐 Protected by Internet Identity
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
