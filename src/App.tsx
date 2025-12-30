import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartSidebar from "@/components/CartSidebar";
import AIChatbot from "@/components/AIChatbot";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Quote from "./pages/Quote";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";
//import { Routes, Route } from "react-router-dom";

import HiVisWorkwear from "./pages/products/HiVisWorkwear";
import WorkTrousers from "./pages/products/WorkTrousers";
import PoloShirts from "./pages/products/PoloShirts";
import JacketsCoats from "./pages/products/JacketsCoats";
import SafetyBoots from "./pages/products/SafetyBoots";
import PPEEquipment from "./pages/products/PPEEquipment";


<Routes>
  <Route path="/products/hi-vis-workwear" element={<HiVisWorkwear />} />
  <Route path="/products/work-trousers" element={<WorkTrousers />} />
  <Route path="/products/polo-shirts" element={<PoloShirts />} />
  <Route path="/products/jackets-coats" element={<JacketsCoats />} />
  <Route path="/products/safety-boots" element={<SafetyBoots />} />
  <Route path="/products/ppe-equipment" element={<PPEEquipment />} />
</Routes>


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <CartSidebar />
              <AIChatbot />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
