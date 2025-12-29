import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const CheckoutSuccess = () => {
  const { items, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [orderSaved, setOrderSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(true);

  useEffect(() => {
    const saveOrder = async () => {
      if (!user || items.length === 0 || orderSaved) {
        setIsSaving(false);
        return;
      }

      const sessionId = searchParams.get("session_id");

      try {
        const { error } = await supabase.from("orders").insert({
          user_id: user.id,
          stripe_session_id: sessionId,
          status: "completed",
          total_amount: totalPrice,
          currency: "gbp",
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        });

        if (error) throw error;

        setOrderSaved(true);
        clearCart();
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setIsSaving(false);
      }
    };

    saveOrder();
  }, [user, items, clearCart, totalPrice, searchParams, orderSaved]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="card-industrial p-12">
            {isSaving ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Processing your order...</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Order Confirmed!
                </h1>
                
                <p className="text-muted-foreground text-lg mb-8">
                  Thank you for your order. We've received your payment and will process your order shortly.
                </p>

                <div className="bg-secondary/50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 text-foreground">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">You'll receive an email confirmation shortly</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products">
                    <Button variant="outline" size="lg">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="gold" size="lg" className="gap-2">
                      View Orders
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
