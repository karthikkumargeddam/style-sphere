import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, Package, Settings, Save, Loader2, Trash2, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileData {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  chest_size: string | null;
  waist_size: string | null;
  height: string | null;
  preferred_fit: string | null;
  industry: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    email: "",
    phone: "",
    chest_size: "",
    waist_size: "",
    height: "",
    preferred_fit: "",
    industry: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          chest_size: data.chest_size || "",
          waist_size: data.waist_size || "",
          height: data.height || "",
          preferred_fit: data.preferred_fit || "",
          industry: data.industry || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.product_id,
      name: item.product_name,
      price: item.product_price,
      image: item.product_image,
      category: item.product_category,
    });
    toast.success(`${item.product_name} added to cart`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              My Account
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground">
              Profile Settings
            </h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="sizes" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Sizes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="card-industrial p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Personal Information
              </h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profile.full_name || ""}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={profile.industry || ""}
                        onValueChange={(value) => setProfile({ ...profile, industry: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wishlist" className="card-industrial p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                My Wishlist ({wishlistItems.length} items)
              </h2>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/products")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{item.product_name}</h4>
                        <p className="text-sm text-muted-foreground">{item.product_category}</p>
                        <p className="text-primary font-bold mt-1">£{Number(item.product_price).toFixed(2)}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="gold" onClick={() => handleAddToCart(item)}>
                            <ShoppingCart className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.product_id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sizes" className="card-industrial p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Saved Sizes & Preferences
              </h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chest_size">Chest Size</Label>
                      <Select
                        value={profile.chest_size || ""}
                        onValueChange={(value) => setProfile({ ...profile, chest_size: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {["34", "36", "38", "40", "42", "44", "46", "48", "50"].map((size) => (
                            <SelectItem key={size} value={size}>{size}"</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist_size">Waist Size</Label>
                      <Select
                        value={profile.waist_size || ""}
                        onValueChange={(value) => setProfile({ ...profile, waist_size: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {["28", "30", "32", "34", "36", "38", "40", "42", "44"].map((size) => (
                            <SelectItem key={size} value={size}>{size}"</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Select
                        value={profile.height || ""}
                        onValueChange={(value) => setProfile({ ...profile, height: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_5_6">Under 5'6"</SelectItem>
                          <SelectItem value="5_6_to_5_9">5'6" - 5'9"</SelectItem>
                          <SelectItem value="5_9_to_6_0">5'9" - 6'0"</SelectItem>
                          <SelectItem value="6_0_to_6_3">6'0" - 6'3"</SelectItem>
                          <SelectItem value="over_6_3">Over 6'3"</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred_fit">Preferred Fit</Label>
                    <Select
                      value={profile.preferred_fit || ""}
                      onValueChange={(value) => setProfile({ ...profile, preferred_fit: value })}
                    >
                      <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Select fit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slim">Slim Fit</SelectItem>
                        <SelectItem value="regular">Regular Fit</SelectItem>
                        <SelectItem value="relaxed">Relaxed Fit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Sizes
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
