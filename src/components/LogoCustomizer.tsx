import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Type, Image as ImageIcon, Check } from "lucide-react";
import { toast } from "sonner";
import ApplicationTypeSelector from "@/components/ApplicationTypeSelector";
import LogoSetupOptions from "@/components/LogoSetupOptions";
import TextLogoDesigner from "@/components/TextLogoDesigner";
import LogoPlacementSelector from "@/components/LogoPlacementSelector";
import PricingCalculator from "@/components/PricingCalculator";
import {
    ApplicationType,
    PrintSetupOption,
    EmbroiderySetupOption,
    LogoType,
    LogoPlacementPosition,
    TextLogoData,
    CustomizationData,
    calculatePlacementPrice,
} from "@/types/customization";

interface LogoCustomizerProps {
    onLogoChange: (customizationData: CustomizationData) => void;
    isBundle?: boolean;
    bundleItemCount?: number;
    defaultPlacement?: LogoPlacementPosition;
    onComplete?: () => void;
}

const LogoCustomizer = ({
    onLogoChange,
    isBundle = false,
    bundleItemCount = 1,
    defaultPlacement,
    onComplete
}: LogoCustomizerProps) => {
    // Application Type
    const [applicationType, setApplicationType] = useState<ApplicationType>('EMBROIDERY');

    // Setup Options
    const [setupOption, setSetupOption] = useState<PrintSetupOption | EmbroiderySetupOption>('not_required');

    // Logo Type
    const [logoType, setLogoType] = useState<LogoType>('image');

    // Text Logo Data
    const [textLogoData, setTextLogoData] = useState<TextLogoData>({
        lines: ['', ''],
        font: 'standard',
        color: '#FFFFFF',
    });

    // Image Upload
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Logo Placements - pre-select if defaultPlacement is provided
    // Logo Placements - pre-select if defaultPlacement is provided
    const [selectedPlacements, setSelectedPlacements] = useState<LogoPlacementPosition[]>([]);

    // Initialize with default values on mount
    useEffect(() => {
        if (defaultPlacement) {
            setSelectedPlacements([defaultPlacement]);
        }
    }, [defaultPlacement]);

    // Apply updates after state changes
    useEffect(() => {
        updateCustomization();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPlacements, applicationType, setupOption, logoType, textLogoData, uploadedFile]);

    // Update parent component whenever customization changes
    const updateCustomization = () => {
        // Calculate placement prices
        const placementsWithPrices = selectedPlacements.map(position => {
            const price = calculatePlacementPrice(position, applicationType, isBundle, bundleItemCount);
            return {
                position,
                price,
                isFree: isBundle && position === 'left_chest',
            };
        });

        // Calculate total customization cost
        const totalCustomizationCost = placementsWithPrices.reduce((sum, placement) => sum + placement.price, 0);

        const customizationData: CustomizationData = {
            isCustomized: true,
            logoSetup: {
                applicationType,
                setupOption,
                setupFee: applicationType === 'EMBROIDERY' && setupOption === '1_to_10_items_15_fee' ? 15 : 0,
            },
            primaryLogo: {
                logoType,
                textData: logoType === 'text' ? textLogoData : undefined,
                imageFile: logoType === 'image' ? uploadedFile || undefined : undefined,
            },
            placements: placementsWithPrices,
            additionalLogos: [],
            totalCustomizationCost,
        };

        onLogoChange(customizationData);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setUploadedFile(file);
            updateCustomization();
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
            updateCustomization();
            toast.success("Logo uploaded successfully!");
        } else {
            toast.error("Please upload an image file");
        }
    };

    return (
        <div className="space-y-8">
            <div className="card-3d p-6">
                <h3 className="font-display text-2xl font-bold mb-2">Customize Your Logo</h3>
                <p className="text-muted-foreground mb-6">
                    Follow the steps below to add your branding to your items
                </p>

                {/* Step 1: Application Type */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            1
                        </div>
                        <h4 className="font-semibold text-lg">Choose Application Method</h4>
                    </div>
                    <ApplicationTypeSelector
                        value={applicationType}
                        onChange={(type) => {
                            setApplicationType(type);
                            setSetupOption('not_required');
                            updateCustomization();
                        }}
                    />
                </div>

                {/* Step 2: Setup Options */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            2
                        </div>
                        <h4 className="font-semibold text-lg">Logo Setup</h4>
                    </div>
                    <LogoSetupOptions
                        applicationType={applicationType}
                        value={setupOption}
                        onChange={(option) => {
                            setSetupOption(option);
                            updateCustomization();
                        }}
                    />
                </div>

                {/* Step 3: Logo Type */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            3
                        </div>
                        <h4 className="font-semibold text-lg">Logo Type</h4>
                    </div>

                    <Tabs value={logoType} onValueChange={(v) => setLogoType(v as LogoType)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="image">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Image/Logo File
                            </TabsTrigger>
                            <TabsTrigger value="text">
                                <Type className="w-4 h-4 mr-2" />
                                Text Only
                            </TabsTrigger>
                        </TabsList>

                        {/* Image Upload */}
                        <TabsContent value="image" className="mt-4">
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                            >
                                <input
                                    type="file"
                                    id="logo-upload"
                                    accept="image/*,.pdf"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <label htmlFor="logo-upload" className="cursor-pointer">
                                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="font-semibold mb-2">
                                        Drag 'n' Drop Your Logo Here, or Click To Select
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {applicationType === 'PRINT'
                                            ? 'Supported formats: PNG, JPG, PDF (Max 5MB)'
                                            : 'Supported formats: DST, EMB, or PNG/JPG for conversion (Max 5MB)'}
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

                        {/* Text Logo */}
                        <TabsContent value="text" className="mt-4">
                            <TextLogoDesigner
                                value={textLogoData}
                                onChange={(data) => {
                                    setTextLogoData(data);
                                    updateCustomization();
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Step 4: Logo Placement */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            4
                        </div>
                        <h4 className="font-semibold text-lg">Select Placement</h4>
                    </div>
                    <LogoPlacementSelector
                        selectedPlacements={selectedPlacements}
                        onChange={(placements) => {
                            setSelectedPlacements(placements);
                            updateCustomization();
                        }}
                        applicationType={applicationType}
                        isBundle={isBundle}
                        bundleItemCount={bundleItemCount}
                    />
                </div>
            </div>

            {/* Pricing Summary */}
            {selectedPlacements.length > 0 && (
                <PricingCalculator
                    applicationType={applicationType}
                    setupOption={setupOption}
                    placements={selectedPlacements}
                    isBundle={isBundle}
                    bundleItemCount={bundleItemCount}
                    showShipping={false}
                />
            )}

            {/* Confirm Button */}
            {onComplete && (
                <div className="mt-6">
                    <Button
                        onClick={onComplete}
                        size="lg"
                        className="w-full"
                    >
                        Confirm & Add to Bundle
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LogoCustomizer;
