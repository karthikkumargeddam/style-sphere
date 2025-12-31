import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Star,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Ruler,
  Heart,
  Search,
  X,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import SizeGuideModal from "@/components/SizeGuideModal";

import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";

/* ---------------- TYPES ---------------- */

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
};

/* ---------------- CONSTANTS ---------------- */

const MIN_PRICE = 0;
const MAX_PRICE = 50;

const categories = [
  "All Products",
  "Safety Wear",
  "Work Trousers",
  "Polo Shirts",
  "PPE Equipment",
];

const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4, label: "4+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
  { value: 4.8, label: "4.8+ Stars" },
];

/* ---------------- MOCK DATA (REPLACE WITH SUPABASE LATER) ---------------- */

const allProducts: Product[] = [
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

/* ---------------- COMPONENT ---------------- */

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [minRating, setMinRating] = useState(0);

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [searchParams] = useSearchParams();

  /* ---------------- URL → CATEGORY SYNC ---------------- */

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  /* ---------------- HANDLERS ---------------- */

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (product: Product) => {
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Products");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
    window.history.replaceState({}, "", "/products");
  };

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedCategory !== "All Products" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      if (
        product.price < priceRange[0] ||
        product.price > priceRange[1]
      ) {
        return false;
      }

      if (product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, priceRange, minRating]);

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-10">
            Professional Workwear
          </h1>

          {/* SEARCH */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X />
              </button>
            )}
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* SIDEBAR */}
            <aside className="space-y-6">
              <div className="card-industrial p-5">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">Filters</span>
                  <button onClick={clearFilters} className="text-primary text-sm">
                    Clear
                  </button>
                </div>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* PRODUCTS */}
            <section className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group card-industrial overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Image with overlay */}
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${
                            product.badge === "Best Seller"
                              ? "bg-primary text-primary-foreground"
                              : product.badge === "New"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                      
                      {/* Quick actions overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-10 w-10"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className={`h-10 w-10 ${
                            isInWishlist(product.id) ? "text-red-500" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleWishlist(product);
                          }}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isInWishlist(product.id) ? "fill-current" : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Product info */}
                  <div className="p-5">
                    <Link to={`/products/${product.id}`}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-foreground">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            £{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Link to={`/products/${product.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};

export default Products;
