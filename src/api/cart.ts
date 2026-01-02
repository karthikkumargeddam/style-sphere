import { supabase } from '@/lib/supabase';

export interface CartItem {
    id: number;
    userId: string;
    productId: number;
    quantity: number;
    size?: string;
    color?: string;
    product?: any;
}

/**
 * Get user's cart
 */
export async function getCart(userId: string) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
        *,
        products (*)
      `)
            .eq('user_id', userId);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

/**
 * Add item to cart
 */
export async function addToCart(
    userId: string,
    productId: number,
    quantity: number = 1,
    size?: string,
    color?: string
) {
    try {
        // Check if item already exists in cart
        const { data: existing } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .eq('size', size || '')
            .eq('color', color || '')
            .single();

        if (existing) {
            // Update quantity
            const { data, error } = await supabase
                .from('cart_items')
                .update({ quantity: existing.quantity + quantity })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new item
            const { data, error } = await supabase
                .from('cart_items')
                .insert({
                    user_id: userId,
                    product_id: productId,
                    quantity,
                    size,
                    color
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(itemId: number, quantity: number) {
    try {
        if (quantity <= 0) {
            return await removeFromCart(itemId);
        }

        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', itemId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: number) {
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
}

/**
 * Clear entire cart
 */
export async function clearCart(userId: string) {
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

/**
 * Get cart total
 */
export async function getCartTotal(userId: string) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
        quantity,
        products (price)
      `)
            .eq('user_id', userId);

        if (error) throw error;

        const total = data?.reduce((sum, item: any) => {
            return sum + (item.quantity * item.products.price);
        }, 0) || 0;

        return total;
    } catch (error) {
        console.error('Error calculating cart total:', error);
        throw error;
    }
}
