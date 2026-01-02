import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const quickReplies = [
    "Track my order",
    "Size guide",
    "Bulk pricing",
    "Custom branding",
    "Delivery time",
];

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! I'm here to help. How can I assist you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
            return "To track your order, please visit your account dashboard or use the tracking number sent to your email. Need help finding it?";
        }
        if (lowerMessage.includes("size") || lowerMessage.includes("fit")) {
            return "Our size guide is available on each product page. For personalized recommendations, try our AI Size Guide tool! Would you like me to direct you there?";
        }
        if (lowerMessage.includes("bulk") || lowerMessage.includes("wholesale")) {
            return "We offer great discounts for bulk orders! Orders of 50+ items get 10% off, 100+ get 15% off, and 500+ get 20% off. Would you like a custom quote?";
        }
        if (lowerMessage.includes("custom") || lowerMessage.includes("logo") || lowerMessage.includes("brand")) {
            return "We offer custom logo printing and embroidery! Check out our Logo Gallery for samples. Minimum order is 25 items. Want to request a quote?";
        }
        if (lowerMessage.includes("delivery") || lowerMessage.includes("shipping")) {
            return "Standard delivery is 3-5 working days. Express delivery (1-2 days) is available. Free shipping on orders over £150. Where are you shipping to?";
        }
        if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
            return "Prices vary by product and quantity. Bulk discounts available! Which product are you interested in?";
        }
        if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
            return "We offer 30-day hassle-free returns with free return labels. Items must be unworn and in original packaging. Need to start a return?";
        }
        if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
            return "Hello! How can I help you today? I can assist with orders, sizing, pricing, and more!";
        }

        return "I'd be happy to help! For detailed assistance, you can also call us at 0800 123 4567 or email support@unifab.co.uk. What specific information do you need?";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const botMessage: Message = {
                id: messages.length + 2,
                text: getBotResponse(input),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuickReply = (reply: string) => {
        setInput(reply);
        setTimeout(() => handleSend(), 100);
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
                    >
                        <MessageCircle className="w-6 h-6 text-white" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-6 right-6 w-96 glass border border-border rounded-xl shadow-2xl overflow-hidden z-50 ${isMinimized ? "h-16" : "h-[600px]"
                            } transition-all`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">UniFab Support</h3>
                                    <p className="text-xs text-white/80">Online now</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-white" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[400px] bg-background/50">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                                                        ? "bg-primary text-white"
                                                        : "glass border border-border"
                                                    }`}
                                            >
                                                <p className="text-sm">{message.text}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="glass border border-border rounded-lg p-3">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Replies */}
                                {messages.length === 1 && (
                                    <div className="px-4 pb-2">
                                        <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {quickReplies.map((reply) => (
                                                <button
                                                    key={reply}
                                                    onClick={() => handleQuickReply(reply)}
                                                    className="text-xs glass px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    {reply}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Input */}
                                <div className="p-4 border-t border-border bg-background/80">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <button
                                            onClick={handleSend}
                                            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LiveChat;
