import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, Search, Download, Eye, RefreshCw, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
    id: string;
    date: string;
    total: number;
    status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
    items: number;
    trackingNumber?: string;
}

const OrderHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Mock order data
    const orders: Order[] = [
        {
            id: "ORD-2024-001",
            date: "2024-12-28",
            total: 234.99,
            status: "Delivered",
            items: 3,
            trackingNumber: "TRK123456789",
        },
        {
            id: "ORD-2024-002",
            date: "2024-12-15",
            total: 189.50,
            status: "In Transit",
            items: 2,
            trackingNumber: "TRK987654321",
        },
        {
            id: "ORD-2024-003",
            date: "2024-12-01",
            total: 456.75,
            status: "Delivered",
            items: 5,
            trackingNumber: "TRK456789123",
        },
        {
            id: "ORD-2024-004",
            date: "2024-11-20",
            total: 125.00,
            status: "Processing",
            items: 1,
        },
        {
            id: "ORD-2024-005",
            date: "2024-11-10",
            total: 678.90,
            status: "Delivered",
            items: 8,
            trackingNumber: "TRK789123456",
        },
    ];

    const filteredOrders = orders
        .filter((order) =>
            filterStatus === "all" ? true : order.status === filterStatus
        )
        .filter((order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const getStatusIcon = (status: Order["status"]) => {
        switch (status) {
            case "Delivered":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "In Transit":
                return <Truck className="w-5 h-5 text-blue-500" />;
            case "Processing":
                return <Package className="w-5 h-5 text-orange-500" />;
            case "Cancelled":
                return <Package className="w-5 h-5 text-red-500" />;
        }
    };

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "Delivered":
                return "bg-green-500/20 text-green-500";
            case "In Transit":
                return "bg-blue-500/20 text-blue-500";
            case "Processing":
                return "bg-orange-500/20 text-orange-500";
            case "Cancelled":
                return "bg-red-500/20 text-red-500";
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
                            Order History
                        </h1>
                        <p className="text-muted-foreground">
                            View and manage all your orders
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="card-3d p-6 mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by order ID..."
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex gap-2 flex-wrap">
                                {["all", "Delivered", "In Transit", "Processing"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                                ? "bg-primary text-white"
                                                : "glass hover:bg-primary/20"
                                            }`}
                                    >
                                        {status === "all" ? "All Orders" : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="card-3d p-12 text-center">
                                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold text-foreground mb-2">No orders found</h3>
                                <p className="text-muted-foreground">
                                    {searchTerm
                                        ? "Try adjusting your search"
                                        : "You haven't placed any orders yet"}
                                </p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="card-3d p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                                        {/* Order Info */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                {getStatusIcon(order.status)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    {order.id}
                                                </h3>
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    <span>📅 {order.date}</span>
                                                    <span>📦 {order.items} items</span>
                                                    {order.trackingNumber && (
                                                        <span>🚚 {order.trackingNumber}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Price */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-foreground">
                                                    £{order.total.toFixed(2)}
                                                </p>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                                        <Link
                                            to={`/profile/orders/${order.id}`}
                                            className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </Link>

                                        {order.trackingNumber && (
                                            <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2">
                                                <Truck className="w-4 h-4" />
                                                Track Order
                                            </button>
                                        )}

                                        <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Invoice
                                        </button>

                                        {order.status === "Delivered" && (
                                            <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2">
                                                <RefreshCw className="w-4 h-4" />
                                                Reorder
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary */}
                    {filteredOrders.length > 0 && (
                        <div className="card-3d p-6 mt-8">
                            <div className="grid sm:grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        {filteredOrders.length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total Orders</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        £
                                        {filteredOrders
                                            .reduce((sum, order) => sum + order.total, 0)
                                            .toFixed(2)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        {filteredOrders.filter((o) => o.status === "Delivered").length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Delivered</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderHistory;
