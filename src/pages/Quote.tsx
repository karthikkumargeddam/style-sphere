import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Printer, Truck, Shield, Clock, Phone, Mail } from "lucide-react";

const Quote = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Get Started
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Request a Custom Quote
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your workwear requirements and we'll provide a tailored quote within 24 hours. Bulk discounts available.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Quote Form */}
            <div className="card-industrial p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Your Details
              </h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+44 7xxx xxxxxx"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                  <select className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select your industry</option>
                    <option value="construction">Construction</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="corporate">Corporate</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Estimated Quantity</label>
                  <select className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select quantity range</option>
                    <option value="10-25">10-25 units</option>
                    <option value="25-50">25-50 units</option>
                    <option value="50-100">50-100 units</option>
                    <option value="100-250">100-250 units</option>
                    <option value="250+">250+ units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Requirements *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your workwear needs. Include details about products, sizes, branding requirements, and any specific features..."
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="terms" className="mt-1" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the terms and conditions and privacy policy. We'll only use your information to respond to your enquiry.
                  </label>
                </div>

                <Button variant="gold" size="xl" className="w-full">
                  Submit Quote Request
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="card-industrial p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Prefer to Talk?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="block text-foreground font-semibold text-lg">0800 123 4567</span>
                      <span className="text-muted-foreground">Mon-Fri 9am-5pm</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="block text-foreground font-semibold text-lg">quotes@unifab.co.uk</span>
                      <span className="text-muted-foreground">24/7 Email Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="card-industrial p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Why Request a Quote?
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: Printer, title: "Custom Branding", desc: "Get your logo printed or embroidered on all items" },
                    { icon: Shield, title: "Bulk Discounts", desc: "Save more when ordering larger quantities" },
                    { icon: Truck, title: "Free Delivery", desc: "Free UK delivery on orders over £150" },
                    { icon: Clock, title: "Fast Turnaround", desc: "From quote to delivery in 5-7 working days" },
                  ].map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4">
                {["10,000+ Customers", "98% Satisfaction", "15+ Years"].map((badge) => (
                  <div key={badge} className="card-industrial p-4 text-center">
                    <span className="text-sm font-medium text-foreground">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quote;
