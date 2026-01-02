import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import { Zap, TrendingDown, Star, Clock } from "lucide-react";

const FlashSales = () => {
    const [currentSale, setCurrentSale] = useState(0);

    // Flash sale products
    const flashSales = [
        {
            id: 1,
            name: "Hi-Vis Safety Vest Bundle",
            originalPrice: 89.99,
            salePrice: 44.99,
            discount: 50,
            image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&q=80",
            stock: 15,
            sold: 35,
            endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            rating: 4.8,
            reviews: 234
        },
        {
            id: 2,
            name: "Professional Work Polo Shirts (5-Pack)",
            originalPrice: 124.99,
            salePrice: 74.99,
            discount: 40,
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
            stock: 22,
            sold: 48,
            endDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
            rating: 4.9,
            reviews: 567
        },
        {
            id: 3,
            name: "Winter Work Jacket - Insulated",
            originalPrice: 149.99,
            salePrice: 89.99,
            discount: 40,
            image: "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=600&q=80",
            stock: 8,
            sold: 62,
            endDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
            rating: 4.7,
            reviews: 189
        },
        {
            id: 4,
            name: "Safety Boots - Steel Toe Cap",
            originalPrice: 79.99,
            salePrice: 49.99,
            discount: 38,
            image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80",
            stock: 12,
            sold: 28,
            endDate: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
            rating: 4.6,
            reviews: 445
        },
        {
            id: 5,
            name: "Coveralls - Heavy Duty (3-Pack)",
            originalPrice: 199.99,
            salePrice: 119.99,
            discount: 40,
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
            stock: 18,
            sold: 32,
            endDate: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 hours
            rating: 4.8,
            reviews: 312
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-red-500 text-white">
                            <Zap className="w-4 h-4 mr-1" />
                            Flash Sales
                        </Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            ⚡ Lightning Deals
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Limited time offers. Up to 50% off. While stocks last!
                        </p>
                    </div>

                    {/* Active Flash Sales */}
                    <div className="space-y-8">
                        {flashSales.map((sale, index) => (
                            <div
                                key={sale.id}
                                className="card-3d overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 gap-6 p-6">
                                    {/* Product Image */}
                                    <div className="relative">
                                        <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
                                            <img
                                                src={sale.image}
                                                alt={sale.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Discount Badge */}
                                        <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-4 py-2">
                                            <TrendingDown className="w-5 h-5 mr-1" />
                                            {sale.discount}% OFF
                                        </Badge>

                                        {/* Stock Badge */}
                                        <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Only {sale.stock} left!
                                        </Badge>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h2 className="font-display text-3xl font-bold mb-4">
                                                {sale.name}
                                            </h2>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(sale.rating)
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {sale.rating} ({sale.reviews} reviews)
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="mb-6">
                                                <div className="flex items-baseline gap-3 mb-2">
                                                    <span className="text-4xl font-bold text-red-600">
                                                        £{sale.salePrice.toFixed(2)}
                                                    </span>
                                                    <span className="text-2xl text-muted-foreground line-through">
                                                        £{sale.originalPrice.toFixed(2)}
                                                    </span>
                                                </div>
                                                <p className="text-green-600 font-semibold">
                                                    Save £{(sale.originalPrice - sale.salePrice).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Countdown */}
                                            <div className="mb-6">
                                                <p className="text-sm font-medium mb-3">Sale Ends In:</p>
                                                <CountdownTimer
                                                    endDate={sale.endDate}
                                                    showDays={false}
                                                    compact={false}
                                                />
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">
                                                        {sale.sold} sold
                                                    </span>
                                                    <span className="font-semibold text-orange-600">
                                                        {sale.stock} remaining
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
                                                        style={{
                                                            width: `${(sale.sold / (sale.sold + sale.stock)) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="space-y-3">
                                            <Link to={`/products/${sale.id}`}>
                                                <Button size="lg" className="w-full">
                                                    <Zap className="w-5 h-5 mr-2" />
                                                    Grab This Deal Now
                                                </Button>
                                            </Link>
                                            <p className="text-xs text-center text-muted-foreground">
                                                ✓ Free Delivery • ✓ 60-Day Returns • ✓ Price Match Guarantee
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Sales Teaser */}
                    <div className="card-3d p-8 mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                        <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="font-display text-2xl font-bold mb-2">
                            More Flash Sales Coming Soon!
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to get notified about upcoming lightning deals
                        </p>
                        <Button>
                            Notify Me
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FlashSales;
