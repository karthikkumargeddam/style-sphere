import { ApplicationType, PrintSetupOption, EmbroiderySetupOption, getSetupOptionLabel, EMBROIDERY_SETUP_FEES } from "@/types/customization";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Upload, Check, Ban } from "lucide-react";

interface LogoSetupOptionsProps {
    applicationType: ApplicationType;
    value: PrintSetupOption | EmbroiderySetupOption;
    onChange: (option: PrintSetupOption | EmbroiderySetupOption) => void;
}

const LogoSetupOptions = ({ applicationType, value, onChange }: LogoSetupOptionsProps) => {
    const printOptions: PrintSetupOption[] = [
        'not_required',
        'previously_purchased',
        'providing_files_png_pdf',
        'free_setup',
    ];

    const embroideryOptions: EmbroiderySetupOption[] = [
        'not_required',
        'previously_purchased',
        'providing_files_dst_emb',
        '1_to_10_items_15_fee',
        '10_plus_items_free',
    ];

    const options = applicationType === 'PRINT' ? printOptions : embroideryOptions;

    const getIcon = (option: string) => {
        if (option === 'not_required') return <Ban className="w-5 h-5" />;
        if (option.includes('previously')) return <Check className="w-5 h-5" />;
        if (option.includes('providing') || option.includes('files')) return <Upload className="w-5 h-5" />;
        return <FileText className="w-5 h-5" />;
    };

    const getFee = (option: string): number | null => {
        if (applicationType === 'EMBROIDERY') {
            if (option === '1_to_10_items_15_fee') return EMBROIDERY_SETUP_FEES['1_to_10_items_15_fee'];
            if (option === '10_plus_items_free') return EMBROIDERY_SETUP_FEES['10_plus_items_free'];
        }
        return null;
    };

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-lg mb-2">Logo Setup</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    {applicationType === 'PRINT'
                        ? 'Select your print setup option (accepted formats: .PNG, .PDF)'
                        : 'Select your embroidery setup option (accepted formats: .DST, .EMB)'}
                </p>
            </div>

            <RadioGroup value={value} onValueChange={(v) => onChange(v as any)}>
                <div className="space-y-3">
                    {options.map((option) => {
                        const fee = getFee(option);
                        const label = getSetupOptionLabel(option, applicationType);

                        return (
                            <label
                                key={option}
                                htmlFor={option}
                                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${value === option
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <RadioGroupItem value={option} id={option} className="mt-1" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {getIcon(option)}
                                        <span className="font-medium">{label}</span>
                                    </div>
                                    {fee !== null && (
                                        <div className="text-sm">
                                            {fee === 0 ? (
                                                <span className="text-green-600 font-semibold">FREE Setup</span>
                                            ) : (
                                                <span className="text-primary font-semibold">£{fee} one-time fee</span>
                                            )}
                                        </div>
                                    )}
                                    {option === 'providing_files_png_pdf' && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            You'll be able to upload your .PNG or .PDF files in the next step
                                        </p>
                                    )}
                                    {option === 'providing_files_dst_emb' && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            You'll be able to upload your .DST or .EMB files in the next step
                                        </p>
                                    )}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </RadioGroup>
        </div>
    );
};

export default LogoSetupOptions;
