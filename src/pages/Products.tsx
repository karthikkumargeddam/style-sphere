import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Share2,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import SizeGuideModal from "@/components/SizeGuideModal";
import AISizeGuide from "@/components/AISizeGuide";


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
  "Jackets & Coats",
  "Safety Boots",
  "Hi-Vis Vests",
  "Coveralls",
  "Winter Workwear",
  "Hospital Bundles",
  "Workwear Bundles",
];

const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4, label: "4+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
  { value: 4.8, label: "4.8+ Stars" },
];

/* ---------------- MOCK DATA (REPLACE WITH SUPABASE LATER) ---------------- */

import { getAllProducts, getProductsPage } from "@/lib/products";

const allProducts: Product[] = getAllProducts();

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
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "rating">("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [totalProducts, setTotalProducts] = useState(0);

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------------- URL → CATEGORY SYNC ---------------- */

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl) return;

    // Support both human-readable category names and short `cat_x` codes from the footer
    const catMap: Record<string, string> = {
      cat_1: "Safety Wear",
      cat_2: "Work Trousers",
      cat_3: "Safety Wear",
      cat_4: "PPE Equipment",
      cat_5: "All Products",
      cat_6: "PPE Equipment",
      cat_7: "Safety Wear",
      cat_8: "All Products",
    };

    if (categoryFromUrl.startsWith("cat_") && catMap[categoryFromUrl]) {
      setSelectedCategory(catMap[categoryFromUrl]);
      return;
    }

    if (categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
      return;
    }

    const decoded = decodeURIComponent(categoryFromUrl).replace(/[-_]/g, " ");
    const match = categories.find((c) => c.toLowerCase() === decoded.toLowerCase());
    if (match) setSelectedCategory(match);
  }, [searchParams]);

  // Sync page query param
  useEffect(() => {
    const p = Number(searchParams.get("page") || "1");
    setPage(Number.isNaN(p) ? 1 : p);
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
    setSortBy("newest");
    setSearchParams({});
  };

  /* ---------------- FILTER LOGIC ---------------- */

  // Server-like paginated fetch (synchronous from lib)
  const [pagedProducts, setPagedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    setSearchParams(params);
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  useEffect(() => {
    const filter = {
      category: selectedCategory,
      search: searchQuery,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating,
    };
    const { items, total } = getProductsPage({ page, pageSize, filter });
    setPagedProducts(items as Product[]);
    setTotalProducts(total);
  }, [page, pageSize, searchQuery, selectedCategory, priceRange, minRating, sortBy]);

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

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${selectedCategory === cat
                          ? "bg-primary text-white shadow-depth-sm"
                          : "hover:bg-secondary"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>£{priceRange[0]}</span>
                      <span>£{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setMinRating(option.value)}
                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${minRating === option.value
                          ? "bg-primary text-white shadow-depth-sm"
                          : "hover:bg-secondary"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {option.value > 0 && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          )}
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Guide */}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setIsSizeGuideOpen(true)}
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </Button>
              </div>
            </aside>

            {/* PRODUCTS */}
            <section className="lg:col-span-3">
              {/* Sort and results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {totalProducts} product{totalProducts !== 1 ? "s" : ""} found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border z-50">
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagedProducts.map((product) => (
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
                            className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${product.badge === "Best Seller"
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
                            className={`h-10 w-10 ${isInWishlist(product.id) ? "text-red-500" : ""
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleWishlist(product);
                            }}
                          >
                            <Heart
                              className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""
                                }`}
                            />
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
                              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
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

                {pagedProducts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between col-span-full mt-6">
                <div className="text-sm text-muted-foreground">Showing page {page} of {totalPages}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                    Next
                  </Button>
                  <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="ml-3 border border-border rounded px-2 py-1 bg-background text-sm">
                    <option value={12}>12 / page</option>
                    <option value={24}>24 / page</option>
                    <option value={48}>48 / page</option>
                  </select>
                </div>
              </div>
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
