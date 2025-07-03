import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Calendar, ExternalLink, Key, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  copyright?: string;
  hdurl?: string;
}

const APOD = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();

  // Fetch real APOD data from NASA API
  const fetchAPOD = async (date?: string, useApiKey = false) => {
    try {
      setLoading(true);
      
      // Try NASA APOD API (requires API key for production)
      let url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
      if (date) {
        url += `&date=${date}`;
      }
      
      // If user provided API key, use it
      if (useApiKey && apiKey) {
        url = url.replace('DEMO_KEY', apiKey);
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setApodData(data);
        toast({
          title: "APOD Loaded",
          description: "Successfully loaded NASA's Astronomy Picture of the Day",
        });
      } else {
        throw new Error('Failed to fetch APOD');
      }
    } catch (error) {
      console.error("Error fetching APOD:", error);
      // Fallback to sample data
      const fallbackAPOD: APODData = {
        title: "The Pillars of Creation (Sample)",
        explanation: "This is sample APOD data. To access real NASA APOD images, you need a NASA API key. These towering tendrils of cosmic dust and gas sit at the heart of M16, or the Eagle Nebula. The aptly named Pillars of Creation are part of an active star-forming region within the nebula and hide newborn stars in their wispy columns.",
        url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
        date: date || new Date().toISOString().split('T')[0],
        media_type: "image",
        copyright: "Sample Image from Unsplash"
      };
      setApodData(fallbackAPOD);
      toast({
        title: "Using Sample Data",
        description: "Add your NASA API key to access real APOD images",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPODForDate = (date: string) => {
    fetchAPOD(date, !!apiKey);
  };

  if (loading) {
    return (
      <section id="apod" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-cosmic-pulse w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Loading NASA's Astronomy Picture...</p>
            <p className="text-muted-foreground text-sm">Fetching from NASA APOD API</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apod" className="py-20 px-4 bg-space-medium/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            NASA's Astronomy Picture of the Day
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the cosmos through NASA's daily featured astronomy image with real API integration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* API Key Input */}
          {!apiKey && (
            <Card className="cosmic-glow mb-6 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Key className="w-5 h-5" />
                  NASA API Key (Optional)
                </CardTitle>
                <CardDescription>
                  For unlimited access to NASA APOD, add your free NASA API key from{" "}
                  <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                    api.nasa.gov
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter NASA API key (optional)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="cosmic-glow"
                  />
                  <Button variant="stellar" onClick={() => fetchAPOD(selectedDate, true)} disabled={!apiKey}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Date selector */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-card text-card-foreground border border-card-border rounded-md cosmic-glow"
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
              <Button 
                variant="cosmic"
                onClick={() => fetchAPOD()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Today's APOD
              </Button>
            </div>
          </div>

          {apodData && (
            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  {apodData.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 text-muted-foreground">
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
                      src={apodData.hdurl || apodData.url}
                      alt={apodData.title}
                      className="w-full h-auto max-h-96 object-cover"
                      onError={(e) => {
                        // Fallback to regular URL if HD fails
                        if (e.currentTarget.src !== apodData.url) {
                          e.currentTarget.src = apodData.url;
                        } else {
                          // Final fallback to placeholder
                          e.currentTarget.src = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop";
                        }
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
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Explanation</h3>
                  <p className="text-card-foreground leading-relaxed">
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