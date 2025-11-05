// src/components/product/ProductDialog.tsx
"use client";

import Image from "next/image";
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Package,
  Truck,
  Shield,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useProductDialog } from "@/hooks/useProduct";
import { CATEGORIES } from "@/constants";
import type { Product } from "@/types";

interface ProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ product, open, onOpenChange }: ProductDialogProps) {
  const {
    quantity,
    selectedColor,
    allColorImages,
    currentImageIndex,
    discountedPrice,
    total,
    inCartQty,
    variantLabel,
    quantityError,
    nextImage,
    prevImage,
    setCurrentImageIndex,
    handleQuantityChange,
    handleQuantityBlur,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    handleBuyNow,
  } = useProductDialog(product);

  const closeDialog = () => onOpenChange(false);

  const categoryLabel =
    CATEGORIES.find((c) => c.value === product.category)?.label || product.category;

  const currentImage = allColorImages[currentImageIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 flex flex-col h-[100dvh] md:max-h-[90vh] max-md:w-full max-md:rounded-none max-md:m-0">
        {/* Mobile Back Button */}
        <button
          onClick={closeDialog}
          className="md:hidden absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Close"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-y-auto flex-1">
          {/* Left Side: Image Carousel */}
          <div className="relative bg-secondary md:p-6 p-0">
            {/* Main Image with Carousel */}
            <div className="relative w-full h-auto md:aspect-square md:mb-4 md:rounded-lg overflow-hidden bg-background/50 group">
              <div className="relative w-full aspect-square md:aspect-auto">
                <Image
                  src={currentImage.image}
                  alt={`${product.title} - ${currentImage.colorName}`}
                  width={600}
                  height={600}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>

              {/* Carousel Controls - show only on desktop */}
              {allColorImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {allColorImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          currentImageIndex === idx
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Color Label Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {currentImage.colorName}
                </Badge>
              </div>
            </div>

            {/* Desktop Thumbnails */}
            <div className="hidden md:grid grid-cols-4 gap-2">
              {allColorImages.map((colorImg, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
                  }`}
                  aria-label={`View ${colorImg.colorName}`}
                  title={colorImg.colorName}
                >
                  <Image
                    src={colorImg.image}
                    alt={`${product.title} - ${colorImg.colorName}`}
                    fill
                    className="object-cover"
                  />
                  {/* Color name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                    <span className="text-[10px] text-white font-medium line-clamp-1">
                      {colorImg.colorName}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden px-4 py-3 flex gap-2 overflow-x-auto">
              {allColorImages.map((colorImg, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent opacity-60"
                  }`}
                  aria-label={`View ${colorImg.colorName}`}
                  title={colorImg.colorName}
                >
                  <Image
                    src={colorImg.image}
                    alt={`${product.title} - ${colorImg.colorName}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-1">
                    <span className="text-[9px] text-white font-medium line-clamp-1">
                      {colorImg.colorName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="p-4 md:p-6 space-y-4 pb-36 md:pb-6">
            {/* Header */}
            <DialogHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {categoryLabel}
              </Badge>
              <DialogTitle className="text-xl md:text-2xl font-bold leading-tight">
                {product.title}
              </DialogTitle>
            </DialogHeader>

            {/* Rating & Brand */}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({product.reviews?.length || 0})
                </span>
              </div>
              {product.brand && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-muted-foreground">Brand: {product.brand}</span>
                </>
              )}
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
              <span className="text-2xl md:text-3xl font-bold">
                {formatCurrency(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-base md:text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge variant="destructive">
                    Save {product.discountPercentage.toFixed(0)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2 text-sm md:text-base">Description</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock & SKU */}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>
                  Stock: <span className="font-medium">{product.stock} units</span>
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground">SKU: {product.sku}</span>
            </div>

            <Separator />

            {/* Color Selection */}
            {allColorImages.length > 1 && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Color: <span className="text-primary">{selectedColor.name}</span>
                  <span className="text-muted-foreground ml-2">
                    ({selectedColor.code})
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allColorImages.map((colorImg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative p-3 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${
                        currentImageIndex === idx
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      title={colorImg.colorName}
                      aria-label={`Select ${colorImg.colorName}`}
                    >
                      <div className="text-sm font-medium">{colorImg.colorName}</div>
                      <div className="text-xs text-muted-foreground">
                        {colorImg.colorCode}
                      </div>
                      {currentImageIndex === idx && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={Number(quantity) <= 1}
                      className="h-10 w-10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      onBlur={handleQuantityBlur}
                      min={1}
                      max={product.stock}
                      className="w-16 h-10 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      aria-label="Quantity"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={Number(quantity) >= product.stock}
                      className="h-10 w-10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {inCartQty > 0 && (
                    <span className="text-xs md:text-sm text-primary">
                      {inCartQty} in cart
                    </span>
                  )}
                </div>

                {/* Error Message */}
                {quantityError && (
                  <p className="text-xs text-destructive">{quantityError}</p>
                )}
              </div>
            </div>

            {/* Desktop: Summary & Actions */}
            <div className="hidden md:block space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Selected</span>
                  <span className="text-sm font-medium">{variantLabel}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-2xl font-bold">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full h-12 text-base"
                  onClick={() => handleAddToCart(closeDialog)}
                  disabled={product.stock === 0 || !!quantityError}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => handleBuyNow(closeDialog)}
                  disabled={product.stock === 0 || !!quantityError}
                >
                  Buy Now via WhatsApp
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{product.shippingInformation}</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{product.warrantyInformation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Sticky Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">{variantLabel}</span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="h-11"
              onClick={() => handleAddToCart(closeDialog)}
              disabled={product.stock === 0 || !!quantityError}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              <span className="text-sm">Add to Cart</span>
            </Button>
            <Button
              variant="outline"
              className="h-11"
              onClick={() => handleBuyNow(closeDialog)}
              disabled={product.stock === 0 || !!quantityError}
            >
              <span className="text-sm">Buy Now</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
