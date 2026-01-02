import { AlertCircle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StockLevelIndicatorProps {
    stock: number;
    lowStockThreshold?: number;
    showExactCount?: boolean;
}

const StockLevelIndicator = ({
    stock,
    lowStockThreshold = 10,
    showExactCount = true
}: StockLevelIndicatorProps) => {
    const getStockStatus = () => {
        if (stock === 0) {
            return {
                label: "Out of Stock",
                color: "bg-red-500",
                textColor: "text-red-600",
                icon: AlertCircle,
                showCount: false
            };
        }
        if (stock <= lowStockThreshold) {
            return {
                label: `Only ${stock} left in stock!`,
                color: "bg-orange-500",
                textColor: "text-orange-600",
                icon: AlertCircle,
                showCount: true,
                urgent: true
            };
        }
        if (stock <= 50) {
            return {
                label: "Low Stock",
                color: "bg-yellow-500",
                textColor: "text-yellow-600",
                icon: Package,
                showCount: showExactCount
            };
        }
        return {
            label: "In Stock",
            color: "bg-green-500",
            textColor: "text-green-600",
            icon: Package,
            showCount: false
        };
    };

    const status = getStockStatus();
    const Icon = status.icon;

    if (stock === 0) {
        return (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                    <p className="font-semibold text-red-600 dark:text-red-400">Out of Stock</p>
                    <p className="text-xs text-red-500 dark:text-red-400">Notify me when available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* Stock Badge */}
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status.color} ${status.urgent ? 'animate-pulse' : ''}`} />
                <span className={`text-sm font-medium ${status.textColor}`}>
                    {status.showCount && showExactCount ? `Only ${stock} left` : status.label}
                </span>
            </div>

            {/* Urgency Message */}
            {status.urgent && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <p className="text-xs text-orange-700 dark:text-orange-400">
                        High demand! Order soon to avoid missing out
                    </p>
                </div>
            )}

            {/* Stock Progress Bar */}
            {stock > 0 && stock <= 50 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all ${stock <= lowStockThreshold ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}
                        style={{ width: `${Math.min((stock / 50) * 100, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default StockLevelIndicator;
