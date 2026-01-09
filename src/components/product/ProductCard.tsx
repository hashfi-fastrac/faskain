"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/constants";
import type { Product } from "@/types";
import { ProductDialog } from "./ProductDialog";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = product.variants?.colors[0]
      ? `${product.variants.colors[0].name} (${product.variants.colors[0].code})`
      : undefined;
    addToCart(product, 1, variant);
  };

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  const inCart = isInCart(product.id);

  const categoryLabel =
    CATEGORIES.find((c) => c.value === product.category)?.label || product.category;

  const displayImage = product.thumbnail || product.images[0];

  return (
    <>
      <Card
        className="group relative overflow-hidden border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex gap-3 sm:gap-4">
            {/* Left: Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                  {categoryLabel}
                </p>
                <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    {product.rating.toFixed(1)} ({product.reviews?.length || 0})
                  </span>
                </div>
                {product.variants?.colors && product.variants.colors.length > 1 && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {product.variants.colors.length} Colors
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mt-2">
                <div className="text-base sm:text-lg font-bold">
                  {formatCurrency(discountedPrice)}
                </div>
                {product.discountPercentage > 0 && (
                  <div className="text-[10px] sm:text-xs text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Image & Button */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-md bg-secondary">
                <Image
                  src={displayImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 80px, 96px"
                />
                {inCart && (
                  <div className="absolute top-1 right-1">
                    <Badge className="bg-white text-black text-[10px] px-1 py-0 h-4">
                      <ShoppingCart className="h-2 w-2" />
                    </Badge>
                  </div>
                )}
              </div>

              {/* Button below image */}
              <Button
                size="sm"
                onClick={handleQuickAdd}
                variant={inCart ? "secondary" : "default"}
                className="text-xs whitespace-nowrap w-full"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                {inCart ? "Add More" : "Add"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductDialog product={product} open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}
