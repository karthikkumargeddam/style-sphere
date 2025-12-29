import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderConfirmationRequest {
  email: string;
  customerName: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};

const generateItemsHtml = (items: OrderItem[], currency: string) => {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.price * item.quantity, currency)}</td>
      </tr>
    `
    )
    .join("");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, customerName, orderId, items, totalAmount, currency }: OrderConfirmationRequest = await req.json();

    console.log("Sending order confirmation to:", email);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Order Confirmed!</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hi ${customerName || "Valued Customer"},</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for your order! We're excited to get your professional workwear to you.
          </p>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Order Reference:</p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #1a1a2e;">${orderId}</p>
          </div>
          
          <h2 style="font-size: 18px; color: #1a1a2e; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Order Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 12px; text-align: left; font-weight: 600;">Item</th>
                <th style="padding: 12px; text-align: center; font-weight: 600;">Qty</th>
                <th style="padding: 12px; text-align: right; font-weight: 600;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${generateItemsHtml(items, currency)}
            </tbody>
            <tfoot>
              <tr style="background: #1a1a2e;">
                <td colspan="2" style="padding: 15px; color: #ffffff; font-weight: bold;">Total</td>
                <td style="padding: 15px; text-align: right; color: #d4af37; font-weight: bold; font-size: 18px;">${formatCurrency(totalAmount, currency)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #d4af37; margin-bottom: 25px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>What's next?</strong><br>
              We'll send you a shipping confirmation email once your order is on its way.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          
          <p style="font-size: 16px; margin-top: 25px;">
            Best regards,<br>
            <strong style="color: #1a1a2e;">The WorkwearPro Team</strong>
          </p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            © 2024 WorkwearPro. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "WorkwearPro <onboarding@resend.dev>",
        to: [email],
        subject: `Order Confirmation - ${orderId}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
