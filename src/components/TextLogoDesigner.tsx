import { useState } from "react";
import { TextLogoData, FontStyle } from "@/types/customization";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

interface TextLogoDesignerProps {
    value: TextLogoData;
    onChange: (data: TextLogoData) => void;
}

const TextLogoDesigner = ({ value, onChange }: TextLogoDesignerProps) => {
    const [lines, setLines] = useState<string[]>(value.lines.length > 0 ? value.lines : ['', '']);

    const fonts: { value: FontStyle; label: string }[] = [
        { value: 'standard', label: 'Standard' },
        { value: 'script', label: 'Script' },
        { value: 'varsity', label: 'Varsity' },
        { value: 'bold', label: 'Bold' },
        { value: 'italic', label: 'Italic' },
        { value: 'modern', label: 'Modern' },
    ];

    const colors = [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#1a2d4a' },
        { name: 'Red', hex: '#c41e3a' },
        { name: 'Royal Blue', hex: '#0047ab' },
        { name: 'Gold', hex: '#FFD700' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Green', hex: '#228b22' },
    ];

    const handleLineChange = (index: number, text: string) => {
        const newLines = [...lines];
        newLines[index] = text;
        setLines(newLines);
        onChange({ ...value, lines: newLines });
    };

    const addLine = () => {
        const newLines = [...lines, ''];
        setLines(newLines);
        onChange({ ...value, lines: newLines });
    };

    const removeLine = (index: number) => {
        if (lines.length > 1) {
            const newLines = lines.filter((_, i) => i !== index);
            setLines(newLines);
            onChange({ ...value, lines: newLines });
        }
    };

    const handleFontChange = (font: FontStyle) => {
        onChange({ ...value, font });
    };

    const handleColorChange = (color: string) => {
        onChange({ ...value, color });
    };

    const getFontStyle = (font: FontStyle): React.CSSProperties => {
        const styles: Record<FontStyle, React.CSSProperties> = {
            standard: { fontFamily: 'Arial, sans-serif' },
            script: { fontFamily: 'cursive', fontStyle: 'italic' },
            varsity: { fontFamily: 'Impact, sans-serif', fontWeight: 'bold', letterSpacing: '2px' },
            bold: { fontFamily: 'Arial, sans-serif', fontWeight: 'bold' },
            italic: { fontFamily: 'Arial, sans-serif', fontStyle: 'italic' },
            modern: { fontFamily: 'system-ui, sans-serif', fontWeight: '300', letterSpacing: '1px' },
        };
        return styles[font];
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg mb-2">Text Logo Designer</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    Create a custom text logo with your company name or message
                </p>
            </div>

            {/* Text Lines */}
            <div className="space-y-3">
                <Label>Text Lines</Label>
                {lines.map((line, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={line}
                            onChange={(e) => handleLineChange(index, e.target.value)}
                            placeholder={`Line ${index + 1}`}
                            maxLength={50}
                            className="flex-1"
                        />
                        {lines.length > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeLine(index)}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
                {lines.length < 5 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addLine}
                        className="w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Line
                    </Button>
                )}
            </div>

            {/* Font Selection */}
            <div>
                <Label className="mb-2 block">Font Style</Label>
                <Select value={value.font} onValueChange={handleFontChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                        {fonts.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                                <span style={getFontStyle(font.value)}>{font.label}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Color Selection */}
            <div>
                <Label className="mb-3 block">Text Color</Label>
                <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.hex}
                            type="button"
                            onClick={() => handleColorChange(color.hex)}
                            className={`flex flex-col items-center gap-2 p-3 border-2 rounded-lg transition-all ${value.color === color.hex
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div
                                className="w-8 h-8 rounded-full border-2 border-border"
                                style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs font-medium">{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview Box */}
            <div>
                <Label className="mb-2 block">Preview</Label>
                <div className="bg-black rounded-lg p-8 min-h-[150px] flex flex-col items-center justify-center">
                    {lines.filter(line => line.trim()).length > 0 ? (
                        <div className="text-center space-y-2">
                            {lines.filter(line => line.trim()).map((line, index) => (
                                <div
                                    key={index}
                                    style={{
                                        color: value.color || '#FFFFFF',
                                        ...getFontStyle(value.font),
                                        fontSize: index === 0 ? '2rem' : '1.5rem',
                                    }}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/50 text-sm">Enter text to see preview</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextLogoDesigner;
