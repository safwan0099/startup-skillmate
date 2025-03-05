
import { Problem } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Briefcase, Tag } from "lucide-react";
import { format } from "date-fns";

interface ProblemCardProps {
  problem: Problem;
  onApply?: (problemId: string) => void;
}

const ProblemCard = ({ problem, onApply }: ProblemCardProps) => {
  // Handle status badge display
  const getStatusBadge = () => {
    switch (problem.status) {
      case "open":
        return <Badge>Open</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{problem.title}</CardTitle>
            <CardDescription className="mt-1">
              {problem.startup?.name || "Anonymous Startup"}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm line-clamp-3">{problem.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <Tag className="mr-1 h-3 w-3" /> Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {problem.requiredSkills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {problem.requiredSkills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{problem.requiredSkills.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center">
              <Briefcase className="mr-1 h-3 w-3" /> Experience
            </p>
            <p className="text-sm capitalize">
              {problem.experienceLevel}
            </p>
          </div>

          {problem.compensation && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Compensation</p>
              <p className="text-sm">{problem.compensation}</p>
            </div>
          )}

          {problem.deadline && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center">
                <Calendar className="mr-1 h-3 w-3" /> Deadline
              </p>
              <p className="text-sm">
                {format(new Date(problem.deadline), "MMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          Posted {format(new Date(problem.createdAt), "MMM d, yyyy")}
        </div>
        {problem.status === "open" && onApply && (
          <Button size="sm" onClick={() => onApply(problem.id)}>
            Apply Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
