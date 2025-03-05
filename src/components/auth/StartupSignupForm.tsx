
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

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
  
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    websiteUrl: "",
    linkedinUrl: "",
    founderNames: "",
    stage: "Seed"
  });

  const [sectors, setSectors] = useState<string[]>([]);
  const [sectorInput, setSectorInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSector = () => {
    if (sectorInput && !sectors.includes(sectorInput)) {
      setSectors([...sectors, sectorInput]);
      setSectorInput("");
    }
  };

  const removeSector = (sector: string) => {
    setSectors(sectors.filter(s => s !== sector));
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
        founderNames: formData.founderNames ? [formData.founderNames] : undefined,
        sectors,
        stage: formData.stage
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Your company name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          placeholder="Briefly describe what your company does"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sectors">Sectors</Label>
        <div className="flex space-x-2">
          <Input
            id="sectorInput"
            value={sectorInput}
            onChange={(e) => setSectorInput(e.target.value)}
            placeholder="e.g. Fintech, Healthcare, SaaS"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSector();
              }
            }}
          />
          <Button type="button" size="icon" onClick={addSector}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {sectors.map((sector) => (
            <Badge key={sector} variant="secondary" className="flex items-center space-x-1">
              <span>{sector}</span>
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => removeSector(sector)}
              />
            </Badge>
          ))}
          {sectors.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Add sectors that describe your business
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="stage">Company Stage</Label>
        <Input
          id="stage"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          placeholder="e.g. Seed, Series A, Series B"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          placeholder="https://yourcompany.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input
          id="linkedinUrl"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleChange}
          placeholder="https://linkedin.com/company/yourcompany"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="founderNames">Founder Names</Label>
        <Input
          id="founderNames"
          name="founderNames"
          value={formData.founderNames}
          onChange={handleChange}
          placeholder="Names of founders"
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Startup Account..." : "Complete Setup"}
      </Button>
    </form>
  );
};

export default StartupSignupForm;
