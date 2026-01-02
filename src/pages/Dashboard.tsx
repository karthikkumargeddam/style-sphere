import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, MapPin, Settings, Award, TrendingUp, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
    // Mock user data
    const user = {
        name: "John Smith",
        email: "john.smith@company.com",
        loyaltyPoints: 1250,
        tier: "Silver",
    };

    const recentOrders = [
        { id: "ORD-2024-001", date: "2024-12-28", total: 234.99, status: "Delivered" },
        { id: "ORD-2024-002", date: "2024-12-15", total: 189.50, status: "In Transit" },
        { id: "ORD-2024-003", date: "2024-12-01", total: 456.75, status: "Delivered" },
    ];

    const stats = [
        { label: "Total Orders", value: "24", icon: ShoppingBag, color: "text-blue-500" },
        { label: "Loyalty Points", value: user.loyaltyPoints, icon: Award, color: "text-primary" },
        { label: "Saved Addresses", value: "3", icon: MapPin, color: "text-green-500" },
        { label: "Total Spent", value: "£2,450", icon: TrendingUp, color: "text-purple-500" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your orders, addresses, and account settings
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="card-3d p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-1">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                Quick Actions
                            </h2>
                            <div className="space-y-3">
                                <Link
                                    to="/profile/orders"
                                    className="card-3d p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <Package className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Order History</h3>
                                        <p className="text-sm text-muted-foreground">View all orders</p>
                                    </div>
                                </Link>

                                <Link
                                    to="/profile/addresses"
                                    className="card-3d p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Saved Addresses</h3>
                                        <p className="text-sm text-muted-foreground">Manage addresses</p>
                                    </div>
                                </Link>

                                <Link
                                    to="/profile/settings"
                                    className="card-3d p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <Settings className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Account Settings</h3>
                                        <p className="text-sm text-muted-foreground">Update profile</p>
                                    </div>
                                </Link>

                                <Link
                                    to="/profile/rewards"
                                    className="card-3d p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <Award className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Loyalty Rewards</h3>
                                        <p className="text-sm text-muted-foreground">{user.tier} Member</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display text-2xl font-bold text-foreground">
                                    Recent Orders
                                </h2>
                                <Link
                                    to="/profile/orders"
                                    className="text-sm text-primary hover:underline"
                                >
                                    View All
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="card-3d p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-foreground">{order.id}</h3>
                                                <p className="text-sm text-muted-foreground">{order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">£{order.total}</p>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${order.status === "Delivered"
                                                            ? "bg-green-500/20 text-green-500"
                                                            : "bg-blue-500/20 text-blue-500"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/profile/orders/${order.id}`}
                                                className="flex-1 glass px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-primary hover:text-white transition-colors"
                                            >
                                                View Details
                                            </Link>
                                            {order.status === "Delivered" && (
                                                <button className="flex-1 glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                                    Reorder
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Loyalty Card */}
                            <div className="card-3d p-6 mt-6 bg-gradient-to-br from-primary/20 to-purple-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-foreground">
                                            {user.tier} Member
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Loyalty Program</p>
                                    </div>
                                    <Award className="w-12 h-12 text-primary" />
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Points</span>
                                        <span className="font-semibold text-foreground">
                                            {user.loyaltyPoints} / 2000
                                        </span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-purple-600"
                                            style={{ width: `${(user.loyaltyPoints / 2000) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {2000 - user.loyaltyPoints} points to Gold tier
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

export default Dashboard;
