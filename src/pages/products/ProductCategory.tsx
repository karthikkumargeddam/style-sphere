import { FC } from "react";

interface ProductCategoryProps {
  title: string;
  description: string;
}

const ProductCategory: FC<ProductCategoryProps> = ({ title, description }) => {
  return (
    <>
      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition"
            >
              <div className="h-40 bg-secondary rounded-lg mb-4" />
              <h3 className="font-semibold text-lg text-foreground">
                {title} Item
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Premium quality {title.toLowerCase()} designed for professionals.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
