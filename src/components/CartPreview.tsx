import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CartPreview: React.FC = () => {
  const { items, totalPrice } = useCart() as any;

  return (
    <div className="w-80 bg-background border border-border rounded shadow p-3">
      <h4 className="font-medium mb-2">Cart</h4>
      {items && items.length > 0 ? (
        <div className="space-y-2">
          {items.slice(0, 4).map((it: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <img src={it.image} alt={it.name} className="w-12 h-12 object-cover rounded" />
              <div className="flex-1 text-sm">
                <div className="font-medium">{it.name}</div>
                <div className="text-muted-foreground text-xs">Qty: {it.quantity || 1}</div>
              </div>
              <div className="font-medium">£{(it.price || 0).toFixed(2)}</div>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <div className="font-medium">Total</div>
            <div className="font-bold">£{(totalPrice || 0).toFixed(2)}</div>
          </div>
          <div className="pt-3">
            <Button size="sm" className="w-full">Go to Cart</Button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">Your cart is empty</div>
      )}
    </div>
  );
};

export default CartPreview;
