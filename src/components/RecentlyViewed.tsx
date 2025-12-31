import { Link } from "react-router-dom";
import { Star, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { toast } from "sonner";

interface RecentlyViewedProps {
  excludeProductId?: number;
}

const RecentlyViewed = ({ excludeProductId }: RecentlyViewedProps) => {
  const { addItem } = useCart();
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Filter out current product and limit display
  const displayProducts = recentlyViewed
    .filter((p) => p.id !== excludeProductId)
    .slice(0, 4);

  if (displayProducts.length === 0) return null;

  const handleQuickAdd = (product: typeof displayProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Recently Viewed
          </h2>
          <p className="text-muted-foreground mt-1">
            Products you've looked at recently
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearRecentlyViewed}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="group card-industrial overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/products/${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">
                  £{product.price.toFixed(2)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickAdd(product);
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
