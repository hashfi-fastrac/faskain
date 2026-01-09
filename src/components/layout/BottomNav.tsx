"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, ShoppingCart, User, Search, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Products",
    href: "/products",
    icon: Search,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    showBadge: true,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="h-16 md:hidden" />

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 gojek-shadow">
        <div className="grid h-16 grid-cols-4 gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "relative p-2 rounded-xl transition-all",
                    isActive && "bg-primary/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      isActive && "scale-110"
                    )}
                  />
                  {item.showBadge && totalItems > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] gradient-gojek text-white border-2 border-background">
                      {totalItems}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-all",
                    isActive && "font-bold"
                  )}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full gradient-gojek" />
                )}
              </Link>
            );
          })}

          {/* Account Menu */}
          {isAuthenticated ? (
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="relative p-2 rounded-xl transition-all hover:bg-primary/10">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">Account</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-auto rounded-t-3xl border-t-4 border-primary"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl">Akun Saya</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2 pb-4 border-b p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-emerald-500/5">
                    <p className="font-bold text-lg">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>

                  <Button
                    variant="destructive"
                    className="w-full gap-2 h-12 rounded-xl font-semibold"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Link
              href="/login"
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200",
                pathname === "/login"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "relative p-2 rounded-xl transition-all",
                  pathname === "/login" && "bg-primary/10"
                )}
              >
                <User
                  className={cn(
                    "h-5 w-5 transition-transform",
                    pathname === "/login" && "scale-110"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-all",
                  pathname === "/login" && "font-bold"
                )}
              >
                Account
              </span>
              {pathname === "/login" && (
                <div className="absolute top-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full gradient-gojek" />
              )}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
