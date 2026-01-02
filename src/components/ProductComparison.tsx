import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Check, Minus } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductComparison = () => {
    const { comparisonItems, removeFromComparison, isComparisonOpen, toggleComparison } = useComparison();
    const { addToCart } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart({ ...product, quantity: 1, selectedSize: "M" });
        toast.success(`${product.name} added to cart!`);
    };

    const features = [
        "Price",
        "Rating",
        "Category",
        "Material",
        "Sizes Available",
        "Colors",
        "Waterproof",
        "Breathable",
        "Warranty",
    ];

    const getFeatureValue = (product: any, feature: string) => {
        switch (feature) {
            case "Price":
                return `£${product?.price?.toFixed(2) || "0.00"}`;
            case "Rating":
                return `${product?.rating || "N/A"} ⭐`;
            case "Category":
                return product?.category || "N/A";
            case "Material":
                return product?.material || "Cotton Blend";
            case "Sizes Available":
                return "XS - 3XL";
            case "Colors":
                return product?.colors?.length?.toString() || "3";
            case "Waterproof":
                return product?.waterproof ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-muted-foreground" />;
            case "Breathable":
                return product?.breathable !== false ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-muted-foreground" />;
            case "Warranty":
                return product?.warranty || "1 Year";
            default:
                return "N/A";
        }
    };

    return (
        <AnimatePresence>
            {isComparisonOpen && comparisonItems.length > 0 && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9997]"
                        onClick={toggleComparison}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="fixed inset-4 md:inset-8 z-[9998] glass-dark rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 p-6 flex items-center justify-between">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-white">Product Comparison</h2>
                                <p className="text-white/80 text-sm">Compare up to 3 products side by side</p>
                            </div>
                            <button
                                onClick={toggleComparison}
                                className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Comparison Table */}
                        <div className="flex-1 overflow-auto p-6 bg-background/50">
                            <div className="min-w-[800px]">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-foreground sticky left-0 bg-background/80 backdrop-blur-sm">
                                                Feature
                                            </th>
                                            {comparisonItems.map((product) => (
                                                <th key={product.id} className="p-4">
                                                    <div className="glass p-4 rounded-xl">
                                                        {/* Product Image */}
                                                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-secondary">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        {/* Product Name */}
                                                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                                                            {product.name}
                                                        </h3>

                                                        {/* Actions */}
                                                        <div className="flex gap-2 mt-4">
                                                            <Button
                                                                onClick={() => handleAddToCart(product)}
                                                                variant="gold"
                                                                size="sm"
                                                                className="flex-1 gap-2"
                                                            >
                                                                <ShoppingCart className="w-4 h-4" />
                                                                Add
                                                            </Button>
                                                            <Button
                                                                onClick={() => removeFromComparison(product.id)}
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                            {/* Empty slots */}
                                            {[...Array(3 - comparisonItems.length)].map((_, i) => (
                                                <th key={`empty-${i}`} className="p-4">
                                                    <div className="glass p-4 rounded-xl border-2 border-dashed border-border min-h-[300px] flex items-center justify-center">
                                                        <p className="text-muted-foreground text-sm">Add product to compare</p>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {features.map((feature, index) => (
                                            <tr
                                                key={feature}
                                                className={index % 2 === 0 ? "bg-secondary/20" : ""}
                                            >
                                                <td className="p-4 font-medium text-foreground sticky left-0 bg-background/80 backdrop-blur-sm">
                                                    {feature}
                                                </td>
                                                {comparisonItems.map((product) => (
                                                    <td key={product.id} className="p-4 text-center">
                                                        <div className="flex items-center justify-center">
                                                            {getFeatureValue(product, feature)}
                                                        </div>
                                                    </td>
                                                ))}
                                                {/* Empty slots */}
                                                {[...Array(3 - comparisonItems.length)].map((_, i) => (
                                                    <td key={`empty-${i}`} className="p-4 text-center text-muted-foreground">
                                                        -
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border bg-background/30 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Comparing {comparisonItems.length} of 3 products
                            </p>
                            <Button onClick={toggleComparison} variant="outline">
                                Close Comparison
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductComparison;
