
import { User } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Globe, GraduationCap, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative pb-8">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary/10 to-primary/5" />
        <div className="relative z-10 flex items-center space-x-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-background object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background">
              <span className="text-2xl font-semibold text-primary">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {user.role === "student" ? "Student" : "Startup"}
              </Badge>
              {user.availability && (
                <Badge 
                  variant={
                    user.availability.status === "available"
                      ? "default"
                      : user.availability.status === "limited"
                      ? "secondary"
                      : "outline"
                  }
                  className="flex items-center text-xs"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {user.availability.status === "available"
                    ? "Available"
                    : user.availability.status === "limited"
                    ? "Limited Availability"
                    : "Unavailable"}
                </Badge>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {user.bio && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
            <p className="text-sm">{user.bio}</p>
          </div>
        )}
        
        {user.skills && user.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <Code className="mr-2 h-4 w-4" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {user.languages && user.languages.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <Globe className="mr-2 h-4 w-4" /> Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.languages.map((language) => (
                <Badge key={language} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {user.experience && user.experience.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Experience
            </h3>
            <div className="space-y-3">
              {user.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-border pl-4 pb-1">
                  <h4 className="font-medium text-sm">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(exp.startDate), "MMM yyyy")} - {exp.current 
                      ? "Present" 
                      : exp.endDate && format(new Date(exp.endDate), "MMM yyyy")}
                  </p>
                  {exp.description && (
                    <p className="text-sm mt-1">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {user.education && user.education.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" /> Education
            </h3>
            <div className="space-y-3">
              {user.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-border pl-4 pb-1">
                  <h4 className="font-medium text-sm">{edu.degree} in {edu.field}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(edu.startDate), "MMM yyyy")} - {edu.current 
                      ? "Present" 
                      : edu.endDate && format(new Date(edu.endDate), "MMM yyyy")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
