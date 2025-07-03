import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Calendar, ExternalLink } from "lucide-react";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  copyright?: string;
}

const APOD = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  // Sample APOD data (in real app, this would come from NASA's APOD API)
  const sampleAPOD: APODData = {
    title: "The Pillars of Creation",
    explanation: "These towering tendrils of cosmic dust and gas sit at the heart of M16, or the Eagle Nebula. The aptly named Pillars of Creation, featured in this stunning Hubble Space Telescope image, are part of an active star-forming region within the nebula and hide newborn stars in their wispy columns. Although this is not the first image taken of this cosmic landscape, it is the most detailed to date.",
    url: "https://apod.nasa.gov/apod/image/2212/PillarsOfCreation_HubblePathak_1985.jpg",
    date: new Date().toISOString().split('T')[0],
    media_type: "image",
    copyright: "NASA, ESA, Hubble Space Telescope"
  };

  useEffect(() => {
    // Simulate API call to NASA APOD
    setTimeout(() => {
      setApodData(sampleAPOD);
      setLoading(false);
    }, 1500);
  }, []);

  const fetchAPODForDate = (date: string) => {
    setLoading(true);
    // In real app, this would fetch from NASA APOD API with specific date
    setTimeout(() => {
      setApodData({
        ...sampleAPOD,
        date: date,
        title: "Mars Rover Curiosity Selfie",
        explanation: "This self-portrait of NASA's Curiosity Mars rover shows the vehicle at the 'Big Sky' site, where its drill collected the mission's second taste of Mount Sharp. The scene combines dozens of images taken during January 2015 by the Mars Hand Lens Imager (MAHLI) camera at the end of the rover's robotic arm."
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <section id="apod" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-cosmic-pulse w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading today's cosmic view...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apod" className="py-20 px-4 bg-space-medium/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Astronomy Picture of the Day
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the cosmos through NASA's daily featured astronomy image and explanation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Date selector */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-card border border-card-border rounded-md cosmic-glow"
                max={new Date().toISOString().split('T')[0]}
              />
              <Button 
                variant="stellar"
                onClick={() => selectedDate && fetchAPODForDate(selectedDate)}
                disabled={!selectedDate}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Load Date
              </Button>
            </div>
          </div>

          {apodData && (
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  {apodData.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span>{new Date(apodData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  {apodData.copyright && (
                    <span className="text-accent">© {apodData.copyright}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {apodData.media_type === "image" ? (
                  <div className="relative rounded-lg overflow-hidden cosmic-glow">
                    <img
                      src={apodData.url}
                      alt={apodData.title}
                      className="w-full h-auto max-h-96 object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.src = "https://via.placeholder.com/800x600/1a1a2e/16213e?text=Space+Image";
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg overflow-hidden cosmic-glow">
                    <iframe
                      src={apodData.url}
                      className="w-full h-full"
                      title={apodData.title}
                      allowFullScreen
                    />
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Explanation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {apodData.explanation}
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="nebula" asChild>
                    <a 
                      href="https://apod.nasa.gov/apod/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit NASA APOD
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default APOD;