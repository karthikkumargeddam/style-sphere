import { AlertCircle, Package } from "lucide-react";

interface StockIndicatorProps {
    stock: number;
    threshold?: number;
}

const StockIndicator = ({ stock, threshold = 10 }: StockIndicatorProps) => {
    if (stock === 0) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-destructive/20 text-destructive rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Out of Stock</span>
            </div>
        );
    }

    if (stock <= threshold) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-500 rounded-lg animate-pulse">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Only {stock} left in stock!</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">In Stock</span>
        </div>
    );
};

export default StockIndicator;
