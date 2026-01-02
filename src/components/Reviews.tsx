import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductReviews, getReviewStats } from "@/lib/reviews";

const Reviews = ({ productId }: { productId: number }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState<string>("");

  // Get fake reviews
  const reviews = getProductReviews(productId, 10);
  const stats = getReviewStats(productId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to submit a review");
      return;
    }
    if (!content.trim()) {
      toast.error("Please write a review");
      return;
    }

    toast.success("Review submitted successfully!");
    setContent("");
    setRating(5);
  };

  return (
    <div className="mt-12">
      <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Customer Reviews</h3>

      {/* Rating Summary */}
      <div className="card-3d p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center md:border-r border-border md:pr-8">
            <div className="text-5xl font-bold text-foreground mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(stats.averageRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                    }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {stats.totalReviews} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.ratingDistribution[star] || 0;
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      <form onSubmit={handleSubmit} className="card-3d p-6 mb-8">
        <h4 className="font-semibold text-lg mb-4">Write a Review</h4>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm font-medium text-foreground">Your rating:</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with this product..."
          className="w-full border border-border rounded-md p-4 mb-4 h-32 bg-background text-foreground placeholder:text-muted-foreground resize-none"
        />
        <div className="flex items-center gap-3">
          <Button type="submit" variant="gold">
            Submit Review
          </Button>
          {!user && (
            <div className="text-sm text-muted-foreground">Sign in to post a review.</div>
          )}
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="card-industrial p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-depth-md">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-foreground">{review.userName}</div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
