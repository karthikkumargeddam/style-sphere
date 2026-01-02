import safetyVest from "@/assets/product-safety-vest.jpg";
import workTrousers from "@/assets/product-work-trousers.jpg";
import poloShirt from "@/assets/product-polo-shirt.jpg";
import hardHat from "@/assets/product-hard-hat.jpg";

export type ProductSummary = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
};

export type ProductDetail = ProductSummary & {
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
  includedItems?: string[];
};

const categories = [
  "Safety Wear",
  "Work Trousers",
  "Polo Shirts",
  "PPE Equipment",
  "Hospital Bundles",
  "Workwear Bundles",
  "Safety Boots",
  "Hi-Vis Vests",
  "Coveralls",
  "Winter Workwear",
];

const images = [
  safetyVest,
  workTrousers,
  poloShirt,
  hardHat,
  safetyVest,
  workTrousers,
  "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&q=80", // Safety Boots
  "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&q=80", // Hi-Vis Vests
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80", // Coveralls
  "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=400&q=80", // Winter Workwear
];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeName = (category: string, idx: number) => {
  if (category.toLowerCase().includes("bundle")) {
    // e.g. "Hospital Bundle #12"
    return `${category.replace("Bundles", "Bundle")} #${idx}`;
  }
  return `${category.split(" ")[0]} Item ${idx}`;
};

// Generate 100 products per category (min)
const products: ProductSummary[] = [];
let id = 1;
for (let c = 0; c < categories.length; c++) {
  const cat = categories[c];
  for (let i = 1; i <= 100; i++) {
    const price = Number((random(10, 120) + Math.random()).toFixed(2));
    const rating = Number((Math.min(5, (Math.random() * 1.5 + 3.5))).toFixed(1));
    const reviews = random(0, 500);
    const badge = Math.random() > 0.92 ? "Best Seller" : Math.random() > 0.98 ? "New" : undefined;
    products.push({
      id: id,
      name: makeName(cat, i),
      category: cat,
      price,
      originalPrice: Math.random() > 0.7 ? Number((price + random(5, 20)).toFixed(2)) : undefined,
      rating,
      reviews,
      image: images[c % images.length],
      badge,
    });
    id++;
  }
}

export function getAllProducts(): ProductSummary[] {
  return products;
}

export type ProductFilter = {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

export function getProductsPage(opts: { page: number; pageSize: number; filter?: ProductFilter }) {
  const { page, pageSize, filter } = opts;
  let result = products.slice();

  if (filter) {
    if (filter.category && filter.category !== "All Products") {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (typeof filter.minPrice === "number") {
      result = result.filter((p) => p.price >= filter.minPrice!);
    }
    if (typeof filter.maxPrice === "number") {
      result = result.filter((p) => p.price <= filter.maxPrice!);
    }
    if (typeof filter.minRating === "number") {
      result = result.filter((p) => p.rating >= filter.minRating!);
    }
  }

  const total = result.length;
  const start = (page - 1) * pageSize;
  const items = result.slice(start, start + pageSize);

  return { items, total };
}

export function getProductDetail(productId: number) {
  const p = products.find((x) => x.id === productId);
  if (p) {
    const isPrime = p.id <= 20; // enrich first 20 items
    const base = {
      ...p,
      description: `${p.name} — reliable ${p.category.toLowerCase()} designed for professionals.`,
      longDescription: isPrime
        ? `${p.name} is a premium ${p.category.toLowerCase()} crafted for demanding environments. It features reinforced stitching, high-grade materials, and performance-oriented details to deliver longevity and comfort during long shifts. Ideal for contractors and teams who need dependable workwear.`
        : `${p.name} is built to a high standard for durability and comfort. Ideal for industrial and commercial environments with attention to detail and performance.`,
      features: [
        "Durable construction",
        "Comfort-focused design",
        "Reinforced stress points",
        "Easy care and maintenance",
      ],
      specifications: [
        { label: "Material", value: "Polyester blend" },
        { label: "Weight", value: "~450g" },
        { label: "Care", value: "Machine wash" },
      ],
      materials: ["Main fabric: polyester blend", "Trims: reinforced nylon"],
      careInstructions: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
      certifications: ["CE Certified"],
      availableSizes: ["S", "M", "L", "XL"],
      availableColors: [
        { name: "Black", hex: "#1a1a1a" },
        { name: "Navy", hex: "#1a2d4a" },
      ],
      deliveryInfo: "Standard delivery 3-5 working days.",
      warranty: "1-year limited warranty.",
      includedItems: p.category.toLowerCase().includes("bundle")
        ? generateBundleContents(p.category, p.name)
        : undefined,
    };
    return base;
  }

  // If not found, return a generic fallback
  return {
    id: productId,
    name: `Product ${productId}`,
    category: "All Products",
    price: 19.99,
    rating: 4.2,
    reviews: 0,
    image: images[0],
    description: "Generic product",
    longDescription: "Generic product description.",
    features: ["Feature 1", "Feature 2"],
    specifications: [{ label: "Material", value: "Unknown" }],
    materials: ["Unknown"],
    careInstructions: ["Hand wash"],
    certifications: [],
    availableSizes: ["M"],
    availableColors: [{ name: "Default", hex: "#cccccc" }],
    deliveryInfo: "Standard delivery.",
    warranty: "No warranty.",
  };
}

export default products;

function generateBundleContents(category: string, name: string) {
  const common = [
    "Polo Shirt",
    "Work Trousers",
    "Safety Vest",
    "Safety Boots",
    "Hard Hat",
    "Gloves",
    "Face Mask",
    "Hi-Vis Jacket",
  ];

  if (category.toLowerCase().includes("hospital")) {
    // hospital bundles include clinical items
    const hospitalItems = ["Scrub Top", "Scrub Trousers", "Disposable Mask", "Nitrile Gloves", "Clinical Apron", "Comfort Shoes"];
    return shuffleArray(hospitalItems).slice(0, 5);
  }

  // generic workwear bundles
  return shuffleArray(common).slice(0, 5);
}

function shuffleArray<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Utility: return unique product names for search suggestions
export function getProductNames(): string[] {
  const names = products.map((p) => p.name);
  return Array.from(new Set(names)).slice(0, 1000);
}
