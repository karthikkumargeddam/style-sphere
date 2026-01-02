import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// TikTok icon component (lucide-react doesn't have TikTok, so we use SVG)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

/* ---------------- TYPES ---------------- */
interface FooterLink {
  label: string;
  path: string;
}

/* ---------------- DATA ---------------- */
const productLinks: FooterLink[] = [
  { label: "Hi-Vis Workwear", path: "/products?category=Safety%20Wear" },
  { label: "Work Trousers", path: "/products?category=Work%20Trousers" },
  { label: "Polo Shirts", path: "/products?category=Polo%20Shirts" },
  { label: "Bundles", path: "/bundles" },
  { label: "Jackets & Coats", path: "/products?category=Safety%20Wear" },
  { label: "Safety Boots", path: "/products?category=Safety%20Footwear" },
  { label: "PPE Equipment", path: "/products?category=PPE%20Equipment" },
];

const serviceLinks: FooterLink[] = [
  { label: "Custom Logo Printing", path: "/services/logo-printing" },
  { label: "Embroidery Services", path: "/services/embroidery" },
  { label: "Bulk Orders", path: "/services/bulk-orders" },
  { label: "Corporate Accounts", path: "/services/corporate-accounts" },
  { label: "Logo Gallery", path: "/logo-gallery" },
  { label: "FAQ", path: "/faq" },
  { label: "Blog", path: "/blog" },
];

const categoryLinks: FooterLink[] = [
  { label: "Safety Jackets", path: "/products?category=cat_1" },
  { label: "Work Pants", path: "/products?category=cat_2" },
  { label: "Hi-Vis Vests", path: "/products?category=cat_3" },
  { label: "Coveralls", path: "/products?category=cat_4" },
  { label: "Work Bundles", path: "/products?category=cat_5" },
  { label: "Protective Gear", path: "/products?category=cat_6" },
  { label: "Winter Workwear", path: "/products?category=cat_7" },
  { label: "Custom Wear", path: "/products?category=cat_8" },
];

/* ---------------- COMPONENT ---------------- */
const Footer: React.FC = () => {
  const { user } = useAuth();

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.email === "admin@unifab.co.uk" || user?.role === "admin";

  return (
    <footer className="bg-card border-t border-border">
      {/* Top section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="font-display font-bold text-xl text-primary-foreground">
                  UF
                </span>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-foreground">
                  UniFab
                </span>
                <span className="block text-xs text-muted-foreground">
                  Professional Workwear
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium workwear and uniforms for businesses across the UK. Custom
              branding, bulk orders, and fast delivery.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/17nNwxadiT/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-depth-sm hover:shadow-depth-md hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/wearunifab?igsh=MTB0M2oyd2x6YnA1aw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-depth-sm hover:shadow-depth-md hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@wearunifab?_r=1&_t=ZN-92g7VG4ZyRq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-depth-sm hover:shadow-depth-md hover:scale-110"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 uppercase tracking-wide">
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h5 className="text-sm font-medium text-foreground mb-3">Browse by category</h5>
              <ul className="space-y-2">
                {categoryLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-primary hover:underline font-medium flex items-center gap-2"
                >
                  → Visit Contact Page
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <span className="block text-foreground font-medium">
                    0800 123 4567
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Mon–Fri 9am–5pm
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <span className="block text-foreground font-medium">
                    info@unifab.co.uk
                  </span>
                  <span className="text-sm text-muted-foreground">
                    24/7 Support
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <span className="block text-foreground font-medium">
                    London, UK
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Nationwide Delivery
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 UniFab. All rights reserved.
            </p>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Refund Policy
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
