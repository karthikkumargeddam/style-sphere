import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Search, User, Heart, Bell, Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { getProductNames } from "@/lib/products";
import CartPreview from "@/components/CartPreview";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { AdminNotifications } from "@/components/AdminNotifications";
import LocationToggle from "@/components/LocationToggle";
import AdvancedSearch from "@/components/AdvancedSearch";
import { toast } from "sonner";

const EnhancedHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // State variables
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCartPreview, setShowCartPreview] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const [category, setCategory] = useState("All");
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [showAdminWarning, setShowAdminWarning] = useState(false);

    // New features
    const [wishlistCount, setWishlistCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(3);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currency, setCurrency] = useState("GBP");
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

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

    // Load wishlist count from localStorage
    useEffect(() => {
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
            setWishlistCount(JSON.parse(wishlist).length);
        }
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
            navigate('/auth');
        } else if (isAdmin) {
            navigate('/admin');
        } else {
            setShowAdminWarning(true);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        toast.success(isDarkMode ? "Light mode enabled" : "Dark mode enabled");
    };

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
        setShowCurrencyMenu(false);
        toast.success(`Currency changed to ${newCurrency}`);
    };

    const mockNotifications = [
        { id: 1, title: "Order Shipped", message: "Your order #12345 has been shipped", time: "2 hours ago" },
        { id: 2, title: "New Promotion", message: "20% off on all Hi-Vis jackets", time: "1 day ago" },
        { id: 3, title: "Review Request", message: "How was your recent purchase?", time: "2 days ago" },
    ];

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
                        {/* Currency Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-primary-foreground/10 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="text-xs font-semibold">{currency}</span>
                                <ChevronDown className="w-3 h-3" />
                            </button>

                            {showCurrencyMenu && (
                                <div className="absolute right-0 mt-2 w-32 glass border border-border rounded-lg shadow-lg z-50">
                                    {["GBP", "EUR", "USD"].map((curr) => (
                                        <button
                                            key={curr}
                                            onClick={() => handleCurrencyChange(curr)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${currency === curr ? "bg-secondary font-semibold" : ""
                                                }`}
                                        >
                                            {curr} {curr === "GBP" ? "£" : curr === "EUR" ? "€" : "$"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-1.5 rounded hover:bg-primary-foreground/10 transition-colors"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
                        </form>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Wishlist Button */}
                        <Link
                            to="/wishlist"
                            className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                            title="Wishlist"
                        >
                            <Heart className="w-5 h-5 text-foreground/80" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Notifications Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                                title="Notifications"
                            >
                                <Bell className="w-5 h-5 text-foreground/80" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 glass border border-border rounded-lg shadow-lg z-50">
                                    <div className="p-3 border-b border-border">
                                        <h3 className="font-semibold text-foreground">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {mockNotifications.map((notif) => (
                                            <div key={notif.id} className="p-3 border-b border-border hover:bg-secondary transition-colors cursor-pointer">
                                                <p className="font-semibold text-sm text-foreground">{notif.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center">
                                        <Link to="/notifications" className="text-sm text-primary hover:underline">
                                            View All Notifications
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        {user ? (
                            <Link to="/profile" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors" title="Profile">
                                <User className="w-5 h-5 text-foreground/80" />
                            </Link>
                        ) : (
                            <Link to="/auth" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors">
                                <User className="w-5 h-5 text-foreground/80" />
                            </Link>
                        )}

                        {/* Cart */}
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

                        {/* Admin Button */}
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

                        {/* Quote Button */}
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
        </header>
    );
};

export default EnhancedHeader;
