import { useState } from "react";
import { Ruler, User, Weight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

const SizeRecommendationTool = () => {
    const [measurements, setMeasurements] = useState({
        height: "",
        weight: "",
        chest: "",
        waist: ""
    });
    const [fit, setFit] = useState("regular");
    const [gender, setGender] = useState("male");
    const [recommendation, setRecommendation] = useState<string | null>(null);

    const calculateSize = () => {
        const height = parseInt(measurements.height);
        const weight = parseInt(measurements.weight);

        if (!height || !weight) return;

        // Simple size calculation logic
        let size = "";

        if (gender === "male") {
            if (height < 165) {
                size = weight < 65 ? "S" : weight < 75 ? "M" : "L";
            } else if (height < 175) {
                size = weight < 70 ? "M" : weight < 85 ? "L" : "XL";
            } else if (height < 185) {
                size = weight < 75 ? "L" : weight < 95 ? "XL" : "XXL";
            } else {
                size = weight < 85 ? "XL" : weight < 105 ? "XXL" : "3XL";
            }
        } else {
            if (height < 160) {
                size = weight < 55 ? "XS" : weight < 65 ? "S" : "M";
            } else if (height < 170) {
                size = weight < 60 ? "S" : weight < 70 ? "M" : "L";
            } else if (height < 180) {
                size = weight < 65 ? "M" : weight < 80 ? "L" : "XL";
            } else {
                size = weight < 75 ? "L" : weight < 90 ? "XL" : "XXL";
            }
        }

        // Adjust for fit preference
        if (fit === "slim" && size !== "XS") {
            const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
            const index = sizes.indexOf(size);
            size = sizes[Math.max(0, index - 1)];
        } else if (fit === "loose" && size !== "3XL") {
            const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
            const index = sizes.indexOf(size);
            size = sizes[Math.min(sizes.length - 1, index + 1)];
        }

        setRecommendation(size);
    };

    const sizeChart = {
        male: [
            { size: "S", chest: "86-91", waist: "71-76", height: "165-170" },
            { size: "M", chest: "91-97", waist: "76-81", height: "170-175" },
            { size: "L", chest: "97-102", waist: "81-86", height: "175-180" },
            { size: "XL", chest: "102-107", waist: "86-91", height: "180-185" },
            { size: "XXL", chest: "107-112", waist: "91-97", height: "185-190" },
            { size: "3XL", chest: "112-117", waist: "97-102", height: "190+" }
        ],
        female: [
            { size: "XS", chest: "76-81", waist: "61-66", height: "155-160" },
            { size: "S", chest: "81-86", waist: "66-71", height: "160-165" },
            { size: "M", chest: "86-91", waist: "71-76", height: "165-170" },
            { size: "L", chest: "91-97", waist: "76-81", height: "170-175" },
            { size: "XL", chest: "97-102", waist: "81-86", height: "175-180" },
            { size: "XXL", chest: "102-107", waist: "86-91", height: "180+" }
        ]
    };

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <Ruler className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Size Recommendation Tool</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                    {/* Gender */}
                    <div>
                        <Label className="mb-3 block">Gender</Label>
                        <RadioGroup value={gender} onValueChange={setGender}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Height */}
                    <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <div className="relative mt-2">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="height"
                                type="number"
                                placeholder="170"
                                value={measurements.height}
                                onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Weight */}
                    <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <div className="relative mt-2">
                            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="weight"
                                type="number"
                                placeholder="70"
                                value={measurements.weight}
                                onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Fit Preference */}
                    <div>
                        <Label className="mb-3 block">Fit Preference</Label>
                        <RadioGroup value={fit} onValueChange={setFit}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="slim" id="slim" />
                                <Label htmlFor="slim">Slim Fit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="regular" id="regular" />
                                <Label htmlFor="regular">Regular Fit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="loose" id="loose" />
                                <Label htmlFor="loose">Loose Fit</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button onClick={calculateSize} className="w-full">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Get Size Recommendation
                    </Button>

                    {/* Recommendation Result */}
                    {recommendation && (
                        <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-2">Recommended Size</p>
                            <p className="text-4xl font-bold text-primary">{recommendation}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Based on {fit} fit preference
                            </p>
                        </div>
                    )}
                </div>

                {/* Size Chart */}
                <div>
                    <h4 className="font-semibold mb-4">Size Chart (cm)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Size</th>
                                    <th className="text-left py-2">Chest</th>
                                    <th className="text-left py-2">Waist</th>
                                    <th className="text-left py-2">Height</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizeChart[gender as keyof typeof sizeChart].map((row) => (
                                    <tr
                                        key={row.size}
                                        className={`border-b ${recommendation === row.size ? 'bg-primary/10 font-semibold' : ''
                                            }`}
                                    >
                                        <td className="py-2">{row.size}</td>
                                        <td className="py-2">{row.chest}</td>
                                        <td className="py-2">{row.waist}</td>
                                        <td className="py-2">{row.height}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                            <strong>Tip:</strong> If you're between sizes, we recommend sizing up for comfort.
                            All measurements are approximate and may vary by product.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SizeRecommendationTool;
