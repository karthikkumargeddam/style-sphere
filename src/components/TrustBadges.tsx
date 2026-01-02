import { Shield, Truck, Award, CreditCard, Users, CheckCircle } from "lucide-react";

const TrustBadges = () => {
    const badges = [
        {
            icon: Shield,
            title: "Secure Payment",
            description: "256-bit SSL encryption",
            color: "text-blue-600"
        },
        {
            icon: Truck,
            title: "Free Delivery",
            description: "On orders over £50",
            color: "text-green-600"
        },
        {
            icon: Award,
            title: "Quality Guarantee",
            description: "60-day money back",
            color: "text-yellow-600"
        },
        {
            icon: CreditCard,
            title: "Flexible Payment",
            description: "Net 30/60 terms available",
            color: "text-purple-600"
        },
        {
            icon: Users,
            title: "40,000+ Businesses",
            description: "Trust us for workwear",
            color: "text-orange-600"
        },
        {
            icon: CheckCircle,
            title: "CE Certified",
            description: "ISO 9001:2015 compliant",
            color: "text-teal-600"
        }
    ];

    return (
        <div className="py-8 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 bg-background rounded-lg hover:shadow-lg transition-shadow"
                        >
                            <badge.icon className={`w-8 h-8 mb-2 ${badge.color}`} />
                            <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
                            <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
