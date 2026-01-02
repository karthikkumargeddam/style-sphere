import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PackageX, Upload, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Return {
    id: string;
    orderId: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected" | "Completed";
    items: string;
    refundAmount: number;
    reason: string;
}

const Returns = () => {
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");

    // Mock return data
    const returns: Return[] = [
        {
            id: "RET-2024-001",
            orderId: "ORD-2024-003",
            date: "2024-12-10",
            status: "Completed",
            items: "Hi-Vis Safety Jacket (x2)",
            refundAmount: 69.98,
            reason: "Wrong size",
        },
        {
            id: "RET-2024-002",
            orderId: "ORD-2024-005",
            date: "2024-11-25",
            status: "Approved",
            items: "Work Trousers (x1)",
            refundAmount: 29.99,
            reason: "Defective item",
        },
    ];

    const handleSubmitReturn = (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderId || !reason || !description) {
            toast.error("Please fill in all required fields");
            return;
        }

        // In a real app, submit to backend
        toast.success("Return request submitted successfully!");
        setShowRequestForm(false);
        setOrderId("");
        setReason("");
        setDescription("");
    };

    const getStatusIcon = (status: Return["status"]) => {
        switch (status) {
            case "Completed":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "Approved":
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            case "Pending":
                return <Clock className="w-5 h-5 text-orange-500" />;
            case "Rejected":
                return <XCircle className="w-5 h-5 text-red-500" />;
        }
    };

    const getStatusColor = (status: Return["status"]) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/20 text-green-500";
            case "Approved":
                return "bg-blue-500/20 text-blue-500";
            case "Pending":
                return "bg-orange-500/20 text-orange-500";
            case "Rejected":
                return "bg-red-500/20 text-red-500";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            Returns & Refunds
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your return requests and view return history
                        </p>
                    </div>

                    {/* Return Policy */}
                    <div className="card-3d p-6 mb-8 bg-blue-500/10 border-blue-500/20">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">30-Day Return Policy</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    We offer hassle-free returns within 30 days of delivery. Items must be unworn,
                                    unwashed, and in original packaging with tags attached.
                                </p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>✓ Free return labels included</li>
                                    <li>✓ Full refund within 5-7 business days</li>
                                    <li>✓ Exchange available for different sizes</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Request Return Button */}
                    {!showRequestForm && (
                        <div className="mb-8">
                            <Button
                                onClick={() => setShowRequestForm(true)}
                                variant="gold"
                                className="w-full md:w-auto"
                            >
                                <PackageX className="w-4 h-4 mr-2" />
                                Request a Return
                            </Button>
                        </div>
                    )}

                    {/* Return Request Form */}
                    {showRequestForm && (
                        <div className="card-3d p-6 mb-8">
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                Submit Return Request
                            </h2>

                            <form onSubmit={handleSubmitReturn} className="space-y-6">
                                {/* Order ID */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Order ID <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        placeholder="e.g., ORD-2024-001"
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Reason for Return <span className="text-destructive">*</span>
                                    </label>
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    >
                                        <option value="">Select a reason</option>
                                        <option value="wrong-size">Wrong Size</option>
                                        <option value="defective">Defective Item</option>
                                        <option value="not-as-described">Not as Described</option>
                                        <option value="changed-mind">Changed Mind</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Description <span className="text-destructive">*</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Please provide details about your return request..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        required
                                    />
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Photos (Optional)
                                    </label>
                                    <div className="glass p-6 rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload photos of the item
                                            </p>
                                            <input type="file" accept="image/*" multiple className="hidden" />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button type="submit" variant="gold" className="flex-1">
                                        Submit Return Request
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowRequestForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Return History */}
                    <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                            Return History
                        </h2>

                        {returns.length === 0 ? (
                            <div className="card-3d p-12 text-center">
                                <PackageX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold text-foreground mb-2">No returns yet</h3>
                                <p className="text-muted-foreground">
                                    You haven't requested any returns
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {returns.map((returnItem) => (
                                    <div key={returnItem.id} className="card-3d p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            {/* Return Info */}
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    {getStatusIcon(returnItem.status)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground mb-1">
                                                        {returnItem.id}
                                                    </h3>
                                                    <div className="space-y-1 text-sm text-muted-foreground">
                                                        <p>Order: {returnItem.orderId}</p>
                                                        <p>Items: {returnItem.items}</p>
                                                        <p>Reason: {returnItem.reason}</p>
                                                        <p>Date: {returnItem.date}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status & Amount */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-foreground mb-2">
                                                    £{returnItem.refundAmount.toFixed(2)}
                                                </p>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        returnItem.status
                                                    )}`}
                                                >
                                                    {returnItem.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4 mt-4 border-t border-border">
                                            <Link
                                                to={`/profile/orders/${returnItem.orderId}`}
                                                className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                                            >
                                                View Order
                                            </Link>
                                            {returnItem.status === "Approved" && (
                                                <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                                    Print Return Label
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Returns;
