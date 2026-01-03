import { useState } from "react";
import { ShoppingCart, Check, Sparkles, Package2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import LogoCustomizer from "@/components/LogoCustomizer";
import { LogoPlacementPosition } from "@/types/customization";

interface BundleOption {
    id: string;
    name: string;
    quantity: number;
    image: string;
}

interface EmbroideryArea {
    id: string;
    name: string;
    icon: string;
}

const BUNDLE_OPTIONS = {
    pick5: [
        { id: "5tshirts", name: "5 T-shirts", quantity: 5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" },
        { id: "5polo", name: "5 Polo", quantity: 5, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=200&q=80" },
        { id: "2t3polo", name: "2 T-shirts 3 Polo", quantity: 5, image: "https://images.unsplash.com/photo-1598032895397-b9c259f93c0c?w=200&q=80" },
        { id: "2polo3t", name: "2 Polo 3 T-shirts", quantity: 5, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80" },
    ],
    pick2: [
        { id: "2sweatshirts", name: "2 Sweatshirts", quantity: 2, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80" },
        { id: "2hoodies", name: "2 Hoodies", quantity: 2, image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=200&q=80" },
        { id: "2zipsweat", name: "2 1/4 Zip Sweatshirts", quantity: 2, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&q=80" },
        { id: "2fullzip", name: "2 Full Zip Sweatshirts", quantity: 2, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80" },
        { id: "2polosweat", name: "2 Polo Sweatshirts", quantity: 2, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80" },
        { id: "1h1s", name: "1 Hoodie 1 Sweatshirt", quantity: 2, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80" },
        { id: "1h1ps", name: "1 Hoodie 1 Polo Sweatshirt", quantity: 2, image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=200&q=80" },
        { id: "1s1fz", name: "1 Sweatshirt 1 Full Zip Sweatshirt", quantity: 2, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&q=80" },
    ],
    pick1: [
        { id: "softshell", name: "1 Softshell Jacket", quantity: 1, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" },
        { id: "padded", name: "1 Padded Softshell Jacket", quantity: 1, image: "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=200&q=80" },
    ],
};

const EMBROIDERY_AREAS: EmbroideryArea[] = [
    { id: "left-chest", name: "Left Chest", icon: "👕" },
    { id: "right-chest", name: "Right Chest", icon: "👔" },
    { id: "back", name: "Back", icon: "🎽" },
    { id: "sleeve", name: "Sleeve", icon: "💪" },
    { id: "custom", name: "Custom", icon: "✨" },
];

// Map embroidery area IDs to LogoPlacementPosition
const mapAreaToPlacement = (areaId: string): LogoPlacementPosition | undefined => {
    const mapping: Record<string, LogoPlacementPosition> = {
        "left-chest": "left_chest",
        "right-chest": "right_chest",
        "back": "large_back",
        "sleeve": "left_sleeve", // Default to left sleeve
        "custom": "left_chest" // Default to left chest for custom
    };
    return mapping[areaId];
};

export const AdvancedBundleBuilder = () => {
    const [selectedPick5, setSelectedPick5] = useState<string | null>(null);
    const [selectedPick2, setSelectedPick2] = useState<string | null>(null);
    const [selectedPick1, setSelectedPick1] = useState<string | null>(null);
    const [selectedEmbroidery, setSelectedEmbroidery] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showLogoCustomizer, setShowLogoCustomizer] = useState(false);
    const [currentEmbroideryArea, setCurrentEmbroideryArea] = useState<string | null>(null);
    const [logoData, setLogoData] = useState<any>(null);
    const { toast } = useToast();
    const { addItem } = useCart();

    const basePrice = 169;
    // Calculate customization cost from logoData
    const customizationCost = logoData?.totalCustomizationCost || 0;
    const totalPrice = (basePrice + customizationCost) * quantity;

    const handleAddToCart = () => {
        if (!selectedPick5 || !selectedPick2 || !selectedPick1) {
            toast({
                title: "Incomplete Selection",
                description: "Please select one option from each Pick section",
                variant: "destructive",
            });
            return;
        }

        if (selectedEmbroidery.length === 0) {
            toast({
                title: "Choose Embroidery Area",
                description: "Please select at least one embroidery area",
                variant: "destructive",
            });
            return;
        }

        // Get selected option names
        const pick5Option = BUNDLE_OPTIONS.pick5.find(o => o.id === selectedPick5);
        const pick2Option = BUNDLE_OPTIONS.pick2.find(o => o.id === selectedPick2);
        const pick1Option = BUNDLE_OPTIONS.pick1.find(o => o.id === selectedPick1);

        // Create bundle description
        const bundleDescription = `${pick5Option?.name}, ${pick2Option?.name}, ${pick1Option?.name}`;
        const embroideryAreas = selectedEmbroidery.map(id =>
            EMBROIDERY_AREAS.find(area => area.id === id)?.name
        ).join(", ");

        // Add to cart
        addItem({
            id: Date.now(), // Unique ID for each custom bundle (timestamp as number)
            name: "Prime Mix and Match Bundle",
            price: totalPrice,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
            category: "Custom Bundles"
        });

        toast({
            title: "Bundle Added to Cart!",
            description: `Prime Mix and Match Bundle (×${quantity}) added successfully`,
        });

        // Reset form
        setSelectedPick5(null);
        setSelectedPick2(null);
        setSelectedPick1(null);
        setSelectedEmbroidery([]);
        setAdditionalInfo("");
        setQuantity(1);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Product Image */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
                                alt="Bundle Preview"
                                className="w-full rounded-lg shadow-2xl"
                            />
                            <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-4 py-2">
                                FROM £{basePrice} +VAT
                            </Badge>
                            <Badge className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1">
                                FREE DELIVERY
                            </Badge>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>Left Chest Logo Embroidered Included</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                <span>Premium Quality Workwear</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Package2 className="w-5 h-5 text-blue-500" />
                                <span>Mix & Match Your Perfect Bundle</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Right Side - Selection Options */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Prime Mix and Match Bundle
                    </h2>
                    <p className="text-muted-foreground">
                        Create your perfect workwear bundle with our mix and match options
                    </p>
                </div>

                {/* Pick 5 Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Pick 5</h3>
                        <Badge variant="destructive">Required</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {BUNDLE_OPTIONS.pick5.map((option) => (
                            <Card
                                key={option.id}
                                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedPick5 === option.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-accent"
                                    }`}
                                onClick={() => setSelectedPick5(option.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedPick5 === option.id}
                                        className="pointer-events-none"
                                    />
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{option.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {option.quantity} items
                                        </p>
                                    </div>
                                    {selectedPick5 === option.id && (
                                        <Check className="w-5 h-5 text-primary" />
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pick 2 Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Pick 2</h3>
                        <Badge variant="destructive">Required</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {BUNDLE_OPTIONS.pick2.map((option) => (
                            <Card
                                key={option.id}
                                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedPick2 === option.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-accent"
                                    }`}
                                onClick={() => setSelectedPick2(option.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedPick2 === option.id}
                                        className="pointer-events-none"
                                    />
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{option.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {option.quantity} items
                                        </p>
                                    </div>
                                    {selectedPick2 === option.id && (
                                        <Check className="w-5 h-5 text-primary" />
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pick 1 Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Pick 1</h3>
                        <Badge variant="destructive">Required</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {BUNDLE_OPTIONS.pick1.map((option) => (
                            <Card
                                key={option.id}
                                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedPick1 === option.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-accent"
                                    }`}
                                onClick={() => setSelectedPick1(option.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedPick1 === option.id}
                                        className="pointer-events-none"
                                    />
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{option.name}</p>
                                    </div>
                                    {selectedPick1 === option.id && (
                                        <Check className="w-5 h-5 text-primary" />
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Embroidery Area Selection */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Choose Embroidery Area</h3>
                        <Badge variant="destructive">Required</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {EMBROIDERY_AREAS.map((area) => (
                            <Card
                                key={area.id}
                                className={`p-4 cursor-pointer transition-all hover:shadow-lg text-center ${selectedEmbroidery.includes(area.id)
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-accent"
                                    }`}
                                onClick={() => {
                                    // Set the current area being customized
                                    setCurrentEmbroideryArea(area.id);
                                    // Open logo customizer for any embroidery area
                                    setShowLogoCustomizer(true);
                                    // Also select it
                                    if (!selectedEmbroidery.includes(area.id)) {
                                        setSelectedEmbroidery((prev) => [...prev, area.id]);
                                    }
                                }}
                            >
                                <div className="text-4xl mb-2">{area.icon}</div>
                                <p className="text-xs font-medium">{area.name}</p>
                                {selectedEmbroidery.includes(area.id) && (
                                    <Check className="w-4 h-4 text-primary mx-auto mt-2" />
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Additional Info</h3>
                        <Info className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Textarea
                        placeholder="Add any special instructions, logo details, or customization requests..."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>

                {/* Quantity and Add to Cart */}
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Label className="text-lg font-bold">Quantity</Label>
                            <div className="flex items-center gap-3 mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </Button>
                                <span className="text-2xl font-bold w-12 text-center">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Price</p>
                            {customizationCost > 0 && (
                                <div className="text-xs text-muted-foreground mb-1">
                                    <div>Base: £{(basePrice * quantity).toFixed(2)}</div>
                                    <div>Customization: £{(customizationCost * quantity).toFixed(2)}</div>
                                </div>
                            )}
                            <p className="text-3xl font-bold text-primary">
                                £{totalPrice.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">+VAT</p>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        className="w-full text-lg"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add Bundle to Cart
                    </Button>
                </Card>
            </div>

            {/* Logo Customizer Dialog */}
            <Dialog open={showLogoCustomizer} onOpenChange={setShowLogoCustomizer}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Customize Logo - {currentEmbroideryArea
                                ? EMBROIDERY_AREAS.find(a => a.id === currentEmbroideryArea)?.name
                                : 'Embroidery'}
                        </DialogTitle>
                        <DialogDescription>
                            Upload your logo and customize the embroidery details for the {currentEmbroideryArea
                                ? EMBROIDERY_AREAS.find(a => a.id === currentEmbroideryArea)?.name.toLowerCase()
                                : 'selected area'}
                        </DialogDescription>
                    </DialogHeader>
                    <LogoCustomizer
                        onLogoChange={setLogoData}
                        isBundle={true}
                        bundleItemCount={8}
                        defaultPlacement={currentEmbroideryArea ? mapAreaToPlacement(currentEmbroideryArea) : undefined}
                        onComplete={() => setShowLogoCustomizer(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
