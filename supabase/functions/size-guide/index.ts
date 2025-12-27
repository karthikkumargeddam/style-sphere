import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a professional workwear sizing expert. Your job is to recommend the correct size based on customer measurements.

Size Charts:
TOPS (Polos, Jackets, Vests):
- XS: Chest 34-36", Height 5'4"-5'6"
- S: Chest 36-38", Height 5'6"-5'8"
- M: Chest 38-40", Height 5'8"-5'10"
- L: Chest 40-42", Height 5'10"-6'0"
- XL: Chest 42-44", Height 6'0"-6'2"
- 2XL: Chest 44-46", Height 6'2"-6'4"
- 3XL: Chest 46-48", Height 6'4"+

TROUSERS:
- Waist sizes: 28"-48" available
- Leg lengths: Short (29"), Regular (31"), Long (33")

FIT TYPES:
- Regular Fit: Standard cut, comfortable for most body types
- Slim Fit: Closer to body, modern look
- Relaxed Fit: Extra room for movement, ideal for active work

Guidelines:
1. Ask for chest measurement (in inches or cm)
2. Ask for height
3. Ask for waist measurement for trousers
4. Consider the type of garment they need
5. Consider if they prefer a looser or tighter fit
6. Mention if measurements fall between sizes
7. Be helpful and conversational
8. Keep responses concise`;

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
    console.error("Error in size-guide:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
