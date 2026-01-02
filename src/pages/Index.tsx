import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import QuoteSection from "@/components/QuoteSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ThreeBackground from "@/components/ThreeBackground";
import ProductRecommendations from "@/components/ProductRecommendations";
import { getTrendingProducts } from "@/lib/recommendations";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import CustomerCareButton from "@/components/CustomerCareButton";
import EmbroideryShowcase from "@/components/EmbroideryShowcase";
import LiveOrderNotifications from "@/components/LiveOrderNotifications";
import LimitedTimeOfferBanner from "@/components/LimitedTimeOfferBanner";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppSupport from "@/components/WhatsAppSupport";

const Index = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@unifab.co.uk" || user?.role === "admin";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThreeBackground />
      <Header />
      <AnnouncementBanner />
      <main className="relative z-10">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />

        {/* Embroidery Showcase */}
        <EmbroideryShowcase />

        {/* Trending Products */}
        <div className="container mx-auto px-4">
          <ProductRecommendations
            products={getTrendingProducts({ limit: 8 })}
            title="🔥 Trending Now"
            subtitle="Most popular items this week"
          />
        </div>

        <QuoteSection />
        <TestimonialsSection />
      </main>
      <Footer />

      {/* Customer Care Button */}
      <CustomerCareButton />

      {/* Live Order Notifications */}
      <LiveOrderNotifications />

      {/* WhatsApp Support */}
      <WhatsAppSupport />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Limited Time Offer Banner */}
      <LimitedTimeOfferBanner />

      {/* Floating Admin Button - Only for Owners */}
      {isAdmin && (
        <Link
          to="/admin"
          className="fixed bottom-8 right-8 z-50 group"
          title="Admin Dashboard - Owners Only"
        >
          <div className="relative">
            <button className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-red-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </button>

            {/* Warning Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-red-500/95 backdrop-blur-sm border border-red-400 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">⚠️ ADMIN ACCESS</p>
                  <p className="text-xs text-white/90">
                    This dashboard is <strong>exclusively for business owners and administrators</strong>.
                    Not accessible to customers.
                  </p>
                  <p className="text-xs text-white/80 mt-2">
                    Click to manage orders, customers, and analytics.
                  </p>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full right-6 -mt-1">
                <div className="w-3 h-3 bg-red-500 transform rotate-45"></div>
              </div>
            </div>

            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Index;
