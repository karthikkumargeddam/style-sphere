import { useState } from "react";
import { Upload, RotateCcw, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VirtualTryOn = () => {
    const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
    const [selectedGarment, setSelectedGarment] = useState("polo");
    const [selectedColor, setSelectedColor] = useState("navy");

    const garments = [
        { id: "polo", name: "Polo Shirt", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80" },
        { id: "hoodie", name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80" },
        { id: "jacket", name: "Softshell Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
        { id: "tshirt", name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" }
    ];

    const colors = [
        { id: "navy", name: "Navy", hex: "#001F3F" },
        { id: "black", name: "Black", hex: "#000000" },
        { id: "white", name: "White", hex: "#FFFFFF" },
        { id: "grey", name: "Grey", hex: "#808080" },
        { id: "red", name: "Red", hex: "#FF4136" }
    ];

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedLogo(event.target?.result as string);
                toast.success("Logo uploaded! See it on your garment.");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="card-3d p-6">
            <h3 className="font-display text-2xl font-bold mb-6">Virtual Try-On</h3>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Preview */}
                <div>
                    <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden mb-4">
                        <img
                            src={garments.find(g => g.id === selectedGarment)?.image}
                            alt="Garment"
                            className="w-full h-full object-cover"
                            style={{ filter: `brightness(${selectedColor === 'white' ? '1.2' : '0.9'})` }}
                        />

                        {/* Logo Overlay */}
                        {uploadedLogo && (
                            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-24">
                                <img
                                    src={uploadedLogo}
                                    alt="Logo"
                                    className="w-full h-full object-contain drop-shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                        <Button size="sm" className="flex-1">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Quote
                        </Button>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    {/* Logo Upload */}
                    <div>
                        <label className="font-semibold mb-2 block">Your Logo</label>
                        <input
                            type="file"
                            id="tryon-logo"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                        <label htmlFor="tryon-logo">
                            <Button variant="outline" className="w-full" asChild>
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    {uploadedLogo ? "Change Logo" : "Upload Logo"}
                                </span>
                            </Button>
                        </label>
                    </div>

                    {/* Garment Selection */}
                    <div>
                        <label className="font-semibold mb-2 block">Select Garment</label>
                        <div className="grid grid-cols-2 gap-2">
                            {garments.map(garment => (
                                <button
                                    key={garment.id}
                                    onClick={() => setSelectedGarment(garment.id)}
                                    className={`p-3 rounded-lg border-2 transition-all ${selectedGarment === garment.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    {garment.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="font-semibold mb-2 block">Garment Color</label>
                        <div className="flex gap-2">
                            {colors.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    className={`w-12 h-12 rounded-lg border-2 transition-all ${selectedColor === color.id
                                            ? 'border-primary scale-110'
                                            : 'border-border hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Reset */}
                    <Button variant="outline" className="w-full" onClick={() => setUploadedLogo(null)}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOn;
