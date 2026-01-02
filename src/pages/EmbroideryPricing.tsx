import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingDown, Package } from "lucide-react";
import { Link } from "react-router-dom";

const EmbroideryPricing = () => {
    const [logoSize, setLogoSize] = useState("medium");
    const [colorCount, setColorCount] = useState(1);
    const [quantity, setQuantity] = useState(50);
    const [garmentType, setGarmentType] = useState("polo");
    const [rushOrder, setRushOrder] = useState(false);

    // Pricing logic
    const basePrices: Record<string, number> = {
        small: 3.50,
        medium: 4.50,
        large: 6.00
    };

    const garmentPrices: Record<string, number> = {
        polo: 0,
        hoodie: 1.50,
        jacket: 2.00,
        tshirt: -0.50
    };

    const colorMultiplier = 1 + ((colorCount - 1) * 0.25);
    const basePrice = basePrices[logoSize];
    const garmentAddon = garmentPrices[garmentType];
    const pricePerItem = (basePrice + garmentAddon) * colorMultiplier;

    // Volume discounts
    let discount = 0;
    if (quantity >= 100) discount = 0.20;
    else if (quantity >= 50) discount = 0.15;
    else if (quantity >= 25) discount = 0.10;

    const discountedPrice = pricePerItem * (1 - discount);
    const setupFee = quantity >= 50 ? 0 : 25;
    const rushFee = rushOrder ? 50 : 0;
    const subtotal = discountedPrice * quantity;
    const total = subtotal + setupFee + rushFee;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <Calculator className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-primary">Pricing Calculator</span>
                        </div>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Embroidery Pricing
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Get an instant quote for your embroidery project. Transparent pricing with no hidden fees.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Calculator */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Logo Size */}
                            <div className="card-3d p-6">
                                <Label className="text-lg font-semibold mb-4 block">Logo Size</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: "small", label: "Small", size: "Up to 3\"" },
                                        { id: "medium", label: "Medium", size: "3-4\"" },
                                        { id: "large", label: "Large", size: "4-6\"" }
                                    ].map(size => (
                                        <button
                                            key={size.id}
                                            onClick={() => setLogoSize(size.id)}
                                            className={`p-4 rounded-lg border-2 transition-all ${logoSize === size.id
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <p className="font-semibold">{size.label}</p>
                                            <p className="text-xs text-muted-foreground">{size.size}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Thread Colors */}
                            <div className="card-3d p-6">
                                <Label className="text-lg font-semibold mb-4 block">
                                    Number of Thread Colors
                                </Label>
                                <Slider
                                    value={[colorCount]}
                                    onValueChange={(value) => setColorCount(value[0])}
                                    min={1}
                                    max={6}
                                    step={1}
                                    className="mb-2"
                                />
                                <p className="text-sm text-muted-foreground">{colorCount} color{colorCount > 1 ? 's' : ''}</p>
                            </div>

                            {/* Quantity */}
                            <div className="card-3d p-6">
                                <Label className="text-lg font-semibold mb-4 block">Quantity</Label>
                                <Slider
                                    value={[quantity]}
                                    onValueChange={(value) => setQuantity(value[0])}
                                    min={10}
                                    max={500}
                                    step={5}
                                    className="mb-2"
                                />
                                <p className="text-sm text-muted-foreground">{quantity} items</p>

                                {/* Volume Discount Badge */}
                                {discount > 0 && (
                                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <p className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                                            <TrendingDown className="w-4 h-4" />
                                            {(discount * 100)}% Volume Discount Applied!
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Garment Type */}
                            <div className="card-3d p-6">
                                <Label className="text-lg font-semibold mb-4 block">Garment Type</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: "tshirt", label: "T-Shirt", price: "-£0.50" },
                                        { id: "polo", label: "Polo Shirt", price: "Standard" },
                                        { id: "hoodie", label: "Hoodie", price: "+£1.50" },
                                        { id: "jacket", label: "Jacket", price: "+£2.00" }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setGarmentType(type.id)}
                                            className={`p-4 rounded-lg border-2 transition-all ${garmentType === type.id
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <p className="font-semibold">{type.label}</p>
                                            <p className="text-xs text-muted-foreground">{type.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rush Order */}
                            <div className="card-3d p-6">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div>
                                        <p className="font-semibold">Rush Order (24-48 hours)</p>
                                        <p className="text-sm text-muted-foreground">+£50 rush fee</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={rushOrder}
                                        onChange={(e) => setRushOrder(e.target.checked)}
                                        className="w-5 h-5"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="card-3d p-6 sticky top-32">
                                <h3 className="font-display text-2xl font-bold mb-6">Price Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Base Price</span>
                                        <span className="font-semibold">£{pricePerItem.toFixed(2)}/item</span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                                            <span>Volume Discount ({(discount * 100)}%)</span>
                                            <span>-£{((pricePerItem - discountedPrice) * quantity).toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal ({quantity} items)</span>
                                        <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Setup Fee</span>
                                        <span className={setupFee === 0 ? "text-green-600 dark:text-green-400 font-semibold" : ""}>
                                            {setupFee === 0 ? "FREE" : `£${setupFee.toFixed(2)}`}
                                        </span>
                                    </div>

                                    {rushOrder && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Rush Fee</span>
                                            <span>£{rushFee.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-lg">Total</span>
                                            <span className="font-bold text-2xl text-primary">£{total.toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            £{discountedPrice.toFixed(2)} per item
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link to="/quote">
                                        <Button className="w-full" size="lg">
                                            Get This Quote
                                        </Button>
                                    </Link>
                                    <Link to="/embroidery-designer">
                                        <Button variant="outline" className="w-full">
                                            Design Your Logo
                                        </Button>
                                    </Link>
                                </div>

                                {/* Features */}
                                <div className="mt-6 pt-6 border-t space-y-2">
                                    <p className="text-sm font-semibold mb-3">Included:</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span>Free logo digitization</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span>Quality guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span>Free UK delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmbroideryPricing;
