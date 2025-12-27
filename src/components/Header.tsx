import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const navLinks = [
    { name: "Workwear", href: "/products" },
    { name: "Safety", href: "/products" },
    { name: "Uniforms", href: "/products" },
    { name: "Corporate", href: "/products" },
    { name: "Custom Printing", href: "/quote" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium">0800 123 4567</span>
          </div>
          <span className="hidden sm:block">Free UK Delivery on Orders Over £150</span>
          <span className="hidden md:block">UK Based - Fast Dispatch</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="font-display font-bold text-xl text-primary-foreground">UF</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-foreground">UniFab</span>
              <span className="block text-xs text-muted-foreground">Professional Workwear</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors uppercase text-sm tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors">
              <Search className="w-5 h-5 text-foreground/80" />
            </button>
            {user ? (
              <button 
                onClick={() => signOut()}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-foreground/80" />
              </button>
            ) : (
              <Link to="/auth" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors">
                <User className="w-5 h-5 text-foreground/80" />
              </Link>
            )}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground/80" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </button>
            <Link to="/quote">
              <Button variant="gold" size="sm" className="hidden sm:flex">
                Get Quote
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
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors uppercase text-sm tracking-wide py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/quote" onClick={() => setIsMenuOpen(false)}>
                <Button variant="gold" size="lg" className="w-full mt-2">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
