
import { useState, useEffect } from "react";
import { Problem } from "@/lib/types";
import ProblemCard from "./ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock problems data
const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Develop a Mobile App UI/UX",
    description: "We need a talented UI/UX designer to help us create an intuitive and beautiful mobile app interface for our new fitness tracking application.",
    startupId: "startup1",
    startup: {
      id: "startup1",
      email: "startup@example.com",
      name: "FitTech Solutions",
      role: "startup",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-06-20")
    },
    requiredSkills: ["UI/UX", "Figma", "Mobile Design", "Prototyping"],
    experienceLevel: "intermediate",
    compensation: "$2000-$3000 for the project",
    deadline: new Date("2023-09-30"),
    status: "open",
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01")
  },
  {
    id: "2",
    title: "Backend Developer for E-commerce API",
    description: "Looking for a backend developer to help build our e-commerce API using Node.js and MongoDB. Experience with payment gateways is a plus.",
    startupId: "startup2",
    startup: {
      id: "startup2",
      email: "techshop@example.com",
      name: "TechShop Innovations",
      role: "startup",
      createdAt: new Date("2023-02-10"),
      updatedAt: new Date("2023-06-15")
    },
    requiredSkills: ["Node.js", "MongoDB", "REST API", "Payment Integration"],
    experienceLevel: "advanced",
    compensation: "$30-40/hour, 20 hours/week",
    deadline: new Date("2023-09-15"),
    status: "open",
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05")
  },
  {
    id: "3",
    title: "Data Analysis for Market Research",
    description: "We need help analyzing customer survey data and creating insightful visualizations to guide our product development.",
    startupId: "startup3",
    startup: {
      id: "startup3",
      email: "dataco@example.com",
      name: "DataCo Analytics",
      role: "startup",
      createdAt: new Date("2023-03-20"),
      updatedAt: new Date("2023-05-10")
    },
    requiredSkills: ["Python", "Data Analysis", "Pandas", "Data Visualization"],
    experienceLevel: "beginner",
    compensation: "$1500 for the project",
    deadline: new Date("2023-08-30"),
    status: "open",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10")
  },
  {
    id: "4",
    title: "Frontend React Developer",
    description: "Join our team to help build the frontend of our SaaS platform using React and TypeScript.",
    startupId: "startup4",
    startup: {
      id: "startup4",
      email: "cloudtech@example.com",
      name: "CloudTech Solutions",
      role: "startup",
      createdAt: new Date("2023-01-05"),
      updatedAt: new Date("2023-06-25")
    },
    requiredSkills: ["React", "TypeScript", "CSS", "Responsive Design"],
    experienceLevel: "intermediate",
    compensation: "$25-35/hour, part-time",
    deadline: new Date("2023-09-20"),
    status: "open",
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15")
  }
];

interface ProblemListProps {
  initialProblems?: Problem[];
}

const ProblemList = ({ initialProblems }: ProblemListProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [problems, setProblems] = useState<Problem[]>(initialProblems || mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(problems);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [appliedProblemId, setAppliedProblemId] = useState<string | null>(null);
  
  // Get all unique skills from problems
  const allSkills = Array.from(
    new Set(problems.flatMap((problem) => problem.requiredSkills))
  ).sort();
  
  // Apply filters when inputs change
  useEffect(() => {
    let filtered = problems;
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(term) ||
          problem.description.toLowerCase().includes(term) ||
          problem.startup?.name.toLowerCase().includes(term) ||
          problem.requiredSkills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Apply experience filter
    if (experienceFilter) {
      filtered = filtered.filter((problem) => problem.experienceLevel === experienceFilter);
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedSkills.some((skill) => problem.requiredSkills.includes(skill))
      );
    }
    
    setFilteredProblems(filtered);
  }, [searchTerm, experienceFilter, selectedSkills, problems]);
  
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setExperienceFilter("");
    setSelectedSkills([]);
  };
  
  const handleApply = (problemId: string) => {
    if (!isAuthenticated) {
      setAppliedProblemId(problemId);
      setIsAuthModalOpen(true);
      return;
    }
    
    // In a real app, this would send the application to the backend
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
  };
  
  // Handle successful authentication after attempting to apply
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (appliedProblemId) {
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      setAppliedProblemId(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={experienceFilter} onValueChange={setExperienceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={clearFilters}
            disabled={!searchTerm && !experienceFilter && selectedSkills.length === 0}
          >
            <X className="mr-1 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Skills filter section */}
      <div className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Filter className="mr-2 h-4 w-4" /> Filter by skills
        </div>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onApply={handleApply}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No problems match your criteria.</p>
            <Button variant="link" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default ProblemList;
