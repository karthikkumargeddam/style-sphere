import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Heart, ZoomIn } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface QuickViewProps {
    product: {
        id: number;
        name: string;
        category: string;
        price: number;
        originalPrice?: number;
        rating: number;
        reviews: number;
        image: string;
        description?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { addItem: addToWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
            });
        }
        toast.success(`${quantity}x ${product.name} added to cart`);
        onClose();
    };

    const handleAddToWishlist = () => {
        addToWishlist({
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image: product.image,
            product_category: product.category,
        });
        toast.success("Added to wishlist");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl glass-dark border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-display font-bold text-foreground">
                        Quick View
                    </DialogTitle>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="relative group">
                        <div className="card-3d aspect-square overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <Link
                            to={`/products/${product.id}`}
                            className="absolute top-4 right-4 glass p-2 rounded-lg shadow-depth-sm hover:shadow-depth-md transition-all"
                            onClick={onClose}
                        >
                            <ZoomIn className="w-5 h-5 text-primary" />
                        </Link>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm text-primary font-medium uppercase tracking-wider">
                                {product.category}
                            </span>
                            <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                                {product.name}
                            </h2>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-foreground">
                                £{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                    £{product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        )}

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="neuro w-10 h-10 rounded-lg border border-border hover:border-primary flex items-center justify-center text-foreground font-bold transition-all duration-300 hover:scale-110 active:scale-95"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-bold text-lg text-foreground">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="neuro w-10 h-10 rounded-lg border border-border hover:border-primary flex items-center justify-center text-foreground font-bold transition-all duration-300 hover:scale-110 active:scale-95"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="gold"
                                className="flex-1 gap-2"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleAddToWishlist}
                                className={isInWishlist(product.id) ? "bg-primary/10 border-primary" : ""}
                            >
                                <Heart
                                    className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""
                                        }`}
                                />
                            </Button>
                        </div>

                        {/* View Full Details */}
                        <Link to={`/products/${product.id}`} onClick={onClose}>
                            <Button variant="outline" className="w-full">
                                View Full Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuickView;
