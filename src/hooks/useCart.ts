import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppLink } from "@/lib/utils";
import { toast } from "@/hooks/useToast";
import type { Product } from "@/types";

export const useCart = () => {
  const cart = useCartStore();

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    cart.addItem(product, quantity, variant);

    const variantText = variant ? ` - ${variant}` : "";
    toast({
      title: "Added to cart! 🛒",
      description: `${product.title}${variantText} (${quantity}x)`,
    });
  };

  const removeFromCart = (variantKey: string) => {
    const item = cart.items.find((item) => item.variantKey === variantKey);
    cart.removeItem(variantKey);

    if (item) {
      const variantText = item.selectedVariant ? ` - ${item.selectedVariant}` : "";
      toast({
        title: "Removed from cart",
        description: `${item.product.title}${variantText}`,
        variant: "destructive",
      });
    }
  };

  const checkout = () => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }

    const whatsappLink = generateWhatsAppLink({
      items: cart.items,
      totalItems: cart.totalItems,
      subtotal: cart.subtotal,
    });

    window.open(whatsappLink, "_blank");
    cart.clearCart();

    toast({
      title: "Order sent!",
      description: "Your cart has been cleared.",
    });
  };

  const isInCart = (productId: number, variant?: string): boolean => {
    if (variant) {
      const variantKey = `${productId}-${variant}`;
      return cart.items.some((item) => item.variantKey === variantKey);
    }
    return cart.items.some((item) => item.product.id === productId);
  };

  const originalSubtotal = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalSavings = originalSubtotal - cart.subtotal;

  return {
    items: cart.items,
    totalItems: cart.totalItems,
    subtotal: cart.subtotal,
    originalSubtotal,
    totalSavings,
    addToCart,
    removeFromCart,
    updateQuantity: cart.updateQuantity,
    clearCart: cart.clearCart,
    getItemQuantity: cart.getItemQuantity,
    checkout,
    isInCart,
  };
};
