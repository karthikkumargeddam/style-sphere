import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, AlertCircle, Scale, ShoppingCart } from "lucide-react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="glass-gold p-8 rounded-xl mb-12 shadow-depth-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <FileText className="w-12 h-12 text-primary" />
                            <div>
                                <h1 className="font-display text-4xl font-bold text-foreground">Terms of Service</h1>
                                <p className="text-foreground/70 mt-2">Last updated: December 31, 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="card-3d p-8 space-y-8">
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using UniFab's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6 text-primary" />
                                Orders and Payments
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Order Acceptance</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing, or suspected fraud.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Pricing</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        All prices are in GBP (£) and include VAT where applicable. We reserve the right to change prices at any time without notice. Prices shown at the time of order placement will be honored.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Payment</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We accept major credit cards, debit cards, and PayPal. Payment is processed securely through our payment providers. Full payment is required before order dispatch.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Shipping and Delivery</h2>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                <li>Standard UK delivery: 3-5 working days</li>
                                <li>Express delivery: 1-2 working days</li>
                                <li>Free delivery on orders over £150</li>
                                <li>International shipping available (additional charges apply)</li>
                                <li>Delivery times are estimates and not guaranteed</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Returns and Refunds</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    We offer a 30-day return policy for most items. To be eligible for a return:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Items must be unused and in original packaging</li>
                                    <li>Proof of purchase is required</li>
                                    <li>Custom or personalized items cannot be returned</li>
                                    <li>Return shipping costs are the customer's responsibility unless the item is faulty</li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed">
                                    Refunds will be processed within 14 days of receiving the returned item.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Product Information</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, colors, or other content are accurate, complete, or error-free. If a product is not as described, your sole remedy is to return it unused.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Scale className="w-6 h-6 text-primary" />
                                Limitation of Liability
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                UniFab shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products. Our total liability shall not exceed the amount paid by you for the product in question.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All content on this website, including text, graphics, logos, images, and software, is the property of UniFab and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <AlertCircle className="w-6 h-6 text-primary" />
                                Governing Law
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site after changes constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For questions about these Terms of Service, please contact us:
                            </p>
                            <div className="glass p-4 rounded-lg">
                                <p className="text-foreground"><strong>Email:</strong> legal@unifab.co.uk</p>
                                <p className="text-foreground"><strong>Phone:</strong> 0800 123 4567</p>
                                <p className="text-foreground"><strong>Address:</strong> UniFab Ltd, 123 Business Park, London, UK</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
