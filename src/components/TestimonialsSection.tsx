import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell Construction Ltd",
    role: "Operations Manager",
    content: "UniFab transformed our team's appearance with high-quality branded workwear. The turnaround time was incredible and the embroidery quality exceeded expectations.",
    rating: 5,
  },
  {
    name: "James Wilson",
    company: "The Royal Oak Hotel",
    role: "General Manager",
    content: "We've been using UniFab for all our hospitality uniforms. Professional service, great quality, and they always deliver on time for our seasonal staff.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    company: "Citycare Medical",
    role: "HR Director",
    content: "Finding a reliable supplier for medical scrubs was challenging until we found UniFab. Their healthcare range is excellent and the branding options are fantastic.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Corporate Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15+", label: "Years Experience" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-display text-4xl sm:text-5xl font-bold text-primary block mb-2">
                {stat.value}
              </span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card-industrial p-8 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground block">{testimonial.name}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
