import { useState, useEffect } from "react";
import { X, Gift, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const ExitIntentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem("exitIntentShown");
        if (shown) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse leaves from top of page
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exitIntentShown", "true");
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [hasShown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success("Discount code sent to your email!");
            setIsVisible(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Content */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Wait! Don't Go!</h2>
                                <p className="text-lg text-muted-foreground mb-1">
                                    Get <span className="text-primary font-bold text-2xl">10% OFF</span> your first order
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Join 40,000+ businesses saving on quality workwear
                                </p>
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                                <Button type="submit" className="w-full" size="lg">
                                    Get My 10% Discount Code
                                </Button>
                            </form>

                            {/* Trust Elements */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-500">✓</span>
                                        <span>Free Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-500">✓</span>
                                        <span>60-Day Returns</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-500">✓</span>
                                        <span>No Spam</span>
                                    </div>
                                </div>
                            </div>

                            {/* No Thanks */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                No thanks, I'll pay full price
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
