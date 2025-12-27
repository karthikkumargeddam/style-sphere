import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Printer, Truck, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Printer,
    title: "Custom Logo Printing",
    description: "High-quality embroidery and printing services to brand your workwear with your company logo.",
  },
  {
    icon: Truck,
    title: "Fast UK Delivery",
    description: "Next day delivery available. Free shipping on all orders over £150.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All our products meet strict UK safety standards. 30-day hassle-free returns.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "From order to delivery in as little as 5 working days, even with custom branding.",
  },
];

const QuoteSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Why Choose UniFab
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Get a Quote for Custom
              <span className="text-gradient-gold block">Branded Uniforms</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Quality uniforms for hospitality, construction, trades, and offices. 
              Low minimum orders and fast UK-based turnaround.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/quote">
              <Button variant="hero" size="xl">
                Get My Quote
              </Button>
            </Link>
          </div>

          {/* Right content - Quote form card */}
          <div className="card-industrial p-8 bg-card">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Request a Quick Quote
            </h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your workwear needs..."
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <Button variant="gold" size="lg" className="w-full">
                Submit Quote Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
