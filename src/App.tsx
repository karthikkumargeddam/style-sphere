import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocationProvider } from "@/contexts/LocationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SoundProvider } from "@/contexts/SoundContext";
import CartSidebar from "@/components/CartSidebar";
import AIChatbot from "@/components/AIChatbot";
import CinematicOpening from "@/components/CinematicOpening";
import NewsletterPopup from "@/components/NewsletterPopup";
import ProductComparison from "@/components/ProductComparison";
import LiveChat from "@/components/LiveChat";
import ProtectedRoute from "@/components/ProtectedRoute";
import WelcomeSound from "@/components/WelcomeSound";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Bundles from "./pages/Bundles";
import BundleDetail from "./pages/BundleDetail";
import Quote from "./pages/Quote";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import LogoGallery from "./pages/LogoGallery";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import Returns from "./pages/Returns";
import SavedAddresses from "./pages/SavedAddresses";
import AccountSettings from "./pages/AccountSettings";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";
import SharedWishlist from "./pages/SharedWishlist";
import EmbroideryDesignerPage from "./pages/EmbroideryDesignerPage";
import EmbroideryGallery from "./pages/EmbroideryGallery";
import EmbroideryPricing from "./pages/EmbroideryPricing";
import LogoDigitization from "./pages/LogoDigitization";
import LoyaltyProgram from "./pages/LoyaltyProgram";
import CustomerPhotoGallery from "./pages/CustomerPhotoGallery";
import ReferralProgram from "./pages/ReferralProgram";
import FlashSales from "./pages/FlashSales";
import Breadcrumbs from "./components/Breadcrumbs";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Payment from "./pages/Payment";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  const [showOpening, setShowOpening] = useState(true);
  const [openingComplete, setOpeningComplete] = useState(false);

  useEffect(() => {
    const hasSeenOpening = sessionStorage.getItem("hasSeenOpening");
    if (hasSeenOpening) {
      setShowOpening(false);
      setOpeningComplete(true);
    }
  }, []);

  const handleOpeningComplete = () => {
    sessionStorage.setItem("hasSeenOpening", "true");
    setOpeningComplete(true);
  };

  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <LocationProvider>
              <ThemeProvider>
                <SoundProvider>
                  {showOpening && !openingComplete && (
                    <CinematicOpening onComplete={handleOpeningComplete} />
                  )}
                  <AuthProvider>
                    <WishlistProvider>
                      <RecentlyViewedProvider>
                        <CartProvider>
                          <BrowserRouter>
                            <ScrollToTop />
                            <Breadcrumbs />
                            <Routes>
                              {/* Public routes - no authentication required */}
                              <Route path="/auth" element={<Auth />} />
                              <Route path="/reset-password" element={<ResetPassword />} />
                              <Route path="/" element={<Index />} />
                              <Route path="/products" element={<Products />} />
                              <Route path="/products/:id" element={<ProductDetail />} />
                              <Route path="/bundles" element={<Bundles />} />
                              <Route path="/bundles/:id" element={<ProductDetail />} />
                              <Route path="/quote" element={<Quote />} />
                              <Route path="/services/:serviceId" element={<ServiceDetail />} />
                              <Route path="/wishlist/shared/:data" element={<SharedWishlist />} />
                              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                              <Route path="/terms-conditions" element={<TermsOfService />} />
                              <Route path="/cookie-policy" element={<CookiePolicy />} />
                              <Route path="/refund-policy" element={<RefundPolicy />} />
                              <Route path="/shipping-policy" element={<ShippingPolicy />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/faq" element={<FAQ />} />
                              <Route path="/blog" element={<Blog />} />
                              <Route path="/blog/:id" element={<BlogPost />} />
                              <Route path="/logo-digitization" element={<LogoDigitization />} />
                              <Route path="/loyalty-program" element={<LoyaltyProgram />} />
                              <Route path="/customer-gallery" element={<CustomerPhotoGallery />} />
                              <Route path="/referral-program" element={<ReferralProgram />} />
                              <Route path="/flash-sales" element={<FlashSales />} />
                              <Route path="/logo-gallery" element={<LogoGallery />} />

                              {/* Protected routes - require authentication */}
                              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                              <Route path="/profile/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                              <Route path="/profile/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                              <Route path="/profile/orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                              <Route path="/profile/addresses" element={<ProtectedRoute><SavedAddresses /></ProtectedRoute>} />
                              <Route path="/profile/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
                              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                              <Route path="/returns" element={<ProtectedRoute><Returns /></ProtectedRoute>} />
                              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                              <Route path="/checkout-success" element={<ProtectedRoute><CheckoutSuccess /></ProtectedRoute>} />
                              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

                              <Route path="*" element={<NotFound />} />
                            </Routes>
                            <CartSidebar />
                            <AIChatbot />
                            <NewsletterPopup />
                            <WelcomeSound />
                            <LiveChat />
                            {/* <ProductComparison /> */}
                          </BrowserRouter>
                        </CartProvider>
                      </RecentlyViewedProvider>
                    </WishlistProvider>
                  </AuthProvider>
                </SoundProvider>
              </ThemeProvider>
            </LocationProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
      <Toaster />
      <Sonner />
    </>
  );
};

export default App;

