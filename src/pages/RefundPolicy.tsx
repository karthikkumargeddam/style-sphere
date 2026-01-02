import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package, RefreshCw, AlertCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Customer Protection</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Refund & Returns Policy
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Your satisfaction is our priority. Easy returns, fast refunds.
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="card-3d p-8 mb-12 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            60-Day Money-Back Guarantee
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">60 Days</p>
                                    <p className="text-sm text-muted-foreground">To return items</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Package className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Free Returns</p>
                                    <p className="text-sm text-muted-foreground">UK customers</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <RefreshCw className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">5-7 Days</p>
                                    <p className="text-sm text-muted-foreground">Refund processing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Return Eligibility */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-4">Return Eligibility</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Items We Accept for Return
                                    </h3>
                                    <ul className="space-y-2 ml-7 text-muted-foreground">
                                        <li>• Unworn, unwashed items in original packaging</li>
                                        <li>• Items with all original tags attached</li>
                                        <li>• Products purchased within the last 60 days</li>
                                        <li>• Standard (non-customized) workwear items</li>
                                        <li>• Faulty or damaged items (any time)</li>
                                    </ul>
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-orange-600" />
                                        Items We Cannot Accept
                                    </h3>
                                    <ul className="space-y-2 ml-7 text-muted-foreground">
                                        <li>• Custom embroidered or printed items (unless faulty)</li>
                                        <li>• Items worn, washed, or altered</li>
                                        <li>• Items without original packaging or tags</li>
                                        <li>• Hygiene-sensitive products (unless sealed/unopened)</li>
                                        <li>• Sale items marked as "Final Sale"</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* How to Return */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-6">How to Return Items</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-primary">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Contact Our Support Team</h3>
                                        <p className="text-muted-foreground">
                                            Email us at <a href="mailto:returns@unifab.co.uk" className="text-primary hover:underline">returns@unifab.co.uk</a> or
                                            call <a href="tel:+447123456789" className="text-primary hover:underline">+44 7123 456789</a> with
                                            your order number and reason for return.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-primary">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Receive Return Authorization</h3>
                                        <p className="text-muted-foreground">
                                            We'll send you a Return Authorization Number (RAN) and prepaid return label
                                            within 24 hours. For UK customers, returns are completely free.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-primary">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Pack Your Items</h3>
                                        <p className="text-muted-foreground">
                                            Securely pack items in original packaging (if possible). Include your RAN
                                            inside the package. Attach the prepaid return label to the outside.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-primary">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Ship Your Return</h3>
                                        <p className="text-muted-foreground">
                                            Drop off at any Royal Mail or courier location. You'll receive a tracking
                                            number to monitor your return. We recommend keeping proof of postage.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-primary">5</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Receive Your Refund</h3>
                                        <p className="text-muted-foreground">
                                            Once we receive and inspect your return (typically 2-3 days), we'll process
                                            your refund within 5-7 working days to your original payment method.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Refund Timeline */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-4">Refund Timeline</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                                    <span className="font-semibold">Return Received</span>
                                    <span className="text-muted-foreground">Day 0</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                                    <span className="font-semibold">Quality Inspection</span>
                                    <span className="text-muted-foreground">1-2 days</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                                    <span className="font-semibold">Refund Processed</span>
                                    <span className="text-muted-foreground">5-7 days</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                                    <span className="font-semibold">Funds in Your Account</span>
                                    <span className="text-muted-foreground">3-5 days (bank dependent)</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                Total time: Typically 10-14 days from when you ship the return
                            </p>
                        </section>

                        {/* Faulty Items */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-4">Faulty or Damaged Items</h2>
                            <p className="text-muted-foreground mb-4">
                                If you receive a faulty or damaged item, we'll make it right immediately:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>Free return shipping (we'll send a prepaid label)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>Full refund or free replacement (your choice)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>Priority processing (24-48 hours)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>No time limit on faulty item returns</span>
                                </li>
                            </ul>
                        </section>

                        {/* Exchanges */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-4">Exchanges</h2>
                            <p className="text-muted-foreground mb-4">
                                Need a different size or color? We make exchanges easy:
                            </p>
                            <ol className="space-y-3 text-muted-foreground">
                                <li>1. Return your original item following the standard return process</li>
                                <li>2. Place a new order for the item you want</li>
                                <li>3. We'll refund your original purchase once we receive the return</li>
                                <li>4. Use code <span className="font-mono font-semibold bg-primary/10 px-2 py-1 rounded">EXCHANGE10</span> for 10% off your new order</li>
                            </ol>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Tip:</strong> To avoid waiting for a refund, you can place the new order immediately
                                and return the original item separately.
                            </p>
                        </section>

                        {/* International Returns */}
                        <section className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold mb-4">International Returns</h2>
                            <p className="text-muted-foreground mb-4">
                                For orders shipped outside the UK:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>• Same 60-day return window applies</li>
                                <li>• Customer responsible for return shipping costs</li>
                                <li>• We recommend using tracked shipping service</li>
                                <li>• Customs duties/taxes are non-refundable</li>
                                <li>• Refund issued once item clears UK customs</li>
                            </ul>
                        </section>

                        {/* Contact Section */}
                        <section className="card-3d p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                            <h2 className="font-display text-2xl font-bold mb-4">Need Help?</h2>
                            <p className="text-muted-foreground mb-6">
                                Our customer service team is here to assist you with any return or refund questions.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="mailto:returns@unifab.co.uk">
                                    <Button variant="outline" className="w-full">
                                        <Mail className="w-4 h-4 mr-2" />
                                        returns@unifab.co.uk
                                    </Button>
                                </a>
                                <a href="tel:+447123456789">
                                    <Button variant="outline" className="w-full">
                                        <Phone className="w-4 h-4 mr-2" />
                                        +44 7123 456789
                                    </Button>
                                </a>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                Monday - Friday: 9am - 6pm GMT | Saturday: 10am - 4pm GMT
                            </p>
                        </section>

                        {/* Last Updated */}
                        <p className="text-sm text-muted-foreground text-center">
                            Last updated: January 2024
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RefundPolicy;
