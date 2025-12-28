import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";

const products = [
  {
    id: 1,
    name: "Hi-Vis Safety Jacket",
    category: "Safety Wear",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 124,
    image: safetyVest,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Heavy Duty Work Trousers",
    category: "Work Trousers",
    price: 29.99,
    rating: 4.6,
    reviews: 89,
    image: workTrousers,
  },
  {
    id: 3,
    name: "Corporate Polo Shirt",
    category: "Polo Shirts",
    price: 18.99,
    rating: 4.9,
    reviews: 256,
    image: poloShirt,
    badge: "New",
  },
  {
    id: 4,
    name: "Safety Hard Hat",
    category: "PPE Equipment",
    price: 12.99,
    rating: 4.7,
    reviews: 178,
    image: hardHat,
  },
];

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (product: typeof products[0]) => {
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

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Featured Products
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              Top Selling Workwear
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group card-industrial animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    isInWishlist(product.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/80 hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </button>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="gold"
                    size="lg"
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
