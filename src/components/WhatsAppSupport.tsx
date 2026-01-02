import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppSupport = () => {
    const phoneNumber = "447123456789"; // UK WhatsApp Business number
    const defaultMessage = "Hi! I'm interested in your workwear products.";

    const openWhatsApp = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="fixed bottom-24 right-6 z-40">
            <Button
                onClick={openWhatsApp}
                size="lg"
                className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group relative"
            >
                <MessageCircle className="w-6 h-6 text-white" />

                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 w-48 p-3 bg-foreground/95 backdrop-blur-sm border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-sm font-bold text-background mb-1">Chat on WhatsApp</p>
                    <p className="text-xs text-background/80">
                        Get instant support from our team
                    </p>
                    {/* Arrow */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-[-1px]">
                        <div className="w-3 h-3 bg-foreground/95 border-r border-b border-border transform rotate-[-45deg]"></div>
                    </div>
                </div>
            </Button>
        </div>
    );
};

export default WhatsAppSupport;
