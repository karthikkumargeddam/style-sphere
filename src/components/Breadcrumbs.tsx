import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    href: string;
}

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Generate breadcrumb items from URL
    const getBreadcrumbs = (): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = [
            { label: "Home", href: "/" }
        ];

        let currentPath = "";

        pathnames.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Format the label (capitalize and replace hyphens)
            let label = segment
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            // Custom labels for specific routes
            const customLabels: Record<string, string> = {
                "products": "Products",
                "bundles": "Bundles",
                "quote": "Get Quote",
                "about": "About Us",
                "contact": "Contact",
                "blog": "Blog",
                "faq": "FAQ",
                "privacy-policy": "Privacy Policy",
                "terms-conditions": "Terms & Conditions",
                "cookie-policy": "Cookie Policy",
                "embroidery-designer": "Embroidery Designer",
                "embroidery-gallery": "Embroidery Gallery",
                "embroidery-pricing": "Pricing Calculator",
                "logo-digitization": "Logo Digitization",
                "loyalty-program": "Loyalty Program",
                "customer-gallery": "Customer Gallery",
                "referral-program": "Referral Program",
                "flash-sales": "Flash Sales",
                "logo-gallery": "Logo Gallery",
                "workwear": "Workwear",
                "hi-vis": "Hi-Vis",
                "safety-wear": "Safety Wear",
                "corporate": "Corporate",
                "healthcare": "Healthcare",
                "hospitality": "Hospitality",
                "construction": "Construction"
            };

            if (customLabels[segment]) {
                label = customLabels[segment];
            }

            // Don't add numeric IDs to breadcrumbs, use "Details" instead
            if (/^\d+$/.test(segment)) {
                label = "Details";
            }

            breadcrumbs.push({
                label,
                href: currentPath
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    // Don't show breadcrumbs on home page
    if (location.pathname === "/") {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className="bg-secondary/20 border-b border-border">
            <div className="container mx-auto px-4 py-3">
                <ol className="flex items-center gap-2 text-sm flex-wrap">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        const isFirst = index === 0;

                        return (
                            <li key={crumb.href} className="flex items-center gap-2">
                                {!isFirst && (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}

                                {isLast ? (
                                    <span className="font-medium text-foreground flex items-center gap-1">
                                        {isFirst && <Home className="w-4 h-4" />}
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        to={crumb.href}
                                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                    >
                                        {isFirst && <Home className="w-4 h-4" />}
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
