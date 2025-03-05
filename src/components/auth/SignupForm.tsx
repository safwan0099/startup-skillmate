
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StartupSignupForm from "./StartupSignupForm";

interface SignupFormProps {
  onSuccess?: () => void;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { signup, loginWithGoogle, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showStartupForm, setShowStartupForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "startup",
    experienceLevel: "beginner" as "beginner" | "intermediate" | "advanced",
    areasOfInterest: [] as string[]
  });

  const [interestInput, setInterestInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: "student" | "startup") => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleExperienceLevelChange = (value: "beginner" | "intermediate" | "advanced") => {
    setFormData((prev) => ({ ...prev, experienceLevel: value }));
  };

  const handleAddInterest = () => {
    if (interestInput && !formData.areasOfInterest.includes(interestInput)) {
      setFormData((prev) => ({
        ...prev,
        areasOfInterest: [...prev.areasOfInterest, interestInput]
      }));
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.role === "startup") {
      setShowStartupForm(true);
      return;
    }
    
    try {
      setIsLoading(true);
      await signup(formData.email, formData.password, formData.name, formData.role);
      
      // Update with additional profile info
      await updateUserProfile({
        experienceLevel: formData.experienceLevel,
        areasOfInterest: formData.areasOfInterest
      });
      
      toast({
        title: "Account created!",
        description: "You are now signed in.",
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      toast({
        title: "Account created!",
        description: "You are now signed in with Google.",
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showStartupForm) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Complete Startup Profile</h2>
        <StartupSignupForm 
          email={formData.email}
          password={formData.password}
          name={formData.name}
          onSuccess={onSuccess}
        />
        <Button
          variant="ghost"
          className="mt-2"
          onClick={() => setShowStartupForm(false)}
        >
          Back to Basic Info
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>
        <div className="space-y-2">
          <Label>I am a</Label>
          <RadioGroup 
            value={formData.role} 
            onValueChange={(value) => handleRoleChange(value as "student" | "startup")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="startup" id="startup" />
              <Label htmlFor="startup" className="cursor-pointer">Startup</Label>
            </div>
          </RadioGroup>
        </div>
        
        {formData.role === "student" && (
          <>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <RadioGroup 
                value={formData.experienceLevel} 
                onValueChange={(value) => handleExperienceLevelChange(value as "beginner" | "intermediate" | "advanced")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Areas of Interest</Label>
              <div className="flex space-x-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="e.g. Fintech, SaaS, E-commerce"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={handleAddInterest}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.areasOfInterest.map((interest) => (
                  <Button 
                    key={interest} 
                    variant="secondary" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    {interest}
                    <span className="ml-1">×</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : formData.role === "startup" ? "Next: Startup Details" : "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline underline-offset-2 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-2 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default SignupForm;
