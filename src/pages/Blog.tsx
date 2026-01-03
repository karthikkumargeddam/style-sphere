import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Ultimate Guide to Choosing the Right Workwear for Your Industry",
        excerpt: "Discover how to select the perfect workwear that balances safety, comfort, and professionalism for your specific industry needs.",
        author: "Sarah Johnson",
        date: "December 28, 2024",
        readTime: "5 min read",
        category: "Buying Guides",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop",
    },
    {
        id: 2,
        title: "2025 Workwear Trends: What's New in Professional Attire",
        excerpt: "Stay ahead of the curve with the latest trends in workwear design, materials, and technology for the new year.",
        author: "Michael Chen",
        date: "December 25, 2024",
        readTime: "4 min read",
        category: "Industry News",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
    {
        id: 3,
        title: "Safety First: Understanding PPE Requirements in Construction",
        excerpt: "A comprehensive overview of personal protective equipment regulations and best practices for construction workers.",
        author: "David Williams",
        date: "December 20, 2024",
        readTime: "6 min read",
        category: "Safety Tips",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    },
    {
        id: 4,
        title: "How to Care for Your Hi-Vis Workwear: Maintenance Tips",
        excerpt: "Extend the life of your high-visibility clothing with these essential care and maintenance guidelines.",
        author: "Emma Thompson",
        date: "December 15, 2024",
        readTime: "3 min read",
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop&q=80",
    },
    {
        id: 5,
        title: "Corporate Branding: The Power of Customized Workwear",
        excerpt: "Learn how custom-branded workwear can enhance your company's professional image and team unity.",
        author: "James Anderson",
        date: "December 10, 2024",
        readTime: "5 min read",
        category: "Business Tips",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop",
    },
    {
        id: 6,
        title: "Winter Workwear Essentials: Staying Warm and Safe",
        excerpt: "Prepare for cold weather with our guide to essential winter workwear that keeps you protected and comfortable.",
        author: "Sophie Martin",
        date: "December 5, 2024",
        readTime: "4 min read",
        category: "Seasonal",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
    },
];

const categories = ["All Posts", "Buying Guides", "Industry News", "Safety Tips", "Maintenance", "Business Tips", "Seasonal"];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Posts");

    const filteredPosts = selectedCategory === "All Posts"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        // Scroll to blog grid section
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="glass-gold inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 shadow-depth-sm">
                            Blog & Resources
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Workwear Insights & Tips
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Expert advice, industry news, and practical guides to help you make informed decisions about your workwear.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`glass px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-depth-sm hover:shadow-depth-md ${selectedCategory === category
                                    ? "bg-primary text-white"
                                    : "hover:bg-primary hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    <div className="card-3d overflow-hidden mb-12 group">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="aspect-video md:aspect-auto overflow-hidden">
                                <img
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <span className="glass-gold inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                                    Featured
                                </span>
                                <h2 className="font-display text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {blogPosts[0].title}
                                </h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {blogPosts[0].author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {blogPosts[0].date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {blogPosts[0].readTime}
                                    </div>
                                </div>
                                <Link to={`/blog/${blogPosts[0].id}`}>
                                    <button className="glass px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md inline-flex items-center gap-2">
                                        Read Article
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div id="blog-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.slice(selectedCategory === "All Posts" ? 1 : 0).map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="card-3d overflow-hidden group hover:scale-105 transition-all duration-300"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 block">
                                        {post.category}
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="glass-gold p-8 rounded-xl mt-16 text-center shadow-depth-lg">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                            Never Miss an Update
                        </h2>
                        <p className="text-foreground/80 mb-6">
                            Subscribe to our newsletter for the latest workwear tips, industry news, and exclusive offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg neuro"
                            />
                            <button className="glass px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
