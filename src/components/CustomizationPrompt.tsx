import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";

interface CustomizationPromptProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectBlank: () => void;
    onSelectCustomized: () => void;
    productName: string;
}

const CustomizationPrompt = ({
    isOpen,
    onClose,
    onSelectBlank,
    onSelectCustomized,
    productName,
}: CustomizationPromptProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Customize Your Item?</DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        Would you like to add a logo or branding to your <strong>{productName}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 py-4">
                    {/* Blank Option */}
                    <button
                        onClick={onSelectBlank}
                        className="group relative flex flex-col items-center p-6 border-2 border-border rounded-lg hover:border-primary transition-all hover:shadow-md"
                    >
                        <ShoppingBag className="w-12 h-12 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        <h4 className="font-semibold text-lg mb-2">Blank Item</h4>
                        <p className="text-sm text-muted-foreground text-center">
                            Purchase without any customization
                        </p>
                        <div className="mt-3 text-xs text-muted-foreground">
                            Proceed directly to checkout
                        </div>
                    </button>

                    {/* Customized Option */}
                    <button
                        onClick={onSelectCustomized}
                        className="group relative flex flex-col items-center p-6 border-2 border-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all shadow-md hover:shadow-lg"
                    >
                        <Sparkles className="w-12 h-12 mb-3 text-primary" />
                        <h4 className="font-semibold text-lg mb-2">Customized Item</h4>
                        <p className="text-sm text-muted-foreground text-center">
                            Add your logo or text branding
                        </p>
                        <div className="mt-3 text-xs font-medium text-primary">
                            All placements are chargeable for individual items
                        </div>
                    </button>
                </div>

                <div className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded-lg">
                    <strong>Note:</strong> For individual items, all logo placements including Left Chest are chargeable.
                    Consider our bundles for free Left Chest placement!
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomizationPrompt;
