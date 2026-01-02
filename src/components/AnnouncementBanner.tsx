import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Gift, Zap } from "lucide-react";

const announcements = [
    {
        icon: Gift,
        text: "🎉 New Year Sale: 25% OFF on all workwear bundles!",
        color: "hsl(45 100% 50%)",
    },
    {
        icon: Zap,
        text: "⚡ Flash Deal: Free embroidery on orders over £200",
        color: "hsl(180 100% 50%)",
    },
    {
        icon: TrendingUp,
        text: "📦 Free UK delivery on all orders over £150",
        color: "hsl(300 100% 50%)",
    },
    {
        icon: Sparkles,
        text: "✨ New arrivals: Premium winter workwear collection now available",
        color: "hsl(270 100% 60%)",
    },
    {
        icon: Gift,
        text: "🎁 Bulk order discount: Save up to 30% on orders of 50+ items",
        color: "hsl(120 100% 50%)",
    },
];

const AnnouncementBanner = () => {
    // Duplicate announcements for seamless loop
    const duplicatedAnnouncements = [...announcements, ...announcements];

    return (
        <div className="relative bg-gradient-to-r from-primary via-accent to-primary overflow-hidden shadow-depth-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            <div className="relative overflow-hidden py-3">
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{
                        x: [0, -50 * announcements.length + "%"],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedAnnouncements.map((announcement, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-6"
                        >
                            <announcement.icon className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                            <span className="text-primary-foreground font-medium text-sm">
                                {announcement.text}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
        </div>
    );
};

export default AnnouncementBanner;
