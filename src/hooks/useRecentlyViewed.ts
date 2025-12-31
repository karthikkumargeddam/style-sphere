import { useState, useEffect, useCallback } from "react";

interface RecentlyViewedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

const STORAGE_KEY = "unifab-recently-viewed";
const MAX_ITEMS = 8;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = useCallback((product: Omit<RecentlyViewedProduct, "viewedAt">) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id);
      
      // Add to beginning with timestamp
      const updated = [
        { ...product, viewedAt: Date.now() },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};
