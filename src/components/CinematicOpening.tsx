import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Shield, Truck, Award, Sparkles, Star, Zap, TrendingUp, Users, Package } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";

interface CinematicOpeningProps {
    onComplete: () => void;
}

const CinematicOpening = ({ onComplete }: CinematicOpeningProps) => {
    const [stage, setStage] = useState(0);
    const { playSound } = useSound();

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),    // Logo reveal
            setTimeout(() => setStage(2), 1800),   // Tagline
            setTimeout(() => setStage(3), 3000),   // Product showcase
            setTimeout(() => setStage(4), 4500),   // Features
            setTimeout(() => setStage(5), 5500),   // Stats
            setTimeout(() => onComplete(), 7000),  // Complete
        ];

        // Play epic welcome sound during the cinematic opening
        playSound("welcome");

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                style={{
                    background: "radial-gradient(ellipse at center, #1a1a3e 0%, #0f0f23 50%, #000000 100%)",
                }}
            >
                {/* Animated Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Dynamic Grid with Perspective */}
                <div className="absolute inset-0 opacity-20" style={{ perspective: "1000px" }}>
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 2px, transparent 2px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 2px, transparent 2px)
              `,
                            backgroundSize: "60px 60px",
                            transformStyle: "preserve-3d",
                        }}
                        animate={{
                            rotateX: [0, 5, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Enhanced Floating Particles with Different Sizes */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 4 + 1,
                            height: Math.random() * 4 + 1,
                            background: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`,
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(${Math.random() * 60 + 240}, 70%, 60%)`,
                        }}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            x: [null, Math.random() * window.innerWidth],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Shooting Stars */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                        style={{
                            width: Math.random() * 100 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `-${Math.random() * 20}%`,
                        }}
                        animate={{
                            x: [0, window.innerWidth + 200],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 1.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    />
                ))}

                {/* Main Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center px-4">

                    {/* Stage 1: Enhanced Logo Reveal */}
                    <AnimatePresence>
                        {stage >= 1 && (
                            <motion.div
                                initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
                                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                                className="mb-8 relative"
                            >
                                {/* Multiple Glow Layers */}
                                <div className="absolute inset-0 blur-3xl bg-primary/40 rounded-full scale-150 animate-pulse" />
                                <div className="absolute inset-0 blur-2xl bg-blue-500/30 rounded-full scale-125" />
                                <div className="absolute inset-0 blur-xl bg-purple-500/20 rounded-full scale-110" />

                                {/* Rotating Ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                                    style={{ width: 180, height: 180, left: -26, top: -26 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -top-1 left-1/2 -translate-x-1/2" />
                                </motion.div>

                                {/* Logo Container with 3D Effect */}
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50 transform hover:scale-110 transition-all duration-500"
                                        style={{
                                            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)",
                                        }}
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <ShoppingBag className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={2.5} />
                                        </motion.div>
                                    </div>

                                    {/* Enhanced Orbiting Icons */}
                                    {[
                                        { Icon: Shield, color: "text-green-400", delay: 0 },
                                        { Icon: Truck, color: "text-blue-400", delay: 0.33 },
                                        { Icon: Award, color: "text-yellow-400", delay: 0.66 },
                                    ].map(({ Icon, color, delay }, index) => (
                                        <motion.div
                                            key={index}
                                            className="absolute w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                                            style={{
                                                top: "50%",
                                                left: "50%",
                                                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                            }}
                                            animate={{
                                                rotate: 360,
                                                x: Math.cos(((index * 120 + delay * 360) * Math.PI) / 180) * 90,
                                                y: Math.sin(((index * 120 + delay * 360) * Math.PI) / 180) * 90,
                                            }}
                                            transition={{
                                                rotate: {
                                                    duration: 10,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                },
                                                x: { duration: 0.5 },
                                                y: { duration: 0.5 },
                                            }}
                                        >
                                            <Icon className={`w-5 h-5 ${color}`} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 2: Enhanced Brand Name & Tagline */}
                    <AnimatePresence>
                        {stage >= 2 && (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center relative"
                            >
                                {/* Animated Background Text */}
                                <motion.h1
                                    className="absolute inset-0 font-display text-6xl sm:text-7xl font-bold blur-sm opacity-30"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    style={{
                                        background: "linear-gradient(45deg, #8b5cf6, #3b82f6, #ec4899, #8b5cf6)",
                                        backgroundSize: "300% 300%",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    UniFab
                                </motion.h1>

                                {/* Main Text */}
                                <motion.h1
                                    className="relative font-display text-6xl sm:text-7xl font-bold mb-4"
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    style={{
                                        background: "linear-gradient(90deg, #fff 0%, #8b5cf6 25%, #3b82f6 50%, #ec4899 75%, #fff 100%)",
                                        backgroundSize: "200% auto",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "0 0 80px rgba(139, 92, 246, 0.5)",
                                    }}
                                >
                                    UniFab
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="relative"
                                >
                                    <p className="text-xl text-white/90 uppercase tracking-widest font-light mb-2">
                                        Premium Workwear Solutions
                                    </p>

                                    {/* Animated Underline */}
                                    <motion.div
                                        className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </motion.div>

                                {/* Enhanced Sparkles */}
                                <div className="mt-6 flex justify-center gap-4">
                                    {[Sparkles, Star, Zap].map((Icon, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.5, delay: 0.7 + i * 0.1, type: "spring" }}
                                        >
                                            <Icon className="w-5 h-5 text-primary" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 3: Enhanced Product Categories */}
                    <AnimatePresence>
                        {stage >= 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.6 }}
                                className="mt-12 flex gap-3 flex-wrap justify-center max-w-3xl"
                            >
                                {[
                                    { name: "Safety Wear", icon: Shield },
                                    { name: "Work Trousers", icon: Package },
                                    { name: "Hi-Vis", icon: Zap },
                                    { name: "PPE Equipment", icon: Shield },
                                    { name: "Custom Branding", icon: Star },
                                    { name: "Bulk Orders", icon: TrendingUp },
                                ].map((category, index) => (
                                    <motion.div
                                        key={category.name}
                                        initial={{ scale: 0, rotate: -180, y: 50 }}
                                        animate={{ scale: 1, rotate: 0, y: 0 }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        className="group relative"
                                    >
                                        {/* Glow Effect on Hover */}
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative glass px-5 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center gap-2"
                                            style={{
                                                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                                            }}
                                        >
                                            <category.icon className="w-4 h-4 text-primary" />
                                            <span className="text-white/90 text-sm font-medium">
                                                {category.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 4: Enhanced Key Features */}
                    <AnimatePresence>
                        {stage >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mt-12 grid grid-cols-3 gap-8"
                            >
                                {[
                                    { icon: Shield, text: "Quality Guaranteed", color: "from-green-500 to-emerald-600" },
                                    { icon: Truck, text: "Free Delivery £150+", color: "from-blue-500 to-cyan-600" },
                                    { icon: Award, text: "Trusted by 1000s", color: "from-yellow-500 to-orange-600" },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 30, opacity: 0, scale: 0.8 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        whileHover={{ y: -10, scale: 1.1 }}
                                        transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
                                        className="flex flex-col items-center gap-3 group"
                                    >
                                        <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center backdrop-blur-sm shadow-lg`}>
                                            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:scale-110 transition-transform" />
                                            <feature.icon className="relative w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-white/80 text-xs text-center font-medium">
                                            {feature.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stage 5: Stats Counter */}
                    <AnimatePresence>
                        {stage >= 5 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mt-10 flex gap-8"
                            >
                                {[
                                    { value: "10K+", label: "Products" },
                                    { value: "5K+", label: "Customers" },
                                    { value: "99%", label: "Satisfaction" },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                        className="text-center"
                                    >
                                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-white/60 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Enhanced Loading Progress Bar */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-80 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.2)",
                        }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full relative overflow-hidden"
                            initial={{ width: "0%", x: "-100%" }}
                            animate={{ width: "100%", x: "0%" }}
                            transition={{ duration: 6.5, ease: "easeInOut" }}
                        >
                            {/* Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Loading Text */}
                    <motion.p
                        className="absolute bottom-6 text-white/50 text-xs tracking-widest"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        LOADING EXPERIENCE...
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CinematicOpening;
