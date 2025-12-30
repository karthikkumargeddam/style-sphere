import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface FooterLink {
  label: string;
  path: string;
}

/* ---------------- DATA ---------------- */
const productLinks: FooterLink[] = [
  { label: "Hi-Vis Workwear", path: "/products/hi-vis-workwear" },
  { label: "Work Trousers", path: "/products/work-trousers" },
  { label: "Polo Shirts", path: "/products/polo-shirts" },
  { label: "Jackets & Coats", path: "/products/jackets-coats" },
  { label: "Safety Boots", path: "/products/safety-boots" },
  { label: "PPE Equipment", path: "/products/ppe-equipment" },
];

const serviceLinks: FooterLink[] = [
  { label: "Custom Logo Printing", path: "/services/logo-printing" },
  { label: "Embroidery Services", path: "/services/embroidery" },
  { label: "Bulk Orders", path: "/services/bulk-orders" },
  { label: "Corporate Accounts", path: "/services/corporate-accounts" },
  { label: "Same Day Dispatch", path: "/services/same-day-dispatch" },
  { label: "Free Returns", path: "/services/free-returns" },
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
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 uppercase tracking-wide">
              Products
            </h4>
            <ul className="space-y-3">
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

            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
