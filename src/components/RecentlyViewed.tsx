import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="font-display text-3xl font-bold text-foreground">
              Recently Viewed
            </h2>
          </div>
          <Button
            onClick={clearRecentlyViewed}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Clear History
          </Button>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {recentlyViewed.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 snap-start"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="card-3d overflow-hidden group hover:scale-105 transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground">
                        £{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Scroll Gradient Overlays */}
          <div className="absolute top-0 left-0 bottom-4 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default RecentlyViewed;
