import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, Package, Truck, CreditCard, RefreshCw, Shield, Users } from "lucide-react";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        category: "Orders & Delivery",
        question: "What are your delivery times?",
        answer: "Standard UK delivery takes 3-5 working days. Express delivery (1-2 days) is available for an additional charge. Orders placed before 2pm are dispatched the same day.",
    },
    {
        category: "Orders & Delivery",
        question: "Do you offer free delivery?",
        answer: "Yes! We offer free standard UK delivery on all orders over £150. For orders under £150, delivery costs £5.99.",
    },
    {
        category: "Orders & Delivery",
        question: "Can I track my order?",
        answer: "Absolutely! Once your order is dispatched, you'll receive a tracking number via email. You can track your order in real-time through our website or the courier's tracking system.",
    },
    {
        category: "Orders & Delivery",
        question: "Do you deliver internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please contact our sales team for a quote.",
    },
    {
        category: "Returns & Refunds",
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, with proof of purchase. Custom or personalized items cannot be returned unless faulty.",
    },
    {
        category: "Returns & Refunds",
        question: "How do I return an item?",
        answer: "Contact our customer service team to initiate a return. We'll provide you with a return authorization number and instructions. Return shipping costs are the customer's responsibility unless the item is faulty.",
    },
    {
        category: "Returns & Refunds",
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 14 days of receiving your returned item. The refund will be issued to your original payment method.",
    },
    {
        category: "Products & Sizing",
        question: "How do I choose the right size?",
        answer: "We provide detailed size guides for all our products. You can find the size guide on each product page or access our comprehensive sizing chart in the footer. If you're unsure, contact our team for personalized advice.",
    },
    {
        category: "Products & Sizing",
        question: "Can I customize products with my company logo?",
        answer: "Yes! We offer embroidery and printing services for bulk orders. Contact our sales team with your requirements for a custom quote.",
    },
    {
        category: "Products & Sizing",
        question: "Are your products certified for safety?",
        answer: "Yes, all our safety wear and PPE equipment meets UK and EU safety standards. Product certifications are listed on individual product pages.",
    },
    {
        category: "Payment & Pricing",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for bulk orders. All payments are processed securely.",
    },
    {
        category: "Payment & Pricing",
        question: "Do you offer bulk discounts?",
        answer: "Yes! We offer competitive discounts for bulk orders. The more you buy, the more you save. Contact our sales team for a custom quote based on your requirements.",
    },
    {
        category: "Payment & Pricing",
        question: "Are prices inclusive of VAT?",
        answer: "Yes, all prices shown on our website include UK VAT at the current rate. VAT-registered businesses can reclaim VAT on eligible purchases.",
    },
    {
        category: "Account & Support",
        question: "Do I need an account to place an order?",
        answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save your wishlist, and checkout faster on future purchases.",
    },
    {
        category: "Account & Support",
        question: "How can I contact customer support?",
        answer: "You can reach us by phone (0800 123 4567) Monday-Friday 9am-5pm, email (sales@unifab.co.uk) 24/7, or through our contact form. We aim to respond within 24 hours.",
    },
    {
        category: "Account & Support",
        question: "Can I cancel or modify my order?",
        answer: "Orders can be cancelled or modified within 2 hours of placement. After this time, the order may have already been dispatched. Contact us immediately if you need to make changes.",
    },
];

const categories = [
    { name: "All", icon: HelpCircle },
    { name: "Orders & Delivery", icon: Truck },
    { name: "Returns & Refunds", icon: RefreshCw },
    { name: "Products & Sizing", icon: Package },
    { name: "Payment & Pricing", icon: CreditCard },
    { name: "Account & Support", icon: Users },
];

const FAQ = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = selectedCategory === "All"
        ? faqData
        : faqData.filter((faq) => faq.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="glass-gold inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 shadow-depth-sm">
                            <HelpCircle className="w-4 h-4" />
                            Help Center
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Find answers to common questions about our products, orders, and services.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`glass px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-depth-sm hover:shadow-depth-md ${selectedCategory === category.name
                                            ? "bg-primary text-white"
                                            : "hover:bg-secondary"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <div key={index} className="card-3d overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1 block">
                                            {faq.category}
                                        </span>
                                        <h3 className="font-semibold text-foreground">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-4 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="glass-gold p-8 rounded-xl mt-12 text-center shadow-depth-lg">
                        <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                            Still Have Questions?
                        </h2>
                        <p className="text-foreground/80 mb-6">
                            Our customer support team is here to help you with any questions or concerns.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact">
                                <button className="glass px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md">
                                    Contact Support
                                </button>
                            </a>
                            <a href="tel:08001234567">
                                <button className="glass px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md">
                                    Call: 0800 123 4567
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
