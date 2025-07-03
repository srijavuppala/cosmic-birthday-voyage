import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Image, ExternalLink, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SpaceEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
  country?: string;
  image?: string;
  url?: string;
}

const Timeline = () => {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SpaceEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();

  // Fetch real space events from APIs
  const fetchSpaceEvents = async (useApiKey = false) => {
    try {
      setLoading(true);
      let events: SpaceEvent[] = [];

      // Try to fetch from Spaceflight News API (free)
      try {
        const newsResponse = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=10');
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          const newsEvents = newsData.results.map((article: any, index: number) => ({
            id: `news-${article.id}`,
            title: article.title,
            date: article.published_at.split('T')[0],
            description: article.summary || article.title,
            type: "Space News",
            image: article.image_url,
            url: article.url
          }));
          events = [...events, ...newsEvents];
        }
      } catch (error) {
        console.log("Spaceflight News API not available, using sample data");
      }

      // Add historical space events
      const historicalEvents: SpaceEvent[] = [
        {
          id: "hist-1",
          title: "Sputnik 1 Launch",
          date: "1957-10-04",
          description: "First artificial satellite launched by Soviet Union, marking the beginning of the Space Age.",
          type: "Historic Launch",
          country: "USSR"
        },
        {
          id: "hist-2", 
          title: "Yuri Gagarin's Historic Flight",
          date: "1961-04-12",
          description: "First human spaceflight by Soviet cosmonaut Yuri Gagarin aboard Vostok 1.",
          type: "Human Spaceflight",
          country: "USSR"
        },
        {
          id: "hist-3",
          title: "Apollo 11 Moon Landing",
          date: "1969-07-20", 
          description: "Neil Armstrong and Buzz Aldrin become first humans to walk on the Moon.",
          type: "Moon Landing",
          country: "USA"
        },
        {
          id: "hist-4",
          title: "International Space Station First Module",
          date: "1998-11-20",
          description: "Launch of Zarya, the first module of the International Space Station.",
          type: "Space Station",
          country: "International"
        }
      ];

      events = [...events, ...historicalEvents];

      // Sort events by date (newest first)
      events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setEvents(events);
      setFilteredEvents(events);
      
      toast({
        title: "Timeline Updated",
        description: `Loaded ${events.length} space events from real APIs and historical data.`,
      });
      
    } catch (error) {
      console.error("Error fetching space events:", error);
      toast({
        title: "Error",
        description: "Failed to load space events. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaceEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    
    if (selectedYear !== "all") {
      filtered = filtered.filter(event => 
        new Date(event.date).getFullYear().toString() === selectedYear
      );
    }
    
    if (selectedType !== "all") {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    setFilteredEvents(filtered);
  }, [events, selectedYear, selectedType]);

  const years = Array.from(new Set(events.map(event => 
    new Date(event.date).getFullYear().toString()
  ))).sort((a, b) => a.localeCompare(b));

  const types = Array.from(new Set(events.map(event => event.type)));

  const getEventTypeColor = (type: string) => {
    const colors = {
      "Historic Launch": "bg-primary text-primary-foreground",
      "Human Spaceflight": "bg-secondary text-secondary-foreground", 
      "Moon Landing": "bg-accent text-accent-foreground",
      "Deep Space Mission": "bg-primary text-primary-foreground",
      "Space Station": "bg-secondary text-secondary-foreground",
      "Commercial Launch": "bg-accent text-accent-foreground",
      "Space News": "bg-primary text-primary-foreground"
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <section id="timeline" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Loading Real Space Data...</h2>
            <div className="animate-cosmic-pulse w-16 h-16 bg-gradient-cosmic rounded-full mx-auto"></div>
            <p className="text-muted-foreground mt-4">Fetching latest space events from APIs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Live Space History Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time space events from APIs combined with historic milestones in space exploration.
          </p>
          <Button 
            variant="stellar" 
            size="sm" 
            onClick={() => fetchSpaceEvents()}
            className="mt-4"
          >
            Refresh Events
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedYear === "all" ? "cosmic" : "outline"}
              size="sm"
              onClick={() => setSelectedYear("all")}
            >
              All Years
            </Button>
            {years.map(year => (
              <Button
                key={year}
                variant={selectedYear === year ? "cosmic" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === "all" ? "stellar" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              All Types
            </Button>
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "stellar" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 timeline-glow h-full"></div>
          
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } animate-fade-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="cosmic-glow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        {event.country && (
                          <Badge variant="outline">{event.country}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed">{event.description}</p>
                      <div className="flex gap-2 mt-4">
                        {event.image && (
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full max-w-xs h-32 object-cover rounded-lg cosmic-glow"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                      {(event.image || event.url) && (
                        <div className="mt-4 flex gap-2">
                          {event.url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={event.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Read More
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline node */}
                <div className="w-4 h-4 bg-gradient-cosmic rounded-full border-4 border-background cosmic-glow z-10"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;