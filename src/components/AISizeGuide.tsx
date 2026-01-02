import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, User, TrendingUp, MessageSquare, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AISizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

const AISizeGuide = ({ isOpen, onClose }: AISizeGuideProps) => {
    const [messages, setMessages] = useState([
        {
            type: "ai",
            text: "👋 Hi! I'm your AI Size Guide assistant. I can help you find the perfect fit. What would you like to know?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const quickQuestions = [
        "What size should I order?",
        "How do I measure myself?",
        "Size chart for work trousers",
        "Difference between UK and EU sizes",
    ];

    const handleSendMessage = (message: string) => {
        if (!message.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { type: "user", text: message }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let response = "";

            if (message.toLowerCase().includes("measure")) {
                response = "📏 To measure yourself accurately:\n\n1. **Chest**: Measure around the fullest part\n2. **Waist**: Measure around your natural waistline\n3. **Inside Leg**: Measure from crotch to ankle\n\nUse a soft tape measure and wear light clothing for best results!";
            } else if (message.toLowerCase().includes("size chart") || message.toLowerCase().includes("trouser")) {
                response = "📊 **Work Trousers Size Guide:**\n\nUK 28 = Waist 28\" (71cm)\nUK 30 = Waist 30\" (76cm)\nUK 32 = Waist 32\" (81cm)\nUK 34 = Waist 34\" (86cm)\nUK 36 = Waist 36\" (91cm)\n\nRegular leg: 31\", Long leg: 33\"";
            } else if (message.toLowerCase().includes("uk") && message.toLowerCase().includes("eu")) {
                response = "🌍 **Size Conversion:**\n\nUK S = EU 46-48\nUK M = EU 50-52\nUK L = EU 54-56\nUK XL = EU 58-60\nUK XXL = EU 62-64";
            } else if (message.toLowerCase().includes("what size")) {
                response = "I'd be happy to help! To recommend the right size, I need to know:\n\n1. What product are you interested in?\n2. Your measurements (chest, waist, height)\n3. Do you prefer a regular or loose fit?\n\nTell me more and I'll find your perfect size! 👔";
            } else {
                response = "I can help you with:\n\n✅ Size recommendations\n✅ How to measure yourself\n✅ Size charts for all products\n✅ UK/EU size conversions\n✅ Fit advice (regular vs loose)\n\nWhat would you like to know?";
            }

            setMessages((prev) => [...prev, { type: "ai", text: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-[9998] w-[380px] glass-dark rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
                    style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        height: "min(600px, calc(100vh - 100px))",
                        maxHeight: "calc(100vh - 100px)",
                    }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">AI Size Guide</h3>
                                <p className="text-xs text-white/80">Powered by AI</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.type === "user"
                                        ? "bg-primary text-white"
                                        : "glass border border-border text-foreground"
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="glass border border-border rounded-2xl px-4 py-3">
                                    <div className="flex gap-1">
                                        <motion.div
                                            className="w-2 h-2 bg-primary rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-primary rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                        />
                                        <motion.div
                                            className="w-2 h-2 bg-primary rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Quick Questions */}
                    {messages.length === 1 && (
                        <div className="p-4 border-t border-border bg-background/30">
                            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(question)}
                                        className="text-xs glass px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-border bg-background/50">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                                placeholder="Ask me anything..."
                                className="flex-1 neuro"
                            />
                            <Button
                                onClick={() => handleSendMessage(input)}
                                variant="gold"
                                size="icon"
                                disabled={!input.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AISizeGuide;
