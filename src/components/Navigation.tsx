import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-deep/80 backdrop-blur-md border-b border-card-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              SpaceTime
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection("timeline")}
            >
              Timeline
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection("birthday")}
            >
              Birthday
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection("apod")}
            >
              Picture of the Day
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;