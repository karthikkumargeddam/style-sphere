// Mock review data for products
export interface Review {
    id: number;
    productId: number;
    userId: number;
    userName: string;
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    content: string;
    photos?: string[];
    verified: boolean;
    helpful: number;
    date: string;
}

export const mockReviews: Review[] = [
    {
        id: 1,
        productId: 1,
        userId: 101,
        userName: "John Smith",
        rating: 5,
        title: "Excellent quality and fit!",
        content: "These hi-vis jackets are fantastic. The material is durable, the reflective strips are bright, and the fit is perfect. Our entire team loves them. Highly recommend for construction work.",
        photos: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop"],
        verified: true,
        helpful: 24,
        date: "2024-12-20",
    },
    {
        id: 2,
        productId: 1,
        userId: 102,
        userName: "Sarah Johnson",
        rating: 4,
        title: "Great value for money",
        content: "Very pleased with these jackets. They're warm, visible, and well-made. Only minor issue is the sizing runs slightly large, so order one size down.",
        verified: true,
        helpful: 18,
        date: "2024-12-15",
    },
    {
        id: 3,
        productId: 1,
        userId: 103,
        userName: "Mike Davis",
        rating: 5,
        title: "Perfect for our construction site",
        content: "Ordered 50 of these for our crew. Everyone is happy with the quality and visibility. The reflective strips work great even in low light. Will order again!",
        photos: [
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
        ],
        verified: true,
        helpful: 32,
        date: "2024-12-10",
    },
    {
        id: 4,
        productId: 1,
        userId: 104,
        userName: "Emma Wilson",
        rating: 4,
        title: "Good quality, fast delivery",
        content: "Jacket arrived quickly and is exactly as described. Material feels durable and the pockets are useful. Very satisfied with the purchase.",
        verified: true,
        helpful: 12,
        date: "2024-12-05",
    },
    {
        id: 5,
        productId: 1,
        userId: 105,
        userName: "David Brown",
        rating: 3,
        title: "Decent but could be better",
        content: "The jacket is okay for the price. Reflective strips are good but the zipper feels a bit cheap. Does the job but not premium quality.",
        verified: false,
        helpful: 5,
        date: "2024-11-28",
    },
    // Product 2 reviews
    {
        id: 6,
        productId: 2,
        userId: 106,
        userName: "Lisa Anderson",
        rating: 5,
        title: "Best work trousers I've owned",
        content: "These trousers are incredibly comfortable and durable. The knee pads are a game-changer. After 3 months of daily use, they still look new!",
        photos: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop"],
        verified: true,
        helpful: 28,
        date: "2024-12-18",
    },
    {
        id: 7,
        productId: 2,
        userId: 107,
        userName: "Tom Harris",
        rating: 5,
        title: "Perfect fit and great pockets",
        content: "Love these trousers! Plenty of pockets for tools, comfortable waistband, and the reinforced knees are excellent. Worth every penny.",
        verified: true,
        helpful: 22,
        date: "2024-12-12",
    },
    {
        id: 8,
        productId: 2,
        userId: 108,
        userName: "Rachel Green",
        rating: 4,
        title: "Very good quality",
        content: "Great work trousers. Only downside is they're a bit long for shorter people, but overall excellent quality and value.",
        verified: true,
        helpful: 15,
        date: "2024-12-08",
    },
];

// Helper function to get reviews for a product
export const getProductReviews = (productId: number): Review[] => {
    return mockReviews.filter((review) => review.productId === productId);
};

// Helper function to calculate average rating
export const getAverageRating = (productId: number): number => {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
};

// Helper function to get total reviews count
export const getTotalReviews = (productId: number): number => {
    return getProductReviews(productId).length;
};
