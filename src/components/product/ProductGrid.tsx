"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find any products matching your search. Try adjusting your
          filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 animate-fade-in">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-5">
        <div className="flex gap-3 sm:gap-4 lg:gap-5">
          {/* Left: Image skeleton */}
          <Skeleton className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-md" />

          {/* Middle: Info skeleton */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Right: Price & Button skeleton */}
          <div className="flex flex-col justify-between items-end flex-shrink-0">
            <div className="space-y-1 text-right">
              <Skeleton className="h-5 sm:h-6 lg:h-7 w-16 sm:w-20 ml-auto" />
              <Skeleton className="h-3 w-12 sm:w-14 ml-auto" />
            </div>
            <Skeleton className="h-8 w-20 sm:w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
