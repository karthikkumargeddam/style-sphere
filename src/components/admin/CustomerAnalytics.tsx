import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    Users,
    ShoppingCart,
    Star,
    MessageSquare,
    Gift,
    Mail,
    Award,
    DollarSign,
    Package,
    Eye,
    Heart,
    Share2,
    AlertCircle
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const CustomerAnalytics = () => {
    const [timeRange, setTimeRange] = useState("7d");

    // Mock real-time data (in production, this would come from your backend)
    const dashboardStats = {
        totalCustomers: 12847,
        activeToday: 342,
        newThisWeek: 156,
        totalRevenue: 284950,
        averageOrderValue: 127.50,
        conversionRate: 3.8,
        customerLifetimeValue: 456.80
    };

    const recentReviews = [
        {
            id: 1,
            customer: "John Smith",
            product: "Professional Work Polo",
            rating: 5,
            comment: "Excellent quality!",
            date: "2 hours ago",
            verified: true
        },
        {
            id: 2,
            customer: "Sarah Johnson",
            product: "Hi-Vis Safety Vest",
            rating: 4,
            comment: "Great value for money",
            date: "5 hours ago",
            verified: true
        },
        {
            id: 3,
            customer: "Mike Chen",
            product: "Steel Toe Boots",
            rating: 5,
            comment: "Perfect fit, very comfortable",
            date: "1 day ago",
            verified: true
        }
    ];

    const referralActivity = [
        {
            referrer: "Emma Williams",
            referred: "David Brown",
            status: "Completed",
            reward: "£50",
            date: "Today"
        },
        {
            referrer: "Tom Harris",
            referred: "Lisa Taylor",
            status: "Pending",
            reward: "£50",
            date: "Yesterday"
        },
        {
            referrer: "James Wilson",
            referred: "Anna Davis",
            status: "Completed",
            reward: "£50",
            date: "2 days ago"
        }
    ];

    const newsletterStats = {
        totalSubscribers: 8456,
        newToday: 23,
        openRate: 42.5,
        clickRate: 18.3,
        unsubscribeRate: 0.8
    };

    const loyaltyProgramStats = {
        totalMembers: 5234,
        bronze: 3421,
        silver: 1245,
        gold: 456,
        platinum: 112,
        pointsIssued: 1245678,
        pointsRedeemed: 456789
    };

    const salesData = [
        { date: "Mon", sales: 4200, orders: 34 },
        { date: "Tue", sales: 5800, orders: 45 },
        { date: "Wed", sales: 4500, orders: 38 },
        { date: "Thu", sales: 6200, orders: 52 },
        { date: "Fri", sales: 7800, orders: 61 },
        { date: "Sat", sales: 5200, orders: 42 },
        { date: "Sun", sales: 3900, orders: 31 }
    ];

    const categoryData = [
        { name: "Workwear", value: 35, color: "#3b82f6" },
        { name: "Hi-Vis", value: 25, color: "#f59e0b" },
        { name: "Safety Boots", value: 20, color: "#10b981" },
        { name: "Corporate", value: 12, color: "#8b5cf6" },
        { name: "Other", value: 8, color: "#6b7280" }
    ];

    const customerEngagement = [
        { metric: "Product Views", count: 15234, change: "+12%" },
        { metric: "Add to Cart", count: 2456, change: "+8%" },
        { metric: "Wishlist Adds", count: 892, change: "+15%" },
        { metric: "Quote Requests", count: 234, change: "+22%" }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Customer Analytics</h2>
                    <p className="text-muted-foreground">Real-time insights into customer behavior</p>
                </div>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Total Customers</p>
                        <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold">{dashboardStats.totalCustomers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">+{dashboardStats.newThisWeek} this week</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold">£{dashboardStats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">+18% vs last week</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Avg Order Value</p>
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold">£{dashboardStats.averageOrderValue}</p>
                    <p className="text-sm text-green-600 mt-1">+5% vs last week</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold">{dashboardStats.conversionRate}%</p>
                    <p className="text-sm text-green-600 mt-1">+0.4% vs last week</p>
                </Card>
            </div>

            {/* Tabs for Different Analytics */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="referrals">Referrals</TabsTrigger>
                    <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                    <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Sales Chart */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Sales Trend (7 Days)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Category Distribution */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Sales by Category</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>

                    {/* Customer Engagement Metrics */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Customer Engagement</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {customerEngagement.map((item) => (
                                <div key={item.metric} className="p-4 bg-secondary/20 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">{item.metric}</p>
                                    <p className="text-2xl font-bold">{item.count.toLocaleString()}</p>
                                    <p className="text-sm text-green-600 mt-1">{item.change}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <p className="text-sm text-muted-foreground">Average Rating</p>
                            </div>
                            <p className="text-3xl font-bold">4.8</p>
                            <p className="text-sm text-muted-foreground mt-1">Based on 1,234 reviews</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                <p className="text-sm text-muted-foreground">New Reviews</p>
                            </div>
                            <p className="text-3xl font-bold">23</p>
                            <p className="text-sm text-green-600 mt-1">+12 vs yesterday</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                                <p className="text-sm text-muted-foreground">Pending Approval</p>
                            </div>
                            <p className="text-3xl font-bold">5</p>
                            <p className="text-sm text-muted-foreground mt-1">Requires attention</p>
                        </Card>
                    </div>

                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recent Reviews</h3>
                        <div className="space-y-4">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="p-4 border rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{review.customer}</p>
                                                {review.verified && (
                                                    <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.product}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm mb-2">{review.comment}</p>
                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                {/* Referrals Tab */}
                <TabsContent value="referrals" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Share2 className="w-5 h-5 text-purple-600" />
                                <p className="text-sm text-muted-foreground">Total Referrals</p>
                            </div>
                            <p className="text-3xl font-bold">456</p>
                            <p className="text-sm text-green-600 mt-1">+34 this month</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Gift className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-muted-foreground">Rewards Issued</p>
                            </div>
                            <p className="text-3xl font-bold">£22,800</p>
                            <p className="text-sm text-muted-foreground mt-1">456 × £50</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                            </div>
                            <p className="text-3xl font-bold">68%</p>
                            <p className="text-sm text-green-600 mt-1">+5% vs last month</p>
                        </Card>
                    </div>

                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recent Referral Activity</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Referrer</th>
                                        <th className="text-left py-2">Referred</th>
                                        <th className="text-left py-2">Status</th>
                                        <th className="text-left py-2">Reward</th>
                                        <th className="text-left py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referralActivity.map((ref, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-3">{ref.referrer}</td>
                                            <td className="py-3">{ref.referred}</td>
                                            <td className="py-3">
                                                <Badge variant={ref.status === "Completed" ? "default" : "outline"}>
                                                    {ref.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3">{ref.reward}</td>
                                            <td className="py-3 text-muted-foreground">{ref.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </TabsContent>

                {/* Newsletter Tab */}
                <TabsContent value="newsletter" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <p className="text-sm text-muted-foreground">Subscribers</p>
                            </div>
                            <p className="text-3xl font-bold">{newsletterStats.totalSubscribers.toLocaleString()}</p>
                            <p className="text-sm text-green-600 mt-1">+{newsletterStats.newToday} today</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Eye className="w-5 h-5 text-purple-600" />
                                <p className="text-sm text-muted-foreground">Open Rate</p>
                            </div>
                            <p className="text-3xl font-bold">{newsletterStats.openRate}%</p>
                            <p className="text-sm text-muted-foreground mt-1">Industry avg: 35%</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-muted-foreground">Click Rate</p>
                            </div>
                            <p className="text-3xl font-bold">{newsletterStats.clickRate}%</p>
                            <p className="text-sm text-muted-foreground mt-1">Industry avg: 12%</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                                <p className="text-sm text-muted-foreground">Unsubscribe Rate</p>
                            </div>
                            <p className="text-3xl font-bold">{newsletterStats.unsubscribeRate}%</p>
                            <p className="text-sm text-green-600 mt-1">Below 1% target</p>
                        </Card>
                    </div>
                </TabsContent>

                {/* Loyalty Tab */}
                <TabsContent value="loyalty" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Membership Distribution</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">Bronze</span>
                                        <span className="text-sm font-semibold">{loyaltyProgramStats.bronze}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-orange-500 h-2 rounded-full"
                                            style={{ width: `${(loyaltyProgramStats.bronze / loyaltyProgramStats.totalMembers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">Silver</span>
                                        <span className="text-sm font-semibold">{loyaltyProgramStats.silver}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gray-400 h-2 rounded-full"
                                            style={{ width: `${(loyaltyProgramStats.silver / loyaltyProgramStats.totalMembers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">Gold</span>
                                        <span className="text-sm font-semibold">{loyaltyProgramStats.gold}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-500 h-2 rounded-full"
                                            style={{ width: `${(loyaltyProgramStats.gold / loyaltyProgramStats.totalMembers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">Platinum</span>
                                        <span className="text-sm font-semibold">{loyaltyProgramStats.platinum}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${(loyaltyProgramStats.platinum / loyaltyProgramStats.totalMembers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Points Activity</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Points Issued</p>
                                    <p className="text-2xl font-bold">{loyaltyProgramStats.pointsIssued.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Points Redeemed</p>
                                    <p className="text-2xl font-bold">{loyaltyProgramStats.pointsRedeemed.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Redemption Rate</p>
                                    <p className="text-2xl font-bold">
                                        {((loyaltyProgramStats.pointsRedeemed / loyaltyProgramStats.pointsIssued) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Engagement Tab */}
                <TabsContent value="engagement" className="space-y-4">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Customer Engagement Funnel</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={customerEngagement}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Heart className="w-5 h-5 text-red-600" />
                                <p className="text-sm text-muted-foreground">Wishlist Items</p>
                            </div>
                            <p className="text-3xl font-bold">892</p>
                            <p className="text-sm text-green-600 mt-1">+15% this week</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Package className="w-5 h-5 text-blue-600" />
                                <p className="text-sm text-muted-foreground">Quote Requests</p>
                            </div>
                            <p className="text-3xl font-bold">234</p>
                            <p className="text-sm text-green-600 mt-1">+22% this week</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-5 h-5 text-yellow-600" />
                                <p className="text-sm text-muted-foreground">Repeat Customers</p>
                            </div>
                            <p className="text-3xl font-bold">42%</p>
                            <p className="text-sm text-green-600 mt-1">+3% vs last month</p>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CustomerAnalytics;
