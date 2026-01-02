import { Shield, CheckCircle, Clock, Award } from "lucide-react";

const QualityGuarantee = () => {
    return (
        <div className="card-3d p-8">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                    <h3 className="font-display text-2xl font-bold">Quality Guarantee</h3>
                    <p className="text-muted-foreground">Our 60-Day Satisfaction Promise</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Guarantee Description */}
                <p className="text-foreground/90">
                    We stand behind the quality of our products. If you're not completely satisfied
                    with your purchase, we'll make it right within 60 days.
                </p>

                {/* How It Works */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        How It Works
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Step 1 */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                                1
                            </div>
                            <h5 className="font-semibold mb-2">Order with Confidence</h5>
                            <p className="text-sm text-muted-foreground">
                                Place your order knowing you're protected by our guarantee
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                                2
                            </div>
                            <h5 className="font-semibold mb-2">Try It Out</h5>
                            <p className="text-sm text-muted-foreground">
                                Use the products and ensure they meet your expectations
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">
                                3
                            </div>
                            <h5 className="font-semibold mb-2">We'll Make It Right</h5>
                            <p className="text-sm text-muted-foreground">
                                Not satisfied? Contact us for a replacement or refund
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-semibold">60-Day Guarantee</p>
                    </div>
                    <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-semibold">Quality Assured</p>
                    </div>
                    <div className="text-center">
                        <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-semibold">Premium Products</p>
                    </div>
                    <div className="text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-semibold">Satisfaction Guaranteed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualityGuarantee;
