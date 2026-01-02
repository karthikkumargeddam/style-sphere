import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Plus, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Address {
    id: number;
    name: string;
    street: string;
    city: string;
    postcode: string;
    phone: string;
    isDefault: boolean;
}

const SavedAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: "Home",
            street: "123 High Street",
            city: "London",
            postcode: "SW1A 1AA",
            phone: "020 1234 5678",
            isDefault: true,
        },
        {
            id: 2,
            name: "Office",
            street: "456 Business Park",
            city: "Manchester",
            postcode: "M1 1AA",
            phone: "0161 234 5678",
            isDefault: false,
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleSetDefault = (id: number) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
        toast.success("Default address updated");
    };

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
        toast.success("Address deleted");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            Saved Addresses
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your delivery addresses
                        </p>
                    </div>

                    {/* Add Address Button */}
                    <div className="mb-8">
                        <Button
                            onClick={() => setShowAddForm(!showAddForm)}
                            variant="gold"
                            className="w-full md:w-auto"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Address
                        </Button>
                    </div>

                    {/* Add Address Form */}
                    {showAddForm && (
                        <div className="card-3d p-6 mb-8">
                            <h2 className="font-display text-xl font-bold text-foreground mb-4">
                                New Address
                            </h2>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Address Name (e.g., Home, Office)"
                                        className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postcode"
                                        className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit" variant="gold" className="flex-1">
                                        Save Address
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Address List */}
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <div key={address.id} className="card-3d p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {address.name}
                                                </h3>
                                                {address.isDefault && (
                                                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {address.street}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {address.city}, {address.postcode}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                📞 {address.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                                    {!address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Set as Default
                                        </button>
                                    )}
                                    <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive hover:text-white transition-colors inline-flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SavedAddresses;
