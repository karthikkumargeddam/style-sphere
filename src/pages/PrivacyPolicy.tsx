import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="glass-gold p-8 rounded-xl mb-12 shadow-depth-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <Shield className="w-12 h-12 text-primary" />
                            <div>
                                <h1 className="font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
                                <p className="text-foreground/70 mt-2">Last updated: December 31, 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="card-3d p-8 space-y-8">
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Eye className="w-6 h-6 text-primary" />
                                Introduction
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                UniFab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                        <li>Name, email address, and phone number</li>
                                        <li>Billing and shipping addresses</li>
                                        <li>Payment information (processed securely by our payment providers)</li>
                                        <li>Order history and preferences</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                        <li>IP address and browser type</li>
                                        <li>Device information and operating system</li>
                                        <li>Pages visited and time spent on our site</li>
                                        <li>Referring website addresses</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Respond to customer service requests</li>
                                <li>Improve our website and services</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Detect and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lock className="w-6 h-6 text-primary" />
                                Data Security
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Under GDPR and UK data protection laws, you have the right to:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Request data portability</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies and similar tracking technologies to improve your browsing experience. See our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a> for more information.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We may share your information with trusted third-party service providers who assist us in:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                <li>Payment processing (Stripe, PayPal)</li>
                                <li>Shipping and delivery</li>
                                <li>Email marketing (with your consent)</li>
                                <li>Analytics and website optimization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
                            </p>
                            <div className="glass p-4 rounded-lg mt-4">
                                <p className="text-foreground"><strong>Email:</strong> privacy@unifab.co.uk</p>
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

export default PrivacyPolicy;
