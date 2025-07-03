import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import cosmicHeroBg from "@/assets/cosmic-hero-bg.jpg";

const Hero = () => {
  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBirthday = () => {
    document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Star field overlay */}
      <div className="absolute inset-0 star-field opacity-30"></div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-space-deep/60"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
            SpaceTime Travel
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Journey through the epic history of space exploration. Discover missions, 
            milestones, and cosmic events that shaped our understanding of the universe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cosmic" 
              size="lg"
              onClick={scrollToTimeline}
              className="animate-cosmic-pulse"
            >
              Explore Timeline
            </Button>
            
            <Button 
              variant="stellar" 
              size="lg"
              onClick={scrollToBirthday}
            >
              <Calendar className="w-5 h-5" />
              Space on Your Birthday
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;