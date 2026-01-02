import { useState, useRef } from "react";
import { Upload, Move, ZoomIn, ZoomOut, RotateCw, Palette, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EmbroideryDesigner = () => {
    const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
    const [logoPosition, setLogoPosition] = useState({ x: 150, y: 100 });
    const [logoSize, setLogoSize] = useState(100);
    const [logoRotation, setLogoRotation] = useState(0);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedPosition, setSelectedPosition] = useState("chest");
    const [isDragging, setIsDragging] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    const threadColors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Navy", hex: "#001F3F" },
        { name: "Royal Blue", hex: "#0074D9" },
        { name: "Red", hex: "#FF4136" },
        { name: "Burgundy", hex: "#85144B" },
        { name: "Forest Green", hex: "#2ECC40" },
        { name: "Kelly Green", hex: "#01FF70" },
        { name: "Yellow", hex: "#FFDC00" },
        { name: "Orange", hex: "#FF851B" },
        { name: "Purple", hex: "#B10DC9" },
        { name: "Pink", hex: "#F012BE" },
        { name: "Brown", hex: "#8B4513" },
        { name: "Grey", hex: "#AAAAAA" },
        { name: "Gold", hex: "#FFD700" },
        { name: "Silver", hex: "#C0C0C0" }
    ];

    const positions = [
        { id: "chest", label: "Left Chest", x: 150, y: 100 },
        { id: "center", label: "Center Chest", x: 200, y: 150 },
        { id: "back", label: "Back Center", x: 200, y: 200 },
        { id: "sleeve-left", label: "Left Sleeve", x: 80, y: 150 },
        { id: "sleeve-right", label: "Right Sleeve", x: 320, y: 150 }
    ];

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedLogo(event.target?.result as string);
                toast.success("Logo uploaded successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (uploadedLogo) {
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            setLogoPosition({
                x: e.clientX - rect.left - logoSize / 2,
                y: e.clientY - rect.top - logoSize / 2
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handlePositionChange = (positionId: string) => {
        const position = positions.find(p => p.id === positionId);
        if (position) {
            setSelectedPosition(positionId);
            setLogoPosition({ x: position.x, y: position.y });
        }
    };

    const handleSaveDesign = () => {
        toast.success("Design saved! You can now add it to your quote.");
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Canvas Area */}
            <div className="lg:col-span-2">
                <div className="card-3d p-6">
                    <h3 className="font-display text-2xl font-bold mb-4">Design Preview</h3>

                    {/* Garment Canvas */}
                    <div
                        ref={canvasRef}
                        className="relative w-full aspect-[4/3] bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden cursor-move"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* Garment Mockup */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-2xl">
                                {/* Garment outline */}
                                <div className="w-full h-full border-4 border-gray-600 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Logo */}
                        {uploadedLogo && (
                            <div
                                className="absolute cursor-move transition-opacity hover:opacity-80"
                                style={{
                                    left: `${logoPosition.x}px`,
                                    top: `${logoPosition.y}px`,
                                    width: `${logoSize}px`,
                                    height: `${logoSize}px`,
                                    transform: `rotate(${logoRotation}deg)`,
                                    filter: `drop-shadow(0 0 10px ${selectedColor})`
                                }}
                            >
                                <img
                                    src={uploadedLogo}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                    draggable={false}
                                />
                            </div>
                        )}

                        {/* Instructions */}
                        {!uploadedLogo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <Upload className="w-12 h-12 mx-auto mb-2" />
                                    <p>Upload a logo to start designing</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={handleSaveDesign}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Design
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
                {/* Logo Upload */}
                <div className="card-3d p-6">
                    <h4 className="font-semibold mb-4">Upload Logo</h4>
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                    />
                    <label htmlFor="logo-upload">
                        <Button variant="outline" className="w-full" asChild>
                            <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Choose File
                            </span>
                        </Button>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG, SVG (Max 5MB)
                    </p>
                </div>

                {/* Position Selection */}
                <div className="card-3d p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Move className="w-4 h-4" />
                        Position
                    </h4>
                    <div className="space-y-2">
                        {positions.map(position => (
                            <button
                                key={position.id}
                                onClick={() => handlePositionChange(position.id)}
                                className={`w-full p-3 rounded-lg border-2 transition-all ${selectedPosition === position.id
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                {position.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Control */}
                <div className="card-3d p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" />
                        Size
                    </h4>
                    <Slider
                        value={[logoSize]}
                        onValueChange={(value) => setLogoSize(value[0])}
                        min={50}
                        max={200}
                        step={5}
                        className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">{logoSize}px</p>
                </div>

                {/* Rotation Control */}
                <div className="card-3d p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <RotateCw className="w-4 h-4" />
                        Rotation
                    </h4>
                    <Slider
                        value={[logoRotation]}
                        onValueChange={(value) => setLogoRotation(value[0])}
                        min={0}
                        max={360}
                        step={15}
                        className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">{logoRotation}°</p>
                </div>

                {/* Thread Color */}
                <div className="card-3d p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Thread Color
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                        {threadColors.map(color => (
                            <button
                                key={color.hex}
                                onClick={() => setSelectedColor(color.hex)}
                                className={`w-10 h-10 rounded-lg border-2 transition-all ${selectedColor === color.hex
                                        ? 'border-primary scale-110'
                                        : 'border-border hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Add to Quote */}
                <Button className="w-full" size="lg">
                    Add to Quote
                </Button>
            </div>
        </div>
    );
};

export default EmbroideryDesigner;
