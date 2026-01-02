import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full glass border border-border flex items-center px-1 transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20"
                animate={{
                    opacity: theme === "dark" ? 1 : 0.5,
                }}
            />

            {/* Slider */}
            <motion.div
                className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg flex items-center justify-center"
                animate={{
                    x: theme === "dark" ? 24 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "dark" ? 1 : 0,
                        rotate: theme === "dark" ? 0 : 180,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Moon className="w-3 h-3 text-white absolute" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "light" ? 1 : 0,
                        rotate: theme === "light" ? 0 : -180,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Sun className="w-3 h-3 text-white absolute" />
                </motion.div>
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
