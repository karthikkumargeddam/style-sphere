import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmbroideryDesigner from "@/components/EmbroideryDesigner";
import VirtualTryOn from "@/components/VirtualTryOn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Eye } from "lucide-react";

const EmbroideryDesignerPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="font-display text-5xl font-bold mb-4">
                            Embroidery Designer
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Design your perfect embroidered logo. Upload, position, and preview your logo on different garments.
                        </p>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="designer" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                            <TabsTrigger value="designer" className="gap-2">
                                <Palette className="w-4 h-4" />
                                Designer Tool
                            </TabsTrigger>
                            <TabsTrigger value="tryon" className="gap-2">
                                <Eye className="w-4 h-4" />
                                Virtual Try-On
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="designer">
                            <EmbroideryDesigner />
                        </TabsContent>

                        <TabsContent value="tryon">
                            <VirtualTryOn />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmbroideryDesignerPage;
