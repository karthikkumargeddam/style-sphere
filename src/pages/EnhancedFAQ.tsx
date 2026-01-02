import { useState } from "react";
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EnhancedFAQ = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const categories = ["all", "Orders", "Shipping", "Returns", "Products", "Customization", "Pricing"];

    const faqs = [
        {
            id: 1,
            category: "Orders",
            question: "How do I place a bulk order?",
            answer: "For bulk orders (25+ items), you can either add products to your cart normally or request a custom quote through our Quote page. Bulk orders qualify for tiered discounts up to 25% off. Our team will contact you within 24 hours to confirm details and provide a final quote."
        },
        {
            id: 2,
            category: "Shipping",
            question: "What are your delivery times?",
            answer: "Standard delivery takes 3-5 working days. Express delivery (1-2 days) is available for an additional fee. Orders over £150 qualify for free standard delivery. Custom embroidered items may take an additional 2-3 days for processing."
        },
        {
            id: 3,
            category: "Returns",
            question: "What is your return policy?",
            answer: "We offer a 60-day money-back guarantee on all products. Items must be unworn, unwashed, and in original packaging. Custom embroidered items cannot be returned unless faulty. Return shipping is free for UK customers. Simply contact our support team to initiate a return."
        },
        {
            id: 4,
            category: "Products",
            question: "Are your products CE certified?",
            answer: "Yes, all our safety workwear and PPE equipment is CE certified and complies with UK safety standards including ISO 9001:2015. Each product page lists specific certifications. We can provide certification documents upon request for compliance purposes."
        },
        {
            id: 5,
            category: "Customization",
            question: "How does logo embroidery work?",
            answer: "Upload your logo during checkout or use our Embroidery Designer tool. We accept JPG, PNG, PDF, and AI files. Our team will digitize your logo (free for orders 50+) and send a proof within 24 hours. Embroidery typically adds 2-3 days to delivery time. Pricing starts from £3 per item."
        },
        {
            id: 6,
            category: "Pricing",
            question: "Do you offer volume discounts?",
            answer: "Yes! We have 6 pricing tiers: 25+ items (5% off), 50+ items (10% off), 100+ items (15% off), 250+ items (20% off), 500+ items (25% off). Discounts apply automatically at checkout. Use our Bulk Discount Calculator on product pages to see your savings."
        },
        {
            id: 7,
            category: "Orders",
            question: "Can I track my order?",
            answer: "Yes, you'll receive a tracking number via email once your order ships. You can track your order in real-time through your account dashboard or using the tracking link in your shipping confirmation email. For custom orders, we'll provide updates at each stage."
        },
        {
            id: 8,
            category: "Shipping",
            question: "Do you ship internationally?",
            answer: "Currently, we ship to UK, Ireland, and select EU countries. International shipping costs are calculated at checkout based on destination and weight. Delivery times vary by location (5-10 working days for EU). Contact us for shipping to other countries."
        },
        {
            id: 9,
            category: "Products",
            question: "How do I choose the right size?",
            answer: "Use our Size Recommendation Tool on product pages. Enter your height, weight, and fit preference to get a personalized size suggestion. Each product page also includes detailed size charts with measurements. If between sizes, we recommend sizing up for comfort."
        },
        {
            id: 10,
            category: "Customization",
            question: "Can I order samples before bulk purchase?",
            answer: "Yes! We offer a Free Sample Program for businesses. Request up to 3 sample items to check quality, fit, and color before placing a large order. Samples are free, you only pay shipping (£5.99). Apply through our Free Sample Program page."
        },
        {
            id: 11,
            category: "Pricing",
            question: "Do you offer payment terms for businesses?",
            answer: "Yes, we offer Net 30 and Net 60 payment terms for approved business accounts. Apply through our Corporate Account Portal. Requirements include: registered business, minimum order value £500, and credit check approval. Processing takes 2-3 business days."
        },
        {
            id: 12,
            category: "Returns",
            question: "How long do refunds take?",
            answer: "Refunds are processed within 5-7 working days of receiving your return. The refund will be issued to your original payment method. You'll receive an email confirmation once the refund is processed. Bank processing times may vary (typically 3-5 days)."
        },
        {
            id: 13,
            category: "Orders",
            question: "Can I modify my order after placing it?",
            answer: "Orders can be modified within 2 hours of placement. Contact our support team immediately via live chat, WhatsApp, or phone. After 2 hours, orders enter processing and cannot be changed. For custom embroidery orders, changes cannot be made after proof approval."
        },
        {
            id: 14,
            category: "Products",
            question: "How do I care for my workwear?",
            answer: "Most items are machine washable at 40°C. Check individual product care labels for specific instructions. Hi-vis items should be washed inside-out to preserve reflective properties. Avoid bleach and fabric softener. Tumble dry on low heat. See our blog for detailed care guides."
        },
        {
            id: 15,
            category: "Customization",
            question: "What's the minimum order for custom embroidery?",
            answer: "No minimum! We offer embroidery on single items. However, setup fees are waived for orders of 50+ items, making bulk orders more cost-effective. Pricing: 1-49 items (£5 setup + £3/item), 50+ items (free setup + £2.50/item)."
        }
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleItem = (id: number) => {
        setExpandedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Help Center</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Find answers to common questions about our products and services
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 text-lg"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary hover:bg-secondary/80'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
                    </p>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFAQs.map((faq) => {
                            const isExpanded = expandedItems.includes(faq.id);

                            return (
                                <div
                                    key={faq.id}
                                    className="card-3d overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleItem(faq.id)}
                                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-secondary/20 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                <Badge variant="outline" className="text-xs">
                                                    {faq.category}
                                                </Badge>
                                            </div>
                                            <h3 className="font-semibold text-lg">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                        )}
                                    </button>

                                    {isExpanded && (
                                        <div className="px-6 pb-6">
                                            <p className="text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* No Results */}
                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-4">
                                No questions found matching your search.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="text-primary hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="card-3d p-8 mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                        <h3 className="font-display text-2xl font-bold mb-2">
                            Still Have Questions?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Our support team is here to help you 24/7
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="tel:+447123456789">
                                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                                    Call Us
                                </button>
                            </a>
                            <a href="mailto:support@unifab.co.uk">
                                <button className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                                    Email Support
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

export default EnhancedFAQ;
