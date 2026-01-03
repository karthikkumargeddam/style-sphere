import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface BundleItem {
    category: string;
    name: string;
    itemCode?: string; // Added item code
    sizes: string[];
    colors: string[];
    image: string;
}

interface BundleProductSelectorProps {
    items: BundleItem[];
    onSelectionChange: (selections: any) => void;
}

const BundleProductSelector = ({ items, onSelectionChange }: BundleProductSelectorProps) => {
    const [selections, setSelections] = useState<Record<string, { size: string; color: string; quantity: number }>>({});

    const categories = [...new Set(items.map(item => item.category))];

    const handleSizeChange = (itemName: string, size: string) => {
        const newSelections = {
            ...selections,
            [itemName]: { ...selections[itemName], size, color: selections[itemName]?.color || '', quantity: selections[itemName]?.quantity || 1 }
        };
        setSelections(newSelections);
        onSelectionChange(newSelections);
    };

    const handleColorChange = (itemName: string, color: string) => {
        const newSelections = {
            ...selections,
            [itemName]: { ...selections[itemName], color, size: selections[itemName]?.size || '', quantity: selections[itemName]?.quantity || 1 }
        };
        setSelections(newSelections);
        onSelectionChange(newSelections);
    };

    const handleQuantityChange = (itemName: string, quantity: number) => {
        const newSelections = {
            ...selections,
            [itemName]: { ...selections[itemName], quantity, size: selections[itemName]?.size || '', color: selections[itemName]?.color || '' }
        };
        setSelections(newSelections);
        onSelectionChange(newSelections);
    };

    return (
        <div className="card-3d p-6">
            <h3 className="font-display text-2xl font-bold mb-2">Start Your Order Here</h3>
            <p className="text-muted-foreground mb-6">
                Select size, color, and quantity for each item in your bundle
            </p>

            <Tabs defaultValue={categories[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    {categories.map(category => (
                        <TabsTrigger key={category} value={category}>
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map(category => {
                    const categoryItems = items.filter(item => item.category === category);

                    return (
                        <TabsContent key={category} value={category} className="space-y-6">
                            {categoryItems.map((item, index) => (
                                <div key={item.name} className="border rounded-lg p-4 hover:border-primary transition-colors">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-lg">{item.name}</h4>
                                                    {item.itemCode && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Item Code: <span className="font-mono font-medium">{item.itemCode}</span>
                                                        </p>
                                                    )}
                                                    <Badge variant="outline" className="mt-1">
                                                        Item {index + 1}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Size, Color, and Quantity Selectors */}
                                            <div className="grid grid-cols-3 gap-3">
                                                {/* Size Selector */}
                                                <div>
                                                    <Label className="text-sm mb-2 block">Size</Label>
                                                    <Select
                                                        onValueChange={(value) => handleSizeChange(item.name, value)}
                                                        defaultValue={item.sizes[0]}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select size" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {item.sizes.map(size => (
                                                                <SelectItem key={size} value={size}>
                                                                    {size}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Color Selector */}
                                                <div>
                                                    <Label className="text-sm mb-2 block">Color</Label>
                                                    <Select
                                                        onValueChange={(value) => handleColorChange(item.name, value)}
                                                        defaultValue={item.colors[0]}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {item.colors.map(color => (
                                                                <SelectItem key={color} value={color}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="w-4 h-4 rounded-full border"
                                                                            style={{ backgroundColor: color.toLowerCase() }}
                                                                        />
                                                                        {color}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Quantity Selector */}
                                                <div>
                                                    <Label className="text-sm mb-2 block">Quantity</Label>
                                                    <Select
                                                        onValueChange={(value) => handleQuantityChange(item.name, parseInt(value))}
                                                        defaultValue="1"
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Qty" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[1, 2, 3, 4, 5, 10, 15, 20].map(qty => (
                                                                <SelectItem key={qty} value={qty.toString()}>
                                                                    {qty}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default BundleProductSelector;
