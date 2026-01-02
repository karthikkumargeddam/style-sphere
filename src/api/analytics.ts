import { supabase } from '@/lib/supabase';

/**
 * Track analytics event
 */
export async function trackEvent(
    eventType: string,
    eventData: any = {},
    userId?: string,
    sessionId?: string
) {
    try {
        const { error } = await supabase
            .from('analytics_events')
            .insert({
                user_id: userId,
                event_type: eventType,
                event_data: eventData,
                session_id: sessionId || generateSessionId()
            });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error tracking event:', error);
        // Don't throw - analytics shouldn't break the app
        return false;
    }
}

/**
 * Get sales data for dashboard
 */
export async function getSalesData(timeRange: '7d' | '30d' | '90d' = '30d') {
    try {
        const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysAgo);

        const { data, error } = await supabase
            .from('orders')
            .select('total, created_at, status')
            .gte('created_at', startDate.toISOString())
            .eq('payment_status', 'paid');

        if (error) throw error;

        const totalRevenue = data?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
        const totalOrders = data?.length || 0;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            totalRevenue,
            totalOrders,
            averageOrderValue,
            orders: data || []
        };
    } catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
}

/**
 * Get customer insights
 */
export async function getCustomerInsights() {
    try {
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('id, created_at, loyalty_tier');

        if (usersError) throw usersError;

        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('user_id, total, created_at')
            .eq('payment_status', 'paid');

        if (ordersError) throw ordersError;

        const totalCustomers = users?.length || 0;
        const newThisMonth = users?.filter(u => {
            const createdDate = new Date(u.created_at);
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return createdDate > monthAgo;
        }).length || 0;

        // Calculate customer lifetime value
        const customerOrders = orders?.reduce((acc: any, order) => {
            if (!acc[order.user_id]) {
                acc[order.user_id] = { total: 0, count: 0 };
            }
            acc[order.user_id].total += Number(order.total);
            acc[order.user_id].count += 1;
            return acc;
        }, {});

        const avgLifetimeValue = customerOrders
            ? Object.values(customerOrders).reduce((sum: number, customer: any) => sum + customer.total, 0) / totalCustomers
            : 0;

        return {
            totalCustomers,
            newThisMonth,
            avgLifetimeValue,
            loyaltyDistribution: {
                bronze: users?.filter(u => u.loyalty_tier === 'bronze').length || 0,
                silver: users?.filter(u => u.loyalty_tier === 'silver').length || 0,
                gold: users?.filter(u => u.loyalty_tier === 'gold').length || 0,
                platinum: users?.filter(u => u.loyalty_tier === 'platinum').length || 0
            }
        };
    } catch (error) {
        console.error('Error fetching customer insights:', error);
        throw error;
    }
}

/**
 * Get product performance metrics
 */
export async function getProductPerformance(limit: number = 10) {
    try {
        const { data, error } = await supabase
            .from('order_items')
            .select(`
        product_id,
        quantity,
        price,
        products (name, category, stock_quantity)
      `);

        if (error) throw error;

        // Aggregate by product
        const productStats = data?.reduce((acc: any, item: any) => {
            const productId = item.product_id;
            if (!acc[productId]) {
                acc[productId] = {
                    productId,
                    name: item.products.name,
                    category: item.products.category,
                    totalSales: 0,
                    unitsSold: 0,
                    revenue: 0,
                    stockLevel: item.products.stock_quantity
                };
            }
            acc[productId].totalSales += 1;
            acc[productId].unitsSold += item.quantity;
            acc[productId].revenue += item.quantity * Number(item.price);
            return acc;
        }, {});

        const topProducts = Object.values(productStats || {})
            .sort((a: any, b: any) => b.revenue - a.revenue)
            .slice(0, limit);

        return topProducts;
    } catch (error) {
        console.error('Error fetching product performance:', error);
        throw error;
    }
}

/**
 * Get conversion funnel data
 */
export async function getConversionFunnel(timeRange: '7d' | '30d' = '30d') {
    try {
        const daysAgo = timeRange === '7d' ? 7 : 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysAgo);

        const { data, error } = await supabase
            .from('analytics_events')
            .select('event_type')
            .gte('created_at', startDate.toISOString());

        if (error) throw error;

        const eventCounts = data?.reduce((acc: any, event) => {
            acc[event.event_type] = (acc[event.event_type] || 0) + 1;
            return acc;
        }, {});

        const visitors = eventCounts?.['page_view'] || 0;
        const productViews = eventCounts?.['product_view'] || 0;
        const addToCarts = eventCounts?.['add_to_cart'] || 0;
        const checkouts = eventCounts?.['checkout_start'] || 0;
        const purchases = eventCounts?.['purchase'] || 0;

        return {
            visitors,
            productViews,
            addToCarts,
            checkouts,
            purchases,
            conversionRate: visitors > 0 ? (purchases / visitors) * 100 : 0
        };
    } catch (error) {
        console.error('Error fetching conversion funnel:', error);
        throw error;
    }
}

// Helper function to generate session ID
function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Event tracking helpers
export const analytics = {
    pageView: (page: string, userId?: string) =>
        trackEvent('page_view', { page }, userId),

    productView: (productId: number, userId?: string) =>
        trackEvent('product_view', { productId }, userId),

    addToCart: (productId: number, quantity: number, userId?: string) =>
        trackEvent('add_to_cart', { productId, quantity }, userId),

    removeFromCart: (productId: number, userId?: string) =>
        trackEvent('remove_from_cart', { productId }, userId),

    checkoutStart: (cartTotal: number, userId?: string) =>
        trackEvent('checkout_start', { cartTotal }, userId),

    purchase: (orderId: string, total: number, userId?: string) =>
        trackEvent('purchase', { orderId, total }, userId),

    search: (query: string, results: number, userId?: string) =>
        trackEvent('search', { query, results }, userId)
};
