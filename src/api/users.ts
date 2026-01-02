import { supabase } from '@/lib/supabase';

export interface User {
    id: string;
    email: string;
    fullName?: string;
    companyName?: string;
    phone?: string;
    role: 'customer' | 'admin' | 'owner';
    loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
    loyaltyPoints: number;
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<User>) {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

/**
 * Get user's loyalty points
 */
export async function getLoyaltyPoints(userId: string) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('loyalty_points, loyalty_tier')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching loyalty points:', error);
        throw error;
    }
}

/**
 * Add loyalty points
 */
export async function addLoyaltyPoints(userId: string, points: number) {
    try {
        const { data: user } = await supabase
            .from('users')
            .select('loyalty_points, loyalty_tier')
            .eq('id', userId)
            .single();

        if (!user) throw new Error('User not found');

        const newPoints = user.loyalty_points + points;
        let newTier = user.loyalty_tier;

        // Update tier based on points
        if (newPoints >= 10000) newTier = 'platinum';
        else if (newPoints >= 5000) newTier = 'gold';
        else if (newPoints >= 2000) newTier = 'silver';
        else newTier = 'bronze';

        const { data, error } = await supabase
            .from('users')
            .update({
                loyalty_points: newPoints,
                loyalty_tier: newTier
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding loyalty points:', error);
        throw error;
    }
}

/**
 * Redeem loyalty points
 */
export async function redeemLoyaltyPoints(userId: string, points: number) {
    try {
        const { data: user } = await supabase
            .from('users')
            .select('loyalty_points')
            .eq('id', userId)
            .single();

        if (!user) throw new Error('User not found');
        if (user.loyalty_points < points) throw new Error('Insufficient points');

        const { data, error } = await supabase
            .from('users')
            .update({ loyalty_points: user.loyalty_points - points })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error redeeming loyalty points:', error);
        throw error;
    }
}

/**
 * Get wishlist items
 */
export async function getWishlist(userId: string) {
    try {
        const { data, error } = await supabase
            .from('wishlist_items')
            .select(`
        *,
        products (*)
      `)
            .eq('user_id', userId);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
}

/**
 * Add to wishlist
 */
export async function addToWishlist(userId: string, productId: number) {
    try {
        const { data, error } = await supabase
            .from('wishlist_items')
            .insert({ user_id: userId, product_id: productId })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
}

/**
 * Remove from wishlist
 */
export async function removeFromWishlist(userId: string, productId: number) {
    try {
        const { error } = await supabase
            .from('wishlist_items')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
}

/**
 * Create referral
 */
export async function createReferral(referrerId: string, referredEmail: string) {
    try {
        const referralCode = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const { data, error } = await supabase
            .from('referrals')
            .insert({
                referrer_id: referrerId,
                referred_email: referredEmail,
                referral_code: referralCode
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating referral:', error);
        throw error;
    }
}

/**
 * Get user's referrals
 */
export async function getUserReferrals(userId: string) {
    try {
        const { data, error } = await supabase
            .from('referrals')
            .select('*')
            .eq('referrer_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching referrals:', error);
        throw error;
    }
}

/**
 * Complete referral (when referred user makes first purchase)
 */
export async function completeReferral(referralCode: string, referredUserId: string) {
    try {
        const { data: referral, error: fetchError } = await supabase
            .from('referrals')
            .select('*')
            .eq('referral_code', referralCode)
            .single();

        if (fetchError) throw fetchError;

        const { data, error } = await supabase
            .from('referrals')
            .update({
                referred_user_id: referredUserId,
                status: 'completed',
                completed_at: new Date().toISOString(),
                reward_issued: true
            })
            .eq('id', referral.id)
            .select()
            .single();

        if (error) throw error;

        // Add loyalty points to referrer
        await addLoyaltyPoints(referral.referrer_id, 500); // 500 points = £50 value

        return data;
    } catch (error) {
        console.error('Error completing referral:', error);
        throw error;
    }
}
