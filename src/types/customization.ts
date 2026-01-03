// TypeScript interfaces for logo customization and product personalization

export type ApplicationType = 'PRINT' | 'EMBROIDERY';

export type PrintSetupOption =
    | 'not_required'
    | 'previously_purchased'
    | 'providing_files_png_pdf'
    | 'free_setup';

export type EmbroiderySetupOption =
    | 'not_required'
    | 'previously_purchased'
    | 'providing_files_dst_emb'
    | '1_to_10_items_15_fee'
    | '10_plus_items_free';

export type LogoType = 'image' | 'text';

export type LogoPlacementPosition =
    | 'left_chest'
    | 'right_chest'
    | 'left_sleeve'
    | 'right_sleeve'
    | 'large_front'
    | 'large_back';

export type FontStyle =
    | 'standard'
    | 'script'
    | 'varsity'
    | 'bold'
    | 'italic'
    | 'modern';

export interface TextLogoData {
    lines: string[];
    font: FontStyle;
    color: string;
}

export interface LogoPlacement {
    position: LogoPlacementPosition;
    price: number;
    isFree?: boolean; // For bundle left chest
}

export interface LogoSetupData {
    applicationType: ApplicationType;
    setupOption: PrintSetupOption | EmbroiderySetupOption;
    setupFee: number;
}

export interface LogoData {
    logoType: LogoType;
    textData?: TextLogoData;
    imageFile?: File;
    imageUrl?: string;
}

export interface AdditionalLogo {
    logoData: LogoData;
    placement: LogoPlacement;
    surcharge: number;
}

export interface CustomizationData {
    isCustomized: boolean; // For individual items: blank vs customized
    logoSetup?: LogoSetupData;
    primaryLogo?: LogoData;
    placements: LogoPlacement[];
    additionalLogos: AdditionalLogo[];
    totalCustomizationCost: number;
}

export interface BundleItemSelection {
    itemName: string;
    itemCode: string;
    size: string;
    color: string;
    quantity: number;
}

export interface MixMatchSelection {
    pickLabel: string; // e.g., "PICK 5"
    requiredCount: number;
    selectedItems: BundleItemSelection[];
}

// Pricing constants
export const EMBROIDERY_PRICING = {
    left_chest: 5,
    right_chest: 5,
    left_sleeve: 5,
    right_sleeve: 5,
    large_front: 8,
    large_back: 8,
    left_chest_and_back: 12,
} as const;

export const PRINT_PRICING = {
    left_chest: 2.5,
    right_chest: 2.5,
    left_sleeve: 2.5,
    right_sleeve: 2.5,
    large_front: 5.0,
    large_back: 5.0,
    left_chest_and_back: 6,
} as const;

export const ADDITIONAL_LOGO_SURCHARGES = {
    emb_front_chest: 4.0,
    emb_back: 6.0,
    emb_sleeve: 4.0,
    print_front_chest: 2.0,
    print_back: 3.0,
    print_sleeve: 2.0,
} as const;

export const SHIPPING_CHARGE = 10; // £10 for 1-2 Business Days

export const EMBROIDERY_SETUP_FEES = {
    '1_to_10_items_15_fee': 15,
    '10_plus_items_free': 0,
} as const;

// Helper function to calculate placement price
export function calculatePlacementPrice(
    position: LogoPlacementPosition,
    applicationType: ApplicationType,
    isBundle: boolean,
    bundleItemCount: number = 1
): number {
    // Left chest is free for bundles only
    if (isBundle && position === 'left_chest') {
        return 0;
    }

    const pricing = applicationType === 'EMBROIDERY' ? EMBROIDERY_PRICING : PRINT_PRICING;
    const basePrice = pricing[position] || 0;

    // For bundles, multiply by item count
    return isBundle ? basePrice * bundleItemCount : basePrice;
}

// Helper function to get placement label
export function getPlacementLabel(position: LogoPlacementPosition): string {
    const labels: Record<LogoPlacementPosition, string> = {
        left_chest: 'Left Chest',
        right_chest: 'Right Chest',
        left_sleeve: 'Left Sleeve',
        right_sleeve: 'Right Sleeve',
        large_front: 'Large Front',
        large_back: 'Large Back',
    };
    return labels[position];
}

// Helper function to get setup option label
export function getSetupOptionLabel(
    option: PrintSetupOption | EmbroiderySetupOption,
    applicationType: ApplicationType
): string {
    const printLabels: Record<PrintSetupOption, string> = {
        not_required: 'Not Required',
        previously_purchased: 'Yes (previously purchased)',
        providing_files_png_pdf: 'Yes (providing .PNG/.PDF files)',
        free_setup: 'Free Setup',
    };

    const embroideryLabels: Record<EmbroiderySetupOption, string> = {
        not_required: 'Not Required',
        previously_purchased: 'Yes (previously purchased)',
        providing_files_dst_emb: 'Yes (providing .DST/.EMB files)',
        '1_to_10_items_15_fee': 'Yes: 1-10 items (£15 lifetime fee)',
        '10_plus_items_free': 'Yes: 10+ items (Free lifetime setup)',
    };

    if (applicationType === 'PRINT') {
        return printLabels[option as PrintSetupOption];
    } else {
        return embroideryLabels[option as EmbroiderySetupOption];
    }
}
