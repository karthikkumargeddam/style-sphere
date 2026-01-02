import { useState, useEffect } from "react";
import { X, Clock, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LimitedTimeOfferBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set end time to 6 hours from now
        const endTime = new Date().getTime() + (6 * 60 * 60 * 1000);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timer);
                setIsVisible(false);
                return;
            }

            setTimeLeft({
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg"
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <TrendingDown className="w-5 h-5 animate-bounce" />
                            <div className="flex-1">
                                <p className="font-bold text-sm md:text-base">
                                    🔥 Flash Sale: 20% OFF All Workwear!
                                </p>
                                <p className="text-xs md:text-sm opacity-90">
                                    Use code: <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">FLASH20</span>
                                </p>
                            </div>
                        </div>

                        {/* Countdown Timer */}
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <div className="flex gap-1 text-sm font-mono font-bold">
                                <div className="bg-white/20 px-2 py-1 rounded">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <span>:</span>
                                <div className="bg-white/20 px-2 py-1 rounded">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <span>:</span>
                                <div className="bg-white/20 px-2 py-1 rounded">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                            aria-label="Close banner"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LimitedTimeOfferBanner;
