import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Play, Search, Shield, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const BROWSE_SEARCH = { q: "", genre: "" };

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isAdmin, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const location = useLocation();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      router.navigate({
        to: "/",
        search: { q: searchValue.trim(), genre: "" },
      });
    }
  }

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        router.navigate({
          to: "/",
          search: { q: value.trim(), genre: "" },
        });
      }, 300);
    },
    [router],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded text-sm font-medium transition-smooth ${
      isActive(path)
        ? "bg-primary/10 text-primary border border-primary/30"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            search={BROWSE_SEARCH}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center group-hover:bg-primary/80 transition-smooth shadow-sm">
              <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-primary tracking-tight">
              AnimeStream
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 ml-4"
            data-ocid="main.nav"
          >
            <Link
              to="/"
              search={BROWSE_SEARCH}
              className={linkClass("/")}
              data-ocid="nav.browse.link"
            >
              Browse
            </Link>
            {isAuthenticated && (
              <Link
                to="/watchlist"
                className={linkClass("/watchlist")}
                data-ocid="nav.watchlist.link"
              >
                Watchlist
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={linkClass("/admin")}
                data-ocid="nav.admin.link"
              >
                <Shield className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                Admin
              </Link>
            )}
          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden sm:flex items-center max-w-sm ml-auto"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />
              <Input
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search anime..."
                className="pl-8 bg-accent/40 border-border text-sm h-9 focus:border-primary/50 focus:bg-card"
                data-ocid="header.search_input"
              />
            </div>
          </form>

          {/* Auth button */}
          <div className="ml-2 hidden sm:flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="gap-1.5 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                data-ocid="header.logout_button"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                data-ocid="header.login_button"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="ml-auto sm:hidden p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-smooth"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="header.menu_toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-border bg-card px-4 pb-4 pt-2 flex flex-col gap-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />
                <Input
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search anime..."
                  className="pl-8 bg-accent/40 border-border text-sm h-9"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="border-border"
              >
                Go
              </Button>
            </form>
            <Link
              to="/"
              search={BROWSE_SEARCH}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-smooth"
            >
              Browse
            </Link>
            {isAuthenticated && (
              <Link
                to="/watchlist"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-smooth"
              >
                Watchlist
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-smooth"
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="gap-1.5 border-border text-muted-foreground justify-start"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  login();
                  setMenuOpen(false);
                }}
                className="gap-1.5 bg-primary text-primary-foreground justify-start"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login with Internet Identity
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Play className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="font-medium text-foreground">AnimeStream</span>
          </div>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline hover:text-primary transition-smooth"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
