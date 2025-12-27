import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful workwear and uniform expert assistant for UniFab, a professional workwear company. Your role is to help customers find the right workwear, uniforms, and PPE based on their industry and needs.

Product Categories:
- Safety Wear: Hi-vis jackets, reflective gear, safety vests (£25-£50)
- Work Trousers: Cargo pants, heavy duty trousers (£25-£40)
- Polo Shirts: Corporate polos, branded workwear (£15-£25)
- PPE Equipment: Hard hats, safety goggles, gloves (£10-£30)

Industries we serve:
- Construction: Hi-vis, hard hats, steel-toe boots, durable trousers
- Healthcare: Scrubs, tunics, comfortable footwear
- Hospitality: Chef whites, aprons, smart casual uniforms
- Corporate: Polo shirts, branded jackets, professional attire

Guidelines:
1. Ask about their industry if not mentioned
2. Consider safety requirements (hi-vis, PPE needs)
3. Ask about quantity for bulk pricing
4. Mention customization/branding options
5. Keep responses concise and helpful
6. Recommend specific products when possible`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in product-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
