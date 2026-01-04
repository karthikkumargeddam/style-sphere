import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Ruler,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Check,
  Package,
  Zap,
  Award,
  Users
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import SizeGuideModal from "@/components/SizeGuideModal";
import RelatedProducts from "@/components/RelatedProducts";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import Reviews from "@/components/Reviews";
import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";
import { getProductDetail } from "@/lib/products";
import { getSimilarProducts } from "@/lib/recommendations";
import SEO from "@/components/SEO";
import ProductRecommendations from "@/components/ProductRecommendations";
import AISizeGuide from "@/components/AISizeGuide";
import ProductReviews from "@/components/ProductReviews";
import WriteReview from "@/components/WriteReview";
import StockIndicator from "@/components/StockIndicator";
import { getProductReviews, getAverageRating, getTotalReviews } from "@/lib/mockReviews";
import CustomizationPrompt from "@/components/CustomizationPrompt";
import LogoCustomizer from "@/components/LogoCustomizer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdvancedBundleBuilder } from "@/components/BundleBuilder";
import { Plus } from "lucide-react";

// Extended product data with detailed descriptions
const productDetails: Record<number, {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  longDescription: string;
  features: string[];
  specifications: { label: string; value: string }[];
  materials: string[];
  careInstructions: string[];
  certifications: string[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  deliveryInfo: string;
  warranty: string;
}> = {
  1: {
    id: 1,
    name: "Hi-Vis Safety Jacket",
    category: "Safety Wear",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 124,
    image: safetyVest,
    badge: "Best Seller",
    description: "Professional-grade high visibility safety jacket designed for maximum protection in hazardous work environments.",
    longDescription: "Our Hi-Vis Safety Jacket is engineered for professionals who demand the highest standards of visibility and protection. This jacket features a fluorescent yellow background with retroreflective tape that ensures you remain visible in all lighting conditions, day or night. The durable polyester construction withstands the rigors of construction sites, roadwork, and industrial environments while maintaining comfort throughout long shifts. With multiple pockets for tools and personal items, this jacket combines functionality with safety in one premium garment.",
    features: [
      "360-degree retroreflective tape for maximum visibility",
      "Breathable mesh lining prevents overheating",
      "Heavy-duty YKK zippers for durability",
      "Multiple internal and external pockets",
      "Adjustable waist and cuffs for perfect fit",
      "Radio loop and mic tabs for communication devices",
      "Storm flap with hook and loop closure",
      "ID badge holder on chest"
    ],
    specifications: [
      { label: "Material", value: "100% Polyester Oxford 300D" },
      { label: "Weight", value: "450g" },
      { label: "Visibility Class", value: "EN ISO 20471 Class 3" },
      { label: "Waterproof Rating", value: "5000mm" },
      { label: "Breathability", value: "3000g/m²/24hr" },
      { label: "Temperature Range", value: "-10°C to +25°C" }
    ],
    materials: [
      "Outer: 100% Polyester Oxford with PU coating",
      "Lining: Breathable mesh polyester",
      "Reflective Tape: 3M Scotchlite™ reflective material",
      "Zippers: YKK brand corrosion-resistant"
    ],
    careInstructions: [
      "Machine wash at 40°C maximum",
      "Do not bleach",
      "Tumble dry on low heat",
      "Do not iron directly on reflective tape",
      "Professional dry cleaning safe"
    ],
    certifications: [
      "EN ISO 20471:2013+A1:2016 Class 3",
      "EN 343:2019 Class 3:1",
      "ANSI/ISEA 107-2015 Type R Class 3"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    availableColors: [
      { name: "Fluorescent Yellow", hex: "#DFFF00" },
      { name: "Fluorescent Orange", hex: "#FF6700" }
    ],
    deliveryInfo: "Free UK delivery on orders over £150. Express next-day delivery available for £9.99. Bulk orders may qualify for additional discounts.",
    warranty: "2-year manufacturer warranty covering defects in materials and workmanship. Reflective tape guaranteed for 50 wash cycles."
  },
  2: {
    id: 2,
    name: "Heavy Duty Work Trousers",
    category: "Work Trousers",
    price: 29.99,
    rating: 4.6,
    reviews: 89,
    image: workTrousers,
    description: "Rugged cargo work trousers built for demanding trades with reinforced stress points and ample storage.",
    longDescription: "These Heavy Duty Work Trousers are the ultimate choice for tradespeople who need reliable, comfortable workwear that can handle anything. Constructed from a tough polycotton blend with reinforced knees and seat panels, these trousers are built to last in the harshest conditions. The ergonomic design allows for a full range of motion whether you are kneeling, climbing, or reaching. Multiple cargo pockets keep your tools and essentials within easy reach, while the triple-stitched seams ensure these trousers will outlast the competition.",
    features: [
      "Reinforced Cordura® knee pad pockets",
      "Triple-stitched stress points",
      "8 functional pockets including ruler pocket",
      "Hammer loop and tool attachments",
      "Gusseted crotch for mobility",
      "Adjustable waist with belt loops",
      "Articulated knees for comfort when kneeling",
      "Fade-resistant fabric treatment"
    ],
    specifications: [
      { label: "Material", value: "65% Polyester, 35% Cotton (245gsm)" },
      { label: "Weight", value: "580g" },
      { label: "Knee Pad Compatibility", value: "Standard EN 14404 pads" },
      { label: "Leg Length Options", value: "Regular (32\"), Long (34\")" },
      { label: "Reinforcement", value: "Cordura® 500D" }
    ],
    materials: [
      "Main Fabric: Polycotton twill 245gsm",
      "Reinforcement: Cordura® 500 denier",
      "Stitching: Heavy-duty bonded nylon thread",
      "Hardware: YKK zippers, metal rivets"
    ],
    careInstructions: [
      "Machine wash at 60°C",
      "Can be tumble dried",
      "Iron on medium heat",
      "Remove knee pads before washing",
      "Wash inside out to preserve color"
    ],
    certifications: [
      "EN 14404:2004+A1:2010 (with knee pads)",
      "Oeko-Tex Standard 100"
    ],
    availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42", "44"],
    availableColors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy Blue", hex: "#1a2d4a" },
      { name: "Khaki", hex: "#c3b091" },
      { name: "Grey", hex: "#5a5a5a" }
    ],
    deliveryInfo: "Free UK delivery on orders over £150. Standard delivery 3-5 working days. Bulk orders dispatched within 48 hours.",
    warranty: "1-year warranty against manufacturing defects. Seam repair guarantee for 6 months."
  },
  3: {
    id: 3,
    name: "Corporate Polo Shirt",
    category: "Polo Shirts",
    price: 18.99,
    rating: 4.9,
    reviews: 256,
    image: poloShirt,
    badge: "New",
    description: "Premium quality polo shirt perfect for corporate branding with superior comfort and professional appearance.",
    longDescription: "Our Corporate Polo Shirt combines professional style with everyday comfort, making it the perfect choice for businesses looking to create a polished team image. The premium piqué cotton fabric offers exceptional breathability and softness, while the reinforced shoulder seams and side vents ensure durability and ease of movement. The classic fit flatters all body types and provides a professional appearance suitable for customer-facing roles. This polo is specifically designed to hold embroidery and print exceptionally well, making it ideal for company branding.",
    features: [
      "Premium 100% ringspun combed cotton",
      "Reinforced shoulder seams for embroidery",
      "Three-button placket with self-color buttons",
      "Ribbed collar and cuffs that hold shape",
      "Side vents for ease of movement",
      "Pre-shrunk fabric maintains size after washing",
      "Double-needle stitching throughout",
      "Extended back hem for stay-tucked design"
    ],
    specifications: [
      { label: "Material", value: "100% Ringspun Combed Cotton" },
      { label: "Weight", value: "220gsm" },
      { label: "Knit Type", value: "Piqué knit" },
      { label: "Fit", value: "Classic fit" },
      { label: "Collar Style", value: "Self-fabric flat knit" }
    ],
    materials: [
      "Body: 100% ringspun combed cotton piqué",
      "Buttons: Matching self-color plastic",
      "Thread: Cotton/polyester blend for durability"
    ],
    careInstructions: [
      "Machine wash cold or warm",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
      "Wash with similar colors"
    ],
    certifications: [
      "Oeko-Tex Standard 100",
      "WRAP Certified Manufacturing",
      "ISO 9001 Quality Management"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    availableColors: [
      { name: "White", hex: "#ffffff" },
      { name: "Navy", hex: "#1a2d4a" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Royal Blue", hex: "#0047ab" },
      { name: "Red", hex: "#c41e3a" },
      { name: "Bottle Green", hex: "#006b3c" }
    ],
    deliveryInfo: "Bulk orders (50+) receive 15% discount. Custom embroidery available with 5-7 day turnaround. Free setup on orders over 100 units.",
    warranty: "Color and shape guaranteed for 50 washes when following care instructions."
  },
  4: {
    id: 4,
    name: "Safety Hard Hat",
    category: "PPE Equipment",
    price: 12.99,
    rating: 4.7,
    reviews: 178,
    image: hardHat,
    description: "Industrial-grade safety helmet with advanced impact protection and adjustable suspension system.",
    longDescription: "This Safety Hard Hat delivers reliable head protection for construction, industrial, and utility workers. Featuring a high-density polyethylene shell with a unique ventilated design, this helmet provides superior impact resistance while keeping your head cool in demanding conditions. The 6-point adjustable suspension system with foam sweatband ensures a comfortable, secure fit for extended wear. Compatible with a wide range of accessories including face shields, ear muffs, and headlamps, this versatile helmet adapts to any job site requirement.",
    features: [
      "High-density polyethylene (HDPE) shell",
      "6-point textile suspension system",
      "Ratchet adjustment for precise fit",
      "8 ventilation ports for airflow",
      "Replaceable foam sweatband",
      "Universal accessory slots",
      "Rain gutter around brim",
      "Short peak design for overhead work"
    ],
    specifications: [
      { label: "Shell Material", value: "High-Density Polyethylene (HDPE)" },
      { label: "Weight", value: "310g" },
      { label: "Head Size Range", value: "53cm - 63cm" },
      { label: "Peak Length", value: "55mm (short peak)" },
      { label: "Temperature Range", value: "-30°C to +50°C" },
      { label: "UV Resistance", value: "5 years outdoor use" }
    ],
    materials: [
      "Shell: UV-stabilized HDPE",
      "Suspension: Woven textile webbing",
      "Sweatband: Replaceable EVA foam",
      "Chin Strap: Polypropylene (included)"
    ],
    careInstructions: [
      "Clean with mild soap and water",
      "Do not use solvents or abrasives",
      "Inspect before each use for cracks or damage",
      "Replace after significant impact",
      "Replace every 5 years from manufacture date",
      "Store away from direct sunlight when not in use"
    ],
    certifications: [
      "EN 397:2012+A1:2012",
      "ANSI/ISEA Z89.1-2014 Type I Class E",
      "AS/NZS 1801:1997"
    ],
    availableSizes: ["One Size (53-63cm adjustable)"],
    availableColors: [
      { name: "White", hex: "#f0f0f0" },
      { name: "Yellow", hex: "#ffd700" },
      { name: "Orange", hex: "#ff6700" },
      { name: "Blue", hex: "#0066cc" },
      { name: "Red", hex: "#cc0000" },
      { name: "Green", hex: "#228b22" }
    ],
    deliveryInfo: "In stock for immediate dispatch. Bulk pricing available for orders of 25+. Custom logo printing available.",
    warranty: "1-year warranty against manufacturing defects. Replacement guarantee if certification standards are not met."
  },
  5: {
    id: 5,
    name: "Reflective Work Jacket",
    category: "Safety Wear",
    price: 39.99,
    rating: 4.5,
    reviews: 67,
    image: safetyVest,
    description: "All-weather reflective jacket combining high visibility with weather protection for outdoor workers.",
    longDescription: "The Reflective Work Jacket is designed for professionals who work in all weather conditions. This versatile jacket features a waterproof outer shell with sealed seams and a quilted lining for warmth. The strategically placed reflective tape ensures 360-degree visibility while the adjustable hood and cuffs keep out wind and rain. Perfect for construction, logistics, and outdoor maintenance work.",
    features: [
      "Waterproof and windproof outer shell",
      "Quilted insulated lining",
      "Concealed hood with drawcord adjustment",
      "Two-way heavy-duty front zipper",
      "Multiple secure pockets with flaps",
      "Elasticated cuffs with adjustable tabs",
      "Extended back for coverage when bending"
    ],
    specifications: [
      { label: "Material", value: "100% Polyester with PU membrane" },
      { label: "Weight", value: "720g" },
      { label: "Waterproof Rating", value: "8000mm" },
      { label: "Breathability", value: "5000g/m²/24hr" }
    ],
    materials: [
      "Outer: Polyester Oxford with PU coating",
      "Lining: Quilted polyester with 100g fill",
      "Reflective: 50mm retro-reflective tape"
    ],
    careInstructions: [
      "Machine wash at 30°C",
      "Do not tumble dry",
      "Hang to dry",
      "Re-proof after 5 washes"
    ],
    certifications: ["EN ISO 20471 Class 2", "EN 343 Class 3:1"],
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    availableColors: [
      { name: "Fluorescent Yellow", hex: "#DFFF00" },
      { name: "Fluorescent Orange", hex: "#FF6700" }
    ],
    deliveryInfo: "Free UK delivery on orders over £150.",
    warranty: "2-year warranty on waterproof membrane."
  },
  6: {
    id: 6,
    name: "Cargo Work Pants",
    category: "Work Trousers",
    price: 32.99,
    rating: 4.8,
    reviews: 134,
    image: workTrousers,
    description: "Versatile cargo work pants with multiple pockets and reinforced construction for active tradespeople.",
    longDescription: "Our Cargo Work Pants are built for professionals who need reliable, functional workwear. The durable cotton/polyester blend provides comfort and longevity, while the reinforced knees and seat ensure these pants can handle the toughest jobs. With 10 pockets including dedicated phone and tool pouches, everything you need stays organized and accessible.",
    features: [
      "10 functional pockets",
      "Reinforced knees with pad pockets",
      "Reinforced seat panel",
      "Hammer loop",
      "Ruler pocket on thigh",
      "Belt loops and button waist",
      "Boot-cut leg opening"
    ],
    specifications: [
      { label: "Material", value: "60% Cotton, 40% Polyester" },
      { label: "Weight", value: "320gsm" },
      { label: "Knee Pad Compatible", value: "Yes" }
    ],
    materials: [
      "Main: Cotton/polyester twill",
      "Reinforcement: Cordura panels"
    ],
    careInstructions: [
      "Machine wash at 40°C",
      "Tumble dry low",
      "Iron medium heat"
    ],
    certifications: ["Oeko-Tex Standard 100"],
    availableSizes: ["30", "32", "34", "36", "38", "40", "42"],
    availableColors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1a2d4a" },
      { name: "Khaki", hex: "#c3b091" }
    ],
    deliveryInfo: "Standard delivery 3-5 days. Express available.",
    warranty: "1-year warranty against defects."
  },
  7: {
    id: 7,
    name: "Premium Polo - Navy",
    category: "Polo Shirts",
    price: 21.99,
    rating: 4.7,
    reviews: 98,
    image: poloShirt,
    description: "Premium navy polo shirt with superior fabric quality and professional finish for corporate environments.",
    longDescription: "This Premium Polo in Navy represents the pinnacle of corporate workwear. Made from extra-fine piqué cotton, it offers unmatched comfort and a polished appearance. The deeper color is achieved through advanced dyeing techniques that ensure color retention wash after wash. Ideal for customer-facing staff, management, and team uniforms.",
    features: [
      "Extra-fine 240gsm piqué cotton",
      "Double-stitched seams",
      "Reinforced placket",
      "Stay-flat collar",
      "Side vents",
      "Embroidery-ready design"
    ],
    specifications: [
      { label: "Material", value: "100% Premium Cotton" },
      { label: "Weight", value: "240gsm" },
      { label: "Fit", value: "Modern fit" }
    ],
    materials: ["100% Premium ringspun cotton"],
    careInstructions: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low"
    ],
    certifications: ["Oeko-Tex Standard 100"],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    availableColors: [
      { name: "Navy", hex: "#1a2d4a" }
    ],
    deliveryInfo: "Bulk discounts available. Custom embroidery service.",
    warranty: "Color guarantee for 50 washes."
  },
  8: {
    id: 8,
    name: "Construction Helmet",
    category: "PPE Equipment",
    price: 15.99,
    rating: 4.9,
    reviews: 201,
    image: hardHat,
    badge: "Top Rated",
    description: "Professional construction helmet with enhanced comfort features and accessory compatibility.",
    longDescription: "Our top-rated Construction Helmet is the choice of professionals who demand the best in head protection. The advanced ABS shell provides superior impact resistance while remaining lightweight. The enhanced suspension system with moisture-wicking sweatband ensures all-day comfort. Compatible with all major accessory systems including face shields, hearing protection, and lighting.",
    features: [
      "ABS shell for enhanced impact protection",
      "8-point suspension system",
      "Twist-lock size adjustment",
      "Moisture-wicking sweatband",
      "Universal accessory rails",
      "Reflective strips included",
      "Integrated lamp clips"
    ],
    specifications: [
      { label: "Shell Material", value: "ABS Thermoplastic" },
      { label: "Weight", value: "380g" },
      { label: "Head Size", value: "52-64cm adjustable" },
      { label: "Service Life", value: "5 years" }
    ],
    materials: [
      "Shell: UV-stabilized ABS",
      "Suspension: Nylon webbing",
      "Sweatband: Quick-dry fabric"
    ],
    careInstructions: [
      "Wipe clean with damp cloth",
      "Replace sweatband regularly",
      "Inspect before each use"
    ],
    certifications: ["EN 397", "ANSI Z89.1 Type I Class E & G"],
    availableSizes: ["One Size Adjustable"],
    availableColors: [
      { name: "White", hex: "#f0f0f0" },
      { name: "Yellow", hex: "#ffd700" },
      { name: "Orange", hex: "#ff6700" },
      { name: "Blue", hex: "#0066cc" }
    ],
    deliveryInfo: "In stock. Volume discounts for 50+ units.",
    warranty: "2-year comprehensive warranty."
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "1");
  let product = productDetails[productId];
  if (!product) {
    product = getProductDetail(productId);
  }

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showCustomizationPrompt, setShowCustomizationPrompt] = useState(false);
  const [wantsCustomization, setWantsCustomization] = useState(false);
  const [customizationData, setCustomizationData] = useState<any>(null);

  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you are looking for does not exist.</p>
            <Link to="/products">
              <Button variant="gold">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.availableSizes.length > 1 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.availableColors.length > 1 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    // For individual items (not bundles), show customization prompt
    if (!product.includedItems || product.includedItems.length === 0) {
      setShowCustomizationPrompt(true);
      return;
    }

    // If this is a bundle, add each included item as separate cart line items
    if (product.includedItems && product.includedItems.length > 0) {
      const perItemPrice = Number((product.price / product.includedItems.length).toFixed(2));
      product.includedItems.forEach((itemName, idx) => {
        // create a synthetic id for bundle child items to avoid collisions
        const childId = Number(`${product.id}${(idx + 1).toString().padStart(2, "0")}`);
        addItem({
          id: childId,
          name: `${product.name} — ${itemName}`,
          price: perItemPrice,
          image: product.image,
          category: product.category,
        }, quantity);
      });
      toast.success(`${quantity}x ${product.name} bundle added to cart`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  const handleSelectBlank = () => {
    setShowCustomizationPrompt(false);
    setWantsCustomization(false);
    // Add to cart without customization
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  const handleSelectCustomized = () => {
    setShowCustomizationPrompt(false);
    setWantsCustomization(true);
    // Scroll to customization section
    setTimeout(() => {
      const customizationSection = document.getElementById('customization-section');
      if (customizationSection) {
        customizationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCustomizedAddToCart = () => {
    // Add to cart with customization data
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        // customizationData would be included here in a real implementation
      });
    }
    toast.success(`${quantity}x Customized ${product.name} added to cart`);
    setWantsCustomization(false);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        product_category: product.category,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.name}
        description={`${product.description} - £${product.price.toFixed(2)}. ${product.features.slice(0, 2).join(". ")}.`}
        image={product.image}
        url={`https://unifab.co.uk/products/${id}`}
        type="product"
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </nav>

          {/* Product Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 perspective-xl">
            {/* Product Image */}
            <div className="relative preserve-3d">
              <div className="card-3d aspect-square rounded-xl overflow-hidden bg-white group transition-all duration-500 hover:shadow-depth-xl hover:scale-[1.02] mb-4">
                <img
                  src={activeImage || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  product.image,
                  "https://images.unsplash.com/photo-1598032895397-b9c259f93c0c?w=600&q=80",
                  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80",
                  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
                ].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img as string)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <img src={img as string} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {product.includedItems && (
                <div className="mt-6 flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                  <div className="flex -space-x-3">
                    {product.includedItems.slice(0, 3).map((it, i) => (
                      // overlapping thumbnails to suggest a set
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={product.image} alt={`${product.name} ${it}`} className="w-10 h-10 object-cover rounded-full shadow-sm border border-border" style={{ zIndex: 10 - i }} />
                    ))}
                  </div>
                  <div className="ml-3 text-sm text-muted-foreground">
                    <div className="font-medium text-foreground">Bundle Includes</div>
                    <div className="text-xs">{product.includedItems.slice(0, 3).join(", ")}{product.includedItems.length > 3 ? '...' : ''}</div>
                  </div>
                </div>
              )}
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">£{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    £{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                    Save £{(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {product.includedItems && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Included in this bundle</h4>
                  <div className="mb-2 text-sm text-muted-foreground">Bundle price: <span className="font-medium">£{product.price.toFixed(2)}</span> — Per item: <span className="font-medium">£{(product.price / product.includedItems.length).toFixed(2)}</span></div>
                  <ul className="flex flex-wrap gap-2">
                    {product.includedItems.map((it, idx) => (
                      <li key={idx} className="px-3 py-1 bg-secondary rounded text-sm text-muted-foreground flex items-center gap-3">
                        <span className="font-medium">{it}</span>
                        <span className="text-xs">£{(product.price / product.includedItems.length).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color Selection */}
              {product.availableColors.length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Color: {selectedColor || "Select a color"}
                  </label>
                  <div className="flex gap-3">
                    {product.availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-depth-sm hover:shadow-depth-md hover:scale-110 ${selectedColor === color.name
                          ? "border-primary ring-2 ring-primary ring-offset-2 scale-110 shadow-depth-md"
                          : "border-border hover:border-primary/50"
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.availableSizes.length > 1 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      Size: {selectedSize || "Select a size"}
                    </label>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-4 h-4" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-300 shadow-depth-sm hover:shadow-depth-md hover:scale-105 ${selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-depth-md scale-105"
                          : "border-border hover:border-primary text-foreground"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="neuro w-12 h-12 rounded-lg border border-border hover:border-primary flex items-center justify-center text-foreground font-bold text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-depth-sm hover:shadow-depth-md"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-bold text-xl text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="neuro w-12 h-12 rounded-lg border border-border hover:border-primary flex items-center justify-center text-foreground font-bold text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-depth-sm hover:shadow-depth-md"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                  className={isInWishlist(product.id) ? "bg-primary/10 border-primary" : ""}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>

              {/* Create Custom Bundle Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 border-2 border-primary/50 hover:bg-primary/10"
                  >
                    <Plus className="w-5 h-5" />
                    Create Custom Bundle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Build Your Custom Bundle</DialogTitle>
                    <DialogDescription>
                      Select products to create your perfect workwear bundle and save up to 25%!
                    </DialogDescription>
                  </DialogHeader>
                  <AdvancedBundleBuilder />
                </DialogContent>
              </Dialog>

              {/* Share Product */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Share this product:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.name}`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-2 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                    title="Share on Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-2 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                    title="Share on Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-2 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`Check out ${product.name}`)}&body=${encodeURIComponent(`I found this product: ${window.location.href}`)}`}
                    className="glass p-2 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                    title="Share via Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name}: ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-2 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
                <div className="glass p-3 rounded-lg flex flex-col items-center text-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-depth-md">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="text-xs text-foreground font-medium">Free Delivery £150+</span>
                </div>
                <div className="glass p-3 rounded-lg flex flex-col items-center text-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-depth-md">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-xs text-foreground font-medium">Quality Guaranteed</span>
                </div>
                <div className="glass p-3 rounded-lg flex flex-col items-center text-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-depth-md">
                  <RefreshCw className="w-6 h-6 text-primary" />
                  <span className="text-xs text-foreground font-medium">Easy Returns</span>
                </div>
                <div className="glass p-3 rounded-lg flex flex-col items-center text-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-depth-md">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="text-xs text-foreground font-medium">Certified Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 mb-8">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Materials & Care
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Delivery & Warranty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">About This Product</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.longDescription}
                  </p>

                  {product.certifications.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-500/10 text-green-600">
                            <Check className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">Technical Specifications</h3>
                <div className="divide-y divide-border">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex py-4">
                      <span className="w-1/3 text-muted-foreground">{spec.label}</span>
                      <span className="w-2/3 text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Materials</h3>
                  <ul className="space-y-3">
                    {product.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Care Instructions</h3>
                  <ul className="space-y-3">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Delivery Information</h3>
                  <div className="card-industrial p-6">
                    <Truck className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground leading-relaxed">
                      {product.deliveryInfo}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">Warranty</h3>
                  <div className="card-industrial p-6">
                    <Shield className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground leading-relaxed">
                      {product.warranty}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Reviews */}
          <Reviews productId={product.id} />

          {/* Related Products */}
          <RelatedProducts currentProductId={product.id} currentCategory={product.category} />

          {/* Recently Viewed */}
          <RecentlyViewed excludeProductId={product.id} />

          {/* Why Choose Us */}
          <div className="card-industrial p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Why Choose UniFab?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">All products meet strict quality standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
                <p className="text-sm text-muted-foreground">Dedicated team for custom orders</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Next-day delivery available UK-wide</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day hassle-free return policy</p>
              </div>
            </div>
          </div>

          {/* Product Recommendations */}
          <div className="container mx-auto px-4">
            <ProductRecommendations
              products={getSimilarProducts(product.id, { limit: 6 })}
              title="Similar Products"
              subtitle="You might also like these items"
            />
          </div>
        </div>
      </main>
      <Footer />
      <AISizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Customization Prompt */}
      <CustomizationPrompt
        isOpen={showCustomizationPrompt}
        onClose={() => setShowCustomizationPrompt(false)}
        onSelectBlank={handleSelectBlank}
        onSelectCustomized={handleSelectCustomized}
        productName={product.name}
      />

      {/* Customization Section */}
      {wantsCustomization && (
        <div id="customization-section" className="fixed inset-0 bg-background z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold">Customize Your {product.name}</h2>
                <Button variant="outline" onClick={() => setWantsCustomization(false)}>
                  Cancel
                </Button>
              </div>

              <LogoCustomizer
                onLogoChange={setCustomizationData}
                isBundle={false}
                bundleItemCount={1}
              />

              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setWantsCustomization(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="gold"
                  onClick={handleCustomizedAddToCart}
                  className="flex-1"
                  disabled={!customizationData}
                >
                  Add Customized Item to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
