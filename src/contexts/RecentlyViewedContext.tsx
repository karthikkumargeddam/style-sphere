import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RecentlyViewedProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
    timestamp: number;
}

interface RecentlyViewedContextType {
    recentlyViewed: RecentlyViewedProduct[];
    addToRecentlyViewed: (product: Omit<RecentlyViewedProduct, "timestamp">) => void;
    clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const useRecentlyViewed = () => {
    const context = useContext(RecentlyViewedContext);
    if (!context) {
        throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
    }
    return context;
};

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
    const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            try {
                setRecentlyViewed(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse recently viewed:", e);
            }
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToRecentlyViewed = (product: Omit<RecentlyViewedProduct, "timestamp">) => {
        setRecentlyViewed((prev) => {
            // Remove if already exists
            const filtered = prev.filter((p) => p.id !== product.id);

            // Add to beginning with timestamp
            const updated = [
                { ...product, timestamp: Date.now() },
                ...filtered,
            ];

            // Keep only last 10
            return updated.slice(0, 10);
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
        localStorage.removeItem("recentlyViewed");
    };

    return (
        <RecentlyViewedContext.Provider
            value={{
                recentlyViewed,
                addToRecentlyViewed,
                clearRecentlyViewed,
            }}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
};
