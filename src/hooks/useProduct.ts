// src/hooks/useProduct.ts
import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { useCart } from "./useCart";
import { formatCurrency } from "@/lib/utils";
import { toast } from "./useToast";
import type { Product, ColorVariant } from "@/types";

const createQuantitySchema = (maxStock: number) =>
  z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(maxStock, `Maximum quantity is ${maxStock} (available stock)`);

export function useProductDialog(product: Product) {
  const { addToCart, getItemQuantity } = useCart();

  // Flatten all color variants to create a unified gallery
  const allColorImages = useMemo(() => {
    if (!product.variants?.colors || product.variants.colors.length === 0) {
      return product.images.map((img, idx) => ({
        image: img,
        colorName: "Default",
        colorCode: "000",
        originalIndex: idx,
      }));
    }

    return product.variants.colors.map((color, idx) => ({
      image: color.images[0], // Take only first image of each color
      colorName: color.name,
      colorCode: color.code,
      originalIndex: idx,
    }));
  }, [product]);

  // State
  const [quantity, setQuantity] = useState<number | "">(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantityError, setQuantityError] = useState<string>("");

  // Selected color based on current image index
  const selectedColor = useMemo(() => {
    const current = allColorImages[currentImageIndex];
    return {
      name: current.colorName,
      code: current.colorCode,
      images: [current.image],
    };
  }, [currentImageIndex, allColorImages]);

  // Computed values
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  const numQuantity = typeof quantity === "number" ? quantity : 0;
  const total = discountedPrice * numQuantity;
  const inCartQty = getItemQuantity(product.id);
  const variantLabel = `${selectedColor.name} (${selectedColor.code})`;

  // Zod schema for current product
  const quantitySchema = createQuantitySchema(product.stock);

  const validateQuantity = (value: number): { success: boolean; error?: string } => {
    const result = quantitySchema.safeParse(value);

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || "Invalid quantity";
      return { success: false, error: errorMessage };
    }

    return { success: true };
  };

  const handleQuantityChange = (value: string) => {
    setQuantityError("");

    if (value === "") {
      setQuantity("");
      return;
    }

    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) return;

    if (numValue >= 0 && numValue <= product.stock) {
      setQuantity(numValue);

      if (numValue === 0) {
        const validation = validateQuantity(numValue);
        if (!validation.success) {
          setQuantityError(validation.error || "Invalid quantity");
        }
      }
    } else if (numValue > product.stock) {
      setQuantity(product.stock);
      setQuantityError(`Only ${product.stock} units available`);
      toast({
        title: "Stock limit reached",
        description: `Maximum available stock is ${product.stock} units`,
        variant: "destructive",
      });
    }
  };

  const handleQuantityBlur = () => {
    const currentValue = typeof quantity === "number" ? quantity : 0;

    if (quantity === "" || currentValue === 0) {
      setQuantity(1);
      const validation = validateQuantity(0);
      if (!validation.success) {
        setQuantityError(validation.error || "Invalid quantity");
      }
      return;
    }

    const validation = validateQuantity(currentValue);

    if (!validation.success) {
      if (currentValue < 1) {
        setQuantity(1);
      } else if (currentValue > product.stock) {
        setQuantity(product.stock);
      }

      setQuantityError(validation.error || "Invalid quantity");
      toast({
        title: "Quantity adjusted",
        description: validation.error,
        variant: "destructive",
      });
    } else {
      setQuantityError("");
    }
  };

  const incrementQuantity = () => {
    const currentQty = typeof quantity === "number" ? quantity : 1;
    if (currentQty < product.stock) {
      setQuantity(currentQty + 1);
      setQuantityError("");
    } else {
      toast({
        title: "Stock limit reached",
        description: `Only ${product.stock} units available`,
        variant: "destructive",
      });
    }
  };

  const decrementQuantity = () => {
    const currentQty = typeof quantity === "number" ? quantity : 1;
    if (currentQty > 1) {
      setQuantity(currentQty - 1);
      setQuantityError("");
    }
  };

  // Carousel controls
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allColorImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allColorImages.length - 1 : prev - 1));
  };

  const handleAddToCart = (onSuccess?: () => void) => {
    const numQty = typeof quantity === "number" ? quantity : 0;
    const validation = validateQuantity(numQty);

    if (!validation.success) {
      setQuantityError(validation.error || "Invalid quantity");
      toast({
        title: "Invalid quantity",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    addToCart(product, numQty, variantLabel);
    onSuccess?.();
  };

  const handleBuyNow = (onSuccess?: () => void) => {
    const numQty = typeof quantity === "number" ? quantity : 0;
    const validation = validateQuantity(numQty);

    if (!validation.success) {
      setQuantityError(validation.error || "Invalid quantity");
      toast({
        title: "Invalid quantity",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    addToCart(product, numQty, variantLabel);

    const message = `*🛍️ NEW ORDER*\n\n1. ${product.title}\n   SKU: ${
      product.sku
    }\n   Variant: ${variantLabel}\n   Qty: ${numQty}x @ ${formatCurrency(
      discountedPrice
    )}\n   Subtotal: ${formatCurrency(
      total
    )}\n\n---\n*Total Items:* ${numQty}\n*Grand Total:* ${formatCurrency(
      total
    )}\n\nPlease process this order. Thank you! 🙏`;

    const whatsappLink = `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
    onSuccess?.();
  };

  return {
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
  };
}
