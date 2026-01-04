import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Download, RefreshCw } from "lucide-react";

const OrderDetail = () => {
    const { orderId } = useParams();

    // Mock order data - in real app, fetch from API
    const order = {
        id: orderId || "ORD-2024-001",
        date: "2024-12-28",
        status: "Delivered",
        total: 234.99,
        subtotal: 199.99,
        shipping: 10.00,
        tax: 25.00,
        shippingAddress: {
            name: "John Smith",
            street: "123 Business Street",
            city: "London",
            postcode: "SW1A 1AA",
            country: "United Kingdom"
        },
        items: [
            {
                id: 1,
                name: "Hi-Vis Safety Jacket",
                quantity: 2,
                price: 49.99,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80"
            },
            {
                id: 2,
                name: "Work Trousers",
                quantity: 3,
                price: 33.34,
                image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80"
            }
        ],
        tracking: {
            number: "TRK123456789",
            carrier: "Royal Mail",
            estimatedDelivery: "2024-12-30"
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <Link
                        to="/profile/dashboard"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    {/* Order Header */}
                    <div className="card-3d p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                                    Order {order.id}
                                </h1>
                                <p className="text-muted-foreground">
                                    Placed on {order.date}
                                </p>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === "Delivered"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-blue-500/20 text-blue-500"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Tracking Info */}
                        {order.tracking && (
                            <div className="glass p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-foreground">Tracking Information</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Carrier: {order.tracking.carrier}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Tracking Number: {order.tracking.number}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Estimated Delivery: {order.tracking.estimatedDelivery}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="md:col-span-2">
                            <div className="card-3d p-6">
                                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Order Items
                                </h2>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-foreground">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-foreground mt-1">
                                                    £{item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">
                                                    £{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary & Address */}
                        <div className="space-y-6">
                            {/* Shipping Address */}
                            <div className="card-3d p-6">
                                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Shipping Address
                                </h2>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p className="font-semibold text-foreground">{order.shippingAddress.name}</p>
                                    <p>{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}</p>
                                    <p>{order.shippingAddress.postcode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="card-3d p-6">
                                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Order Summary
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground">£{order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-foreground">£{order.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="text-foreground">£{order.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-border pt-2 mt-2">
                                        <div className="flex justify-between font-bold">
                                            <span className="text-foreground">Total</span>
                                            <span className="text-primary">£{order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-border pt-4 mt-4 space-y-3">
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            onClick={() => toast.success("Items added to cart", { description: "Redirecting to cart checkout..." })}
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Reorder Items
                                        </Button>
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() => toast.success("Downloading Invoice", { description: `Invoice #${order.id}.pdf has been saved` })}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Invoice
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetail;
