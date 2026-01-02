import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProductSummary } from "@/lib/products";

interface ComparisonContextType {
    items: ProductSummary[];
    addToComparison: (product: ProductSummary) => void;
    removeFromComparison: (id: number) => void;
    clearComparison: () => void;
    isInComparison: (id: number) => boolean;
    isComparisonOpen: boolean;
    setIsComparisonOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const COMPARISON_STORAGE_KEY = "unifab-comparison";
const MAX_COMPARISON_ITEMS = 3;

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<ProductSummary[]>(() => {
        const stored = localStorage.getItem(COMPARISON_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToComparison = (product: ProductSummary) => {
        setItems((prev) => {
            if (prev.find((item) => item.id === product.id)) {
                return prev; // Already in comparison
            }
            if (prev.length >= MAX_COMPARISON_ITEMS) {
                return prev; // Max items reached
            }
            return [...prev, product];
        });
    };

    const removeFromComparison = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearComparison = () => {
        setItems([]);
    };

    const isInComparison = (id: number) => {
        return items.some((item) => item.id === id);
    };

    return (
        <ComparisonContext.Provider
            value={{
                items,
                addToComparison,
                removeFromComparison,
                clearComparison,
                isInComparison,
                isComparisonOpen,
                setIsComparisonOpen,
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error("useComparison must be used within a ComparisonProvider");
    }
    return context;
};
