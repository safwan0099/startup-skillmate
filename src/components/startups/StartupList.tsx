
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, MapPin, Users, ExternalLink } from "lucide-react";
import { User } from "@/lib/types";
import { Link } from "react-router-dom";

// Mock startups data
const mockStartups: Partial<User>[] = [
  {
    id: "startup1",
    name: "TechNova Solutions",
    bio: "A cutting-edge startup focused on AI-powered productivity tools for remote teams.",
    skills: ["AI", "SaaS", "Remote Work"],
    availability: { status: "available" }
  },
  {
    id: "startup2",
    name: "GreenLeaf Innovations",
    bio: "Developing sustainable technologies to help businesses reduce their carbon footprint.",
    skills: ["Sustainability", "CleanTech", "IoT"],
    availability: { status: "available" }
  },
  {
    id: "startup3",
    name: "HealthPulse",
    bio: "Creating digital solutions to make healthcare more accessible and affordable for everyone.",
    skills: ["HealthTech", "Mobile Apps", "Telemedicine"],
    availability: { status: "limited" }
  },
  {
    id: "startup4",
    name: "FinEdge",
    bio: "Building next-generation financial tools to democratize investment opportunities.",
    skills: ["FinTech", "Blockchain", "Data Analytics"],
    availability: { status: "available" }
  },
  {
    id: "startup5",
    name: "EduSpark",
    bio: "Transforming education through immersive learning experiences and personalized curricula.",
    skills: ["EdTech", "VR/AR", "Adaptive Learning"],
    availability: { status: "limited" }
  },
  {
    id: "startup6",
    name: "LogiTech Transport",
    bio: "Optimizing logistics and supply chain operations with AI and predictive analytics.",
    skills: ["Logistics", "Supply Chain", "AI"],
    availability: { status: "available" }
  }
];

const StartupList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startups, setStartups] = useState(mockStartups);
  
  // Filter startups based on search term
  const filteredStartups = startups.filter(
    (startup) =>
      startup.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search startups by name, description, or industry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Startup cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.length > 0 ? (
          filteredStartups.map((startup) => (
            <Card key={startup.id} className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{startup.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{startup.bio}</p>
                  
                  {/* Startup tags/industries */}
                  <div className="flex flex-wrap gap-2">
                    {startup.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Availability status */}
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={startup.availability?.status === "available" ? "default" : "outline"}
                      className={startup.availability?.status === "available" ? "bg-green-500" : ""}
                    >
                      {startup.availability?.status === "available" ? "Actively Hiring" : "Limited Openings"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/problems?startup=${startup.id}`}>
                      View Problems
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to={`/startups/${startup.id}`}>
                      <span>View Profile</span>
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No startups match your search criteria.</p>
            <Button variant="link" onClick={() => setSearchTerm("")}>
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupList;
