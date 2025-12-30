import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LowStockProduct {
  id: string;
  name: string;
  stock_quantity: number;
  low_stock_threshold: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Checking for low stock products...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get admin emails from user_roles
    const { data: adminRoles, error: adminError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (adminError) {
      console.error("Error fetching admin roles:", adminError);
      throw adminError;
    }

    // Get admin emails from profiles
    const adminEmails: string[] = [];
    if (adminRoles && adminRoles.length > 0) {
      const adminUserIds = adminRoles.map((r) => r.user_id);
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .in("user_id", adminUserIds);

      if (!profileError && profiles) {
        profiles.forEach((p) => {
          if (p.email) adminEmails.push(p.email);
        });
      }
    }

    console.log(`Found ${adminEmails.length} admin emails`);

    // Find products with stock below threshold
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, stock_quantity, low_stock_threshold");

    if (productsError) {
      console.error("Error fetching products:", productsError);
      throw productsError;
    }

    const lowStockProducts: LowStockProduct[] = (products || []).filter(
      (p) => p.stock_quantity <= p.low_stock_threshold
    );

    console.log(`Found ${lowStockProducts.length} low stock products`);

    if (lowStockProducts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No low stock products found" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create in-app notifications for each low stock product
    const notifications = lowStockProducts.map((product) => ({
      product_id: product.id,
      product_name: product.name,
      current_stock: product.stock_quantity,
      threshold: product.low_stock_threshold,
      message: `Low stock alert: "${product.name}" has only ${product.stock_quantity} units remaining (threshold: ${product.low_stock_threshold})`,
    }));

    // Check for existing unread notifications to avoid duplicates
    const { data: existingNotifications } = await supabase
      .from("admin_notifications")
      .select("product_id")
      .eq("is_read", false)
      .in(
        "product_id",
        lowStockProducts.map((p) => p.id)
      );

    const existingProductIds = new Set(
      (existingNotifications || []).map((n) => n.product_id)
    );

    const newNotifications = notifications.filter(
      (n) => !existingProductIds.has(n.product_id)
    );

    if (newNotifications.length > 0) {
      const { error: insertError } = await supabase
        .from("admin_notifications")
        .insert(newNotifications);

      if (insertError) {
        console.error("Error inserting notifications:", insertError);
        throw insertError;
      }

      console.log(`Created ${newNotifications.length} new notifications`);
    }

    // Send email notifications if RESEND_API_KEY is configured and there are admins
    let emailSent = false;
    if (resendApiKey && adminEmails.length > 0 && newNotifications.length > 0) {
      const productList = newNotifications
        .map((n) => `• ${n.product_name}: ${n.current_stock} units (threshold: ${n.threshold})`)
        .join("\n");

      const emailHtml = `
        <h1>🚨 Low Stock Alert</h1>
        <p>The following products are running low on stock:</p>
        <ul>
          ${newNotifications
            .map(
              (n) =>
                `<li><strong>${n.product_name}</strong>: ${n.current_stock} units remaining (threshold: ${n.threshold})</li>`
            )
            .join("")}
        </ul>
        <p>Please restock these items soon to avoid running out.</p>
        <p>Best regards,<br>WorkWear Pro Inventory System</p>
      `;

      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "WorkWear Pro <onboarding@resend.dev>",
            to: adminEmails,
            subject: `🚨 Low Stock Alert: ${newNotifications.length} product(s) need restocking`,
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
          console.log("Email notification sent successfully");
        } else {
          const errorData = await emailResponse.text();
          console.error("Failed to send email:", errorData);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Low stock check completed",
        lowStockCount: lowStockProducts.length,
        newNotificationsCreated: newNotifications.length,
        emailSent,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in check-low-stock function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
