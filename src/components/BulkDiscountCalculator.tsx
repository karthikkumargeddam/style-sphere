import { useState } from "react";
import { Calculator, TrendingDown, Package, ShoppingCart } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BulkDiscountCalculatorProps {
    basePrice: number;
    productName: string;
    onAddToCart?: (quantity: number) => void;
}

const BulkDiscountCalculator = ({ basePrice, productName, onAddToCart }: BulkDiscountCalculatorProps) => {
    const [quantity, setQuantity] = useState(50);

    // Tiered pricing structure
    const getTierInfo = (qty: number) => {
        if (qty >= 500) return { discount: 0.25, tier: "Platinum", color: "purple" };
        if (qty >= 250) return { discount: 0.20, tier: "Gold", color: "yellow" };
        if (qty >= 100) return { discount: 0.15, tier: "Silver", color: "gray" };
        if (qty >= 50) return { discount: 0.10, tier: "Bronze", color: "orange" };
        if (qty >= 25) return { discount: 0.05, tier: "Starter", color: "blue" };
        return { discount: 0, tier: "Standard", color: "gray" };
    };

    const tierInfo = getTierInfo(quantity);
    const discountedPrice = basePrice * (1 - tierInfo.discount);
    const totalPrice = discountedPrice * quantity;
    const totalSavings = (basePrice - discountedPrice) * quantity;

    const tiers = [
        { min: 1, discount: 0, label: "Standard" },
        { min: 25, discount: 5, label: "Starter - 5% OFF" },
        { min: 50, discount: 10, label: "Bronze - 10% OFF" },
        { min: 100, discount: 15, label: "Silver - 15% OFF" },
        { min: 250, discount: 20, label: "Gold - 20% OFF" },
        { min: 500, discount: 25, label: "Platinum - 25% OFF" },
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Bulk Discount Calculator</h3>
            </div>

            {/* Quantity Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <span className="text-2xl font-bold text-primary">{quantity}</span>
                </div>
                <Slider
                    value={[quantity]}
                    onValueChange={(value) => setQuantity(value[0])}
                    min={1}
                    max={1000}
                    step={1}
                    className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>1000</span>
                </div>
            </div>

            {/* Current Tier Badge */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Current Tier</p>
                        <p className="text-xl font-bold text-primary">{tierInfo.tier}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Discount</p>
                        <p className="text-2xl font-bold text-green-600">{(tierInfo.discount * 100)}%</p>
                    </div>
                </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="line-through">£{basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discounted Price</span>
                    <span className="font-semibold text-primary">£{discountedPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-semibold">×{quantity}</span>
                </div>

                {totalSavings > 0 && (
                    <div className="flex justify-between text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <span className="text-green-700 dark:text-green-400 font-medium flex items-center gap-1">
                            <TrendingDown className="w-4 h-4" />
                            Total Savings
                        </span>
                        <span className="text-green-700 dark:text-green-400 font-bold">
                            £{totalSavings.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="border-t pt-3">
                    <div className="flex justify-between">
                        <span className="font-bold">Total Price</span>
                        <span className="text-2xl font-bold text-primary">£{totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        £{discountedPrice.toFixed(2)} per item
                    </p>
                </div>
            </div>

            {/* Tier Progress */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-3">Unlock Higher Discounts</p>
                <div className="space-y-2">
                    {tiers.map((tier, index) => {
                        const isActive = quantity >= tier.min;
                        const isNext = !isActive && (index === 0 || quantity >= tiers[index - 1].min);

                        return (
                            <div
                                key={tier.min}
                                className={`flex items-center justify-between p-2 rounded text-sm ${isActive
                                        ? 'bg-primary/10 border border-primary/20'
                                        : isNext
                                            ? 'bg-secondary/50 border border-secondary'
                                            : 'bg-secondary/20'
                                    }`}
                            >
                                <span className={isActive ? 'font-semibold' : ''}>
                                    {tier.min}+ items: {tier.label}
                                </span>
                                {isActive && <span className="text-green-600">✓</span>}
                                {isNext && (
                                    <span className="text-xs text-primary">
                                        {tier.min - quantity} more to unlock
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
                <Button
                    className="w-full"
                    size="lg"
                    onClick={() => onAddToCart?.(quantity)}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add {quantity} to Cart - £{totalPrice.toFixed(2)}
                </Button>
                <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Request Quote
                </Button>
            </div>

            {/* Trust Elements */}
            <div className="mt-4 pt-4 border-t text-center">
                <p className="text-xs text-muted-foreground">
                    ✓ Free Delivery • ✓ 60-Day Returns • ✓ Price Match Guarantee
                </p>
            </div>
        </Card>
    );
};

export default BulkDiscountCalculator;
