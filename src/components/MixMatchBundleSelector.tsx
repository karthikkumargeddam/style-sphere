import { useState, useEffect } from "react";
import { BundleItemSelection, MixMatchSelection } from "@/types/customization";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, AlertCircle } from "lucide-react";

interface MixMatchOption {
    itemName: string;
    itemCode: string;
    sizes: string[];
    colors: string[];
    image: string;
}

interface MixMatchBundleSelectorProps {
    pickLabel: string; // e.g., "PICK 5"
    requiredCount: number;
    availableItems: MixMatchOption[];
    onSelectionChange: (selection: MixMatchSelection) => void;
}

const MixMatchBundleSelector = ({
    pickLabel,
    requiredCount,
    availableItems,
    onSelectionChange,
}: MixMatchBundleSelectorProps) => {
    const [selectedItems, setSelectedItems] = useState<BundleItemSelection[]>([]);

    useEffect(() => {
        onSelectionChange({
            pickLabel,
            requiredCount,
            selectedItems,
        });
    }, [selectedItems, pickLabel, requiredCount]);

    const handleItemSelect = (index: number, itemName: string, itemCode: string) => {
        const newSelections = [...selectedItems];
        const item = availableItems.find(i => i.itemCode === itemCode);

        if (item) {
            newSelections[index] = {
                itemName,
                itemCode,
                size: item.sizes[0] || '',
                color: item.colors[0] || '',
                quantity: 1,
            };
            setSelectedItems(newSelections);
        }
    };

    const handleSizeChange = (index: number, size: string) => {
        const newSelections = [...selectedItems];
        if (newSelections[index]) {
            newSelections[index].size = size;
            setSelectedItems(newSelections);
        }
    };

    const handleColorChange = (index: number, color: string) => {
        const newSelections = [...selectedItems];
        if (newSelections[index]) {
            newSelections[index].color = color;
            setSelectedItems(newSelections);
        }
    };

    const handleQuantityChange = (index: number, quantity: number) => {
        const newSelections = [...selectedItems];
        if (newSelections[index]) {
            newSelections[index].quantity = quantity;
            setSelectedItems(newSelections);
        }
    };

    const progress = (selectedItems.filter(item => item).length / requiredCount) * 100;
    const isComplete = selectedItems.filter(item => item).length === requiredCount;

    return (
        <div className="card-3d p-6 space-y-6">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-2xl font-bold">{pickLabel}</h3>
                    <Badge variant={isComplete ? "default" : "secondary"} className="text-sm">
                        {selectedItems.filter(item => item).length} / {requiredCount} selected
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Select {requiredCount} items from the available options below
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    {!isComplete && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <AlertCircle className="w-3 h-3" />
                            <span>Please select {requiredCount - selectedItems.filter(item => item).length} more item(s)</span>
                        </div>
                    )}
                    {isComplete && (
                        <div className="flex items-center gap-2 text-xs text-green-600">
                            <Check className="w-3 h-3" />
                            <span>Selection complete!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Item Selectors */}
            <div className="space-y-4">
                {Array.from({ length: requiredCount }).map((_, index) => {
                    const selection = selectedItems[index];
                    const selectedItem = selection ? availableItems.find(i => i.itemCode === selection.itemCode) : null;

                    return (
                        <div key={index} className="border-2 border-border rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline">Item {index + 1}</Badge>
                                {selection && <Check className="w-4 h-4 text-green-600" />}
                            </div>

                            {/* Item Selection */}
                            <div>
                                <Label className="text-sm mb-2 block">Select Item</Label>
                                <Select
                                    value={selection?.itemCode || ''}
                                    onValueChange={(value) => {
                                        const item = availableItems.find(i => i.itemCode === value);
                                        if (item) {
                                            handleItemSelect(index, item.itemName, item.itemCode);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose an item..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableItems.map((item) => (
                                            <SelectItem key={item.itemCode} value={item.itemCode}>
                                                {item.itemName} - {item.itemCode}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Size, Color, Quantity - only show if item is selected */}
                            {selection && selectedItem && (
                                <div className="grid grid-cols-3 gap-3">
                                    {/* Size */}
                                    <div>
                                        <Label className="text-xs mb-1 block">Size</Label>
                                        <Select
                                            value={selection.size}
                                            onValueChange={(value) => handleSizeChange(index, value)}
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedItem.sizes.map((size) => (
                                                    <SelectItem key={size} value={size}>
                                                        {size}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Color */}
                                    <div>
                                        <Label className="text-xs mb-1 block">Color</Label>
                                        <Select
                                            value={selection.color}
                                            onValueChange={(value) => handleColorChange(index, value)}
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedItem.colors.map((color) => (
                                                    <SelectItem key={color} value={color}>
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <Label className="text-xs mb-1 block">Qty</Label>
                                        <Select
                                            value={selection.quantity.toString()}
                                            onValueChange={(value) => handleQuantityChange(index, parseInt(value))}
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5].map((qty) => (
                                                    <SelectItem key={qty} value={qty.toString()}>
                                                        {qty}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MixMatchBundleSelector;
