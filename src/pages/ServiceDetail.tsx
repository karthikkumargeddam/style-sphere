import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type ServiceContent = {
  title: string;
  hero?: string;
  description: string;
  features: string[];
  examples: string[];
  cta?: { label: string; to: string };
};

const services: Record<string, ServiceContent> = {
  "logo-printing": {
    title: "Custom Logo Printing",
    hero: "/assets/services/logo-printing.jpg",
    description:
      "High-quality logo printing tailored for workwear — from durable hi-vis jackets to everyday polos. We support screen printing, direct-to-garment and transfer methods to suit quantity and fabric.",
    features: [
      "Multiple printing methods (screen, DTF, transfers)",
      "Long-lasting, wash-resistant inks",
      "Full-colour prints and spot colour options",
      "On-site and label printing for trim and tags",
    ],
    examples: ["Hi-vis jackets", "Polos & tees", "Workwear labels"],
    cta: { label: "Request a printing quote", to: "/quote" },
  },
  embroidery: {
    title: "Embroidery Services",
    hero: "/assets/services/embroidery.jpg",
    description:
      "Professional embroidery for branding and personalization. Our machines handle dense stitching and multi-colour designs for a premium finish on thicker fabrics.",
    features: [
      "Thread colour matching and PMS approximation",
      "Patch and direct embroidery options",
      "Small runs and high-volume production",
      "Quality inspection on every batch",
    ],
    examples: ["Polos & shirts", "Jackets & fleeces", "Caps & bags"],
    cta: { label: "Get an embroidery quote", to: "/quote" },
  },
  "bulk-orders": {
    title: "Bulk Orders & Fulfilment",
    hero: "/assets/services/bulk-orders.jpg",
    description:
      "Cost-effective bulk ordering with flexible packing and delivery options. We provide dedicated account support and can manage repeat shipments or staged rollouts.",
    features: [
      "Volume discounts and tiered pricing",
      "Custom packing, labeling and kitting",
      "Staged fulfilment for multi-site rollouts",
      "Secure storage and reorders available",
    ],
    examples: ["Site-wide uniform supply", "Event staffing kits", "Training cohorts"],
    cta: { label: "Discuss bulk orders", to: "/contact" },
  },
  "corporate-accounts": {
    title: "Corporate Accounts & Procurement",
    hero: "/assets/services/corporate-accounts.jpg",
    description:
      "Tailored corporate accounts to simplify procurement: central billing, purchase orders, and an employee portal for allocations and reorders.",
    features: [
      "Net terms and consolidated invoicing",
      "Employee ordering portals and approval flows",
      "Dedicated account manager",
      "SLA-backed fulfilment and reporting",
    ],
    examples: ["Local councils", "Logistics firms", "Facilities management"],
    cta: { label: "Request a corporate account", to: "/contact" },
  },
  "same-day-dispatch": {
    title: "Same Day Dispatch",
    hero: "/assets/services/same-day-dispatch.jpg",
    description:
      "For urgent requirements we offer same-day dispatch on eligible items ordered before our cut-off time — perfect for last-minute site needs.",
    features: [
      "Cut-off times for same-day processing",
      "Express courier options",
      "Order tracking and priority handling",
    ],
    examples: ["Emergency replacement", "Last minute hires", "Show and event staff"],
    cta: { label: "Check eligibility", to: "/contact" },
  },
  "free-returns": {
    title: "Free Returns & Exchanges",
    hero: "/assets/services/free-returns.jpg",
    description:
      "Simple, no-hassle returns and exchanges on qualifying orders — including prepaid labels and rapid exchanges for sizing issues.",
    features: [
      "30-day returns window",
      "Prepaid return labels for UK mainland",
      "Quick exchanges for size and fit",
    ],
    examples: ["Size exchanges", "Faulty item returns", "Order cancellations"],
    cta: { label: "Start a return", to: "/contact" },
  },
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const key = serviceId || "";
  const svc = services[key];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {svc ? (
            <>
              <h1 className="font-display text-3xl font-bold mb-4">{svc.title}</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <p className="text-muted-foreground mb-6">{svc.description}</p>

                  <h3 className="font-semibold mb-2">Key features</h3>
                  <ul className="list-disc ml-5 mb-6 text-muted-foreground">
                    {svc.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <h3 className="font-semibold mb-2">Typical uses</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.examples.map((ex, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary rounded text-sm text-muted-foreground">
                        {ex}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link to={svc.cta?.to || "/quote"}>
                      <Button>{svc.cta?.label || "Request a Quote"}</Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline">Contact Sales</Button>
                    </Link>
                  </div>
                </div>

                <aside className="hidden lg:block">
                  {svc.hero && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={svc.hero} alt={svc.title} className="w-full rounded shadow" />
                  )}

                  <div className="mt-6 bg-card p-4 rounded">
                    <h4 className="font-semibold mb-2">Why choose us</h4>
                    <p className="text-sm text-muted-foreground">
                      Competitive pricing, reliable lead times and quality control on every order.
                    </p>
                  </div>
                </aside>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-bold mb-4">Our Services</h1>
              <p className="text-muted-foreground mb-6">
                We provide a range of services to support business workwear needs — from
                custom branding to bulk fulfilment. Click a service below to learn more.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(services).map(([slug, s]) => (
                  <div key={slug} className="card-industrial p-4">
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{s.description}</p>
                    <Link to={`/services/${slug}`} className="text-primary">
                      Learn more →
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
