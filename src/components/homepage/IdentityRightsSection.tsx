import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Lock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const IdentityRightsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Your NIL, Protected.
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Protect your Name, Image, and Likeness — prevent commercial misappropriation, AI deepfakes, and unauthorized use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Commercial Misappropriation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Prevent brands from using your photo, name, or likeness in ads or merchandise without permission
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">AI & Digital Replica Defense</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Protect against deepfakes, unauthorized AI-generated versions of your voice or image, and virtual avatars
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Copyrighted Content</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Protect original photos, videos, written text, and audio from being reposted or used without authorization
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Brand Reputation Control</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Prevent false endorsements and control which brands or content you are associated with
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Usage Rights & Licensing</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Limit how long and where brands can use your content — control duration, platforms, and exclusivity
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Impersonation & Privacy</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Fight against fake accounts, impersonation scams, and protect personal information and online safety
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/auth?mode=signup")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 h-auto hover:scale-105 transition-transform"
          >
            Protect Your NIL
          </Button>
        </div>
      </div>
    </section>
  );
};
