import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Rocket, Star } from "lucide-react";

interface BirthdayEvent {
  title: string;
  date: string;
  description: string;
  type: string;
}

const BirthdaySpace = () => {
  const [birthDate, setBirthDate] = useState("");
  const [events, setEvents] = useState<BirthdayEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Sample events database (in real app, this would be a comprehensive API)
  const eventDatabase: BirthdayEvent[] = [
    {
      title: "Apollo 11 Moon Landing",
      date: "1969-07-20",
      description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon.",
      type: "Historic Achievement"
    },
    {
      title: "Viking 1 Lands on Mars",
      date: "1976-07-20", 
      description: "First successful US landing on Mars, providing detailed images of the Martian surface.",
      type: "Planetary Mission"
    },
    {
      title: "Hubble Space Telescope Launched",
      date: "1990-04-24",
      description: "NASA's Hubble Space Telescope was deployed, revolutionizing our view of the universe.",
      type: "Space Observatory"
    },
    {
      title: "International Space Station First Crew",
      date: "2000-10-31",
      description: "Expedition 1 crew arrived at the ISS, beginning continuous human presence in space.",
      type: "Space Station"
    },
    {
      title: "SpaceX Dragon First Commercial Flight",
      date: "2010-12-08",
      description: "First commercial spacecraft to orbit Earth and return safely.",
      type: "Commercial Space"
    },
    {
      title: "Curiosity Rover Mars Landing",
      date: "2012-08-05",
      description: "NASA's Curiosity rover successfully landed on Mars using the sky crane system.",
      type: "Mars Exploration"
    }
  ];

  const findBirthdayEvents = () => {
    if (!birthDate) return;
    
    setLoading(true);
    setSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      const birthDateObj = new Date(birthDate);
      const matchingEvents = eventDatabase.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getMonth() === birthDateObj.getMonth() &&
          eventDate.getDate() === birthDateObj.getDate()
        );
      });
      
      // If no exact matches, find events from the same year or nearby dates
      if (matchingEvents.length === 0) {
        const yearEvents = eventDatabase.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getFullYear() === birthDateObj.getFullYear();
        });
        
        if (yearEvents.length > 0) {
          setEvents(yearEvents.slice(0, 2)); // Show up to 2 events from same year
        } else {
          // Show a random selection if no year matches
          const randomEvents = eventDatabase.sort(() => 0.5 - Math.random()).slice(0, 2);
          setEvents(randomEvents);
        }
      } else {
        setEvents(matchingEvents);
      }
      
      setLoading(false);
    }, 1000);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Historic Achievement":
        return <Star className="w-5 h-5 text-accent" />;
      case "Mars Exploration":
        return <Rocket className="w-5 h-5 text-secondary" />;
      default:
        return <Calendar className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="birthday" className="py-20 px-4 bg-gradient-stellar">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Space on Your Birthday
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what amazing space events happened on your special day throughout history.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="cosmic-glow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Enter Your Birthday
              </CardTitle>
              <CardDescription>
                We'll find space events that happened on your birthday
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="birthdate">Birth Date</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="cosmic-glow"
                />
              </div>
              <Button 
                onClick={findBirthdayEvents}
                disabled={!birthDate || loading}
                variant="cosmic"
                className="w-full"
              >
                {loading ? "Searching the Cosmos..." : "Discover My Space Birthday"}
              </Button>
            </CardContent>
          </Card>

          {loading && (
            <div className="text-center">
              <div className="animate-cosmic-pulse w-16 h-16 bg-gradient-cosmic rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Scanning space history...</p>
            </div>
          )}

          {searched && !loading && events.length === 0 && (
            <Card className="cosmic-glow">
              <CardContent className="text-center py-8">
                <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Direct Matches</h3>
                <p className="text-muted-foreground">
                  No space events found for your exact birthday, but every day has potential for cosmic discovery!
                </p>
              </CardContent>
            </Card>
          )}

          {events.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">
                Your Space Birthday Events
              </h3>
              {events.map((event, index) => (
                <Card key={index} className="cosmic-glow animate-fade-up">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      {event.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })} • {event.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BirthdaySpace;