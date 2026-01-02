import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!token) {
            toast.error("Invalid reset link");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successfully! Please sign in.");
                navigate("/auth");
            } else {
                toast.error(data.error || "Failed to reset password");
            }
        } catch (error) {
            toast.error("Could not connect to server. Please try again.");
            console.error('Reset password error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card-industrial p-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2 justify-center mb-8">
                        <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                            <span className="font-display font-bold text-2xl text-primary-foreground">UF</span>
                        </div>
                        <div>
                            <span className="font-display text-2xl font-bold text-foreground">UniFab</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
                        Reset Your Password
                    </h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Enter your new password below
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="gold"
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>

                    {/* Back to Sign In */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/auth")}
                            className="text-sm text-primary hover:underline"
                        >
                            Back to Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
