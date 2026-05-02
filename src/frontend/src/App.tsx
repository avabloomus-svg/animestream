import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const BrowsePage = lazy(() => import("@/pages/BrowsePage"));
const WatchPage = lazy(() => import("@/pages/WatchPage"));
const WatchlistPage = lazy(() => import("@/pages/WatchlistPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const AdminUploadPage = lazy(() => import("@/pages/AdminUploadPage"));
const AdminEditPage = lazy(() => import("@/pages/AdminEditPage"));

function PageLoader() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-8 w-48 bg-secondary" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
          (k) => (
            <div key={k} className="space-y-2">
              <Skeleton className="aspect-[2/3] rounded-lg bg-secondary" />
              <Skeleton className="h-3 w-full bg-secondary" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BrowsePage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    genre: typeof search.genre === "string" ? search.genre : "",
  }),
});

const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch/$videoId",
  component: WatchPage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: WatchlistPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const adminUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/upload",
  component: AdminUploadPage,
});

const adminEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/edit/$videoId",
  component: AdminEditPage,
});

const routeTree = rootRoute.addChildren([
  browseRoute,
  watchRoute,
  watchlistRoute,
  adminRoute,
  adminUploadRoute,
  adminEditRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
