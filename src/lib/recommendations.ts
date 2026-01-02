import { getAllProducts, ProductSummary } from "./products";

export interface RecommendationOptions {
    limit?: number;
    excludeIds?: number[];
    category?: string;
    priceRange?: { min: number; max: number };
}

/**
 * Get similar products based on category and price range
 */
export function getSimilarProducts(
    productId: number,
    options: RecommendationOptions = {}
): ProductSummary[] {
    const { limit = 6, excludeIds = [] } = options;
    const allProducts = getAllProducts();
    const currentProduct = allProducts.find((p) => p.id === productId);

    if (!currentProduct) return [];

    const priceMin = currentProduct.price * 0.7;
    const priceMax = currentProduct.price * 1.3;

    return allProducts
        .filter((p) => {
            if (p.id === productId) return false;
            if (excludeIds.includes(p.id)) return false;
            if (p.category !== currentProduct.category) return false;
            if (p.price < priceMin || p.price > priceMax) return false;
            return true;
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

/**
 * Get frequently bought together products (simulated based on category)
 */
export function getFrequentlyBoughtTogether(
    productIds: number[],
    options: RecommendationOptions = {}
): ProductSummary[] {
    const { limit = 4, excludeIds = [] } = options;
    const allProducts = getAllProducts();

    if (productIds.length === 0) return [];

    // Get categories of products in cart
    const cartProducts = allProducts.filter((p) => productIds.includes(p.id));
    const categories = [...new Set(cartProducts.map((p) => p.category))];

    // Find complementary products from different categories
    const complementaryCategories = getComplementaryCategories(categories);

    return allProducts
        .filter((p) => {
            if (productIds.includes(p.id)) return false;
            if (excludeIds.includes(p.id)) return false;
            return complementaryCategories.includes(p.category);
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

/**
 * Get trending products based on rating and reviews
 */
export function getTrendingProducts(
    options: RecommendationOptions = {}
): ProductSummary[] {
    const { limit = 8, excludeIds = [], category } = options;
    const allProducts = getAllProducts();

    return allProducts
        .filter((p) => {
            if (excludeIds.includes(p.id)) return false;
            if (category && p.category !== category) return false;
            return true;
        })
        .sort((a, b) => {
            // Score based on rating and review count
            const scoreA = a.rating * Math.log(a.reviews + 1);
            const scoreB = b.rating * Math.log(b.reviews + 1);
            return scoreB - scoreA;
        })
        .slice(0, limit);
}

/**
 * Get personalized recommendations based on cart/wishlist
 */
export function getPersonalizedRecommendations(
    cartIds: number[],
    wishlistIds: number[],
    options: RecommendationOptions = {}
): ProductSummary[] {
    const { limit = 6, excludeIds = [] } = options;
    const allProducts = getAllProducts();

    const allUserProductIds = [...cartIds, ...wishlistIds];
    if (allUserProductIds.length === 0) {
        return getTrendingProducts({ limit, excludeIds });
    }

    // Get categories user is interested in
    const userProducts = allProducts.filter((p) =>
        allUserProductIds.includes(p.id)
    );
    const userCategories = [...new Set(userProducts.map((p) => p.category))];

    // Get average price range user prefers
    const avgPrice =
        userProducts.reduce((sum, p) => sum + p.price, 0) / userProducts.length;
    const priceMin = avgPrice * 0.5;
    const priceMax = avgPrice * 1.5;

    return allProducts
        .filter((p) => {
            if (allUserProductIds.includes(p.id)) return false;
            if (excludeIds.includes(p.id)) return false;
            if (!userCategories.includes(p.category)) return false;
            if (p.price < priceMin || p.price > priceMax) return false;
            return true;
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

/**
 * Get complementary product categories
 */
function getComplementaryCategories(categories: string[]): string[] {
    const complementaryMap: Record<string, string[]> = {
        "Safety Wear": ["PPE Equipment", "Work Trousers"],
        "Work Trousers": ["Safety Wear", "Polo Shirts"],
        "Polo Shirts": ["Work Trousers", "Workwear Bundles"],
        "PPE Equipment": ["Safety Wear", "Work Trousers"],
        "Hospital Bundles": ["Polo Shirts", "PPE Equipment"],
        "Workwear Bundles": ["Safety Wear", "Work Trousers", "Polo Shirts"],
    };

    const complementary = new Set<string>();
    categories.forEach((cat) => {
        const related = complementaryMap[cat] || [];
        related.forEach((r) => complementary.add(r));
    });

    return Array.from(complementary);
}

/**
 * Get products you may also like (combination of similar and trending)
 */
export function getYouMayAlsoLike(
    productId: number,
    options: RecommendationOptions = {}
): ProductSummary[] {
    const { limit = 6, excludeIds = [] } = options;

    // Mix of similar products and trending products
    const similar = getSimilarProducts(productId, { limit: limit / 2, excludeIds });
    const trending = getTrendingProducts({ limit: limit / 2, excludeIds: [...excludeIds, ...similar.map(p => p.id)] });

    return [...similar, ...trending].slice(0, limit);
}
