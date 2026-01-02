import { Bell, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StockNotificationProps {
    productId: number;
    productName: string;
}

const StockNotification = ({ productId, productName }: StockNotificationProps) => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !email.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }

        // In a real app, send to backend
        console.log(`Stock notification requested for product ${productId} to ${email}`);

        setIsSubmitted(true);
        toast.success("You'll be notified when this item is back in stock!");
    };

    if (isSubmitted) {
        return (
            <div className="card-3d p-6 bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-foreground">Notification Set!</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    We'll email you at <span className="font-medium text-foreground">{email}</span> when{" "}
                    {productName} is back in stock.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm text-primary hover:underline"
                >
                    Change email
                </button>
            </div>
        );
    }

    return (
        <div className="card-3d p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">Out of Stock</h3>
                    <p className="text-sm text-muted-foreground">Get notified when available</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <Button type="submit" variant="gold" className="w-full">
                    Notify Me
                </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-3">
                We'll send you one email when this item is back in stock. No spam, promise!
            </p>
        </div>
    );
};

export default StockNotification;
