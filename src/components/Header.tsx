import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Search, User, LogOut, Mic, Heart, Moon, Sun, Volume2, VolumeX, Package } from "lucide-react";
import { getProductNames } from "@/lib/products";
import CartPreview from "@/components/CartPreview";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { AdminNotifications } from "@/components/AdminNotifications";
import LocationToggle from "@/components/LocationToggle";
import AdvancedSearch from "@/components/AdvancedSearch";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useSound } from "@/contexts/SoundContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navLinks = [
    { name: "Workwear", href: "/products?category=Workwear" },
    { name: "Hi-Vis", href: "/products?category=Hi-Vis" },
    { name: "Safety Wear", href: "/products?category=Safety%20Wear" },
    { name: "Corporate", href: "/products?category=Corporate" },
    { name: "Bundles", href: "/bundles", highlight: true },
    { name: "Custom Printing", href: "/quote" },
  ];

  const mega = {
    Workwear: ["Polo Shirts", "Work Trousers", "Safety Boots"],
    Safety: ["Hi-Vis Jackets", "Hard Hats", "Gloves"],
    Uniforms: ["Scrub Top", "Scrub Trousers", "Clinical Apron"],
    Corporate: ["Polo Shirts", "Blazers", "Work Trousers"],
  } as Record<string, string[]>;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [category, setCategory] = useState("All");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAdminWarning, setShowAdminWarning] = useState(false);
  const { items: wishlistItems } = useWishlist();
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const suggestions = getProductNames();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!suggestionsRef.current) return;
      if (!suggestionsRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const submitSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleAdminClick = () => {
    const isAdmin = user?.email === "admin@unifab.co.uk" || user?.role === "admin";

    if (!user) {
      // Not signed in - go to auth page
      navigate('/auth');
    } else if (isAdmin) {
      // Is admin - go to admin dashboard
      navigate('/admin');
    } else {
      // Is customer - show warning
      setShowAdminWarning(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:08001234567" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="w-4 h-4" />
              <span>0800 123 4567</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Free UK Delivery on Orders Over £150</span>
            <span>•</span>
            <span>UK Based - Fast Dispatch</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded hover:bg-primary-foreground/10 transition-colors"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <LocationToggle />
            {user && user.role === "admin" && <AdminNotifications />}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">U</span>
            </div>
            <div>
              <div className="font-display font-bold text-xl text-foreground">Unifab</div>
              <div className="text-xs text-muted-foreground">Professional Workwear</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8 relative" ref={suggestionsRef}>
            <form onSubmit={(e) => { e.preventDefault(); submitSearch(); }} className="flex items-center relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 px-3 bg-background border border-border rounded-l text-sm text-foreground"
              >
                <option>All</option>
                <option>Hi-Vis Jackets</option>
                <option>Work Trousers</option>
                <option>Polo Shirts</option>
                <option>Bundles</option>
              </select>
              <input
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); setSelectedSuggestion(-1); }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  const matches = suggestions.filter((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedSuggestion((prev) => Math.min(prev + 1, matches.length - 1));
                    setShowSuggestions(true);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedSuggestion((prev) => Math.max(prev - 1, 0));
                    setShowSuggestions(true);
                  } else if (e.key === "Enter") {
                    if (selectedSuggestion >= 0 && matches[selectedSuggestion]) {
                      setSearchTerm(matches[selectedSuggestion]);
                    }
                    submitSearch();
                  }
                }}
                placeholder="Search products, e.g. 'Hi-Vis Jacket'"
                className="h-10 flex-1 px-3 border-t border-b border-border text-sm rounded-none bg-background text-foreground placeholder:text-muted-foreground"
                onClick={() => setShowAdvancedSearch(true)}
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowAdvancedSearch(true)}
                className="h-10 px-3 bg-primary text-primary-foreground rounded-r hover:bg-primary/90 transition-colors"
                title="Advanced Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {showSuggestions && searchTerm.length > 0 && (
                <div className="absolute left-0 right-0 top-12 bg-foreground/5 backdrop-blur-md border border-border rounded shadow mt-1 z-40">
                  <ul className="max-h-48 overflow-auto py-2">
                    {suggestions.filter((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 8).map((sug: string, i: number) => (
                      <li key={i} className={`px-3 py-2 cursor-pointer text-sm ${i === selectedSuggestion ? 'bg-secondary' : 'hover:bg-secondary'}`} onMouseEnter={() => setSelectedSuggestion(i)} onClick={() => { setSearchTerm(sug); submitSearch(); }}>
                        {sug}
                      </li>
                    ))}
                    {suggestions.filter((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                      <li className="px-3 py-2 text-sm text-muted-foreground">No suggestions</li>
                    )}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Link to="/profile/dashboard" className="hidden md:flex items-center gap-2 px-3 py-2 rounded hover:bg-secondary transition-colors">
              <User className="w-4 h-4 text-foreground/80" />
              <span className="text-sm text-foreground/80">Profile</span>
            </Link>
            <div className="hidden xl:flex items-center gap-2">
              <Link to="/profile/orders" className="text-xs text-foreground/80 hover:text-primary">Orders</Link>
              <Link to="/returns" className="text-xs text-foreground/80 hover:text-primary">Returns</Link>
            </div>
            {user ? (
              <Link to="/profile" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors" title="Profile">
                <User className="w-5 h-5 text-foreground/80" />
              </Link>
            ) : (
              <Link to="/auth" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors">
                <User className="w-5 h-5 text-foreground/80" />
              </Link>
            )}

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-foreground/80" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <div className="relative" onMouseEnter={() => setShowCartPreview(true)} onMouseLeave={() => setShowCartPreview(false)}>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-foreground/80" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
              {showCartPreview && (
                <div className="absolute right-0 mt-3 md:block z-50" style={{ minWidth: 320 }}>
                  <CartPreview />
                </div>
              )}
            </div>

            {/* Admin Button - Always Visible */}
            <div className="hidden lg:block group relative">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdminClick}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              >
                🔐 Admin
              </Button>
              <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-red-500/10 border border-red-500/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="text-xs text-red-500 font-semibold">⚠️ OWNERS ONLY</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This dashboard is exclusively for business owners and administrators.
                </p>
              </div>
            </div>

            <Link to="/quote" className="hidden lg:block">
              <Button variant="gold" size="sm">
                Quote
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 hover:bg-secondary rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/profile/dashboard" className="px-4 py-2 hover:bg-secondary rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/profile/orders" className="px-4 py-2 hover:bg-secondary rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
                Orders
              </Link>
              <Link to="/returns" className="px-4 py-2 hover:bg-secondary rounded transition-colors" onClick={() => setIsMenuOpen(false)}>
                Returns
              </Link>
              <Link to="/quote">
                <Button variant="gold" size="lg" className="w-full mt-2">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Advanced Search Modal */}
      {showAdvancedSearch && (
        <AdvancedSearch onClose={() => setShowAdvancedSearch(false)} />
      )}

      {/* Admin Warning Modal */}
      {showAdminWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-3d p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Access Restricted
              </h2>
              <p className="text-muted-foreground mb-6">
                This admin dashboard is <strong className="text-red-500">exclusively for business owners and administrators</strong>.
                Customers do not have access to this area.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground">
                  <strong>For Owners:</strong> Please sign in with your admin credentials to access the dashboard.
                </p>
              </div>
              <button
                onClick={() => setShowAdminWarning(false)}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Navigation */}
      <div className="hidden lg:block border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 text-sm font-medium">
            <div className="relative group py-3">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Products
                <span className="text-[10px] transform group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute top-full left-0 w-48 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-lg shadow-xl p-2 flex flex-col gap-1">
                  <Link to="/products?category=Safety%20Wear" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Hi-Vis Workwear
                  </Link>
                  <Link to="/products?category=Work%20Trousers" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Work Trousers
                  </Link>
                  <Link to="/products?category=Polo%20Shirts" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Polo Shirts
                  </Link>
                  <Link to="/bundles" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Bundles
                  </Link>
                  <Link to="/products?category=Safety%20Wear" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Jackets & Coats
                  </Link>
                  <Link to="/products?category=Safety%20Footwear" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Safety Boots
                  </Link>
                  <Link to="/products?category=PPE%20Equipment" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    PPE Equipment
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group py-3">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Browse Category
                <span className="text-[10px] transform group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute top-full left-0 w-48 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-lg shadow-xl p-2 flex flex-col gap-1">
                  <Link to="/products?category=cat_1" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Safety Jackets
                  </Link>
                  <Link to="/products?category=cat_2" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Work Pants
                  </Link>
                  <Link to="/products?category=cat_3" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Hi-Vis Vests
                  </Link>
                  <Link to="/products?category=cat_4" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Coveralls
                  </Link>
                  <Link to="/products?category=cat_5" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Work Bundles
                  </Link>
                  <Link to="/products?category=cat_6" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Protective Gear
                  </Link>
                  <Link to="/products?category=cat_7" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Winter Workwear
                  </Link>
                  <Link to="/products?category=cat_8" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                    Custom Wear
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/quote" className="hover:text-primary transition-colors">
              Custom Printing
            </Link>

            <Link to="/services/bulk-orders" className="hover:text-primary transition-colors flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Bulk Orders</span>
            </Link>

            <Link to="/services/corporate-accounts" className="hover:text-primary transition-colors">
              Corporate Accounts
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
