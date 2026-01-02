import { useState } from "react";
import { Sparkles, Upload, Type, Palette, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmbroideryShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);

    const showcaseItems = [
        {
            title: "Upload Your Logo",
            description: "Professional embroidery on any garment",
            icon: Upload,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Text Embroidery",
            description: "Custom text in various fonts & colors",
            icon: Type,
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
            color: "from-purple-500 to-purple-600"
        },
        {
            title: "Choose Colors",
            description: "Match your brand perfectly",
            icon: Palette,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
            color: "from-pink-500 to-pink-600"
        }
    ];

    const features = [
        "Free logo digitization",
        "No minimum order",
        "Fast 7-day turnaround",
        "Premium quality threads"
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)`,
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 animate-fade-up">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-sm font-semibold text-primary">Custom Embroidery</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-up animation-delay-100">
                        See Your Logo Come to Life
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-200">
                        Professional embroidery that makes your brand stand out. Upload your logo and see it on premium workwear.
                    </p>
                </div>

                {/* Interactive Showcase */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                    {/* Preview Area */}
                    <div className="relative">
                        <div className="card-3d overflow-hidden aspect-square rounded-2xl">
                            <img
                                src={showcaseItems[activeTab].image}
                                alt={showcaseItems[activeTab].title}
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                                <p className="text-sm font-semibold text-foreground">Sample Embroidery</p>
                                <p className="text-xs text-muted-foreground">Your logo here</p>
                            </div>
                            {/* Animated Border */}
                            <div className="absolute inset-0 border-4 border-primary/50 rounded-2xl animate-pulse"></div>
                        </div>

                        {/* Floating Feature Cards */}
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-2xl animate-float">
                            <p className="text-sm font-bold">✓ Free Setup</p>
                            <p className="text-xs opacity-90">No hidden fees</p>
                        </div>
                        <div className="absolute -top-6 -left-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-2xl animate-float animation-delay-300">
                            <p className="text-sm font-bold">⚡ 7-Day Delivery</p>
                            <p className="text-xs opacity-90">Fast turnaround</p>
                        </div>
                    </div>

                    {/* Options & CTA */}
                    <div>
                        {/* Tab Options */}
                        <div className="space-y-4 mb-8">
                            {showcaseItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${activeTab === index
                                            ? 'border-primary bg-primary/10 shadow-lg scale-105'
                                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        {activeTab === index && (
                                            <Check className="w-6 h-6 text-primary" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/quote" className="flex-1">
                                <Button size="lg" className="w-full gap-2 shadow-lg hover:shadow-xl">
                                    <Sparkles className="w-5 h-5" />
                                    Try Embroidery Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/logo-gallery" className="flex-1">
                                <Button variant="outline" size="lg" className="w-full gap-2">
                                    View Samples
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badge */}
                        <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">
                                ⭐ <span className="font-semibold text-foreground">4.9/5</span> from 10,000+ embroidered orders
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="card-3d p-8 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
                    <h3 className="font-display text-2xl font-bold mb-2">
                        🎨 Free Logo Digitization Worth £50
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Get started today and receive professional logo digitization absolutely free!
                    </p>
                    <Link to="/quote">
                        <Button size="lg" variant="gold" className="gap-2 shadow-lg">
                            Get Your Free Quote
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EmbroideryShowcase;
