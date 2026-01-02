import { Star, ThumbsUp, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
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

interface ProductReviewsProps {
    productId: number;
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    onWriteReview: () => void;
}

const StarRating = ({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${size} ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                />
            ))}
        </div>
    );
};

const ProductReviews = ({
    productId,
    reviews,
    averageRating,
    totalReviews,
    onWriteReview,
}: ProductReviewsProps) => {
    const [filter, setFilter] = useState<number | "all">("all");
    const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");
    const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

    const filteredReviews = reviews
        .filter((review) => filter === "all" || review.rating === filter)
        .sort((a, b) => {
            if (sortBy === "helpful") return b.helpful - a.helpful;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
    }));

    const handleHelpful = (reviewId: number) => {
        setHelpfulVotes((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
    };

    return (
        <div className="space-y-8">
            {/* Reviews Summary */}
            <div className="card-3d p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Customer Reviews
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                    {/* Average Rating */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-5xl font-bold text-foreground">
                                {averageRating.toFixed(1)}
                            </span>
                            <div>
                                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Based on {totalReviews} reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map(({ rating, count, percentage }) => (
                            <div key={rating} className="flex items-center gap-3">
                                <span className="text-sm font-medium w-12">{rating} star</span>
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-12 text-right">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button onClick={onWriteReview} variant="gold" className="w-full md:w-auto">
                    Write a Review
                </Button>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all"
                                ? "bg-primary text-white"
                                : "glass hover:bg-primary/20"
                            }`}
                    >
                        All Reviews
                    </button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setFilter(rating as 1 | 2 | 3 | 4 | 5)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === rating
                                    ? "bg-primary text-white"
                                    : "glass hover:bg-primary/20"
                                }`}
                        >
                            {rating} ⭐
                        </button>
                    ))}
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
                    className="glass px-4 py-2 rounded-lg text-sm font-medium"
                >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {filteredReviews.length === 0 ? (
                    <div className="card-3d p-12 text-center">
                        <p className="text-muted-foreground">No reviews match your filters.</p>
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="card-3d p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-semibold text-foreground">{review.userName}</span>
                                        {review.verified && (
                                            <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                                                <Check className="w-3 h-3" />
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>

                            <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>
                            <p className="text-muted-foreground mb-4">{review.content}</p>

                            {review.photos && review.photos.length > 0 && (
                                <div className="flex gap-2 mb-4">
                                    {review.photos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`Review photo ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <button
                                    onClick={() => handleHelpful(review.id)}
                                    className={`flex items-center gap-2 text-sm transition-colors ${helpfulVotes[review.id]
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
