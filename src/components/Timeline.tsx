import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Image } from "lucide-react";

interface SpaceEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
  country?: string;
  image?: string;
}

const Timeline = () => {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SpaceEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Sample space events data (in real app, this would come from APIs)
  const sampleEvents: SpaceEvent[] = [
    {
      id: "1",
      title: "Sputnik 1 Launch",
      date: "1957-10-04",
      description: "First artificial satellite launched by Soviet Union, marking the beginning of the Space Age.",
      type: "Satellite Launch",
      country: "USSR"
    },
    {
      id: "2", 
      title: "Yuri Gagarin's Historic Flight",
      date: "1961-04-12",
      description: "First human spaceflight by Soviet cosmonaut Yuri Gagarin aboard Vostok 1.",
      type: "Human Spaceflight",
      country: "USSR"
    },
    {
      id: "3",
      title: "Apollo 11 Moon Landing",
      date: "1969-07-20", 
      description: "Neil Armstrong and Buzz Aldrin become first humans to walk on the Moon.",
      type: "Moon Landing",
      country: "USA"
    },
    {
      id: "4",
      title: "Voyager 1 Launch",
      date: "1977-09-05",
      description: "NASA launches Voyager 1 spacecraft to explore the outer solar system.",
      type: "Deep Space Mission",
      country: "USA"
    },
    {
      id: "5",
      title: "International Space Station First Module",
      date: "1998-11-20",
      description: "Launch of Zarya, the first module of the International Space Station.",
      type: "Space Station",
      country: "International"
    },
    {
      id: "6",
      title: "SpaceX Falcon Heavy Test Flight",
      date: "2018-02-06",
      description: "Successful test flight of SpaceX's Falcon Heavy rocket with a Tesla Roadster payload.",
      type: "Commercial Launch",
      country: "USA"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
      setLoading(false);
    }, 1000);
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
      "Satellite Launch": "bg-primary",
      "Human Spaceflight": "bg-secondary", 
      "Moon Landing": "bg-accent",
      "Deep Space Mission": "bg-primary-glow",
      "Space Station": "bg-secondary-glow",
      "Commercial Launch": "bg-accent-glow"
    };
    return colors[type as keyof typeof colors] || "bg-muted";
  };

  if (loading) {
    return (
      <section id="timeline" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Loading Timeline...</h2>
            <div className="animate-cosmic-pulse w-16 h-16 bg-gradient-cosmic rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Space History Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore major milestones in space exploration from the dawn of the Space Age to today.
          </p>
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
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {event.country && (
                          <Badge variant="outline">{event.country}</Badge>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                      {event.image && (
                        <div className="mt-4">
                          <Button variant="ghost" size="sm">
                            <Image className="w-4 h-4 mr-2" />
                            View Image
                          </Button>
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