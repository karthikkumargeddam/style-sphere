import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const BundleFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            question: "What's included in the bundle?",
            answer: "Each bundle includes 6 carefully selected workwear items from your chosen categories. You can customize the selection by choosing from Polo Shirts, Sweatshirts, and Softshell Jackets. All items come with free logo embroidery."
        },
        {
            question: "How does the free logo work?",
            answer: "You can add your logo to any or all items in the bundle at no extra cost. Simply upload your logo file, enter text for a text-based logo, or choose from your existing logos. We'll send you a digital proof for approval before production."
        },
        {
            question: "What file formats do you accept for logos?",
            answer: "We accept PNG, JPG, SVG, PDF, and AI files. For best results, we recommend vector files (SVG, AI, or PDF) as they scale perfectly to any size. Maximum file size is 5MB."
        },
        {
            question: "How long does production take?",
            answer: "Standard production time is 7-10 business days after logo approval. Express options are available for an additional fee. You'll receive tracking information once your order ships."
        },
        {
            question: "Can I mix sizes and colors?",
            answer: "Absolutely! Each item in the bundle can be customized with different sizes and colors to suit your team's needs. Simply select your preferences for each item during checkout."
        },
        {
            question: "What's your return policy?",
            answer: "We offer a 60-day satisfaction guarantee. If you're not completely happy with your purchase, contact us for a replacement or refund. Custom embroidered items may have different return conditions."
        },
        {
            question: "Do you offer bulk discounts?",
            answer: "Yes! Bundles already include significant savings, but we offer additional discounts for larger orders. Contact our sales team for a custom quote on orders of 10+ bundles."
        },
        {
            question: "Can I add more items to my bundle?",
            answer: "While bundles come with a set number of items, you can always add additional products to your cart. Mix and match to create the perfect workwear solution for your team."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="card-3d p-8">
            <h3 className="font-display text-2xl font-bold mb-6">Frequently Asked Questions</h3>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border rounded-lg overflow-hidden transition-all"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                        >
                            <span className="font-semibold pr-4">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                        </button>

                        {openIndex === index && (
                            <div className="p-4 pt-0 text-muted-foreground border-t">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-foreground/80">
                    Still have questions?{" "}
                    <a href="/contact" className="text-primary font-semibold hover:underline">
                        Contact our team
                    </a>
                </p>
            </div>
        </div>
    );
};

export default BundleFAQ;
