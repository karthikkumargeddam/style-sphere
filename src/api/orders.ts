import { supabase } from '@/lib/supabase';

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    subtotal: number;
    discount: number;
    shippingCost: number;
    total: number;
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: number;
    orderId: string;
    productId: number;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
    embroideryDetails?: any;
}

/**
 * Create a new order
 */
export async function createOrder(orderData: {
    userId: string;
    items: Array<{
        productId: number;
        quantity: number;
        price: number;
        size?: string;
        color?: string;
    }>;
    subtotal: number;
    discount?: number;
    shippingCost: number;
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
}) {
    try {
        const total = orderData.subtotal - (orderData.discount || 0) + orderData.shippingCost;

        // Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: orderData.userId,
                subtotal: orderData.subtotal,
                discount: orderData.discount || 0,
                shipping_cost: orderData.shippingCost,
                total,
                shipping_address: orderData.shippingAddress,
                billing_address: orderData.billingAddress,
                payment_method: orderData.paymentMethod,
                payment_status: 'pending',
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            color: item.color
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // Update product stock
        for (const item of orderData.items) {
            const { data: product } = await supabase
                .from('products')
                .select('stock_quantity')
                .eq('id', item.productId)
                .single();

            if (product) {
                await supabase
                    .from('products')
                    .update({ stock_quantity: product.stock_quantity - item.quantity })
                    .eq('id', item.productId);
            }
        }

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

/**
 * Get user's orders
 */
export async function getUserOrders(userId: string) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
            .eq('id', orderId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
}

/**
 * Update order status (Admin only)
 */
export async function updateOrderStatus(orderId: string, status: Order['status']) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
    orderId: string,
    paymentStatus: Order['paymentStatus']
) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ payment_status: paymentStatus })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating payment status:', error);
        throw error;
    }
}

/**
 * Get all orders (Admin only)
 */
export async function getAllOrders(filters?: {
    status?: string;
    limit?: number;
    offset?: number;
}) {
    try {
        let query = supabase
            .from('orders')
            .select(`
        *,
        users (full_name, email),
        order_items (
          *,
          products (name)
        )
      `, { count: 'exact' })
            .order('created_at', { ascending: false });

        if (filters?.status) {
            query = query.eq('status', filters.status);
        }

        if (filters?.limit) {
            query = query.limit(filters.limit);
        }

        if (filters?.offset) {
            query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
        }

        const { data, error, count } = await query;

        if (error) throw error;
        return { orders: data || [], total: count || 0 };
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
}
