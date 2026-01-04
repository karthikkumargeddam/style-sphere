import { Link } from "react-router-dom";
import { ProductSummary } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Share2, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface ProductRecommendationsProps {
    products: ProductSummary[];
    title: string;
    subtitle?: string;
}

const ProductRecommendations = ({
    products,
    title,
    subtitle,
}: ProductRecommendationsProps) => {
    const { addItem } = useCart();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

    if (products.length === 0) return null;

    const handleToggleWishlist = (product: ProductSummary, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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

    const handleAddToCart = (product: ProductSummary, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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
        <div className="mt-16">
            {/* Section Header */}
            <div className="glass-gold p-6 rounded-xl mb-8 shadow-depth-md">
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-foreground/70 text-sm">{subtitle}</p>
                )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {products.map((product, index) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="card-3d group overflow-hidden transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Product Image */}
                        <div className="aspect-square bg-secondary/50 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8"
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className={`h-8 w-8 ${isInWishlist(product.id) ? "text-red-500" : ""}`}
                                    onClick={(e) => handleToggleWishlist(product, e)}
                                >
                                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const url = `${window.location.origin}/products/${product.id}`;
                                        const text = `Check out ${product.name}: ${url}`;
                                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-primary text-primary" />
                                <span className="text-xs text-foreground font-medium">
                                    {product.rating}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    ({product.reviews})
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold text-foreground">
                                        £{product.price.toFixed(2)}
                                    </div>
                                    {product.originalPrice && (
                                        <div className="text-xs text-muted-foreground line-through">
                                            £{product.originalPrice.toFixed(2)}
                                        </div>
                                    )}
                                </div>

                                {/* Quick Add Button */}

                            </div>
                        </div>

                        {/* Badge */}
                        {product.badge && (
                            <div className="absolute top-2 right-2 glass-gold px-2 py-1 rounded text-xs font-semibold shadow-depth-sm">
                                {product.badge}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;
