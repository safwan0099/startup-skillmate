import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Briefcase, Globe, Linkedin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StartupSignupFormProps {
  email: string;
  password: string;
  name: string;
  onSuccess?: () => void;
}

const StartupSignupForm = ({ email, password, name, onSuccess }: StartupSignupFormProps) => {
  const { signup, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [sectorInput, setSectorInput] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [cofounderInput, setCofounderInput] = useState("");
  const [cofounderNames, setCofounderNames] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    websiteUrl: "",
    linkedinUrl: "",
    location: "",
    stage: "idea",
    hiringStatus: "not_hiring" as "hiring" | "not_hiring" | "future_hiring"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSector = () => {
    if (sectorInput.trim() && !sectors.includes(sectorInput.trim())) {
      setSectors([...sectors, sectorInput.trim()]);
      setSectorInput("");
    }
  };

  const removeSector = (sector: string) => {
    setSectors(sectors.filter(s => s !== sector));
  };
  
  const addCofounder = () => {
    if (cofounderInput.trim() && !cofounderNames.includes(cofounderInput.trim())) {
      setCofounderNames([...cofounderNames, cofounderInput.trim()]);
      setCofounderInput("");
    }
  };

  const removeCofounder = (cofounder: string) => {
    setCofounderNames(cofounderNames.filter(c => c !== cofounder));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // First create the basic account
      await signup(email, password, name, "startup");
      
      // Then update with startup specific info
      await updateUserProfile({
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        websiteUrl: formData.websiteUrl,
        linkedinUrl: formData.linkedinUrl,
        location: formData.location,
        founderNames: cofounderNames.length > 0 ? cofounderNames : undefined,
        sectors,
        stage: formData.stage,
        hiringStatus: formData.hiringStatus
      });
      
      toast({
        title: "Startup account created!",
        description: "You're now ready to post problems and find talented students.",
      });
      
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create startup account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stageOptions = [
    { value: "idea", label: "Idea Stage" },
    { value: "mvp", label: "MVP" },
    { value: "pre_seed", label: "Pre-Seed" },
    { value: "seed", label: "Seed" },
    { value: "series_a", label: "Series A" },
    { value: "series_b_plus", label: "Series B+" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your startup's name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="companyDescription"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              placeholder="Tell us about your startup and its mission..."
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="flex items-center">
                <Globe className="mr-1 h-4 w-4" /> Website URL
              </Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://yourstartup.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="flex items-center">
                <Linkedin className="mr-1 h-4 w-4" /> LinkedIn URL
              </Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/yourstartup"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center">
              <Users className="mr-1 h-4 w-4" /> Co-Founders
            </Label>
            <div className="flex space-x-2">
              <Input
                value={cofounderInput}
                onChange={(e) => setCofounderInput(e.target.value)}
                placeholder="Co-founder name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCofounder();
                  }
                }}
              />
              <Button type="button" size="sm" onClick={addCofounder}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {cofounderNames.map((cofounder) => (
                <Badge 
                  key={cofounder} 
                  variant="secondary" 
                  className="flex items-center"
                >
                  {cofounder}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeCofounder(cofounder)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Industry Sectors <span className="text-red-500">*</span></Label>
            <div className="flex space-x-2">
              <Input
                value={sectorInput}
                onChange={(e) => setSectorInput(e.target.value)}
                placeholder="e.g. Fintech, SaaS, E-commerce"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSector();
                  }
                }}
              />
              <Button type="button" size="sm" onClick={addSector}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sectors.map((sector) => (
                <Badge 
                  key={sector} 
                  variant="secondary" 
                  className="flex items-center"
                >
                  {sector}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSector(sector)}
                  />
                </Badge>
              ))}
            </div>
            {sectors.length === 0 && (
              <p className="text-xs text-muted-foreground">Please add at least one sector</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage" className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" /> Company Stage <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.stage} 
                onValueChange={(value) => handleSelectChange("stage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hiringStatus">Hiring Status</Label>
              <Select 
                value={formData.hiringStatus} 
                onValueChange={(value: "hiring" | "not_hiring" | "future_hiring") => 
                  handleSelectChange("hiringStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hiring status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hiring">Currently Hiring</SelectItem>
                  <SelectItem value="future_hiring">Hiring Soon</SelectItem>
                  <SelectItem value="not_hiring">Not Hiring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button type="submit" className="w-full" disabled={isLoading || sectors.length === 0}>
        {isLoading ? "Creating account..." : "Create Startup Account"}
      </Button>
    </form>
  );
};

export default StartupSignupForm;
