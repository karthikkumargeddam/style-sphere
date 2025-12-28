import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="card-industrial p-12">
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
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
