import { Link } from "react-router-dom";
import hospitalityImg from "@/assets/category-hospitality.jpg";
import constructionImg from "@/assets/category-construction.jpg";
import healthcareImg from "@/assets/category-healthcare.jpg";
import corporateImg from "@/assets/category-corporate.jpg";

const categories = [
  {
    name: "Hospitality",
    description: "Chef jackets, aprons & catering wear",
    image: hospitalityImg,
    link: "/products",
  },
  {
    name: "Construction",
    description: "Hi-vis, safety boots & PPE",
    image: constructionImg,
    link: "/products",
  },
  {
    name: "Healthcare",
    description: "Scrubs, tunics & medical wear",
    image: healthcareImg,
    link: "/products",
  },
  {
    name: "Corporate",
    description: "Suits, shirts & business attire",
    image: corporateImg,
    link: "/products",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Shop by Industry
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Workwear for Every Sector
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From construction sites to corporate offices, we supply professional workwear tailored to your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group card-industrial animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-4 transition-all">
                    Shop Now
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
