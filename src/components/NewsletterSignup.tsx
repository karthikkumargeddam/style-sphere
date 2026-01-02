import { useState } from "react";
import { Mail, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface NewsletterSignupProps {
    inline?: boolean;
    compact?: boolean;
}

const NewsletterSignup = ({ inline = false, compact = false }: NewsletterSignupProps) => {
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState({
        weeklyDeals: true,
        newArrivals: true,
        exclusiveOffers: true,
        industryNews: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success("Welcome! Check your email for 10% off code.");
            setIsSubmitted(true);
            setEmail("");
        }
    };

    if (compact) {
        return (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                        <h3 className="font-semibold">Get 10% Off Your First Order</h3>
                        <p className="text-sm text-muted-foreground">Join our newsletter for exclusive deals</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                    />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="card-3d p-8 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You're All Set!</h3>
                <p className="text-muted-foreground mb-4">
                    Check your email for your 10% discount code
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Subscribe Another Email
                </Button>
            </div>
        );
    }

    return (
        <div className={inline ? "" : "card-3d p-8"}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-2">
                        Join 50,000+ Subscribers
                    </h2>
                    <p className="text-muted-foreground">
                        Get exclusive deals, new arrivals, and industry insights delivered weekly
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold">10% Off Welcome Code</p>
                            <p className="text-sm text-muted-foreground">Instant discount on first order</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold">Weekly Flash Sales</p>
                            <p className="text-sm text-muted-foreground">Early access to limited deals</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold">New Arrivals First</p>
                            <p className="text-sm text-muted-foreground">Be first to see new products</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="font-semibold">Industry Tips</p>
                            <p className="text-sm text-muted-foreground">Workwear guides and trends</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-center text-lg h-12"
                        />
                    </div>

                    {/* Preferences */}
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Email Preferences (Optional)</p>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={preferences.weeklyDeals}
                                    onCheckedChange={(checked) =>
                                        setPreferences({ ...preferences, weeklyDeals: checked as boolean })
                                    }
                                />
                                <span className="text-sm">Weekly deals and promotions</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={preferences.newArrivals}
                                    onCheckedChange={(checked) =>
                                        setPreferences({ ...preferences, newArrivals: checked as boolean })
                                    }
                                />
                                <span className="text-sm">New product arrivals</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={preferences.exclusiveOffers}
                                    onCheckedChange={(checked) =>
                                        setPreferences({ ...preferences, exclusiveOffers: checked as boolean })
                                    }
                                />
                                <span className="text-sm">Exclusive subscriber-only offers</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={preferences.industryNews}
                                    onCheckedChange={(checked) =>
                                        setPreferences({ ...preferences, industryNews: checked as boolean })
                                    }
                                />
                                <span className="text-sm">Industry news and tips</span>
                            </label>
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        <Gift className="w-5 h-5 mr-2" />
                        Subscribe & Get 10% Off
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                        We respect your privacy. Unsubscribe anytime. No spam, ever.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default NewsletterSignup;
