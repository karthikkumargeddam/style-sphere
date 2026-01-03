import { ApplicationType } from "@/types/customization";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Paintbrush, Scissors } from "lucide-react";

interface ApplicationTypeSelectorProps {
    value: ApplicationType;
    onChange: (type: ApplicationType) => void;
}

const ApplicationTypeSelector = ({ value, onChange }: ApplicationTypeSelectorProps) => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-lg mb-2">Application Type</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    Choose how you'd like your logo applied to the garment
                </p>
            </div>

            <RadioGroup value={value} onValueChange={(v) => onChange(v as ApplicationType)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Print Option */}
                    <label
                        htmlFor="print"
                        className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${value === 'PRINT'
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <RadioGroupItem value="PRINT" id="print" className="sr-only" />
                        <Paintbrush className={`w-12 h-12 mb-3 ${value === 'PRINT' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <h5 className="font-semibold text-lg mb-2">PRINT</h5>
                        <p className="text-sm text-muted-foreground text-center mb-3">
                            Digital printing for vibrant, detailed designs
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Left/Right Chest/Sleeve: £2.50</div>
                            <div>• Front/Back Logo: £5.00</div>
                            <div>• Left Chest & Back: £6.00</div>
                        </div>
                    </label>

                    {/* Embroidery Option */}
                    <label
                        htmlFor="embroidery"
                        className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${value === 'EMBROIDERY'
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <RadioGroupItem value="EMBROIDERY" id="embroidery" className="sr-only" />
                        <Scissors className={`w-12 h-12 mb-3 ${value === 'EMBROIDERY' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <h5 className="font-semibold text-lg mb-2">EMBROIDERY</h5>
                        <p className="text-sm text-muted-foreground text-center mb-3">
                            Premium embroidered logos for a professional finish
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Left/Right Chest/Sleeve: £5.00</div>
                            <div>• Front/Back Logo: £8.00</div>
                            <div>• Left Chest & Back: £12.00</div>
                        </div>
                    </label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default ApplicationTypeSelector;
