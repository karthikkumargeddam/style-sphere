import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie, Settings, Info, CheckCircle } from "lucide-react";

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="glass-gold p-8 rounded-xl mb-12 shadow-depth-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <Cookie className="w-12 h-12 text-primary" />
                            <div>
                                <h1 className="font-display text-4xl font-bold text-foreground">Cookie Policy</h1>
                                <p className="text-foreground/70 mt-2">Last updated: December 31, 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="card-3d p-8 space-y-8">
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Info className="w-6 h-6 text-primary" />
                                What Are Cookies?
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>

                            <div className="space-y-6">
                                <div className="glass p-6 rounded-lg">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        Essential Cookies
                                    </h3>
                                    <p className="text-muted-foreground mb-3">
                                        These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Examples:</strong> Session cookies, authentication cookies, shopping cart cookies
                                    </p>
                                </div>

                                <div className="glass p-6 rounded-lg">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-blue-400" />
                                        Functional Cookies
                                    </h3>
                                    <p className="text-muted-foreground mb-3">
                                        These cookies allow us to remember your preferences and provide enhanced, personalized features.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Examples:</strong> Language preferences, region settings, display preferences
                                    </p>
                                </div>

                                <div className="glass p-6 rounded-lg">
                                    <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                                    <p className="text-muted-foreground mb-3">
                                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Examples:</strong> Google Analytics, page view tracking, user behavior analysis
                                    </p>
                                </div>

                                <div className="glass p-6 rounded-lg">
                                    <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                                    <p className="text-muted-foreground mb-3">
                                        These cookies track your browsing habits to deliver advertisements that are relevant to you and your interests.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Examples:</strong> Retargeting pixels, social media cookies, advertising network cookies
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Third-Party Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We may use third-party services that set cookies on your device. These include:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                                <li><strong>Payment Processors:</strong> Stripe and PayPal for secure payment processing</li>
                                <li><strong>Social Media:</strong> Facebook, Instagram, and TikTok for social sharing features</li>
                                <li><strong>Marketing Tools:</strong> Email marketing and advertising platforms</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Managing Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                You can control and manage cookies in several ways:
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Check your browser's help section for instructions.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Cookie Preferences</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You can manage your cookie preferences through our cookie consent banner that appears when you first visit our site.
                                    </p>
                                </div>

                                <div className="glass-gold p-4 rounded-lg">
                                    <p className="text-foreground text-sm">
                                        <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and limit your user experience.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cookie Duration</h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Session Cookies</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Temporary cookies that are deleted when you close your browser
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Persistent Cookies</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Remain on your device for a set period or until you delete them manually
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Updates to This Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. Please check this page periodically for updates.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                If you have questions about our use of cookies, please contact us:
                            </p>
                            <div className="glass p-4 rounded-lg">
                                <p className="text-foreground"><strong>Email:</strong> privacy@unifab.co.uk</p>
                                <p className="text-foreground"><strong>Phone:</strong> 0800 123 4567</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CookiePolicy;
