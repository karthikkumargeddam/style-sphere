import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star, ShoppingCart, Filter, Grid, List, Ruler, Heart, Search, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import SizeGuideModal from "@/components/SizeGuideModal";
import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";

const allProducts = [
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
  {
    id: 5,
    name: "Reflective Work Jacket",
    category: "Safety Wear",
    price: 39.99,
    rating: 4.5,
    reviews: 67,
    image: safetyVest,
  },
  {
    id: 6,
    name: "Cargo Work Pants",
    category: "Work Trousers",
    price: 32.99,
    rating: 4.8,
    reviews: 134,
    image: workTrousers,
  },
  {
    id: 7,
    name: "Premium Polo - Navy",
    category: "Polo Shirts",
    price: 21.99,
    rating: 4.7,
    reviews: 98,
    image: poloShirt,
  },
  {
    id: 8,
    name: "Construction Helmet",
    category: "PPE Equipment",
    price: 15.99,
    rating: 4.9,
    reviews: 201,
    image: hardHat,
    badge: "Top Rated",
  },
];

const categories = ["All Products", "Safety Wear", "Work Trousers", "Polo Shirts", "PPE Equipment"];
const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4, label: "4+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
  { value: 4.8, label: "4.8+ Stars" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 50;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Products");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All Products" || priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE || minRating > 0;

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "All Products" && product.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Our Products
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Professional Workwear
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Browse our complete range of high-quality workwear, uniforms, and PPE. All products can be customized with your company branding.
            </p>
            <Button 
              variant="gold" 
              onClick={() => setIsSizeGuideOpen(true)}
              className="gap-2"
            >
              <Ruler className="w-4 h-4" />
              AI Size Guide
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-base bg-secondary/50 border-border/50 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="card-industrial p-6 sticky top-40 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">Filters</h3>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:text-primary/80 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Category</Label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground/80 hover:bg-secondary"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    Price Range: £{priceRange[0]} - £{priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>£{MIN_PRICE}</span>
                    <span>£{MAX_PRICE}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Minimum Rating</Label>
                  <div className="space-y-1">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setMinRating(option.value)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                          minRating === option.value
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground/80 hover:bg-secondary"
                        }`}
                      >
                        {option.value > 0 && <Star className="w-3 h-3 fill-current" />}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Products */}
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group card-industrial animate-fade-up ${viewMode === "list" ? "flex" : ""}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`relative overflow-hidden bg-secondary/50 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
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
                    </div>
                    <div className="p-5 flex-1">
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
                      <div className="flex items-center justify-between">
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
                        <Button 
                          variant="gold" 
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};

export default Products;
