import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const EmbroideryGallery = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedIndustry, setSelectedIndustry] = useState("all");

    const filters = ["all", "logos", "text", "patches"];
    const industries = ["all", "corporate", "healthcare", "hospitality", "construction", "retail"];

    // Generate gallery items
    const galleryItems = [
        // Corporate
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
            title: `Corporate Logo ${i + 1}`,
            industry: "corporate",
            type: "logos",
            customer: "Tech Solutions Ltd",
            rating: 5
        })),
        // Healthcare
        ...Array.from({ length: 12 }, (_, i) => ({
            id: i + 16,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
            title: `Medical Embroidery ${i + 1}`,
            industry: "healthcare",
            type: "logos",
            customer: "City Hospital",
            rating: 5
        })),
        // Hospitality
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 28,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
            title: `Restaurant Logo ${i + 1}`,
            industry: "hospitality",
            type: "logos",
            customer: "Fine Dining Co",
            rating: 5
        })),
        // Construction
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 38,
            image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
            title: `Construction Logo ${i + 1}`,
            industry: "construction",
            type: "logos",
            customer: "BuildCo Ltd",
            rating: 5
        })),
        // Text embroidery
        ...Array.from({ length: 8 }, (_, i) => ({
            id: i + 48,
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
            title: `Text Design ${i + 1}`,
            industry: "retail",
            type: "text",
            customer: "Various Clients",
            rating: 5
        }))
    ];

    const filteredItems = galleryItems.filter(item => {
        const matchesType = selectedFilter === "all" || item.type === selectedFilter;
        const matchesIndustry = selectedIndustry === "all" || item.industry === selectedIndustry;
        return matchesType && matchesIndustry;
    });

    const testimonials = [
        {
            name: "Sarah Johnson",
            company: "Tech Innovations Ltd",
            text: "The embroidery quality exceeded our expectations. Our logo looks professional and the turnaround was incredibly fast!",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
            rating: 5
        },
        {
            name: "Michael Chen",
            company: "City Medical Center",
            text: "Perfect embroidery on all our medical scrubs. The attention to detail is outstanding!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            rating: 5
        },
        {
            name: "Emma Williams",
            company: "Gourmet Restaurant Group",
            text: "Beautiful work on our chef uniforms. The embroidery adds a premium touch to our brand.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Portfolio</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Embroidery Gallery
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explore our portfolio of over 10,000 completed embroidery projects.
                            See the quality and craftsmanship that sets us apart.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {/* Type Filter */}
                        <div className="flex-1">
                            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Type
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {filters.map(filter => (
                                    <Button
                                        key={filter}
                                        variant={selectedFilter === filter ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedFilter(filter)}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Industry Filter */}
                        <div className="flex-1">
                            <label className="text-sm font-semibold mb-2 block">Industry</label>
                            <div className="flex gap-2 flex-wrap">
                                {industries.map(industry => (
                                    <Button
                                        key={industry}
                                        variant={selectedIndustry === industry ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedIndustry(industry)}
                                    >
                                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {filteredItems.length} results
                    </p>

                    {/* Gallery Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="card-3d group overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{item.customer}</p>
                                    <div className="flex items-center gap-1">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Testimonials Section */}
                    <div className="mb-16">
                        <h2 className="font-display text-3xl font-bold text-center mb-8">
                            What Our Customers Say
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="card-3d p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <Quote className="w-8 h-8 text-primary/20 mb-2" />
                                    <p className="text-sm text-foreground/80">{testimonial.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="card-3d p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                        <h3 className="font-display text-3xl font-bold mb-4">
                            Ready to Create Your Own?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers and get professional embroidery for your team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/embroidery-designer">
                                <Button size="lg">
                                    Start Designing
                                </Button>
                            </Link>
                            <Link to="/quote">
                                <Button size="lg" variant="outline">
                                    Get a Quote
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

export default EmbroideryGallery;
