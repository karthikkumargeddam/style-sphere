import { TrendingUp, Users, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentlySoldProps {
    productId?: number;
    soldCount?: number;
    timeframe?: string;
}

const RecentlySold = ({
    productId,
    soldCount = Math.floor(Math.random() * 50) + 10,
    timeframe = "24 hours"
}: RecentlySoldProps) => {
    // Determine badge style based on sold count
    const getBadgeStyle = () => {
        if (soldCount >= 40) {
            return {
                bg: "bg-red-100 dark:bg-red-900/30",
                text: "text-red-700 dark:text-red-400",
                border: "border-red-300 dark:border-red-700",
                icon: TrendingUp,
                label: "🔥 Hot Seller"
            };
        }
        if (soldCount >= 20) {
            return {
                bg: "bg-orange-100 dark:bg-orange-900/30",
                text: "text-orange-700 dark:text-orange-400",
                border: "border-orange-300 dark:border-orange-700",
                icon: Package,
                label: "Popular"
            };
        }
        return {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-700 dark:text-blue-400",
            border: "border-blue-300 dark:border-blue-700",
            icon: Users,
            label: "Trending"
        };
    };

    const style = getBadgeStyle();
    const Icon = style.icon;

    return (
        <div className="space-y-2">
            {/* Badge */}
            <Badge
                variant="outline"
                className={`${style.bg} ${style.text} ${style.border} border`}
            >
                <Icon className="w-3 h-3 mr-1" />
                {style.label}
            </Badge>

            {/* Sales Info */}
            <div className={`flex items-center gap-2 p-3 ${style.bg} rounded-lg border ${style.border}`}>
                <Users className={`w-5 h-5 ${style.text}`} />
                <div>
                    <p className={`text-sm font-semibold ${style.text}`}>
                        {soldCount} sold in the last {timeframe}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Join {soldCount}+ satisfied customers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecentlySold;
