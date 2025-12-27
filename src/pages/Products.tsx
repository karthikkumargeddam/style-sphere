import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Filter, Grid, List } from "lucide-react";
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

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = selectedCategory === "All Products"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

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
            <p className="text-muted-foreground max-w-2xl">
              Browse our complete range of high-quality workwear, uniforms, and PPE. All products can be customized with your company branding.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="card-industrial p-6 sticky top-40">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
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
                        <Button variant="gold" size="sm">
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
    </div>
  );
};

export default Products;
