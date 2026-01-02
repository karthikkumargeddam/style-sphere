// Fake review data generator

export type Review = {
    id: number;
    productId: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
};

const fakeNames = [
    "James Mitchell", "Sarah Thompson", "Michael Chen", "Emma Wilson", "David Brown",
    "Sophie Anderson", "Robert Taylor", "Olivia Martinez", "William Davis", "Charlotte Garcia",
    "Thomas Rodriguez", "Amelia Johnson", "Daniel Lee", "Isabella White", "Christopher Harris",
    "Mia Clark", "Matthew Lewis", "Ava Walker", "Andrew Hall", "Emily Allen",
    "Joshua Young", "Abigail King", "Ryan Wright", "Madison Scott", "Nicholas Green",
    "Elizabeth Adams", "Alexander Baker", "Grace Nelson", "Benjamin Carter", "Chloe Mitchell",
    "Samuel Turner", "Lily Phillips", "Joseph Campbell", "Ella Parker", "Jonathan Evans",
    "Hannah Edwards", "Brandon Collins", "Zoe Stewart", "Tyler Morris", "Natalie Rogers",
    "Kevin Reed", "Victoria Cook", "Jason Morgan", "Samantha Bell", "Aaron Murphy",
    "Rachel Bailey", "Eric Rivera", "Lauren Cooper", "Adam Richardson", "Ashley Cox"
];

const reviewTemplates = [
    {
        rating: 5,
        comments: [
            "Excellent quality! Exactly what I needed for work.",
            "Outstanding product. Very durable and comfortable.",
            "Best purchase I've made this year. Highly recommend!",
            "Perfect fit and great quality. Will buy again.",
            "Exceeded my expectations. Top-notch workwear!",
            "Brilliant product! My team loves them.",
            "Fantastic quality for the price. Very impressed.",
            "Superb! Exactly as described and fast delivery.",
            "Amazing quality. Worth every penny!",
            "Top quality product. My whole crew ordered them."
        ]
    },
    {
        rating: 4,
        comments: [
            "Good quality overall. Minor sizing issue but still great.",
            "Very good product. Would recommend with minor reservations.",
            "Solid workwear. Does the job well.",
            "Great value for money. Happy with purchase.",
            "Good quality, though delivery took a bit longer.",
            "Nice product. Comfortable and durable.",
            "Pretty good. Met most of my expectations.",
            "Quality is good. Sizing runs slightly large.",
            "Happy with this purchase. Good for the price.",
            "Decent product. Would buy again."
        ]
    },
    {
        rating: 3,
        comments: [
            "Average quality. Gets the job done.",
            "It's okay. Nothing special but functional.",
            "Decent for the price. Could be better.",
            "Acceptable quality. Met basic requirements.",
            "Fair product. Does what it says.",
            "Okay purchase. Not amazing but not bad.",
            "Reasonable quality for workwear.",
            "It's alright. Serves its purpose.",
            "Moderate quality. Acceptable for daily use.",
            "Standard workwear. Nothing to complain about."
        ]
    }
];

function getRandomDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
}

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateReviewsForProduct(productId: number, count: number): Review[] {
    const reviews: Review[] = [];
    const usedNames = new Set<string>();

    for (let i = 0; i < count; i++) {
        // Get unique name
        let userName = getRandomElement(fakeNames);
        while (usedNames.has(userName) && usedNames.size < fakeNames.length) {
            userName = getRandomElement(fakeNames);
        }
        usedNames.add(userName);

        // Weighted rating distribution (more 4-5 stars)
        const rand = Math.random();
        let ratingCategory: number;
        if (rand < 0.6) {
            ratingCategory = 0; // 5 stars (60%)
        } else if (rand < 0.9) {
            ratingCategory = 1; // 4 stars (30%)
        } else {
            ratingCategory = 2; // 3 stars (10%)
        }

        const template = reviewTemplates[ratingCategory];
        const comment = getRandomElement(template.comments);
        const daysAgo = Math.floor(Math.random() * 180); // Reviews from last 6 months
        const verified = Math.random() > 0.2; // 80% verified purchases

        reviews.push({
            id: productId * 1000 + i,
            productId,
            userName,
            rating: template.rating,
            date: getRandomDate(daysAgo),
            comment,
            verified
        });
    }

    // Sort by date (newest first)
    return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Generate reviews for all products (cache them)
const reviewsCache = new Map<number, Review[]>();

export function getProductReviews(productId: number, limit: number = 10): Review[] {
    if (!reviewsCache.has(productId)) {
        // Generate 5-20 reviews per product
        const reviewCount = Math.floor(Math.random() * 16) + 5;
        const reviews = generateReviewsForProduct(productId, reviewCount);
        reviewsCache.set(productId, reviews);
    }

    const allReviews = reviewsCache.get(productId) || [];
    return allReviews.slice(0, limit);
}

export function getReviewStats(productId: number): {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: { [key: number]: number };
} {
    const reviews = reviewsCache.get(productId) || generateReviewsForProduct(productId, 10);

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
        distribution[review.rating]++;
        totalRating += review.rating;
    });

    return {
        averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
        totalReviews: reviews.length,
        ratingDistribution: distribution
    };
}
