import { Link } from "react-router-dom";
import { Star, ShoppingCart, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";

interface RelatedProductsProps {
  currentProductId: number;
  currentCategory: string;
}

// Product data matching the main product list
const allProducts = [
  { id: 1, name: "Hi-Vis Safety Jacket", category: "Safety Wear", price: 34.99, originalPrice: 44.99, rating: 4.8, reviews: 124, image: safetyVest, badge: "Best Seller" },
  { id: 2, name: "Cargo Work Trousers", category: "Trousers", price: 42.99, rating: 4.6, reviews: 89, image: workTrousers, badge: "New" },
  { id: 3, name: "Premium Polo Shirt", category: "Shirts", price: 24.99, rating: 4.7, reviews: 203, image: poloShirt },
  { id: 4, name: "Safety Hard Hat", category: "PPE", price: 18.99, originalPrice: 24.99, rating: 4.9, reviews: 156, image: hardHat, badge: "Sale" },
  { id: 5, name: "Steel Toe Boots", category: "Footwear", price: 89.99, rating: 4.8, reviews: 312, image: safetyVest },
  { id: 6, name: "Reflective Vest", category: "Safety Wear", price: 15.99, rating: 4.5, reviews: 78, image: safetyVest },
  { id: 7, name: "Work Gloves Set", category: "PPE", price: 12.99, rating: 4.4, reviews: 145, image: hardHat },
  { id: 8, name: "Thermal Jacket", category: "Jackets", price: 64.99, originalPrice: 79.99, rating: 4.7, reviews: 92, image: workTrousers },
];

const RelatedProducts = ({ currentProductId, currentCategory }: RelatedProductsProps) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleToggleWishlist = (product: typeof allProducts[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        product_category: product.category,
      });
    }
  };

  // Get products from the same category, excluding current product
  const sameCategory = allProducts.filter(
    p => p.category === currentCategory && p.id !== currentProductId
  );

  // If not enough in same category, add other popular products
  const otherProducts = allProducts.filter(
    p => p.category !== currentCategory && p.id !== currentProductId
  ).slice(0, 4 - sameCategory.length);

  const relatedProducts = [...sameCategory, ...otherProducts].slice(0, 4);

  if (relatedProducts.length === 0) return null;

  const handleQuickAdd = (product: typeof allProducts[0]) => {
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
            Related Products
          </h2>
          <p className="text-muted-foreground mt-1">
            You might also like these items from {currentCategory}
          </p>
        </div>
        <Link to="/products">
          <Button variant="outline" size="sm">
            View All Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
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
                {product.badge && (
                  <Badge
                    className={`absolute top-3 left-3 ${product.badge === "Sale"
                      ? "bg-red-500"
                      : product.badge === "New"
                        ? "bg-green-500"
                        : "bg-primary"
                      }`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickAdd(product);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`h-10 w-10 ${isInWishlist(product.id) ? "text-red-500" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleWishlist(product);
                    }}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const url = `${window.location.origin}/products/${product.id}`;
                      const text = `Check out ${product.name}: ${url}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
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

              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
