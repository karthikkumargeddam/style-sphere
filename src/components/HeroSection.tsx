import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-workwear.jpg";
import MovableCard from "@/components/ui/MovableCard";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-xl">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-slow"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20 preserve-3d">
        <MovableCard className="max-w-3xl glass shadow-depth-xl border border-white/10 backdrop-blur-xl">
          <span className="inline-block px-4 py-2 glass-gold rounded-full text-sm font-semibold uppercase tracking-wider mb-6 animate-fade-up shadow-depth-sm">
            UK's #1 Workwear Supplier
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
            Custom Workwear
            <span className="block text-gradient-gold">&amp; Uniforms</span>
            Printed With Your Logo
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up animation-delay-200">
            High-quality custom workwear for hospitality, trades, and offices.
            Low minimum orders with fast UK-based printing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <Link to="/quote">
              <Button variant="hero" size="xl" className="shadow-depth-lg hover:shadow-depth-xl">
                Get a Quote
              </Button>
            </Link>
            <Link to="/bundles">
              <Button variant="heroOutline" size="xl" className="shadow-depth-md hover:shadow-depth-lg border-2 border-primary/50 hover:border-primary">
                View Bundles
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="heroOutline" size="xl" className="shadow-depth-md hover:shadow-depth-lg">
                See Our Range
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-up animation-delay-400">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 neuro rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <span className="text-primary font-bold text-lg">✓</span>
              </div>
              <div>
                <span className="block text-foreground font-semibold">Low Minimum</span>
                <span className="text-sm text-muted-foreground">From 10 units</span>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 neuro rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <span className="text-primary font-bold text-lg">✓</span>
              </div>
              <div>
                <span className="block text-foreground font-semibold">UK Based</span>
                <span className="text-sm text-muted-foreground">Fast turnaround</span>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 neuro rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <span className="text-primary font-bold text-lg">✓</span>
              </div>
              <div>
                <span className="block text-foreground font-semibold">Free Delivery</span>
                <span className="text-sm text-muted-foreground">Orders £150+</span>
              </div>
            </div>
          </div>
        </MovableCard>
      </div>


      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2 shadow-depth-sm">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse-3d" />
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
