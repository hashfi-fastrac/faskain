"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 200) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 500) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <>
      <div className="h-16 md:hidden" />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          "md:sticky md:translate-y-0",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isHomePage && !isScrolled
            ? "md:bg-transparent md:border-transparent"
            : "bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-border/40"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/30 transition-all" />
                <img
                  src="/logo2.png"
                  alt={`${APP_NAME} Logo`}
                  className="relative h-9 w-9 sm:h-10 sm:w-10 object-contain"
                />
              </div>
              <span
                className={cn(
                  "hidden sm:inline-block font-bold text-lg transition-all",
                  "bg-gradient-to-r from-primary via-emerald-600 to-primary bg-clip-text text-transparent"
                )}
              >
                {APP_NAME}
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle isHomePage={isHomePage} isScrolled={isScrolled} />

                {isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2 hover:bg-primary/10 hover:text-primary transition-colors",
                        isHomePage && !isScrolled && "hover:bg-white/10"
                      )}
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user?.firstName}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className={cn(
                        "gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors",
                        isHomePage && !isScrolled && "hover:bg-white/10"
                      )}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden lg:inline">Logout</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    asChild
                    className="gradient-gojek text-white hover:opacity-90 transition-opacity"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>

              {/* Mobile User Info */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle isHomePage={isHomePage} isScrolled={isScrolled} />
                {isAuthenticated && (
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs max-w-[60px] truncate">
                      {user?.firstName}
                    </span>
                  </Button>
                )}
              </div>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className={cn(
                  "relative hover:bg-primary/10 hover:text-primary transition-colors",
                  isHomePage && !isScrolled && "hover:bg-white/10"
                )}
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-gojek text-white border-2 border-background">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
