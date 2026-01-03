import { ApplicationType, LogoPlacementPosition, calculatePlacementPrice, SHIPPING_CHARGE, EMBROIDERY_SETUP_FEES } from "@/types/customization";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck } from "lucide-react";

interface PricingCalculatorProps {
    applicationType: ApplicationType;
    setupOption: string;
    placements: LogoPlacementPosition[];
    additionalLogos?: number;
    isBundle?: boolean;
    bundleItemCount?: number;
    showShipping?: boolean;
}

const PricingCalculator = ({
    applicationType,
    setupOption,
    placements,
    additionalLogos = 0,
    isBundle = false,
    bundleItemCount = 1,
    showShipping = true,
}: PricingCalculatorProps) => {
    // Calculate setup fee
    const getSetupFee = (): number => {
        if (applicationType === 'EMBROIDERY') {
            if (setupOption === '1_to_10_items_15_fee') return EMBROIDERY_SETUP_FEES['1_to_10_items_15_fee'];
            if (setupOption === '10_plus_items_free') return EMBROIDERY_SETUP_FEES['10_plus_items_free'];
        }
        return 0;
    };

    // Calculate placement costs
    const placementCosts = placements.map(position => ({
        position,
        cost: calculatePlacementPrice(position, applicationType, isBundle, bundleItemCount),
    }));

    const totalPlacementCost = placementCosts.reduce((sum, p) => sum + p.cost, 0);
    const setupFee = getSetupFee();
    const additionalLogoCost = additionalLogos * 4; // Simplified, could be more detailed
    const shippingCost = showShipping ? SHIPPING_CHARGE : 0;

    const subtotal = totalPlacementCost + setupFee + additionalLogoCost;
    const total = subtotal + shippingCost;

    return (
        <div className="card-3d p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-lg">Pricing Summary</h4>
            </div>

            {/* Setup Fee */}
            {setupFee > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                        {applicationType} Setup Fee (one-time)
                    </span>
                    <span className="font-medium">£{setupFee.toFixed(2)}</span>
                </div>
            )}

            {/* Placement Costs */}
            {placementCosts.length > 0 && (
                <div className="space-y-2">
                    <div className="text-sm font-medium">Logo Placements:</div>
                    {placementCosts.map(({ position, cost }) => (
                        <div key={position} className="flex justify-between items-center pl-4">
                            <span className="text-sm text-muted-foreground capitalize">
                                {position.replace(/_/g, ' ')}
                                {isBundle && position === 'left_chest' && (
                                    <Badge className="ml-2 bg-green-500 text-white text-xs">FREE</Badge>
                                )}
                            </span>
                            <span className="font-medium">
                                {cost === 0 ? 'FREE' : `£${cost.toFixed(2)}`}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Additional Logos */}
            {additionalLogos > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                        Additional Logos ({additionalLogos})
                    </span>
                    <span className="font-medium">£{additionalLogoCost.toFixed(2)}</span>
                </div>
            )}

            {/* Subtotal */}
            {(setupFee > 0 || placementCosts.length > 0 || additionalLogos > 0) && (
                <>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Customization Subtotal</span>
                        <span className="font-semibold text-lg">£{subtotal.toFixed(2)}</span>
                    </div>
                </>
            )}

            {/* Shipping */}
            {showShipping && (
                <>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                Shipping (1-2 Business Days)
                            </span>
                        </div>
                        <span className="font-medium">£{shippingCost.toFixed(2)}</span>
                    </div>
                </>
            )}

            {/* Total */}
            <Separator className="border-primary/20" />
            <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">£{total.toFixed(2)}</span>
            </div>

            {/* Bundle Note */}
            {isBundle && bundleItemCount > 1 && (
                <div className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded-lg">
                    <strong>Note:</strong> Placement prices (except Left Chest) are multiplied by the number of items in your bundle ({bundleItemCount} items).
                </div>
            )}
        </div>
    );
};

export default PricingCalculator;
