import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Mail, Lock, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AccountSettings = () => {
    const [name, setName] = useState("John Smith");
    const [email, setEmail] = useState("john.smith@company.com");
    const [phone, setPhone] = useState("0800 123 4567");
    const [company, setCompany] = useState("ABC Construction Ltd");

    // Load notification preferences from localStorage
    const [emailNotifications, setEmailNotifications] = useState(() => {
        const saved = localStorage.getItem("emailNotifications");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [smsNotifications, setSmsNotifications] = useState(() => {
        const saved = localStorage.getItem("smsNotifications");
        return saved !== null ? JSON.parse(saved) : false;
    });

    const [marketingEmails, setMarketingEmails] = useState(() => {
        const saved = localStorage.getItem("marketingEmails");
        return saved !== null ? JSON.parse(saved) : true;
    });

    // Save to localStorage whenever preferences change
    useEffect(() => {
        localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications));
    }, [emailNotifications]);

    useEffect(() => {
        localStorage.setItem("smsNotifications", JSON.stringify(smsNotifications));
    }, [smsNotifications]);

    useEffect(() => {
        localStorage.setItem("marketingEmails", JSON.stringify(marketingEmails));
    }, [marketingEmails]);

    const handleToggleEmailNotifications = () => {
        setEmailNotifications(!emailNotifications);
        toast.success(
            !emailNotifications
                ? "Email notifications enabled"
                : "Email notifications disabled"
        );
    };

    const handleToggleSmsNotifications = () => {
        setSmsNotifications(!smsNotifications);
        toast.success(
            !smsNotifications ? "SMS notifications enabled" : "SMS notifications disabled"
        );
    };

    const handleToggleMarketingEmails = () => {
        setMarketingEmails(!marketingEmails);
        toast.success(
            !marketingEmails ? "Marketing emails enabled" : "Marketing emails disabled"
        );
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Profile updated successfully!");
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Password changed successfully!");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                            Account Settings
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your account information and preferences
                        </p>
                    </div>

                    {/* Profile Information */}
                    <div className="card-3d p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Profile Information
                            </h2>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="gold" className="w-full md:w-auto">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="card-3d p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Lock className="w-6 h-6 text-purple-500" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Change Password
                            </h2>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="gold" className="w-full md:w-auto">
                                Update Password
                            </Button>
                        </form>
                    </div>

                    {/* Notification Preferences */}
                    <div className="card-3d p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Bell className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Notification Preferences
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 glass rounded-lg">
                                <div>
                                    <h3 className="font-semibold text-foreground">Email Notifications</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Receive order updates via email
                                    </p>
                                </div>
                                <button
                                    onClick={handleToggleEmailNotifications}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${emailNotifications ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${emailNotifications ? "translate-x-6" : ""
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 glass rounded-lg">
                                <div>
                                    <h3 className="font-semibold text-foreground">SMS Notifications</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Receive delivery updates via SMS
                                    </p>
                                </div>
                                <button
                                    onClick={handleToggleSmsNotifications}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${smsNotifications ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${smsNotifications ? "translate-x-6" : ""
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 glass rounded-lg">
                                <div>
                                    <h3 className="font-semibold text-foreground">Marketing Emails</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Receive special offers and promotions
                                    </p>
                                </div>
                                <button
                                    onClick={handleToggleMarketingEmails}
                                    className={`relative w-14 h-8 rounded-full transition-colors ${marketingEmails ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${marketingEmails ? "translate-x-6" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AccountSettings;
