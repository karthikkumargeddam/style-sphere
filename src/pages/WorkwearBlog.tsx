import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const WorkwearBlog = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "Safety", "Style", "Care", "Industry News", "Buying Guides"];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const blogPosts = [
        {
            id: 1,
            title: "The Ultimate Guide to Choosing Safety Boots",
            excerpt: "Everything you need to know about selecting the right safety footwear for your workplace...",
            category: "Safety",
            author: "Sarah Johnson",
            date: "2024-01-15",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80",
            featured: true
        },
        {
            id: 2,
            title: "How to Care for Your Hi-Vis Workwear",
            excerpt: "Maintain the reflective properties and extend the life of your high-visibility clothing...",
            category: "Care",
            author: "Mike Chen",
            date: "2024-01-12",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&q=80"
        },
        {
            id: 3,
            title: "2024 Workwear Trends: What's New in Corporate Attire",
            excerpt: "Discover the latest trends in professional workwear and how to keep your team looking sharp...",
            category: "Style",
            author: "Emma Williams",
            date: "2024-01-10",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"
        },
        {
            id: 4,
            title: "Understanding PPE Regulations in the UK",
            excerpt: "A comprehensive guide to Personal Protective Equipment requirements and compliance...",
            category: "Industry News",
            author: "David Brown",
            date: "2024-01-08",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&q=80"
        },
        {
            id: 5,
            title: "Winter Workwear: Staying Warm and Safe",
            excerpt: "Essential tips for choosing and layering workwear during cold weather conditions...",
            category: "Buying Guides",
            author: "Lisa Taylor",
            date: "2024-01-05",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1544923246-77307dd654f3?w=600&q=80"
        },
        {
            id: 6,
            title: "Embroidery vs Screen Printing: Which is Better?",
            excerpt: "Compare the pros and cons of different branding methods for your workwear...",
            category: "Buying Guides",
            author: "Tom Harris",
            date: "2024-01-03",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80"
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(p => p.featured);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Blog</Badge>
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Workwear Insights
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Expert tips, industry news, and guides for professional workwear
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(cat)}
                                    className="whitespace-nowrap"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && selectedCategory === "All" && !searchQuery && (
                        <Link to={`/blog/${featuredPost.id}`} className="block mb-12">
                            <div className="card-3d overflow-hidden group">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="aspect-video md:aspect-auto overflow-hidden">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <Badge className="w-fit mb-4">Featured</Badge>
                                        <h2 className="font-display text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {featuredPost.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(featuredPost.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                        <Button variant="outline" className="w-fit">
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(post => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="card-3d overflow-hidden group"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <Badge variant="outline" className="mb-3">
                                        {post.category}
                                    </Badge>
                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No articles found matching your search.</p>
                        </div>
                    )}

                    {/* Newsletter CTA */}
                    <div className="card-3d p-8 mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                        <h3 className="font-display text-2xl font-bold mb-2">
                            Never Miss an Update
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to our newsletter for the latest workwear tips and industry news
                        </p>
                        <Button>
                            Subscribe Now
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WorkwearBlog;
