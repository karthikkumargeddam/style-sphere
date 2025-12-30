-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create products table with inventory tracking
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold INTEGER NOT NULL DEFAULT 10,
    rating NUMERIC DEFAULT 0,
    is_new BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly viewable
CREATE POLICY "Products are viewable by everyone"
ON public.products
FOR SELECT
USING (true);

-- Only admins can insert/update/delete products
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin_notifications table for in-app notifications
CREATE TABLE public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    current_stock INTEGER NOT NULL,
    threshold INTEGER NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_notifications
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Only admins can view notifications
CREATE POLICY "Admins can view notifications"
ON public.admin_notifications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update notifications (mark as read)
CREATE POLICY "Admins can update notifications"
ON public.admin_notifications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Service role can insert notifications (from edge functions)
CREATE POLICY "Service role can insert notifications"
ON public.admin_notifications
FOR INSERT
WITH CHECK (true);

-- Create trigger for updated_at on products
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for admin_notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;