import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Printer, Zap, Award } from "lucide-react";

const logoSamples = [
    {
        id: 1,
        name: "Swift Logistics",
        industry: "Logistics & Transportation",
        image: "/assets/logos/swift-logistics.png",
        colors: "Deep blue and bright yellow",
        bestFor: "Polo shirts, jackets, hi-vis vests",
        method: "Screen printing or embroidery",
        size: "3-4 inches for chest placement",
    },
    {
        id: 2,
        name: "Care Plus Medical",
        industry: "Healthcare & Medical",
        image: "/assets/logos/care-plus-medical.png",
        colors: "Teal blue and white",
        bestFor: "Medical scrubs, lab coats, nurse uniforms",
        method: "Embroidery (premium finish)",
        size: "2-3 inches for pocket or chest",
    },
    {
        id: 3,
        name: "Golden Fork Bistro",
        industry: "Food Service & Hospitality",
        image: "/assets/logos/golden-fork-bistro.png",
        colors: "Burgundy red and gold",
        bestFor: "Chef coats, aprons, server uniforms",
        method: "Embroidery or heat transfer",
        size: "3-4 inches for chest or apron",
    },
];

const printingMethods = [
    {
        name: "Screen Printing",
        icon: Printer,
        description: "Best for large quantities and simple designs",
        features: ["Most economical for bulk", "Excellent durability", "Ideal for cotton blends"],
        price: "From £2.20/item (500+)",
    },
    {
        name: "Embroidery",
        icon: Award,
        description: "Premium finish with superior durability",
        features: ["Won't fade or crack", "Professional appearance", "Perfect for polos & jackets"],
        price: "From £4.00/item (500+)",
    },
    {
        name: "Heat Transfer",
        icon: Zap,
        description: "Full-color designs and photos",
        features: ["Mid-range pricing", "Good durability", "Ideal for synthetics"],
        price: "From £3.00/item (500+)",
    },
];

const LogoGallery = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                            Custom Branding
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
                            Sample Logo Designs
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Professional logo designs showcasing our custom printing and embroidery capabilities across different industries.
                        </p>
                    </div>

                    {/* Logo Samples Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {logoSamples.map((logo) => (
                            <div key={logo.id} className="card-3d overflow-hidden group">
                                {/* Logo Image */}
                                <div className="aspect-square bg-white p-8 flex items-center justify-center border-b border-border">
                                    <img
                                        src={logo.image}
                                        alt={logo.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Logo Details */}
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                                        {logo.name}
                                    </h3>
                                    <p className="text-sm text-primary font-semibold mb-4">{logo.industry}</p>

                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <span className="font-semibold text-foreground">Colors:</span>
                                            <p className="text-muted-foreground">{logo.colors}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-foreground">Best For:</span>
                                            <p className="text-muted-foreground">{logo.bestFor}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-foreground">Method:</span>
                                            <p className="text-muted-foreground">{logo.method}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-foreground">Size:</span>
                                            <p className="text-muted-foreground">{logo.size}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Printing Methods */}
                    <div className="mb-20">
                        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                            Our Printing Methods
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {printingMethods.map((method) => (
                                <div key={method.name} className="card-industrial p-6">
                                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                                        <method.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground text-lg mb-2">{method.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                                    <ul className="space-y-2 mb-4">
                                        {method.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-primary font-semibold">{method.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="card-industrial p-12 text-center">
                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                            Ready to Brand Your Workwear?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get a custom quote for your branding needs. We offer free mockups and samples before production.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/quote">
                                <Button variant="gold" size="lg">
                                    Get a Quote
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" size="lg">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LogoGallery;
