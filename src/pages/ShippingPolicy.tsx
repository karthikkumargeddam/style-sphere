import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Package, CheckCircle, Globe } from "lucide-react";

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Delivery Information</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Shipping & Delivery Policy
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Fast, reliable delivery across the UK and beyond
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="card-3d p-8 mb-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                            <Truck className="w-6 h-6 text-blue-600" />
                            Delivery at a Glance
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">3-5 Days</p>
                                    <p className="text-sm text-muted-foreground">Standard delivery</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Free Over £150</p>
                                    <p className="text-sm text-muted-foreground">UK mainland</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Tracked</p>
                                    <p className="text-sm text-muted-foreground">All orders</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* UK Delivery Options */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-6">UK Delivery Options</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Standard Delivery</h3>
                                    <p className="text-sm text-muted-foreground">3-5 working days</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">£5.99</p>
                                    <p className="text-xs text-green-600">Free over £150</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Express Delivery</h3>
                                    <p className="text-sm text-muted-foreground">1-2 working days</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">£12.99</p>
                                    <p className="text-xs text-muted-foreground">Order by 2pm</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Next Day Delivery</h3>
                                    <p className="text-sm text-muted-foreground">Order by 2pm for next day</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">£19.99</p>
                                    <p className="text-xs text-muted-foreground">Mon-Fri only</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-lg bg-primary/5">
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Click & Collect
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Collect from our warehouse</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">FREE</p>
                                    <p className="text-xs text-muted-foreground">Ready in 2 hours</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* International Shipping */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                            <Globe className="w-6 h-6" />
                            International Shipping
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Ireland</h3>
                                    <p className="text-sm text-muted-foreground">5-7 working days</p>
                                </div>
                                <p className="font-bold">£9.99</p>
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">EU Countries</h3>
                                    <p className="text-sm text-muted-foreground">7-10 working days</p>
                                </div>
                                <p className="font-bold">£15.99</p>
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Rest of World</h3>
                                    <p className="text-sm text-muted-foreground">10-15 working days</p>
                                </div>
                                <p className="font-bold">From £24.99</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            * International customers are responsible for any customs duties or import taxes
                        </p>
                    </section>

                    {/* Custom Orders */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-4">Custom Embroidered Orders</h2>
                        <p className="text-muted-foreground mb-4">
                            Orders with custom embroidery or printing require additional processing time:
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Logo digitization:</strong> 1-2 working days (free for 50+ items)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Proof approval:</strong> 24 hours for customer review</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Embroidery production:</strong> 2-3 working days</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Total time:</strong> 5-7 working days + delivery time</span>
                            </li>
                        </ul>
                    </section>

                    {/* Order Tracking */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-4">Order Tracking</h2>
                        <p className="text-muted-foreground mb-4">
                            Stay updated on your order every step of the way:
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Order Confirmation</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Instant email with order details and estimated delivery date
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Processing Updates</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Email notifications when your order is being prepared
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Dispatch Notification</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Tracking number and courier details sent via email and SMS
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">4</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Real-Time Tracking</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Track your parcel online or through your account dashboard
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-primary">5</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Delivery Confirmation</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Notification when your order has been delivered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Areas */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-6 h-6" />
                            Delivery Coverage
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-3 text-green-600">✓ We Deliver To:</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• UK Mainland (all postcodes)</li>
                                    <li>• Northern Ireland</li>
                                    <li>• Scottish Highlands & Islands</li>
                                    <li>• Isle of Man</li>
                                    <li>• Isle of Wight</li>
                                    <li>• Channel Islands</li>
                                    <li>• Ireland (Republic)</li>
                                    <li>• EU Countries</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Special Delivery Notes:</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Scottish Highlands may take 1-2 extra days</li>
                                    <li>• Islands delivery +£5 surcharge</li>
                                    <li>• PO Box addresses accepted</li>
                                    <li>• Business addresses preferred for large orders</li>
                                    <li>• Safe place delivery available</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Bulk Orders */}
                    <section className="card-3d p-8 mb-8">
                        <h2 className="font-display text-2xl font-bold mb-4">Bulk Order Delivery</h2>
                        <p className="text-muted-foreground mb-4">
                            Special arrangements for large orders (100+ items):
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Free delivery on all bulk orders</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Scheduled delivery dates available</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Pallet delivery for orders over 500 items</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Dedicated account manager for coordination</span>
                            </li>
                        </ul>
                    </section>

                    {/* Important Information */}
                    <section className="card-3d p-8 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                        <h2 className="font-display text-2xl font-bold mb-4">Important Information</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Delivery times are estimates and not guaranteed</li>
                            <li>• Orders placed after 2pm will be processed the next working day</li>
                            <li>• Weekend and bank holiday orders processed on next working day</li>
                            <li>• Signature may be required for high-value orders</li>
                            <li>• We'll attempt delivery twice before returning to depot</li>
                            <li>• Contact us for same-day delivery in London (subject to availability)</li>
                        </ul>
                    </section>

                    {/* Last Updated */}
                    <p className="text-sm text-muted-foreground text-center">
                        Last updated: January 2024
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ShippingPolicy;
