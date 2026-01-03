import { useState } from "react";
import { LogoPlacementPosition, ApplicationType, calculatePlacementPrice, getPlacementLabel } from "@/types/customization";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface LogoPlacementSelectorProps {
    selectedPlacements: LogoPlacementPosition[];
    onChange: (placements: LogoPlacementPosition[]) => void;
    applicationType: ApplicationType;
    isBundle?: boolean;
    bundleItemCount?: number;
}

const LogoPlacementSelector = ({
    selectedPlacements,
    onChange,
    applicationType,
    isBundle = false,
    bundleItemCount = 1,
}: LogoPlacementSelectorProps) => {
    const placements: { position: LogoPlacementPosition; label: string; description: string }[] = [
        { position: 'left_chest', label: 'Left Chest', description: 'Classic logo position' },
        { position: 'right_chest', label: 'Right Chest', description: 'Alternative chest position' },
        { position: 'left_sleeve', label: 'Left Sleeve', description: 'Sleeve branding' },
        { position: 'right_sleeve', label: 'Right Sleeve', description: 'Sleeve branding' },
        { position: 'large_front', label: 'Large Front', description: 'Bold front design' },
        { position: 'large_back', label: 'Large Back', description: 'Bold back design' },
    ];

    const togglePlacement = (position: LogoPlacementPosition) => {
        if (selectedPlacements.includes(position)) {
            onChange(selectedPlacements.filter(p => p !== position));
        } else {
            onChange([...selectedPlacements, position]);
        }
    };

    const getPrice = (position: LogoPlacementPosition): number => {
        return calculatePlacementPrice(position, applicationType, isBundle, bundleItemCount);
    };

    const isFree = (position: LogoPlacementPosition): boolean => {
        return isBundle && position === 'left_chest';
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg mb-2">Logo Placement</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    Select where you'd like your logo to appear on the garment
                    {isBundle && (
                        <span className="block mt-1 text-primary font-medium">
                            Left Chest placement is FREE for bundles!
                        </span>
                    )}
                </p>
            </div>

            {/* Visual Garment Diagram */}
            <div className="relative bg-secondary/20 rounded-lg p-8">
                <div className="max-w-md mx-auto">
                    {/* T-shirt SVG representation */}
                    <svg viewBox="0 0 300 400" className="w-full h-auto">
                        {/* T-shirt outline */}
                        <path
                            d="M 50 80 L 50 50 L 100 50 L 120 30 L 180 30 L 200 50 L 250 50 L 250 80 L 230 100 L 230 350 L 70 350 L 70 100 Z"
                            fill="currentColor"
                            className="text-background"
                            stroke="currentColor"
                            strokeWidth="2"
                        />

                        {/* Clickable placement zones */}
                        {/* Left Chest */}
                        <g
                            onClick={() => togglePlacement('left_chest')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="110" y="100" width="50" height="40" fill={selectedPlacements.includes('left_chest') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="135" y="125" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">LC</text>
                        </g>

                        {/* Right Chest */}
                        <g
                            onClick={() => togglePlacement('right_chest')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="140" y="100" width="50" height="40" fill={selectedPlacements.includes('right_chest') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="165" y="125" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">RC</text>
                        </g>

                        {/* Left Sleeve */}
                        <g
                            onClick={() => togglePlacement('left_sleeve')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="60" y="80" width="30" height="40" fill={selectedPlacements.includes('left_sleeve') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="75" y="105" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">LS</text>
                        </g>

                        {/* Right Sleeve */}
                        <g
                            onClick={() => togglePlacement('right_sleeve')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="210" y="80" width="30" height="40" fill={selectedPlacements.includes('right_sleeve') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="225" y="105" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">RS</text>
                        </g>

                        {/* Large Front */}
                        <g
                            onClick={() => togglePlacement('large_front')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="110" y="160" width="80" height="80" fill={selectedPlacements.includes('large_front') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="150" y="205" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">FRONT</text>
                        </g>

                        {/* Large Back */}
                        <g
                            onClick={() => togglePlacement('large_back')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <rect x="110" y="260" width="80" height="60" fill={selectedPlacements.includes('large_back') ? '#0ea5e9' : '#94a3b8'} opacity="0.6" rx="4" />
                            <text x="150" y="295" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">BACK</text>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Placement Options List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {placements.map(({ position, label, description }) => {
                    const price = getPrice(position);
                    const free = isFree(position);
                    const isSelected = selectedPlacements.includes(position);

                    return (
                        <button
                            key={position}
                            type="button"
                            onClick={() => togglePlacement(position)}
                            className={`flex items-start gap-3 p-4 border-2 rounded-lg text-left transition-all ${isSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'border-primary bg-primary' : 'border-border'
                                }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{label}</span>
                                    {free ? (
                                        <Badge className="bg-green-500 text-white">FREE</Badge>
                                    ) : (
                                        <span className="text-sm font-semibold text-primary">
                                            £{price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">{description}</p>
                                {isBundle && !free && bundleItemCount > 1 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        £{(price / bundleItemCount).toFixed(2)} × {bundleItemCount} items
                                    </p>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected Placements Summary */}
            {selectedPlacements.length > 0 && (
                <div className="border-t pt-4">
                    <h5 className="font-medium mb-2">Selected Placements:</h5>
                    <div className="flex flex-wrap gap-2">
                        {selectedPlacements.map(position => (
                            <Badge key={position} variant="secondary" className="text-sm">
                                {getPlacementLabel(position)}
                                {isFree(position) ? ' (FREE)' : ` - £${getPrice(position).toFixed(2)}`}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoPlacementSelector;
