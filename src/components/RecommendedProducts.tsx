import { Link } from "react-router-dom";
import { Star, TrendingUp, ShoppingCart, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    category: string;
}

interface RecommendedProductsProps {
    currentProductId?: number;
    category?: string;
    title?: string;
    limit?: number;
}

const RecommendedProducts = ({
    currentProductId,
    category,
    title = "You May Also Like",
    limit = 6
}: RecommendedProductsProps) => {
    const { addItem } = useCart();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

    const handleQuickAdd = (product: Product) => {
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
    // Mock recommended products (in real app, this would use AI/ML)
    const allProducts: Product[] = [
        {
            id: 101,
            name: "Professional Work Polo Shirt",
            price: 24.99,
            originalPrice: 34.99,
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80",
            rating: 4.8,
            reviews: 234,
            category: "Workwear"
        },
        {
            id: 102,
            name: "Hi-Vis Safety Vest",
            price: 18.99,
            image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&q=80",
            rating: 4.9,
            reviews: 567,
            category: "Hi-Vis"
        },
        {
            id: 103,
            name: "Steel Toe Safety Boots",
            price: 59.99,
            originalPrice: 79.99,
            image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&q=80",
            rating: 4.7,
            reviews: 445,
            category: "Safety Boots"
        },
        {
            id: 104,
            name: "Winter Work Jacket",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=400&q=80",
            rating: 4.8,
            reviews: 189,
            category: "Winter Workwear"
        },
        {
            id: 105,
            name: "Heavy Duty Coveralls",
            price: 45.99,
            originalPrice: 65.99,
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
            rating: 4.6,
            reviews: 312,
            category: "Coveralls"
        },
        {
            id: 106,
            name: "Work Trousers - Cargo Style",
            price: 32.99,
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
            rating: 4.7,
            reviews: 421,
            category: "Workwear"
        },
        {
            id: 107,
            name: "Corporate Polo Bundle (5-Pack)",
            price: 99.99,
            originalPrice: 124.99,
            image: "https://images.unsplash.com/photo-1598032895397-b9c259f93c0c?w=400&q=80",
            rating: 4.9,
            reviews: 178,
            category: "Corporate"
        },
        {
            id: 108,
            name: "Fleece Work Jacket",
            price: 42.99,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
            rating: 4.5,
            reviews: 256,
            category: "Winter Workwear"
        }
    ];

    // Filter out current product and limit results
    const recommendations = allProducts
        .filter(p => p.id !== currentProductId)
        .slice(0, limit);

    return (
        <div className="py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-display text-3xl font-bold mb-2">{title}</h2>
                    <p className="text-muted-foreground">
                        Customers who viewed this also liked
                    </p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {recommendations.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="group"
                    >
                        <div className="card-3d overflow-hidden">
                            {/* Product Image */}
                            <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {product.originalPrice && (
                                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                        Save £{(product.originalPrice - product.price).toFixed(0)}
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

                            {/* Product Info */}
                            <div className="p-4">
                                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.floor(product.rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        ({product.reviews})
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-lg font-bold text-primary">
                                        £{product.price.toFixed(2)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            £{product.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Quick Add Button */}

                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
                <Link to="/products">
                    <Button variant="outline" size="lg">
                        View All Products
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default RecommendedProducts;
