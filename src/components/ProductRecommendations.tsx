import { Link } from "react-router-dom";
import { ProductSummary } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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

    if (products.length === 0) return null;

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
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity shadow-depth-sm hover:shadow-depth-md"
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                </Button>
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
