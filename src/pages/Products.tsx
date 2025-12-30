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
                <div key={product.id} className="card-industrial p-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 rounded"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold">
                      £{product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
