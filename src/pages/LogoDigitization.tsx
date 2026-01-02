import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, Clock, FileText, Zap, Award } from "lucide-react";
import { toast } from "sonner";

const LogoDigitization = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        instructions: ""
    });
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Logo digitization request submitted! We'll contact you within 24 hours.");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            toast.success(`${file.name} uploaded successfully!`);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Professional Logo Digitization
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Transform your logo into embroidery-ready format. Free with orders of 50+ items.
                        </p>
                    </div>

                    {/* What is Digitization */}
                    <div className="card-3d p-8 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">What is Logo Digitization?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-foreground/80 mb-4">
                                    Logo digitization is the process of converting your artwork into a specialized embroidery file format that our machines can read. This ensures your logo is reproduced accurately with the correct stitch types, densities, and sequences.
                                </p>
                                <p className="text-foreground/80">
                                    Our expert digitizers carefully analyze your logo and create a custom embroidery file that maintains the integrity of your design while optimizing it for the embroidery process.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
                                <h3 className="font-semibold text-lg mb-4">Why It's Necessary:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">Ensures accurate logo reproduction</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">Optimizes stitch count and density</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">Prevents distortion and quality issues</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">Creates reusable embroidery file</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* File Requirements */}
                    <div className="card-3d p-8 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-primary" />
                            File Requirements
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 bg-secondary/20 rounded-lg">
                                <h3 className="font-semibold mb-2">Accepted Formats</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• PNG (Recommended)</li>
                                    <li>• JPG/JPEG</li>
                                    <li>• SVG (Vector)</li>
                                    <li>• PDF</li>
                                    <li>• AI (Adobe Illustrator)</li>
                                    <li>• EPS</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-secondary/20 rounded-lg">
                                <h3 className="font-semibold mb-2">Minimum Resolution</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• 300 DPI minimum</li>
                                    <li>• At least 1000px wide</li>
                                    <li>• Clear, high-quality image</li>
                                    <li>• No pixelation or blur</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-secondary/20 rounded-lg">
                                <h3 className="font-semibold mb-2">Best Practices</h3>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• Vector files preferred</li>
                                    <li>• Transparent background</li>
                                    <li>• RGB or CMYK color mode</li>
                                    <li>• Max file size: 10MB</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quality Guidelines */}
                    <div className="card-3d p-8 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                            <Award className="w-8 h-8 text-primary" />
                            Quality Guidelines
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 border-l-4 border-green-500 bg-green-500/10">
                                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">✓ Good for Embroidery</h3>
                                <ul className="text-sm space-y-1">
                                    <li>• Simple, clean designs</li>
                                    <li>• Bold lines and shapes</li>
                                    <li>• Limited color palette (1-6 colors)</li>
                                    <li>• No fine details smaller than 2mm</li>
                                    <li>• High contrast elements</li>
                                </ul>
                            </div>
                            <div className="p-4 border-l-4 border-red-500 bg-red-500/10">
                                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">✗ Avoid</h3>
                                <ul className="text-sm space-y-1">
                                    <li>• Extremely detailed logos</li>
                                    <li>• Thin lines (less than 1mm)</li>
                                    <li>• Gradients or photo-realistic images</li>
                                    <li>• Too many colors (7+)</li>
                                    <li>• Very small text (under 5mm)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Turnaround Times */}
                    <div className="card-3d p-8 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                            <Clock className="w-8 h-8 text-primary" />
                            Turnaround Times
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 border-2 border-border rounded-lg hover:border-primary transition-colors">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Standard</h3>
                                <p className="text-3xl font-bold text-primary mb-2">2-3 Days</p>
                                <p className="text-sm text-muted-foreground mb-4">Business days</p>
                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">FREE with 50+ items</p>
                            </div>
                            <div className="p-6 border-2 border-primary rounded-lg bg-primary/5">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Rush</h3>
                                <p className="text-3xl font-bold text-primary mb-2">24 Hours</p>
                                <p className="text-sm text-muted-foreground mb-4">Next business day</p>
                                <p className="text-sm font-semibold">+£25 rush fee</p>
                            </div>
                            <div className="p-6 border-2 border-border rounded-lg hover:border-primary transition-colors">
                                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Proof Approval</h3>
                                <p className="text-3xl font-bold text-primary mb-2">Same Day</p>
                                <p className="text-sm text-muted-foreground mb-4">Digital proof sent</p>
                                <p className="text-sm font-semibold">Free revisions included</p>
                            </div>
                        </div>
                    </div>

                    {/* Upload Form */}
                    <div className="card-3d p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Submit Your Logo</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="company">Company Name</Label>
                                    <Input
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="logo-file">Upload Logo File *</Label>
                                <input
                                    type="file"
                                    id="logo-file"
                                    accept="image/*,.pdf,.ai,.eps,.svg"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    required
                                />
                                <label htmlFor="logo-file">
                                    <Button type="button" variant="outline" className="w-full mt-2" asChild>
                                        <span>
                                            <Upload className="w-4 h-4 mr-2" />
                                            {uploadedFile ? uploadedFile.name : "Choose File"}
                                        </span>
                                    </Button>
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    PNG, JPG, SVG, PDF, AI, EPS (Max 10MB)
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="instructions">Special Instructions</Label>
                                <Textarea
                                    id="instructions"
                                    rows={4}
                                    placeholder="Any specific requirements or notes about your logo..."
                                    value={formData.instructions}
                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                Submit Digitization Request
                            </Button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LogoDigitization;
