import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Gift, Star, TrendingUp, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LoyaltyProgram = () => {
    // Mock user data
    const userPoints = 2450;
    const currentTier = "Silver";
    const nextTier = "Gold";
    const pointsToNextTier = 550;
    const totalPointsForNextTier = 3000;

    const tiers = [
        {
            name: "Bronze",
            minPoints: 0,
            color: "from-orange-400 to-orange-600",
            icon: Award,
            benefits: [
                "1 point per £1 spent",
                "Birthday bonus: 100 points",
                "Exclusive member pricing"
            ]
        },
        {
            name: "Silver",
            minPoints: 1000,
            color: "from-gray-300 to-gray-500",
            icon: Star,
            benefits: [
                "1.5 points per £1 spent",
                "Birthday bonus: 200 points",
                "Free delivery on all orders",
                "Early access to sales"
            ]
        },
        {
            name: "Gold",
            minPoints: 3000,
            color: "from-yellow-400 to-yellow-600",
            icon: Crown,
            benefits: [
                "2 points per £1 spent",
                "Birthday bonus: 500 points",
                "Free express delivery",
                "Priority customer support",
                "Exclusive Gold member deals"
            ]
        },
        {
            name: "Platinum",
            minPoints: 10000,
            color: "from-purple-400 to-purple-600",
            icon: TrendingUp,
            benefits: [
                "3 points per £1 spent",
                "Birthday bonus: 1000 points",
                "Free next-day delivery",
                "Dedicated account manager",
                "VIP event invitations",
                "Custom bulk pricing"
            ]
        }
    ];

    const rewards = [
        { points: 500, reward: "£5 Discount Voucher", icon: Gift },
        { points: 1000, reward: "£10 Discount Voucher", icon: Gift },
        { points: 2000, reward: "£25 Discount Voucher", icon: Gift },
        { points: 3000, reward: "£40 Discount Voucher", icon: Gift },
        { points: 5000, reward: "£75 Discount Voucher", icon: Gift },
        { points: 10000, reward: "£200 Discount Voucher", icon: Gift }
    ];

    const progress = ((userPoints / totalPointsForNextTier) * 100);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Rewards Program</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Loyalty Rewards
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Earn points with every purchase and unlock exclusive benefits
                        </p>
                    </div>

                    {/* Current Status Card */}
                    <div className="card-3d p-8 mb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Your Tier</p>
                                <h2 className="text-3xl font-bold">{currentTier}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground mb-1">Your Points</p>
                                <p className="text-4xl font-bold text-primary">{userPoints.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Progress to Next Tier */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress to {nextTier}</span>
                                <span className="font-semibold">{pointsToNextTier} points to go</span>
                            </div>
                            <Progress value={progress} className="h-3" />
                            <p className="text-xs text-muted-foreground">
                                Earn {pointsToNextTier} more points to unlock {nextTier} benefits
                            </p>
                        </div>
                    </div>

                    {/* Membership Tiers */}
                    <div className="mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6 text-center">Membership Tiers</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tiers.map((tier) => {
                                const Icon = tier.icon;
                                const isCurrentTier = tier.name === currentTier;

                                return (
                                    <div
                                        key={tier.name}
                                        className={`card-3d p-6 ${isCurrentTier ? 'ring-2 ring-primary' : ''
                                            }`}
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 mx-auto`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-center mb-2">{tier.name}</h3>
                                        <p className="text-sm text-center text-muted-foreground mb-4">
                                            {tier.minPoints.toLocaleString()}+ points
                                        </p>
                                        {isCurrentTier && (
                                            <Badge className="w-full justify-center mb-4">Current Tier</Badge>
                                        )}
                                        <ul className="space-y-2">
                                            {tier.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <span className="text-green-500 mt-0.5">✓</span>
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Rewards Catalog */}
                    <div className="mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6 text-center">Redeem Your Points</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rewards.map((reward) => {
                                const Icon = reward.icon;
                                const canRedeem = userPoints >= reward.points;

                                return (
                                    <div
                                        key={reward.points}
                                        className={`card-3d p-6 ${canRedeem ? '' : 'opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-full ${canRedeem ? 'bg-primary/10' : 'bg-secondary'
                                                } flex items-center justify-center`}>
                                                <Icon className={`w-6 h-6 ${canRedeem ? 'text-primary' : 'text-muted-foreground'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{reward.reward}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {reward.points.toLocaleString()} points
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full"
                                            disabled={!canRedeem}
                                            variant={canRedeem ? "default" : "outline"}
                                        >
                                            {canRedeem ? 'Redeem Now' : `Need ${(reward.points - userPoints).toLocaleString()} more points`}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* How to Earn Points */}
                    <div className="card-3d p-8">
                        <h2 className="font-display text-3xl font-bold mb-6 text-center">How to Earn Points</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Make Purchases</h3>
                                <p className="text-sm text-muted-foreground">
                                    Earn 1-3 points per £1 spent based on your tier
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Refer Friends</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get 500 bonus points for each successful referral
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Leave Reviews</h3>
                                <p className="text-sm text-muted-foreground">
                                    Earn 50 points for each product review
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoyaltyProgram;
