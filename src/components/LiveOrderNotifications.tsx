import { useState, useEffect } from "react";
import { Package, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
    id: string;
    customerName: string;
    location: string;
    product: string;
    quantity: number;
    timeAgo: string;
}

const LiveOrderNotifications = () => {
    const [notifications, setNotifications] = useState<Order[]>([]);
    const [currentNotification, setCurrentNotification] = useState<Order | null>(null);

    // Sample data for realistic notifications
    const sampleOrders: Order[] = [
        { id: "1", customerName: "John M.", location: "London", product: "Hi-Vis Safety Vests", quantity: 50, timeAgo: "2 minutes ago" },
        { id: "2", customerName: "Sarah K.", location: "Manchester", product: "Work Polo Shirts", quantity: 30, timeAgo: "5 minutes ago" },
        { id: "3", customerName: "David L.", location: "Birmingham", product: "Safety Boots", quantity: 25, timeAgo: "8 minutes ago" },
        { id: "4", customerName: "Emma W.", location: "Leeds", product: "Winter Jackets", quantity: 40, timeAgo: "12 minutes ago" },
        { id: "5", customerName: "Michael B.", location: "Glasgow", product: "Coveralls", quantity: 60, timeAgo: "15 minutes ago" },
        { id: "6", customerName: "Lisa P.", location: "Bristol", product: "Work Trousers", quantity: 35, timeAgo: "18 minutes ago" },
        { id: "7", customerName: "James R.", location: "Liverpool", product: "Corporate Polo Bundle", quantity: 100, timeAgo: "22 minutes ago" },
        { id: "8", customerName: "Sophie T.", location: "Edinburgh", product: "Hi-Vis Jackets", quantity: 45, timeAgo: "25 minutes ago" },
        { id: "9", customerName: "Tom H.", location: "Cardiff", product: "Safety Gloves", quantity: 200, timeAgo: "30 minutes ago" },
        { id: "10", customerName: "Rachel G.", location: "Newcastle", product: "Workwear Bundle", quantity: 75, timeAgo: "35 minutes ago" },
    ];

    useEffect(() => {
        // Show a new notification every 8-15 seconds
        const showNotification = () => {
            const randomOrder = sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
            setCurrentNotification(randomOrder);

            // Auto-hide after 5 seconds
            setTimeout(() => {
                setCurrentNotification(null);
            }, 5000);
        };

        // Initial delay
        const initialTimeout = setTimeout(showNotification, 3000);

        // Recurring notifications
        const interval = setInterval(showNotification, Math.random() * 7000 + 8000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {currentNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-6 left-6 z-50 max-w-sm"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 pr-12">
                        <button
                            onClick={() => setCurrentNotification(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                    Someone just purchased!
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    <span className="font-medium">{currentNotification.customerName}</span> from{" "}
                                    <span className="font-medium">{currentNotification.location}</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {currentNotification.quantity}x {currentNotification.product}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {currentNotification.timeAgo}
                                </p>
                            </div>
                        </div>

                        {/* Animated progress bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-green-500 rounded-bl-lg"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LiveOrderNotifications;
