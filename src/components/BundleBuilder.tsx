import { useState } from "react";
import { Plus, Minus, ShoppingCart, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

// Sample products - replace with actual product data from your database
const availableProducts: Product[] = [
    { id: 1, name: "Classic Polo Shirt", price: 15.99, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80", category: "Shirts" },
    { id: 2, name: "Work Hoodie", price: 29.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", category: "Hoodies" },
    { id: 3, name: "Safety Jacket", price: 45.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", category: "Jackets" },
    { id: 4, name: "Basic T-Shirt", price: 12.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", category: "T-Shirts" },
    { id: 5, name: "Professional Shirt", price: 24.99, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80", category: "Shirts" },
    { id: 6, name: "Hi-Vis Vest", price: 18.99, image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&q=80", category: "Safety" },
    { id: 7, name: "Fleece Jacket", price: 35.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80", category: "Jackets" },
    { id: 8, name: "Casual Polo", price: 16.99, image: "https://images.unsplash.com/photo-1598032895397-b9c259f93c0c?w=400&q=80", category: "Shirts" },
];

export const BundleBuilder = () => {
    const [selectedProducts, setSelectedProducts] = useState<Map<number, number>>(new Map());
    const [filterCategory, setFilterCategory] = useState("all");
    const { toast } = useToast();

    const categories = ["all", ...Array.from(new Set(availableProducts.map(p => p.category)))];

    const filteredProducts = filterCategory === "all"
        ? availableProducts
        : availableProducts.filter(p => p.category === filterCategory);

    const addProduct = (product: Product) => {
        const newSelected = new Map(selectedProducts);
        const currentQty = newSelected.get(product.id) || 0;
        newSelected.set(product.id, currentQty + 1);
        setSelectedProducts(newSelected);

        toast({
            title: "Product Added",
            description: `${product.name} added to your custom bundle`,
        });
    };

    const removeProduct = (productId: number) => {
        const newSelected = new Map(selectedProducts);
        const currentQty = newSelected.get(productId) || 0;

        if (currentQty > 1) {
            newSelected.set(productId, currentQty - 1);
        } else {
            newSelected.delete(productId);
        }

        setSelectedProducts(newSelected);
    };

    const clearProduct = (productId: number) => {
        const newSelected = new Map(selectedProducts);
        newSelected.delete(productId);
        setSelectedProducts(newSelected);
    };

    const calculateTotal = () => {
        let total = 0;
        selectedProducts.forEach((qty, productId) => {
            const product = availableProducts.find(p => p.id === productId);
            if (product) {
                total += product.price * qty;
            }
        });
        return total;
    };

    const calculateDiscount = () => {
        const itemCount = Array.from(selectedProducts.values()).reduce((a, b) => a + b, 0);
        if (itemCount >= 10) return 0.25; // 25% off for 10+ items
        if (itemCount >= 5) return 0.15;  // 15% off for 5+ items
        if (itemCount >= 3) return 0.10;  // 10% off for 3+ items
        return 0;
    };

    const total = calculateTotal();
    const discount = calculateDiscount();
    const finalPrice = total * (1 - discount);
    const savings = total - finalPrice;
    const itemCount = Array.from(selectedProducts.values()).reduce((a, b) => a + b, 0);

    const addToCart = () => {
        if (selectedProducts.size === 0) {
            toast({
                title: "Empty Bundle",
                description: "Please add at least one product to your bundle",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Bundle Added to Cart!",
            description: `Your custom bundle with ${itemCount} items has been added to cart`,
        });

        // Here you would actually add to cart
        setSelectedProducts(new Map());
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Selection */}
            <div className="lg:col-span-2">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Package className="w-6 h-6 text-primary" />
                        Build Your Custom Bundle
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        Select products to create your perfect workwear bundle. Get discounts based on quantity!
                    </p>

                    {/* Category Filter */}
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                variant={filterCategory === cat ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {filteredProducts.map(product => {
                        const qty = selectedProducts.get(product.id) || 0;

                        return (
                            <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
                                <div className="flex gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                                        <Badge variant="outline" className="text-xs mb-2">
                                            {product.category}
                                        </Badge>
                                        <p className="text-lg font-bold text-primary">£{product.price}</p>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    {qty > 0 ? (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="font-semibold w-8 text-center">{qty}</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => addProduct(product)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => addProduct(product)}
                                            className="w-full"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add to Bundle
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Bundle Summary */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold mb-4">Your Custom Bundle</h3>

                        {selectedProducts.size === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No products selected</p>
                                <p className="text-sm">Start building your bundle!</p>
                            </div>
                        ) : (
                            <>
                                {/* Selected Products */}
                                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                    {Array.from(selectedProducts.entries()).map(([productId, qty]) => {
                                        const product = availableProducts.find(p => p.id === productId);
                                        if (!product) return null;

                                        return (
                                            <div key={productId} className="flex items-center gap-2 text-sm">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {qty} × £{product.price}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => clearProduct(productId)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Discount Info */}
                                {discount > 0 && (
                                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
                                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                                            🎉 {(discount * 100).toFixed(0)}% Bundle Discount Applied!
                                        </p>
                                        <p className="text-xs text-green-600 dark:text-green-500">
                                            You're saving £{savings.toFixed(2)}
                                        </p>
                                    </div>
                                )}

                                {/* Next Discount Tier */}
                                {itemCount < 10 && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
                                        <p className="text-xs text-blue-700 dark:text-blue-400">
                                            {itemCount < 3 && `Add ${3 - itemCount} more items for 10% off`}
                                            {itemCount >= 3 && itemCount < 5 && `Add ${5 - itemCount} more items for 15% off`}
                                            {itemCount >= 5 && itemCount < 10 && `Add ${10 - itemCount} more items for 25% off`}
                                        </p>
                                    </div>
                                )}

                                {/* Price Summary */}
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>£{total.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                                            <span>Bundle Discount ({(discount * 100).toFixed(0)}%)</span>
                                            <span>-£{savings.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-primary">£{finalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    className="w-full mt-4"
                                    size="lg"
                                    onClick={addToCart}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add Bundle to Cart
                                </Button>

                                {/* Free Logo Badge */}
                                <div className="mt-3 text-center">
                                    <Badge variant="secondary" className="text-xs">
                                        ✨ Free Logo Embroidery Included
                                    </Badge>
                                </div>
                            </>
                        )}
                    </Card>

                    {/* Discount Tiers Info */}
                    <Card className="p-4 mt-4">
                        <h4 className="font-semibold text-sm mb-3">Bundle Discounts</h4>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                                <span>3-4 items</span>
                                <span className="font-semibold text-foreground">10% off</span>
                            </div>
                            <div className="flex justify-between">
                                <span>5-9 items</span>
                                <span className="font-semibold text-foreground">15% off</span>
                            </div>
                            <div className="flex justify-between">
                                <span>10+ items</span>
                                <span className="font-semibold text-primary">25% off</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
