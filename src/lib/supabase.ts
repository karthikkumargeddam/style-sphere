import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Database Types (will be auto-generated from Supabase later)
export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: number;
                    name: string;
                    description: string;
                    category: string;
                    price: number;
                    original_price: number | null;
                    stock_quantity: number;
                    sku: string;
                    images: string[];
                    sizes: string[];
                    colors: string[];
                    rating: number;
                    review_count: number;
                    is_featured: boolean;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['products']['Insert']>;
            };
            orders: {
                Row: {
                    id: string;
                    user_id: string;
                    order_number: string;
                    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
                    subtotal: number;
                    discount: number;
                    shipping_cost: number;
                    total: number;
                    shipping_address: any;
                    billing_address: any;
                    payment_method: string;
                    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
                    notes: string | null;
                    created_at: string;
                    updated_at: string;
                };
            };
            reviews: {
                Row: {
                    id: number;
                    user_id: string;
                    product_id: number;
                    order_id: string | null;
                    rating: number;
                    title: string;
                    content: string;
                    images: string[] | null;
                    size_purchased: string | null;
                    fit_rating: 'runs_small' | 'true_to_size' | 'runs_large' | null;
                    verified_purchase: boolean;
                    helpful_count: number;
                    status: 'pending' | 'approved' | 'rejected';
                    created_at: string;
                    updated_at: string;
                };
            };
        };
    };
}
