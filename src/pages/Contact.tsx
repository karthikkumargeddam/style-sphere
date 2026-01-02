import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Headphones } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent successfully! We'll get back to you within 24 hours.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: "",
                message: "",
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="glass-gold inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 shadow-depth-sm">
                            Get in Touch
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Contact Our Sales Team
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Have questions about our products or need a custom quote? Our team is here to help you find the perfect workwear solution.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="card-3d p-8">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Your Name *
                                        </label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Smith"
                                            required
                                            className="neuro"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email Address *
                                        </label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            required
                                            className="neuro"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Phone Number
                                        </label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+44 7xxx xxxxxx"
                                            className="neuro"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Company Name
                                        </label>
                                        <Input
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your Company Ltd"
                                            className="neuro"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Subject *
                                    </label>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        required
                                        className="neuro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your requirements..."
                                        rows={5}
                                        required
                                        className="neuro resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="gold"
                                    size="lg"
                                    className="w-full gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Quick Contact Cards */}
                            <div className="card-3d p-6">
                                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 shadow-depth-sm">
                                            <Phone className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                                            <p className="text-muted-foreground text-sm mb-1">Mon-Fri 9am-5pm</p>
                                            <a
                                                href="tel:08001234567"
                                                className="text-primary hover:underline font-medium"
                                            >
                                                0800 123 4567
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 shadow-depth-sm">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">Email</h4>
                                            <p className="text-muted-foreground text-sm mb-1">24/7 Support</p>
                                            <a
                                                href="mailto:sales@unifab.co.uk"
                                                className="text-primary hover:underline font-medium"
                                            >
                                                sales@unifab.co.uk
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 shadow-depth-sm">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">Address</h4>
                                            <p className="text-muted-foreground text-sm">
                                                UniFab Ltd<br />
                                                123 Business Park<br />
                                                London, UK<br />
                                                SW1A 1AA
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 shadow-depth-sm">
                                            <Clock className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Monday - Friday: 9:00 AM - 5:00 PM<br />
                                                Saturday: 10:00 AM - 2:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sales Support */}
                            <div className="glass-gold p-6 rounded-xl shadow-depth-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <Headphones className="w-8 h-8 text-primary" />
                                    <h3 className="font-display text-xl font-bold text-foreground">
                                        Need Immediate Help?
                                    </h3>
                                </div>
                                <p className="text-foreground/80 mb-4">
                                    Our sales team is ready to assist you with product selection, bulk orders, and custom branding solutions.
                                </p>
                                <div className="space-y-2">
                                    <Button variant="gold" className="w-full" asChild>
                                        <a href="tel:08001234567">Call Sales Team</a>
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <a href="/quote">Request a Quote</a>
                                    </Button>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="card-3d p-6">
                                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                                    Quick Links
                                </h3>
                                <div className="space-y-2">
                                    <a href="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                                        → Browse Products
                                    </a>
                                    <a href="/bundles" className="block text-muted-foreground hover:text-primary transition-colors">
                                        → View Bundles
                                    </a>
                                    <a href="/quote" className="block text-muted-foreground hover:text-primary transition-colors">
                                        → Get a Quote
                                    </a>
                                    <a href="/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors">
                                        → Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
