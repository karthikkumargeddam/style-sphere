import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, Share2, Copy, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";

const ReferralProgram = () => {
    const [email, setEmail] = useState("");

    // Mock user referral data
    const referralCode = "UNIFAB-KG2024";
    const referralLink = `https://unifab.co.uk/ref/${referralCode}`;
    const referralsCount = 5;
    const pendingRewards = 150;
    const earnedRewards = 250;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Referral link copied to clipboard!");
    };

    const shareVia = (platform: string) => {
        const text = "Check out UniFab for quality workwear! Get 10% off your first order.";
        const urls: Record<string, string> = {
            email: `mailto:?subject=Get 10% off workwear&body=${text} ${referralLink}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`
        };

        window.open(urls[platform], "_blank");
    };

    const sendInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success(`Invitation sent to ${email}!`);
            setEmail("");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Referral Program</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Refer Friends, Earn Rewards
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Give £50, Get £50. Share the quality workwear love!
                        </p>
                    </div>

                    {/* How It Works */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="card-3d p-6 text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Share2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">1. Share Your Link</h3>
                            <p className="text-sm text-muted-foreground">
                                Send your unique referral link to friends and colleagues
                            </p>
                        </div>
                        <div className="card-3d p-6 text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">2. They Get 10% Off</h3>
                            <p className="text-sm text-muted-foreground">
                                Your friends save 10% on their first order over £100
                            </p>
                        </div>
                        <div className="card-3d p-6 text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">3. You Earn £50</h3>
                            <p className="text-sm text-muted-foreground">
                                Get £50 credit when they complete their first purchase
                            </p>
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="card-3d p-8 mb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
                        <h2 className="font-display text-2xl font-bold mb-6">Your Referral Stats</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-primary mb-2">{referralsCount}</p>
                                <p className="text-sm text-muted-foreground">Successful Referrals</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-600 mb-2">£{earnedRewards}</p>
                                <p className="text-sm text-muted-foreground">Total Earned</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-orange-600 mb-2">£{pendingRewards}</p>
                                <p className="text-sm text-muted-foreground">Pending Rewards</p>
                            </div>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="card-3d p-8 mb-12">
                        <h2 className="font-display text-2xl font-bold mb-6">Share Your Referral Link</h2>

                        {/* Referral Link */}
                        <div className="flex gap-2 mb-6">
                            <Input
                                value={referralLink}
                                readOnly
                                className="flex-1 font-mono text-sm"
                            />
                            <Button onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                            </Button>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            <Button
                                variant="outline"
                                onClick={() => shareVia("email")}
                                className="gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareVia("facebook")}
                                className="gap-2"
                            >
                                <Facebook className="w-4 h-4" />
                                Facebook
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareVia("twitter")}
                                className="gap-2"
                            >
                                <Twitter className="w-4 h-4" />
                                Twitter
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareVia("linkedin")}
                                className="gap-2"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </Button>
                        </div>

                        {/* Email Invite */}
                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-4">Send Direct Invitation</h3>
                            <form onSubmit={sendInvite} className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="friend@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1"
                                />
                                <Button type="submit">
                                    Send Invite
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="card-3d p-6">
                        <h3 className="font-semibold mb-4">Program Terms</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Referee must be a new customer (no previous orders)</li>
                            <li>• Minimum order value of £100 required</li>
                            <li>• £50 credit issued after referee's first order is delivered</li>
                            <li>• Credits valid for 12 months from issue date</li>
                            <li>• No limit on number of referrals</li>
                            <li>• Cannot be combined with other promotional codes</li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReferralProgram;
