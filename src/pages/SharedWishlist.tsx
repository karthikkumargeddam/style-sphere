import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface SharedWishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const SharedWishlist = () => {
    const { data } = useParams<{ data: string }>();
    const [wishlistItems, setWishlistItems] = useState<SharedWishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem: addToCart } = useCart();

    useEffect(() => {
        if (data) {
            try {
                const decodedData = atob(data);
                const items = JSON.parse(decodedData);
                setWishlistItems(items);
            } catch (error) {
                console.error("Error decoding wishlist:", error);
                toast.error("Invalid wishlist link");
            } finally {
                setLoading(false);
            }
        }
    }, [data]);

    const addToCartFromWishlist = (item: SharedWishlistItem) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        });
        toast.success(`${item.name} added to cart`);
    };

    const addAllToCart = () => {
        wishlistItems.forEach(item => {
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            });
        });
        toast.success(`Added ${wishlistItems.length} items to cart`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading shared wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                                Shared Wishlist
                            </h1>
                            <p className="text-muted-foreground">
                                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in this wishlist
                            </p>
                        </div>

                        {wishlistItems.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addAllToCart}
                                className="flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add All to Cart
                            </Button>
                        )}
                    </div>
                </div>

                {/* Info Banner */}
                <div className="card-3d p-4 mb-8 bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground mb-1">Viewing a Shared Wishlist</p>
                            <p className="text-sm text-muted-foreground">
                                Someone shared their wishlist with you! You can add these items to your cart or create your own wishlist by signing in.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wishlist Items */}
                {wishlistItems.length === 0 ? (
                    <div className="card-3d p-12 text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                            Empty Wishlist
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            This wishlist doesn't have any items yet.
                        </p>
                        <Link to="/products">
                            <Button size="lg">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="card-3d group relative overflow-hidden">
                                {/* Product Image */}
                                <Link to={`/products/${item.id}`}>
                                    <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <p className="text-xs text-primary font-semibold mb-2">{item.category}</p>
                                    <Link to={`/products/${item.id}`}>
                                        <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-2xl font-bold text-foreground mb-4">
                                        £{item.price.toFixed(2)}
                                    </p>

                                    {/* Actions */}
                                    <Button
                                        onClick={() => addToCartFromWishlist(item)}
                                        className="w-full gap-2"
                                        size="sm"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12 card-3d p-8 text-center">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                            Like what you see?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Create your own wishlist and share it with friends and family!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/auth">
                                <Button size="lg">
                                    Sign In to Create Wishlist
                                </Button>
                            </Link>
                            <Link to="/products">
                                <Button variant="outline" size="lg">
                                    Browse More Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SharedWishlist;
