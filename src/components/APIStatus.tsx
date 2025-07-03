import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Database } from "lucide-react";

const APIStatus = () => {
  const [showAPIInfo, setShowAPIInfo] = useState(false);

  const realAPIs = [
    {
      name: "Spaceflight News API",
      url: "https://api.spaceflightnewsapi.net/",
      description: "Latest space news and events"
    },
    {
      name: "NASA Open Data API",
      url: "https://api.nasa.gov/",
      description: "NASA missions, images, and data"
    },
    {
      name: "Space Launch Live API",
      url: "https://ll.thespacedevs.com/",
      description: "Launch schedules and historical data"
    },
    {
      name: "SpaceX API",
      url: "https://api.spacexdata.com/",
      description: "SpaceX missions and vehicle data"
    }
  ];

  return (
    <section className="py-12 px-4 bg-space-light/20">
      <div className="container mx-auto max-w-4xl">
        <Card className="cosmic-glow border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Database className="w-5 h-5" />
              Demo Mode - Real API Integration Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This timeline currently uses sample data for demonstration. A production version would integrate with real space APIs:
            </p>
            
            <Button 
              variant="nebula" 
              size="sm"
              onClick={() => setShowAPIInfo(!showAPIInfo)}
              className="mb-4"
            >
              {showAPIInfo ? "Hide" : "Show"} Available APIs
            </Button>

            {showAPIInfo && (
              <div className="grid gap-3">
                {realAPIs.map((api, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-card-border">
                    <div>
                      <h4 className="font-semibold text-sm">{api.name}</h4>
                      <p className="text-xs text-muted-foreground">{api.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={api.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default APIStatus;