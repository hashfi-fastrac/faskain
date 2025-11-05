import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem, Cart } from "@/types";
import { STORAGE_KEYS } from "@/constants";

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number, variant?: string) => number;
}

// Generate unique key for cart item (product + variant)
const generateVariantKey = (productId: number, variant?: string): string => {
  return variant ? `${productId}-${variant}` : `${productId}`;
};

const calculateTotals = (items: CartItem[]): { totalItems: number; subtotal: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate with discounted price
  const subtotal = items.reduce((sum, item) => {
    const discountedPrice =
      item.product.price - (item.product.price * item.product.discountPercentage) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  return { totalItems, subtotal };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const variantKey = generateVariantKey(product.id, variant);

          // Find existing item with same product AND variant
          const existingItem = state.items.find((item) => item.variantKey === variantKey);

          let newItems: CartItem[];

          if (existingItem) {
            // Same product + same variant = increase quantity
            newItems = state.items.map((item) =>
              item.variantKey === variantKey
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Different variant or new product = add as separate item
            newItems = [
              ...state.items,
              {
                product,
                quantity,
                selectedVariant: variant,
                variantKey,
              },
            ];
          }

          const { totalItems, subtotal } = calculateTotals(newItems);
          return {
            items: newItems,
            totalItems,
            subtotal,
          };
        });
      },

      removeItem: (variantKey) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.variantKey !== variantKey);
          const { totalItems, subtotal } = calculateTotals(newItems);
          return {
            items: newItems,
            totalItems,
            subtotal,
          };
        });
      },

      updateQuantity: (variantKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantKey);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.variantKey === variantKey ? { ...item, quantity } : item
          );
          const { totalItems, subtotal } = calculateTotals(newItems);
          return {
            items: newItems,
            totalItems,
            subtotal,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
        });
      },

      getItemQuantity: (productId, variant) => {
        const variantKey = generateVariantKey(productId, variant);
        const item = get().items.find((item) => item.variantKey === variantKey);
        return item?.quantity || 0;
      },
    }),
    {
      name: STORAGE_KEYS.CART,
    }
  )
);
