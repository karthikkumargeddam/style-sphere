import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Type, Image as ImageIcon, Check } from "lucide-react";
import { toast } from "sonner";

interface LogoCustomizerProps {
    onLogoChange: (logoData: any) => void;
}

const LogoCustomizer = ({ onLogoChange }: LogoCustomizerProps) => {
    const [logoMethod, setLogoMethod] = useState<"existing" | "text" | "upload">("upload");
    const [textLogo, setTextLogo] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [logoPositions, setLogoPositions] = useState<string[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setUploadedFile(file);
            onLogoChange({ type: "upload", file });
            toast.success("Logo uploaded successfully!");
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setUploadedFile(file);
            onLogoChange({ type: "upload", file });
            toast.success("Logo uploaded successfully!");
        } else {
            toast.error("Please upload an image file");
        }
    };

    const handleTextLogoChange = (text: string) => {
        setTextLogo(text);
        onLogoChange({ type: "text", text });
    };

    const togglePosition = (position: string) => {
        const newPositions = logoPositions.includes(position)
            ? logoPositions.filter(p => p !== position)
            : [...logoPositions, position];
        setLogoPositions(newPositions);
    };

    const positions = [
        { id: "left-chest", label: "Left Chest" },
        { id: "right-chest", label: "Right Chest" },
        { id: "back", label: "Back" },
        { id: "sleeve-left", label: "Left Sleeve" },
        { id: "sleeve-right", label: "Right Sleeve" },
    ];

    return (
        <div className="card-3d p-6">
            <h3 className="font-display text-2xl font-bold mb-2">Add Your Logo(s)</h3>
            <p className="text-muted-foreground mb-6">
                Choose a method of adding your logo
            </p>

            {/* Logo Assignment Style */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3">Choose Logo Assignment Style</h4>
                <Tabs value={logoMethod} onValueChange={(v) => setLogoMethod(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="existing">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Existing Logo
                        </TabsTrigger>
                        <TabsTrigger value="text">
                            <Type className="w-4 h-4 mr-2" />
                            Text Logo
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Logo
                        </TabsTrigger>
                    </TabsList>

                    {/* Existing Logo */}
                    <TabsContent value="existing" className="mt-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground mb-4">
                                Select from your previously uploaded logos
                            </p>
                            <Button variant="outline">Browse Saved Logos</Button>
                        </div>
                    </TabsContent>

                    {/* Text Logo */}
                    <TabsContent value="text" className="mt-4">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="text-logo">Enter Your Text</Label>
                                <Input
                                    id="text-logo"
                                    placeholder="Enter company name or text"
                                    value={textLogo}
                                    onChange={(e) => handleTextLogoChange(e.target.value)}
                                    className="mt-2"
                                />
                            </div>
                            {textLogo && (
                                <div className="border rounded-lg p-6 bg-secondary/20 text-center">
                                    <p className="text-2xl font-bold">{textLogo}</p>
                                    <p className="text-sm text-muted-foreground mt-2">Logo Preview</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Upload Logo */}
                    <TabsContent value="upload" className="mt-4">
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                        >
                            <input
                                type="file"
                                id="logo-upload"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="font-semibold mb-2">
                                    Drag 'n' Drop Some Files Here, or Click To Select Files
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Supported formats: PNG, JPG, SVG (Max 5MB)
                                </p>
                            </label>
                            {uploadedFile && (
                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center justify-center gap-2">
                                        <Check className="w-4 h-4" />
                                        {uploadedFile.name} uploaded successfully
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Logo Positions */}
            <div>
                <h4 className="font-semibold mb-3">Select Logo Positions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {positions.map(position => (
                        <button
                            key={position.id}
                            onClick={() => togglePosition(position.id)}
                            className={`p-4 border-2 rounded-lg transition-all ${logoPositions.includes(position.id)
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{position.label}</span>
                                {logoPositions.includes(position.id) && (
                                    <Check className="w-5 h-5 text-primary" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoCustomizer;
