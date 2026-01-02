import { supabase } from '@/lib/supabase';

export interface Review {
    id: number;
    userId: string;
    productId: number;
    orderId?: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    sizePurchased?: string;
    fitRating?: 'runs_small' | 'true_to_size' | 'runs_large';
    verifiedPurchase: boolean;
    helpfulCount: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

/**
 * Get reviews for a product
 */
export async function getProductReviews(productId: number, filters?: {
    rating?: number;
    sortBy?: 'recent' | 'helpful' | 'rating-high' | 'rating-low';
    limit?: number;
}) {
    try {
        let query = supabase
            .from('reviews')
            .select(`
        *,
        users (full_name)
      `)
            .eq('product_id', productId)
            .eq('status', 'approved');

        if (filters?.rating) {
            query = query.eq('rating', filters.rating);
        }

        // Sorting
        if (filters?.sortBy === 'recent') {
            query = query.order('created_at', { ascending: false });
        } else if (filters?.sortBy === 'helpful') {
            query = query.order('helpful_count', { ascending: false });
        } else if (filters?.sortBy === 'rating-high') {
            query = query.order('rating', { ascending: false });
        } else if (filters?.sortBy === 'rating-low') {
            query = query.order('rating', { ascending: true });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        if (filters?.limit) {
            query = query.limit(filters.limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}

/**
 * Create a new review
 */
export async function createReview(reviewData: {
    userId: string;
    productId: number;
    orderId?: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    sizePurchased?: string;
    fitRating?: 'runs_small' | 'true_to_size' | 'runs_large';
}) {
    try {
        // Check if user has purchased the product
        let verifiedPurchase = false;
        if (reviewData.orderId) {
            const { data: orderItem } = await supabase
                .from('order_items')
                .select('id')
                .eq('order_id', reviewData.orderId)
                .eq('product_id', reviewData.productId)
                .single();

            verifiedPurchase = !!orderItem;
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert({
                user_id: reviewData.userId,
                product_id: reviewData.productId,
                order_id: reviewData.orderId,
                rating: reviewData.rating,
                title: reviewData.title,
                content: reviewData.content,
                images: reviewData.images || [],
                size_purchased: reviewData.sizePurchased,
                fit_rating: reviewData.fitRating,
                verified_purchase: verifiedPurchase,
                status: 'approved' // Auto-approve for now, can add moderation later
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: number) {
    try {
        const { data: review } = await supabase
            .from('reviews')
            .select('helpful_count')
            .eq('id', reviewId)
            .single();

        if (!review) throw new Error('Review not found');

        const { data, error } = await supabase
            .from('reviews')
            .update({ helpful_count: review.helpful_count + 1 })
            .eq('id', reviewId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error marking review helpful:', error);
        throw error;
    }
}

/**
 * Get review statistics for a product
 */
export async function getReviewStats(productId: number) {
    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('rating')
            .eq('product_id', productId)
            .eq('status', 'approved');

        if (error) throw error;

        const totalReviews = reviews?.length || 0;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0;

        const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
            rating,
            count: reviews?.filter(r => r.rating === rating).length || 0,
            percentage: totalReviews > 0
                ? ((reviews?.filter(r => r.rating === rating).length || 0) / totalReviews) * 100
                : 0
        }));

        return {
            totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            ratingDistribution
        };
    } catch (error) {
        console.error('Error fetching review stats:', error);
        throw error;
    }
}

/**
 * Get pending reviews (Admin only)
 */
export async function getPendingReviews() {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
        *,
        users (full_name, email),
        products (name)
      `)
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching pending reviews:', error);
        throw error;
    }
}

/**
 * Approve/Reject review (Admin only)
 */
export async function updateReviewStatus(reviewId: number, status: 'approved' | 'rejected') {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .update({ status })
            .eq('id', reviewId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating review status:', error);
        throw error;
    }
}
