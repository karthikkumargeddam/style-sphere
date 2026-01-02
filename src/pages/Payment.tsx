import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RazorpayPayment from '@/components/payment/RazorpayPayment';
import { CreditCard, Globe } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe'>('razorpay');

    // Mock order data (replace with actual cart data)
    const orderData = {
        orderId: 'ORD-2026-000001',
        amount: 949, // ₹899 product + ₹50 shipping
        customerName: 'Test User',
        customerEmail: 'test@example.com',
        customerPhone: '+919876543210'
    };

    const handleRazorpaySuccess = async (paymentId: string, orderId: string, signature: string) => {
        console.log('Payment Success:', { paymentId, orderId, signature });

        // TODO: Verify payment signature on backend
        // TODO: Update order status in database

        toast.success('Payment successful!');
        navigate('/checkout-success');
    };

    const handleRazorpayFailure = (error: any) => {
        console.error('Payment Failed:', error);
        toast.error('Payment failed. Please try again.');
    };

    const handleStripePayment = () => {
        // TODO: Implement Stripe payment
        toast.info('Stripe payment coming soon!');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Payment Methods */}
                        <div className="lg:col-span-2">
                            <Card className="p-6">
                                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                                    <TabsList className="grid w-full grid-cols-2 mb-6">
                                        <TabsTrigger value="razorpay" className="gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Indian Payments
                                        </TabsTrigger>
                                        <TabsTrigger value="stripe" className="gap-2">
                                            <Globe className="w-4 h-4" />
                                            International
                                        </TabsTrigger>
                                    </TabsList>

                                    {/* Razorpay Tab */}
                                    <TabsContent value="razorpay">
                                        <RazorpayPayment
                                            amount={orderData.amount}
                                            orderId={orderData.orderId}
                                            customerName={orderData.customerName}
                                            customerEmail={orderData.customerEmail}
                                            customerPhone={orderData.customerPhone}
                                            onSuccess={handleRazorpaySuccess}
                                            onFailure={handleRazorpayFailure}
                                        />
                                    </TabsContent>

                                    {/* Stripe Tab */}
                                    <TabsContent value="stripe">
                                        <div className="space-y-6">
                                            <div className="text-center py-12">
                                                <Globe className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                                <h3 className="text-lg font-semibold mb-2">International Payments</h3>
                                                <p className="text-muted-foreground mb-6">
                                                    Pay with Stripe for international cards
                                                </p>
                                                <Button onClick={handleStripePayment} size="lg">
                                                    Pay with Stripe
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24">
                                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹899.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>₹50.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Discount</span>
                                        <span className="text-green-600">-₹0.00</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">₹{orderData.amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-secondary/20 p-4 rounded-lg space-y-2">
                                    <p className="text-sm font-semibold">Order Details</p>
                                    <p className="text-xs text-muted-foreground">Order ID: {orderData.orderId}</p>
                                    <p className="text-xs text-muted-foreground">Items: 1</p>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>✓</span>
                                        <span>Secure payment</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>✓</span>
                                        <span>60-day money-back guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>✓</span>
                                        <span>Free shipping on orders over ₹999</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Accepted Payment Methods */}
                    <Card className="p-6 mt-8">
                        <h3 className="font-semibold mb-4">We Accept</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
                            <div className="text-sm font-semibold">UPI</div>
                            <div className="text-sm font-semibold">Net Banking</div>
                            <div className="text-sm font-semibold">RuPay</div>
                        </div>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Payment;
