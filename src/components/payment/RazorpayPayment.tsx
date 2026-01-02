import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface RazorpayPaymentProps {
    amount: number; // Amount in INR
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    onSuccess: (paymentId: string, orderId: string, signature: string) => void;
    onFailure: (error: any) => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const RazorpayPayment = ({
    amount,
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    onSuccess,
    onFailure
}: RazorpayPaymentProps) => {
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'netbanking'>('card');

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        // Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            toast.error('Failed to load payment gateway');
            setLoading(false);
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: Math.round(amount * 100), // Convert to paise
            currency: 'INR',
            name: 'Style Sphere',
            description: `Order #${orderId}`,
            order_id: orderId,
            handler: function (response: any) {
                // Payment successful
                onSuccess(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature
                );
                toast.success('Payment successful!');
                setLoading(false);
            },
            prefill: {
                name: customerName,
                email: customerEmail,
                contact: customerPhone
            },
            notes: {
                order_id: orderId
            },
            theme: {
                color: '#3b82f6'
            },
            method: {
                card: selectedMethod === 'card',
                upi: selectedMethod === 'upi',
                netbanking: selectedMethod === 'netbanking'
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                    toast.error('Payment cancelled');
                }
            }
        };

        try {
            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response: any) {
                onFailure(response.error);
                toast.error('Payment failed: ' + response.error.description);
                setLoading(false);
            });
            razorpay.open();
        } catch (error) {
            console.error('Razorpay error:', error);
            onFailure(error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card Payment */}
                    <Card
                        className={`p-4 cursor-pointer transition-all ${selectedMethod === 'card'
                                ? 'border-primary border-2 bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                        onClick={() => setSelectedMethod('card')}
                    >
                        <div className="flex flex-col items-center text-center space-y-2">
                            <CreditCard className={`w-8 h-8 ${selectedMethod === 'card' ? 'text-primary' : ''}`} />
                            <div>
                                <p className="font-semibold">Debit/Credit Card</p>
                                <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                            </div>
                        </div>
                    </Card>

                    {/* UPI Payment */}
                    <Card
                        className={`p-4 cursor-pointer transition-all ${selectedMethod === 'upi'
                                ? 'border-primary border-2 bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                        onClick={() => setSelectedMethod('upi')}
                    >
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Smartphone className={`w-8 h-8 ${selectedMethod === 'upi' ? 'text-primary' : ''}`} />
                            <div>
                                <p className="font-semibold">UPI</p>
                                <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
                            </div>
                        </div>
                    </Card>

                    {/* Net Banking */}
                    <Card
                        className={`p-4 cursor-pointer transition-all ${selectedMethod === 'netbanking'
                                ? 'border-primary border-2 bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                        onClick={() => setSelectedMethod('netbanking')}
                    >
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Building2 className={`w-8 h-8 ${selectedMethod === 'netbanking' ? 'text-primary' : ''}`} />
                            <div>
                                <p className="font-semibold">Net Banking</p>
                                <p className="text-xs text-muted-foreground">All major banks</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Payment Summary */}
            <Card className="p-6 bg-secondary/20">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID:</span>
                        <span className="font-semibold">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-primary">₹{amount.toFixed(2)}</span>
                    </div>
                </div>
            </Card>

            {/* Pay Button */}
            <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full h-12 text-lg"
                size="lg"
            >
                {loading ? (
                    <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processing...
                    </>
                ) : (
                    <>
                        Pay ₹{amount.toFixed(2)}
                    </>
                )}
            </Button>

            {/* Security Info */}
            <div className="text-center text-sm text-muted-foreground">
                <p>🔒 Secure payment powered by Razorpay</p>
                <p className="text-xs mt-1">Your payment information is encrypted and secure</p>
            </div>
        </div>
    );
};

export default RazorpayPayment;
