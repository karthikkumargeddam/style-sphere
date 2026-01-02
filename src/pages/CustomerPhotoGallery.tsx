import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, MessageSquare, Filter, Upload } from "lucide-react";

const CustomerPhotoGallery = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const filters = ["all", "workwear", "hi-vis", "corporate", "healthcare", "hospitality"];

    // Generate customer photos with testimonials
    const photos = [
        ...Array.from({ length: 60 }, (_, i) => ({
            id: i + 1,
            image: `https://images.unsplash.com/photo-${1580000000000 + i * 100000}?w=600&q=80`,
            customer: `Customer ${i + 1}`,
            company: ["ABC Construction", "City Hospital", "Tech Corp", "Restaurant Group", "Logistics Ltd"][i % 5],
            category: filters[1 + (i % 5)],
            product: ["Safety Vests", "Polo Shirts", "Work Jackets", "Coveralls", "Hi-Vis Gear"][i % 5],
            testimonial: "Great quality and perfect fit! Highly recommend.",
            likes: Math.floor(Math.random() * 200) + 50,
            verified: Math.random() > 0.3
        }))
    ];

    const filteredPhotos = selectedFilter === "all"
        ? photos
        : photos.filter(p => p.category === selectedFilter);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Customer Gallery</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Real Customers, Real Results
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See how 40,000+ businesses look great in our workwear
                        </p>
                    </div>

                    {/* Upload CTA */}
                    <div className="card-3d p-6 mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Camera className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg">Share Your Photo</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload your team photo and get featured + £20 credit
                                    </p>
                                </div>
                            </div>
                            <Button>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Photo
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                        <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        {filters.map(filter => (
                            <Button
                                key={filter}
                                variant={selectedFilter === filter ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter(filter)}
                                className="whitespace-nowrap"
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </Button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Showing {filteredPhotos.length} photos
                    </p>

                    {/* Photo Grid */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {filteredPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="group relative overflow-hidden rounded-lg cursor-pointer"
                                onClick={() => setLightboxImage(photo.image)}
                            >
                                <div className="aspect-square overflow-hidden bg-secondary/20">
                                    <img
                                        src={photo.image}
                                        alt={`${photo.customer} - ${photo.product}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="font-semibold">{photo.customer}</p>
                                            {photo.verified && (
                                                <Badge className="bg-blue-500 text-white text-xs">✓ Verified</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs opacity-90 mb-1">{photo.company}</p>
                                        <p className="text-xs opacity-75 mb-2">{photo.product}</p>
                                        <p className="text-sm italic mb-2">"{photo.testimonial}"</p>
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-3 h-3" />
                                                {photo.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" />
                                                {Math.floor(photo.likes / 10)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lightbox */}
                    {lightboxImage && (
                        <div
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                            onClick={() => setLightboxImage(null)}
                        >
                            <img
                                src={lightboxImage}
                                alt="Full size"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="card-3d p-8 text-center">
                        <h3 className="font-display text-3xl font-bold mb-4">
                            Want to Be Featured?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Share your team photos wearing our workwear and get £20 credit towards your next order!
                        </p>
                        <Button size="lg">
                            <Camera className="w-5 h-5 mr-2" />
                            Upload Your Photo
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CustomerPhotoGallery;
