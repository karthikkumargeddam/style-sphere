import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, Sparkles, Star, Users, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdvancedBundleBuilder } from "@/components/BundleBuilder";

// Generate 100+ bundle products with varied images
const generateBundles = () => {
  const categories = ["Workwear", "Hi-Vis", "Corporate", "Healthcare", "Hospitality", "Construction"];
  const types = ["Starter", "Professional", "Premium", "Ultimate", "Essential", "Complete"];
  const itemCounts = [3, 4, 5, 6, 8, 10, 12];

  // Diverse workwear image sets for different bundle types
  const imageCollections = [
    // Set 1 - Polo shirts and casual
    [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80",
      "https://images.unsplash.com/photo-1598032895397-b9c259f93c0c?w=400&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"
    ],
    // Set 2 - Hoodies and sweatshirts
    [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80"
    ],
    // Set 3 - Jackets and outerwear
    [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=400&q=80"
    ],
    // Set 4 - T-shirts and basics
    [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80"
    ],
    // Set 5 - Professional wear
    [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80"
    ],
    // Set 6 - Hi-vis and safety
    [
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&q=80",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80"
    ],
    // Set 7 - Formal shirts
    [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=400&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&q=80"
    ],
    // Set 8 - Vests and gilets
    [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      "https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=400&q=80"
    ]
  ];

  const bundles = [];

  for (let i = 1; i <= 120; i++) {
    const category = categories[i % categories.length];
    const type = types[Math.floor(i / 20) % types.length];
    const itemCount = itemCounts[i % itemCounts.length];
    const basePrice = 50 + (itemCount * 15) + (Math.random() * 50);
    const originalPrice = basePrice * 1.4;
    const savings = originalPrice - basePrice;

    // Use different image set for each bundle
    const imageSet = imageCollections[i % imageCollections.length];

    bundles.push({
      id: i,
      name: `${itemCount} Item ${type} ${category} Bundle`,
      subtitle: "with Free Logo Embroidery",
      category,
      itemCount,
      price: parseFloat(basePrice.toFixed(2)),
      originalPrice: parseFloat(originalPrice.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
      rating: 4.5 + (Math.random() * 0.5),
      reviews: Math.floor(Math.random() * 2000) + 100,
      badge: i % 5 === 0 ? "Best Seller" : i % 7 === 0 ? "New" : undefined,
      // Use varied images for each bundle
      images: imageSet
    });
  }

  return bundles;
};

const Bundles = () => {
  const [bundles] = useState(generateBundles());
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

  const filteredBundles = filter === "all"
    ? bundles
    : bundles.filter(b => b.category.toLowerCase() === filter.toLowerCase());

  // Pagination calculations
  const totalPages = Math.ceil(filteredBundles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBundles = filteredBundles.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const categories = ["all", "Workwear", "Hi-Vis", "Corporate", "Healthcare", "Hospitality", "Construction"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="card-3d p-8 rounded-xl mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Package className="w-12 h-12 text-primary" />
              <div>
                <h1 className="font-display text-4xl font-bold text-foreground">
                  Workwear Bundles
                </h1>
                <p className="text-foreground/80 mt-2">
                  Save up to 40% with our pre-built workwear sets. All bundles include free logo embroidery!
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-secondary/20 rounded-lg">
                <p className="text-3xl font-bold text-primary">{bundles.length}+</p>
                <p className="text-sm text-muted-foreground">Bundle Options</p>
              </div>
              <div className="text-center p-4 bg-secondary/20 rounded-lg">
                <p className="text-3xl font-bold text-primary">40%</p>
                <p className="text-sm text-muted-foreground">Average Savings</p>
              </div>
              <div className="text-center p-4 bg-secondary/20 rounded-lg">
                <p className="text-3xl font-bold text-primary">Free</p>
                <p className="text-sm text-muted-foreground">Logo Embroidery</p>
              </div>
            </div>
          </div>

          {/* Create Custom Bundle Button */}
          <div className="mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Custom Bundle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Build Your Custom Bundle</DialogTitle>
                  <DialogDescription>
                    Select products to create your perfect workwear bundle and save up to 25%!
                  </DialogDescription>
                </DialogHeader>
                <AdvancedBundleBuilder />
              </DialogContent>
            </Dialog>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => handleFilterChange(cat)}
                className="whitespace-nowrap"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          {/* Results Info & Items Per Page */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredBundles.length)} of {filteredBundles.length} results
            </p>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-border rounded-lg text-sm bg-background"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
              <option value={96}>96 per page</option>
            </select>
          </div>

          {/* Bundle Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="card-3d group overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Composite Bundle Image */}
                <Link to={`/bundles/${bundle.id}`}>
                  <div className="relative p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 aspect-square">
                    {/* Stacked Images - Bundle Style */}
                    <div className="relative h-full flex items-center justify-center">
                      {bundle.images.slice(0, 3).map((img, i) => (
                        <div
                          key={i}
                          className="absolute transition-all duration-300 group-hover:scale-110"
                          style={{
                            zIndex: 10 - i,
                            transform: `translateX(${(i - 1) * 25}px) translateY(${i * 10}px) rotate(${(i - 1) * 5}deg)`,
                            width: '70%',
                            height: '70%'
                          }}
                        >
                          <img
                            src={img}
                            alt={`${bundle.name} item ${i + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-depth-md border-2 border-background"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Badges */}
                    {bundle.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-depth-sm">
                        {bundle.badge}
                      </Badge>
                    )}

                    <Badge className="absolute top-4 right-4 bg-green-500 text-white shadow-depth-sm">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Save £{bundle.savings.toFixed(0)}
                    </Badge>

                    <Badge className="absolute bottom-4 left-4 glass-gold shadow-depth-sm">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {bundle.itemCount} Items
                    </Badge>
                  </div>
                </Link>

                {/* Bundle Info */}
                <div className="p-6">
                  <Link to={`/bundles/${bundle.id}`}>
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs mb-2">
                        {bundle.category}
                      </Badge>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {bundle.name}
                      </h3>
                      <p className="text-sm text-primary font-semibold">{bundle.subtitle}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(bundle.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({bundle.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">
                        £{bundle.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        £{bundle.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </Link>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Link to={`/bundles/${bundle.id}`} className="block">
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Bundle
                      </Button>
                    </Link>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Custom Bundle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Build Your Custom Bundle</DialogTitle>
                          <DialogDescription>
                            Select products to create your perfect workwear bundle and save up to 25%!
                          </DialogDescription>
                        </DialogHeader>
                        <AdvancedBundleBuilder />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Trust Badge */}
                  <div className="mt-3 pt-3 border-t flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Free Logo • Fast Delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amazon-Style Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-12">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page as number)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Trust Section */}
          <div className="card-3d p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">
              Why Choose Our Bundles?
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              <div>
                <Package className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Complete Sets</h4>
                <p className="text-sm text-muted-foreground">
                  Everything you need in one bundle
                </p>
              </div>
              <div>
                <TrendingDown className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Big Savings</h4>
                <p className="text-sm text-muted-foreground">
                  Up to 40% off individual prices
                </p>
              </div>
              <div>
                <Sparkles className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Free Logo</h4>
                <p className="text-sm text-muted-foreground">
                  Professional embroidery included
                </p>
              </div>
              <div>
                <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Trusted Quality</h4>
                <p className="text-sm text-muted-foreground">
                  40,000+ satisfied customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bundles;
