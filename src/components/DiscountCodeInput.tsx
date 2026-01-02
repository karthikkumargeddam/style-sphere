import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Tag, X, Check } from "lucide-react";
import { validateDiscountCode, DiscountCode } from "@/lib/discounts";
import { motion, AnimatePresence } from "framer-motion";

interface DiscountCodeInputProps {
    subtotal: number;
    categories: string[];
    isFirstOrder?: boolean;
    onApply: (discount: DiscountCode) => void;
    onRemove: () => void;
    appliedDiscount?: DiscountCode | null;
}

const DiscountCodeInput = ({
    subtotal,
    categories,
    isFirstOrder = false,
    onApply,
    onRemove,
    appliedDiscount,
}: DiscountCodeInputProps) => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleApply = () => {
        if (!code.trim()) {
            setError("Please enter a discount code");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess(false);

        // Simulate API call
        setTimeout(() => {
            const validation = validateDiscountCode(code, subtotal, categories, isFirstOrder);

            if (validation.valid && validation.discount) {
                onApply(validation.discount);
                setSuccess(true);
                setCode("");
                setTimeout(() => setSuccess(false), 2000);
            } else {
                setError(validation.error || "Invalid code");
            }

            setIsLoading(false);
        }, 500);
    };

    const handleRemove = () => {
        onRemove();
        setCode("");
        setError("");
        setSuccess(false);
    };

    return (
        <div className="space-y-3">
            {!appliedDiscount ? (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        Discount Code
                    </label>
                    <div className="flex gap-2">
                        <Input
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value.toUpperCase());
                                setError("");
                            }}
                            onKeyPress={(e) => e.key === "Enter" && handleApply()}
                            placeholder="Enter code"
                            className="neuro flex-1 uppercase text-foreground"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleApply}
                            disabled={isLoading || !code.trim()}
                            variant="gold"
                            className="shadow-depth-sm hover:shadow-depth-md transition-all"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Apply"
                            )}
                        </Button>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-sm text-red-400 flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-sm text-green-400 flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Discount applied successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-gold p-4 rounded-lg shadow-depth-sm"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <Tag className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{appliedDiscount.code}</div>
                                <div className="text-xs text-foreground/70">
                                    {appliedDiscount.description || "Discount applied"}
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleRemove}
                            variant="ghost"
                            size="sm"
                            className="hover:bg-destructive/20 hover:text-destructive"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Suggested Codes */}
            {!appliedDiscount && (
                <div className="text-xs text-muted-foreground">
                    Try: <span className="text-primary cursor-pointer hover:underline" onClick={() => setCode("WELCOME10")}>WELCOME10</span>,{" "}
                    <span className="text-primary cursor-pointer hover:underline" onClick={() => setCode("NEWYEAR25")}>NEWYEAR25</span>,{" "}
                    <span className="text-primary cursor-pointer hover:underline" onClick={() => setCode("FREESHIP")}>FREESHIP</span>
                </div>
            )}
        </div>
    );
};

export default DiscountCodeInput;
