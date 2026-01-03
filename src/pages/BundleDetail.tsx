import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BundleProductSelector from "@/components/BundleProductSelector";
import LogoCustomizer from "@/components/LogoCustomizer";
import QualityGuarantee from "@/components/QualityGuarantee";
import BundleFAQ from "@/components/BundleFAQ";
import { AdvancedBundleBuilder } from "@/components/BundleBuilder";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
    ShoppingCart,
    Star,
    TrendingDown,
    Package,
    Users,
    ChevronRight,
    Sparkles,
    Award
} from "lucide-react";

const BundleDetail = () => {
    const { id } = useParams();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [logoData, setLogoData] = useState(null);

    // Bundle data
    const bundle = {
        id: Number(id) || 1,
        name: "6 Item Kickstarter Embroidered Workwear Bundle",
        subtitle: "with Free Logo",
        price: 149.99,
        originalPrice: 219.99,
        savings: 70,
        rating: 4.8,
        reviews: 1247,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        description: "Perfect starter bundle for your team. Includes 6 premium workwear items with free professional logo embroidery on Left Chest. Bundle includes: 3x Polo Shirts (your choice), 2x Sweatshirts (Crew Neck or Hoodie), 1x Softshell Jacket. Choose from our selection of high-quality garments and customize sizes and colors for each item.",
        features: [
            "Free professional logo embroidery on Left Chest",
            "Mix and match sizes and colors for each item",
            "Premium quality materials from trusted brands",
            "60-day satisfaction guarantee",
            "Fast turnaround time (5-7 business days)",
            "Bulk pricing available for larger orders"
        ]
    };

    // Bundle items
    const bundleItems = [
        {
            category: "Polo Shirts",
            name: "Premium Cotton Polo",
            itemCode: "RX101",
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
            colors: ["Black", "Navy", "White", "Grey", "Red"],
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400"
        },
        {
            category: "Polo Shirts",
            name: "Performance Polo Shirt",
            itemCode: "GD01",
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
            colors: ["Black", "Navy", "Royal Blue", "White"],
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400"
        },
        {
            category: "Sweatshirts",
            name: "Classic Crew Neck Sweatshirt",
            itemCode: "SW200",
            sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
            colors: ["Black", "Navy", "Grey", "Burgundy"],
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
        },
        {
            category: "Sweatshirts",
            name: "Zip-Up Hoodie",
            itemCode: "HD350",
            sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
            colors: ["Black", "Navy", "Charcoal", "Green"],
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
        },
        {
            category: "Softshell Jackets",
            name: "Premium Softshell Jacket",
            itemCode: "JK500",
            sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL"],
            colors: ["Black", "Navy", "Grey", "Red"],
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
        },
        {
            category: "Softshell Jackets",
            name: "Lightweight Gilet",
            itemCode: "GL400",
            sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
            colors: ["Black", "Navy", "Charcoal"],
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
        }
    ];

    const handleAddToCart = () => {
        addItem({
            id: bundle.id,
            name: bundle.name,
            price: bundle.price * quantity,
            image: bundle.image,
            category: "Bundles"
        });
        toast.success(`${bundle.name} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/bundles" className="hover:text-primary">Bundles</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground">{bundle.name}</span>
                    </nav>

                    {/* Product Header */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-12">
                        {/* Product Images */}
                        <div>
                            <div className="card-3d overflow-hidden mb-4">
                                <img
                                    src={bundle.image}
                                    alt={bundle.name}
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="card-3d overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                                        <img
                                            src={bundle.image}
                                            alt={`View ${i}`}
                                            className="w-full aspect-square object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-4">
                                <Badge className="mb-2">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Bundle Deal
                                </Badge>
                                <h1 className="font-display text-4xl font-bold mb-2">
                                    {bundle.name}
                                </h1>
                                <p className="text-xl text-primary font-semibold">{bundle.subtitle}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(bundle.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {bundle.rating} ({bundle.reviews.toLocaleString()} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="card-3d p-6 mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-foreground">
                                        £{bundle.price.toFixed(2)}
                                    </span>
                                    <span className="text-2xl text-muted-foreground line-through">
                                        £{bundle.originalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-green-500 text-white">
                                        <TrendingDown className="w-3 h-3 mr-1" />
                                        Save £{bundle.savings.toFixed(2)} ({Math.round((bundle.savings / bundle.originalPrice) * 100)}%)
                                    </Badge>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-foreground/80 mb-6">{bundle.description}</p>

                            {/* Features */}
                            <div className="space-y-2 mb-6">
                                {bundle.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 hover:bg-secondary transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-2 border-x">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 hover:bg-secondary transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <Button
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="flex-1 gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart - £{(bundle.price * quantity).toFixed(2)}
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/20 rounded-lg">
                                <div className="text-center">
                                    <Package className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs font-semibold">Free Logo</p>
                                </div>
                                <div className="text-center">
                                    <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs font-semibold">40,000+ Customers</p>
                                </div>
                                <div className="text-center">
                                    <Award className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs font-semibold">60-Day Guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Selector */}
                    <div className="mb-12">
                        <BundleProductSelector
                            items={bundleItems}
                            onSelectionChange={setSelectedProducts}
                        />
                    </div>

                    {/* Mix & Match Bundle Builder */}
                    <div className="mb-12">
                        <div className="card-3d p-8">
                            <div className="mb-6">
                                <h2 className="font-display text-3xl font-bold mb-2">
                                    🎨 Customize Your Bundle
                                </h2>
                                <p className="text-muted-foreground">
                                    Mix and match products to create your perfect workwear bundle with automatic discounts!
                                </p>
                            </div>
                            <AdvancedBundleBuilder />
                        </div>
                    </div>

                    {/* Logo Customizer */}
                    <div className="mb-12">
                        <LogoCustomizer
                            onLogoChange={setLogoData}
                            isBundle={true}
                            bundleItemCount={6}
                        />
                    </div>

                    {/* Quality Guarantee */}
                    <div className="mb-12">
                        <QualityGuarantee />
                    </div>

                    {/* Trust Section */}
                    <div className="card-3d p-8 text-center mb-12">
                        <h3 className="font-display text-3xl font-bold mb-4">
                            Trusted by 40,000+ Businesses for Branding 🚀
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their workwear needs.
                            Professional quality, exceptional service, guaranteed satisfaction.
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-24 h-12 bg-secondary/50 rounded flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground">Logo {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <BundleFAQ />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BundleDetail;
