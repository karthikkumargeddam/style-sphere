import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if user has already subscribed or dismissed
        const hasSubscribed = localStorage.getItem("newsletter_subscribed");
        const hasDismissed = sessionStorage.getItem("newsletter_dismissed");

        if (!hasSubscribed && !hasDismissed) {
            // Show popup after 5 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("newsletter_dismissed", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            localStorage.setItem("newsletter_subscribed", "true");
            toast.success("🎉 Welcome! Check your email for your 10% discount code!");
            setIsOpen(false);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                        onClick={handleClose}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md mx-4"
                    >
                        <div className="glass-dark p-8 rounded-2xl shadow-depth-xl border border-border relative overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full glass hover:bg-white/20 flex items-center justify-center transition-all"
                            >
                                <X className="w-5 h-5 text-foreground" />
                            </button>

                            {/* Icon */}
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-primary" />
                            </div>

                            {/* Content */}
                            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">
                                Get 10% Off Your First Order!
                            </h2>
                            <p className="text-muted-foreground text-center mb-6">
                                Subscribe to our newsletter for exclusive deals, new arrivals, and workwear tips.
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 neuro"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="gold"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Subscribing..." : "Get My 10% Discount"}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                                </p>
                            </form>

                            {/* Decorative Elements */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NewsletterPopup;
