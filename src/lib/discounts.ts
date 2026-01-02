import { getAllProducts } from "./products";

export interface DiscountCode {
    code: string;
    type: "percentage" | "fixed" | "free_shipping";
    value: number; // percentage (0-100) or fixed amount in £
    minOrderValue?: number;
    maxDiscount?: number; // cap for percentage discounts
    expiryDate?: string; // ISO date string
    usageLimit?: number;
    usedCount?: number;
    categories?: string[]; // restrict to specific categories
    firstTimeOnly?: boolean;
    description?: string;
}

// Sample discount codes
export const discountCodes: DiscountCode[] = [
    {
        code: "WELCOME10",
        type: "percentage",
        value: 10,
        minOrderValue: 50,
        description: "10% off your first order over £50",
        firstTimeOnly: true,
    },
    {
        code: "NEWYEAR25",
        type: "percentage",
        value: 25,
        minOrderValue: 100,
        maxDiscount: 50,
        expiryDate: "2025-01-31",
        description: "25% off New Year sale (max £50 discount)",
    },
    {
        code: "FREESHIP",
        type: "free_shipping",
        value: 0,
        minOrderValue: 75,
        description: "Free UK delivery on orders over £75",
    },
    {
        code: "SAVE20",
        type: "fixed",
        value: 20,
        minOrderValue: 150,
        description: "£20 off orders over £150",
    },
    {
        code: "BULK30",
        type: "percentage",
        value: 30,
        minOrderValue: 500,
        maxDiscount: 150,
        description: "30% off bulk orders over £500",
    },
    {
        code: "SAFETY15",
        type: "percentage",
        value: 15,
        categories: ["Safety Wear", "PPE Equipment"],
        minOrderValue: 100,
        description: "15% off safety equipment",
    },
];

export interface DiscountValidation {
    valid: boolean;
    error?: string;
    discount?: DiscountCode;
}

export function validateDiscountCode(
    code: string,
    subtotal: number,
    categories: string[] = [],
    isFirstOrder: boolean = false
): DiscountValidation {
    const discount = discountCodes.find(
        (d) => d.code.toLowerCase() === code.toLowerCase()
    );

    if (!discount) {
        return { valid: false, error: "Invalid discount code" };
    }

    // Check expiry date
    if (discount.expiryDate) {
        const expiry = new Date(discount.expiryDate);
        if (expiry < new Date()) {
            return { valid: false, error: "This discount code has expired" };
        }
    }

    // Check minimum order value
    if (discount.minOrderValue && subtotal < discount.minOrderValue) {
        return {
            valid: false,
            error: `Minimum order value of £${discount.minOrderValue} required`,
        };
    }

    // Check first-time only
    if (discount.firstTimeOnly && !isFirstOrder) {
        return {
            valid: false,
            error: "This code is only valid for first-time customers",
        };
    }

    // Check category restrictions
    if (discount.categories && discount.categories.length > 0) {
        const hasMatchingCategory = categories.some((cat) =>
            discount.categories!.includes(cat)
        );
        if (!hasMatchingCategory) {
            return {
                valid: false,
                error: `This code only applies to ${discount.categories.join(", ")}`,
            };
        }
    }

    // Check usage limit
    if (discount.usageLimit && discount.usedCount) {
        if (discount.usedCount >= discount.usageLimit) {
            return { valid: false, error: "This discount code has reached its usage limit" };
        }
    }

    return { valid: true, discount };
}

export function calculateDiscount(
    discount: DiscountCode,
    subtotal: number,
    shippingCost: number = 0
): {
    discountAmount: number;
    shippingDiscount: number;
    finalTotal: number;
} {
    let discountAmount = 0;
    let shippingDiscount = 0;

    if (discount.type === "percentage") {
        discountAmount = (subtotal * discount.value) / 100;
        // Apply max discount cap if specified
        if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
            discountAmount = discount.maxDiscount;
        }
    } else if (discount.type === "fixed") {
        discountAmount = Math.min(discount.value, subtotal); // Don't exceed subtotal
    } else if (discount.type === "free_shipping") {
        shippingDiscount = shippingCost;
    }

    const finalTotal = subtotal - discountAmount + shippingCost - shippingDiscount;

    return {
        discountAmount,
        shippingDiscount,
        finalTotal: Math.max(0, finalTotal), // Never negative
    };
}

export function getDiscountByCode(code: string): DiscountCode | undefined {
    return discountCodes.find((d) => d.code.toLowerCase() === code.toLowerCase());
}
