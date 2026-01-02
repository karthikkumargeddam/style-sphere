import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Users,
    ShoppingBag,
    TrendingUp,
    Package,
    MessageSquare,
    Star,
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    BarChart3,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerAnalytics from "@/components/admin/CustomerAnalytics";
import SalesAnalytics from "@/components/admin/SalesAnalytics";

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState("7days");

    // Mock analytics data
    const stats = [
        {
            label: "Total Customers",
            value: "1,234",
            change: "+12%",
            trend: "up",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/20",
        },
        {
            label: "Total Orders",
            value: "856",
            change: "+8%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-green-500",
            bgColor: "bg-green-500/20",
        },
        {
            label: "Revenue",
            value: "£45,678",
            change: "+15%",
            trend: "up",
            icon: DollarSign,
            color: "text-primary",
            bgColor: "bg-primary/20",
        },
        {
            label: "Avg. Order Value",
            value: "£53.40",
            change: "+3%",
            trend: "up",
            icon: TrendingUp,
            color: "text-purple-500",
            bgColor: "bg-purple-500/20",
        },
    ];

    const recentOrders = [
        {
            id: "ORD-2024-089",
            customer: "John Smith",
            items: 3,
            total: 234.99,
            status: "Processing",
            date: "2024-12-28",
        },
        {
            id: "ORD-2024-088",
            customer: "Sarah Johnson",
            items: 5,
            total: 456.75,
            status: "Shipped",
            date: "2024-12-28",
        },
        {
            id: "ORD-2024-087",
            customer: "Mike Davis",
            items: 2,
            total: 189.50,
            status: "Delivered",
            date: "2024-12-27",
        },
    ];

    const customerRequests = [
        {
            id: 1,
            customer: "Emma Wilson",
            type: "Custom Quote",
            message: "Need 100 hi-vis jackets with company logo",
            priority: "high",
            date: "2024-12-28",
            status: "pending",
        },
        {
            id: 2,
            customer: "David Brown",
            type: "Size Guide",
            message: "Requesting size chart for work trousers",
            priority: "medium",
            date: "2024-12-28",
            status: "pending",
        },
        {
            id: 3,
            customer: "Lisa Anderson",
            type: "Return Request",
            message: "Wrong size received, need exchange",
            priority: "high",
            date: "2024-12-27",
            status: "resolved",
        },
    ];

    const topProducts = [
        { name: "Hi-Vis Safety Jacket", sales: 245, revenue: 8575 },
        { name: "Work Trousers", sales: 189, revenue: 5661 },
        { name: "Corporate Polo Shirt", sales: 156, revenue: 2962 },
        { name: "Safety Hard Hat", sales: 134, revenue: 1738 },
    ];

    const recentReviews = [
        {
            id: 1,
            customer: "Tom Harris",
            product: "Hi-Vis Safety Jacket",
            rating: 5,
            comment: "Excellent quality and fit!",
            date: "2024-12-28",
        },
        {
            id: 2,
            customer: "Rachel Green",
            product: "Work Trousers",
            rating: 4,
            comment: "Very good quality, runs slightly large",
            date: "2024-12-27",
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-500/20 text-red-500";
            case "medium":
                return "bg-orange-500/20 text-orange-500";
            case "low":
                return "bg-green-500/20 text-green-500";
            default:
                return "bg-gray-500/20 text-gray-500";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="w-4 h-4 text-orange-500" />;
            case "resolved":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Track customer needs, orders, and business analytics
                        </p>
                    </div>

                    {/* Tabs for Overview and Analytics */}
                    <Tabs defaultValue="overview" className="mb-8">
                        <TabsList className="mb-6">
                            <TabsTrigger value="overview" className="gap-2">
                                <Package className="w-4 h-4" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="sales" className="gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Sales Intelligence
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Customer Analytics
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="card-3d p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                            <span className="text-sm font-medium text-green-500">
                                                {stat.change}
                                            </span>
                                        </div>
                                        <p className="text-3xl font-bold text-foreground mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                {/* Customer Requests */}
                                <div className="card-3d p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-display text-2xl font-bold text-foreground">
                                            Customer Requests
                                        </h2>
                                        <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-medium">
                                            {customerRequests.filter((r) => r.status === "pending").length} Pending
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {customerRequests.map((request) => (
                                            <div key={request.id} className="glass p-4 rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(request.status)}
                                                        <h3 className="font-semibold text-foreground">
                                                            {request.customer}
                                                        </h3>
                                                    </div>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                                            request.priority
                                                        )}`}
                                                    >
                                                        {request.priority}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {request.type}
                                                </p>
                                                <p className="text-sm text-foreground mb-2">
                                                    "{request.message}"
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        {request.date}
                                                    </span>
                                                    {request.status === "pending" && (
                                                        <button className="text-xs text-primary hover:underline">
                                                            Respond
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className="card-3d p-6">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                        Recent Orders
                                    </h2>

                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="glass p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-foreground">
                                                        {order.id}
                                                    </h3>
                                                    <span className="text-lg font-bold text-foreground">
                                                        £{order.total}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Customer: {order.customer}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        {order.items} items • {order.date}
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs">
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Top Products */}
                                <div className="card-3d p-6">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                        Top Products
                                    </h2>

                                    <div className="space-y-4">
                                        {topProducts.map((product, index) => (
                                            <div key={product.name} className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-bold text-primary">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {product.sales} sales • £{product.revenue} revenue
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Reviews */}
                                <div className="card-3d p-6">
                                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                        Recent Reviews
                                    </h2>

                                    <div className="space-y-4">
                                        {recentReviews.map((review) => (
                                            <div key={review.id} className="glass p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-foreground">
                                                        {review.customer}
                                                    </h3>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-4 h-4 fill-primary text-primary"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {review.product}
                                                </p>
                                                <p className="text-sm text-foreground mb-2">
                                                    "{review.comment}"
                                                </p>
                                                <span className="text-xs text-muted-foreground">
                                                    {review.date}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Sales Intelligence Tab */}
                        <TabsContent value="sales">
                            <SalesAnalytics />
                        </TabsContent>

                        {/* Analytics Tab */}
                        <TabsContent value="analytics">
                            <CustomerAnalytics />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
