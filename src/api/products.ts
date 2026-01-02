import { supabase } from '@/lib/supabase';

export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    originalPrice?: number;
    stockQuantity: number;
    sku: string;
    images: string[];
    sizes: string[];
    colors: string[];
    rating: number;
    reviewCount: number;
    isFeatured: boolean;
    isActive: boolean;
}

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
}

/**
 * Fetch products with optional filters and pagination
 */
export async function getProducts(filters: ProductFilters = {}) {
    try {
        let query = supabase
            .from('products')
            .select('*', { count: 'exact' })
            .eq('is_active', true);

        // Apply filters
        if (filters.category) {
            query = query.eq('category', filters.category);
        }

        if (filters.minPrice) {
            query = query.gte('price', filters.minPrice);
        }

        if (filters.maxPrice) {
            query = query.lte('price', filters.maxPrice);
        }

        if (filters.search) {
            query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }

        if (filters.featured) {
            query = query.eq('is_featured', true);
        }

        // Pagination
        const page = filters.page || 1;
        const limit = filters.limit || 24;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        query = query.range(from, to);

        // Order by created_at desc
        query = query.order('created_at', { ascending: false });

        const { data, error, count } = await query;

        if (error) throw error;

        return {
            products: data || [],
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit)
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .eq('is_active', true)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

/**
 * Get featured products for homepage
 */
export async function getFeaturedProducts(limit: number = 8) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true)
            .eq('is_active', true)
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
}

/**
 * Search products by query
 */
export async function searchProducts(query: string, limit: number = 20) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
            .eq('is_active', true)
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

/**
 * Get trending products (most viewed/purchased)
 */
export async function getTrendingProducts(limit: number = 8) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('review_count', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching trending products:', error);
        throw error;
    }
}

/**
 * Update product stock quantity
 */
export async function updateProductStock(productId: number, quantity: number) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update({ stock_quantity: quantity })
            .eq('id', productId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating product stock:', error);
        throw error;
    }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string, limit: number = 24) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .eq('is_active', true)
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}
