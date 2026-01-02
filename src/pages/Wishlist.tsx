import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

const Wishlist = () => {
    const { items: wishlistItems, removeItem, clearWishlist } = useWishlist();
    const { addItem: addToCart } = useCart();

    const addToCartFromWishlist = (item: any) => {
        addToCart({
            id: item.product_id,
            name: item.product_name,
            price: item.product_price,
            quantity: 1,
            image: item.product_image,
        });
        toast.success(`${item.product_name} added to cart`);
    };

    const handleClearWishlist = () => {
        clearWishlist();
        toast.success("Wishlist cleared");
    };

    const shareWishlist = () => {
        // Create a shareable link with wishlist data
        const wishlistData = wishlistItems.map(item => ({
            id: item.product_id,
            name: item.product_name,
            price: item.product_price,
            image: item.product_image,
            category: item.product_category
        }));

        // Encode wishlist data in URL
        const encodedData = btoa(JSON.stringify(wishlistData));
        const shareUrl = `${window.location.origin}/wishlist/shared/${encodedData}`;

        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        toast.success("Shareable wishlist link copied to clipboard!");
    };

    const addAllToCart = () => {
        wishlistItems.forEach(item => {
            addToCart({
                id: item.product_id,
                name: item.product_name,
                price: item.product_price,
                quantity: 1,
                image: item.product_image,
            });
        });
        toast.success(`Added ${wishlistItems.length} items to cart`);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            My Wishlist
                        </h1>
                        <p className="text-muted-foreground">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>

                    {wishlistItems.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={shareWishlist}
                                className="flex items-center gap-2"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addAllToCart}
                                className="flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add All to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearWishlist}
                                className="flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear All
                            </Button>
                        </div>
                    )}
                </div>

                {/* Wishlist Items */}
                {wishlistItems.length === 0 ? (
                    // Empty State
                    <div className="card-3d p-12 text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Save your favorite items here so you can easily find them later.
                            Start browsing and add products you love!
                        </p>
                        <Link to="/products">
                            <Button size="lg" className="gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                ) : (
                    // Wishlist Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.product_id} className="card-3d group relative overflow-hidden">
                                {/* Remove Button */}
                                <button
                                    onClick={() => {
                                        removeItem(item.product_id);
                                        toast.success("Removed from wishlist");
                                    }}
                                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                    title="Remove from wishlist"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Product Image */}
                                <Link to={`/products/${item.product_id}`}>
                                    <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                                        <img
                                            src={item.product_image}
                                            alt={item.product_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <p className="text-xs text-primary font-semibold mb-2">{item.product_category}</p>
                                    <Link to={`/products/${item.product_id}`}>
                                        <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                                            {item.product_name}
                                        </h3>
                                    </Link>
                                    <p className="text-2xl font-bold text-foreground mb-4">
                                        £{item.product_price.toFixed(2)}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => addToCartFromWishlist(item)}
                                            className="flex-1 gap-2"
                                            size="sm"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                removeItem(item.product_id);
                                                toast.success("Removed from wishlist");
                                            }}
                                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recommendations */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                            You Might Also Like
                        </h2>
                        <div className="card-3d p-8 text-center">
                            <p className="text-muted-foreground mb-4">
                                Based on your wishlist, we think you'll love these products
                            </p>
                            <Link to="/products">
                                <Button variant="outline">
                                    View Recommendations
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
