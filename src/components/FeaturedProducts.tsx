import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";
import MovableCard from "@/components/ui/MovableCard";

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
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 animate-fade-up">
          <div>
            <span className="inline-block px-4 py-2 glass-gold rounded-full text-sm font-semibold uppercase tracking-wider mb-4 shadow-depth-sm">
              Featured Products
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              Top Selling Workwear
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="lg" className="shadow-depth-md hover:shadow-depth-lg transition-all">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-lg">
          {products.map((product, index) => (
            <MovableCard
              key={product.id}
              className={`group card-3d animate-fade-up p-0 overflow-hidden animation-delay-${index * 100}`}
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase rounded shadow-depth-md animate-shimmer" style={{ background: 'linear-gradient(90deg, hsl(45 100% 50%), hsl(48 100% 60%), hsl(45 100% 50%))' }}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-depth-sm hover:shadow-depth-md z-10 ${isInWishlist(product.id)
                    ? "bg-primary text-primary-foreground scale-110"
                    : "bg-background/80 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const url = `${window.location.origin}/products/${product.id}`;
                    const text = `Check out ${product.name}: ${url}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="absolute top-16 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-depth-sm hover:shadow-depth-md bg-background/80 hover:bg-primary hover:text-primary-foreground hover:scale-110 z-10"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                  <Button
                    variant="gold"
                    size="lg"
                    className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
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
            </MovableCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
