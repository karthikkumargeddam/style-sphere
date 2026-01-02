import { useState } from "react";
import { MessageCircle, Phone, Mail, X, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerCareButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contactOptions = [
        {
            icon: Phone,
            label: "Call Us",
            value: "+44 (0) 123 456 7890",
            href: "tel:+441234567890",
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            icon: Mail,
            label: "Email Us",
            value: "support@unifab.co.uk",
            href: "mailto:support@unifab.co.uk",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: MessageCircle,
            label: "Live Chat",
            value: "Chat with us now",
            href: "#",
            color: "bg-purple-500 hover:bg-purple-600"
        }
    ];

    return (
        <>
            {/* Floating Customer Care Button */}
            <div className="fixed bottom-8 left-8 z-50">
                {/* Contact Options Panel */}
                {isOpen && (
                    <div className="mb-4 space-y-2 animate-fade-up">
                        {contactOptions.map((option, index) => (
                            <a
                                key={option.label}
                                href={option.href}
                                className={`flex items-center gap-3 ${option.color} text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <option.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold">{option.label}</p>
                                    <p className="text-xs opacity-90">{option.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Main Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
                >
                    {isOpen ? (
                        <X className="w-8 h-8" />
                    ) : (
                        <Headphones className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                    )}

                    {/* Pulse Animation */}
                    {!isOpen && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
                    )}

                    {/* Tooltip */}
                    <div className="absolute left-full ml-3 w-48 p-3 bg-foreground/95 backdrop-blur-sm border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="text-sm font-bold text-background mb-1">Need Help?</p>
                        <p className="text-xs text-background/80">
                            Click to contact our customer care team
                        </p>
                        {/* Arrow */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px]">
                            <div className="w-3 h-3 bg-foreground/95 border-l border-t border-border transform rotate-[-45deg]"></div>
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
};

export default CustomerCareButton;
