import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
          {/* Left: Branding */}
          <Link to="/contact" className="group block text-center md:text-left">
            <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter text-primary uppercase leading-none group-hover:scale-105 transition-transform origin-left">
              Let's
              <br />
              <span className="text-foreground group-hover:text-primary transition-colors">Chat</span>
            </h2>
          </Link>

          {/* Right: Subscribe & Payment Icons */}
          <div className="flex flex-col items-end gap-8">
            {/* Subscribe Form */}
            <div className="w-full max-w-sm">
              <h3 className="font-display text-lg font-semibold mb-2 text-right">Subscribe to our emails</h3>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-10 bg-transparent border border-foreground/20 rounded-none px-4 pr-10 focus:border-foreground focus:outline-none transition-colors"
                />
                <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center hover:text-primary transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex flex-wrap justify-end gap-2">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Klarna_Payment_Badge.svg/2560px-Klarna_Payment_Badge.svg.png"
              ].map((src, i) => (
                <div key={i} className="bg-white p-2 rounded border border-border h-8 w-12 flex items-center justify-center overflow-hidden">
                  <img src={src} alt="Payment Method" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground pt-8 border-t border-border">
          <p>© 2026, UniFab</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy policy
            </Link>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">
              Refund policy
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact information
            </Link>
            <Link to="/shipping-policy" className="hover:text-primary transition-colors">
              Shipping policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-primary transition-colors">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
