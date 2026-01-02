import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DiscountCodeInput from "@/components/DiscountCodeInput";

const CartSidebar = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    subtotal,
    discountAmount,
    shippingCost,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { items },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <Link to="/products" onClick={() => setIsCartOpen(false)}>
                <Button variant="gold">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      £{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto w-7 h-7 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Discount Code Input */}
            <DiscountCodeInput
              subtotal={subtotal}
              categories={[...new Set(items.map(item => item.category))]}
              isFirstOrder={false}
              onApply={applyDiscount}
              onRemove={removeDiscount}
              appliedDiscount={appliedDiscount}
            />

            {/* Price Breakdown */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">£{subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-400">Discount</span>
                  <span className="text-green-400">-£{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {shippingCost === 0 ? "FREE" : `£${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-2xl text-primary">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
