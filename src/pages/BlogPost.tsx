import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPostsData: Record<string, any> = {
    "1": {
        title: "The Ultimate Guide to Choosing the Right Workwear for Your Industry",
        content: `
      <p>Selecting the right workwear is crucial for safety, comfort, and professionalism. Whether you're in construction, healthcare, or corporate environments, your workwear should meet specific industry requirements while keeping you comfortable throughout the day.</p>
      
      <h2>Understanding Your Industry Requirements</h2>
      <p>Different industries have different safety standards and dress codes. Construction workers need high-visibility clothing and protective gear, while healthcare professionals require hygienic, easy-to-clean uniforms. Understanding these requirements is the first step in choosing appropriate workwear.</p>
      
      <h2>Key Factors to Consider</h2>
      <ul>
        <li><strong>Safety Standards:</strong> Ensure your workwear meets industry-specific safety certifications (EN standards, ISO certifications)</li>
        <li><strong>Comfort:</strong> Look for breathable fabrics and ergonomic designs that allow freedom of movement</li>
        <li><strong>Durability:</strong> Invest in quality materials that withstand daily wear and frequent washing</li>
        <li><strong>Visibility:</strong> High-vis elements are essential for outdoor and construction work</li>
        <li><strong>Weather Protection:</strong> Consider seasonal requirements and weather conditions</li>
      </ul>
      
      <h2>Material Matters</h2>
      <p>The fabric of your workwear significantly impacts comfort and durability. Cotton blends offer breathability, while polyester provides durability and wrinkle resistance. For outdoor work, waterproof and windproof materials are essential.</p>
      
      <h2>Fit and Sizing</h2>
      <p>Proper fit is crucial for both safety and comfort. Too-tight clothing restricts movement, while too-loose garments can be hazardous around machinery. Always refer to size guides and consider trying samples before bulk orders.</p>
      
      <h2>Maintenance and Care</h2>
      <p>Quality workwear is an investment. Follow care instructions carefully to extend the life of your garments. Regular washing maintains hygiene, but harsh detergents can damage protective coatings on safety wear.</p>
      
      <h2>Conclusion</h2>
      <p>Choosing the right workwear involves balancing safety requirements, comfort, durability, and budget. Take time to research options, consult with suppliers, and consider employee feedback to make the best choice for your team.</p>
    `,
        author: "Sarah Johnson",
        date: "December 28, 2024",
        readTime: "5 min read",
        category: "Buying Guides",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop",
    },
    "2": {
        title: "2025 Workwear Trends: What's New in Professional Attire",
        content: `
      <p>The workwear industry is evolving rapidly, with new technologies and design innovations transforming how we think about professional attire. Here are the key trends shaping workwear in 2025.</p>
      
      <h2>Sustainable Materials</h2>
      <p>Eco-friendly fabrics are becoming standard, with recycled polyester, organic cotton, and biodegradable materials leading the way. Companies are prioritizing sustainability without compromising on quality or safety.</p>
      
      <h2>Smart Textiles</h2>
      <p>Technology-integrated fabrics that monitor body temperature, track movement, and even charge devices are entering the mainstream. These innovations enhance worker safety and comfort.</p>
      
      <h2>Customization and Personalization</h2>
      <p>Advanced printing and embroidery techniques allow for more detailed and durable branding. Digital customization tools make it easier than ever to create unique, professional-looking workwear.</p>
      
      <h2>Athleisure Influence</h2>
      <p>The comfort and flexibility of athletic wear are influencing workwear design, resulting in more comfortable, stretchable fabrics that don't sacrifice professionalism.</p>
    `,
        author: "Michael Chen",
        date: "December 25, 2024",
        readTime: "4 min read",
        category: "Industry News",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    },
    "3": {
        title: "Safety First: Understanding PPE Requirements in Construction",
        content: `
      <p>Personal Protective Equipment (PPE) is essential for construction worker safety. Understanding and complying with PPE requirements can prevent serious injuries and save lives.</p>
      
      <h2>Legal Requirements</h2>
      <p>In the UK, the Personal Protective Equipment at Work Regulations 1992 require employers to provide appropriate PPE to employees who may be exposed to health and safety risks. Construction sites have specific requirements due to the high-risk nature of the work.</p>
      
      <h2>Essential PPE for Construction</h2>
      <ul>
        <li><strong>Hard Hats:</strong> Protect against falling objects and head injuries. Must meet EN 397 standards.</li>
        <li><strong>Safety Boots:</strong> Steel toe caps and puncture-resistant soles are essential. Look for EN ISO 20345 certification.</li>
        <li><strong>High-Visibility Clothing:</strong> Required on all construction sites. Must meet EN ISO 20471 standards.</li>
        <li><strong>Safety Glasses:</strong> Protect eyes from debris, dust, and chemical splashes.</li>
        <li><strong>Gloves:</strong> Different types for different tasks - cut-resistant, chemical-resistant, or general purpose.</li>
        <li><strong>Hearing Protection:</strong> Essential in high-noise environments (above 85 decibels).</li>
      </ul>
      
      <h2>Proper Use and Maintenance</h2>
      <p>PPE is only effective when used correctly and maintained properly. Regular inspections should be conducted to identify wear and damage. Replace any damaged equipment immediately.</p>
      
      <h2>Training and Compliance</h2>
      <p>All workers must be trained on proper PPE use. Employers should conduct regular safety briefings and ensure compliance through site inspections.</p>
      
      <h2>Conclusion</h2>
      <p>PPE is your last line of defense against workplace hazards. Invest in quality equipment, maintain it properly, and always wear it as required. Your safety depends on it.</p>
    `,
        author: "David Williams",
        date: "December 20, 2024",
        readTime: "6 min read",
        category: "Safety Tips",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
    },
    "4": {
        title: "How to Care for Your Hi-Vis Workwear: Maintenance Tips",
        content: `
      <p>High-visibility workwear is a critical safety feature, but it only works when properly maintained. Follow these guidelines to extend the life of your hi-vis clothing and ensure it remains effective.</p>
      
      <h2>Understanding Hi-Vis Standards</h2>
      <p>Hi-vis clothing must meet EN ISO 20471 standards to be effective. The reflective strips and fluorescent fabric must maintain their visibility properties through regular washing and wear.</p>
      
      <h2>Washing Guidelines</h2>
      <ul>
        <li><strong>Temperature:</strong> Wash at 40°C maximum to preserve reflective properties</li>
        <li><strong>Detergent:</strong> Use mild detergent without bleach or fabric softener</li>
        <li><strong>Frequency:</strong> Wash after every use in dirty environments</li>
        <li><strong>Separation:</strong> Wash hi-vis items separately from other clothing</li>
      </ul>
      
      <h2>Drying and Storage</h2>
      <p>Air dry whenever possible. If using a dryer, use low heat settings. High temperatures can damage reflective strips. Store in a cool, dry place away from direct sunlight.</p>
      
      <h2>Inspection and Replacement</h2>
      <p>Regularly inspect your hi-vis clothing for:</p>
      <ul>
        <li>Faded fluorescent fabric</li>
        <li>Damaged or peeling reflective strips</li>
        <li>Tears or excessive wear</li>
        <li>Loss of visibility in low light</li>
      </ul>
      
      <h2>When to Replace</h2>
      <p>Replace hi-vis workwear when it no longer meets visibility standards, typically after 50-100 washes or when damage is visible. Your safety is worth the investment.</p>
    `,
        author: "Emma Thompson",
        date: "December 15, 2024",
        readTime: "3 min read",
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6e8d?w=1200&h=600&fit=crop",
    },
    "5": {
        title: "Corporate Branding: The Power of Customized Workwear",
        content: `
      <p>Custom-branded workwear is more than just clothing—it's a powerful marketing tool that enhances your company's professional image and strengthens team unity.</p>
      
      <h2>Benefits of Branded Workwear</h2>
      <ul>
        <li><strong>Professional Image:</strong> Creates a cohesive, professional appearance that builds customer trust</li>
        <li><strong>Brand Recognition:</strong> Turns employees into walking advertisements for your business</li>
        <li><strong>Team Unity:</strong> Fosters a sense of belonging and pride among employees</li>
        <li><strong>Security:</strong> Makes it easy to identify authorized personnel on site</li>
      </ul>
      
      <h2>Choosing the Right Branding Method</h2>
      <p>Different branding methods suit different needs:</p>
      <ul>
        <li><strong>Embroidery:</strong> Premium, durable, perfect for logos on polos and jackets</li>
        <li><strong>Screen Printing:</strong> Cost-effective for large quantities and simple designs</li>
        <li><strong>Heat Transfer:</strong> Ideal for full-color designs and small batches</li>
      </ul>
      
      <h2>Design Considerations</h2>
      <p>Keep your logo design simple and scalable. Consider visibility from a distance and ensure colors contrast well with the garment. Test samples before committing to bulk orders.</p>
      
      <h2>ROI of Branded Workwear</h2>
      <p>Studies show that branded uniforms increase customer trust by up to 60% and improve employee morale. The investment pays for itself through increased brand recognition and professional credibility.</p>
      
      <h2>Implementation Tips</h2>
      <p>Roll out branded workwear gradually, starting with customer-facing staff. Gather employee feedback and make adjustments before full deployment. Provide care instructions to maintain quality.</p>
    `,
        author: "James Anderson",
        date: "December 10, 2024",
        readTime: "5 min read",
        category: "Business Tips",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&h=600&fit=crop",
    },
    "6": {
        title: "Winter Workwear Essentials: Staying Warm and Safe",
        content: `
      <p>Winter brings unique challenges for outdoor workers. The right workwear can keep you warm, dry, and safe in harsh weather conditions.</p>
      
      <h2>Layering System</h2>
      <p>Effective winter workwear uses a three-layer system:</p>
      <ul>
        <li><strong>Base Layer:</strong> Moisture-wicking thermal underwear to keep skin dry</li>
        <li><strong>Mid Layer:</strong> Insulating fleece or wool for warmth</li>
        <li><strong>Outer Layer:</strong> Waterproof, windproof jacket for protection</li>
      </ul>
      
      <h2>Essential Winter Workwear</h2>
      <ul>
        <li><strong>Insulated Jackets:</strong> Look for synthetic or down insulation with waterproof outer shell</li>
        <li><strong>Thermal Trousers:</strong> Windproof and water-resistant with reinforced knees</li>
        <li><strong>Winter Gloves:</strong> Insulated yet flexible enough for detailed work</li>
        <li><strong>Thermal Socks:</strong> Moisture-wicking and cushioned for comfort</li>
        <li><strong>Winter Boots:</strong> Insulated, waterproof, with good traction</li>
      </ul>
      
      <h2>Safety Considerations</h2>
      <p>Cold weather increases risk of hypothermia and frostbite. Take regular warm-up breaks, stay hydrated, and watch for signs of cold stress in yourself and coworkers.</p>
      
      <h2>Visibility in Winter</h2>
      <p>Shorter daylight hours mean hi-vis clothing is even more critical. Ensure winter jackets have reflective strips and meet EN ISO 20471 standards.</p>
      
      <h2>Care and Maintenance</h2>
      <p>Properly maintained winter workwear lasts longer and performs better. Follow washing instructions carefully, especially for waterproof garments. Re-proof waterproof coatings annually.</p>
    `,
        author: "Sophie Martin",
        date: "December 5, 2024",
        readTime: "4 min read",
        category: "Seasonal",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop",
    },
    // Add more blog posts as needed
};

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPostsData[id || "1"];

    if (!post) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                        <Link to="/blog">
                            <Button variant="gold">Back to Blog</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={post.title}
                description={post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
                image={post.image}
                url={`https://unifab.co.uk/blog/${id}`}
                type="article"
            />
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Featured Image */}
                    <div className="card-3d overflow-hidden mb-8">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full aspect-video object-cover"
                        />
                    </div>

                    {/* Post Header */}
                    <div className="mb-8">
                        <span className="glass-gold inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                            {post.category}
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div
                        className="card-3d p-8 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="glass-gold p-6 rounded-xl mt-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                                    Found this helpful?
                                </h3>
                                <p className="text-foreground/80 text-sm">Share it with your team</p>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                                    title="Share on Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                                    title="Share on Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                                    title="Share on LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`}
                                    className="glass p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-depth-sm hover:shadow-depth-md"
                                    title="Share via Email"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-16">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                            Related Articles
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Link to="/blog/2" className="card-3d p-6 hover:scale-105 transition-all">
                                <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 block">
                                    Industry News
                                </span>
                                <h3 className="font-semibold text-foreground mb-2">
                                    2025 Workwear Trends
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Stay ahead with the latest trends...
                                </p>
                            </Link>
                            <Link to="/blog/3" className="card-3d p-6 hover:scale-105 transition-all">
                                <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 block">
                                    Safety Tips
                                </span>
                                <h3 className="font-semibold text-foreground mb-2">
                                    Understanding PPE Requirements
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    A comprehensive overview of safety...
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;
