
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, X, Edit, Save, Trash2 } from "lucide-react";
import ProfileCard from "@/components/profile/ProfileCard";
import AuthModal from "@/components/auth/AuthModal";
import ApplicationsList from "@/components/applications/ApplicationsList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const interestOptions = [
  "SaaS", "E-commerce", "Fintech", "EdTech", "HealthTech", "AI",
  "DevTools", "Mobile Apps", "Web Development", "Hardware", "Blockchain",
  "Sustainability", "Social Impact", "Gaming", "Marketing", "Open to all"
];

const skillOptions = [
  // Tech skills
  "React", "JavaScript", "TypeScript", "Python", "Java", "C++", "Swift", "Kotlin",
  "Node.js", "Django", "Laravel", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
  "MongoDB", "PostgreSQL", "MySQL", "Firebase", "GraphQL", "REST API", "Microservices",
  "DevOps", "CI/CD", "Test Automation", "Mobile Development", "Web Development",
  "Blockchain", "Smart Contracts", "Machine Learning", "Data Science", "Big Data",
  
  // Design skills
  "UI/UX Design", "Graphic Design", "Figma", "Adobe XD", "Photoshop", "Illustrator",
  "Prototyping", "User Research", "Wireframing", "Motion Design",
  
  // Business skills
  "Marketing", "SEO", "Content Writing", "Social Media", "Business Development",
  "Product Management", "Project Management", "Market Research", "Customer Service",
  "Sales", "Business Analysis", "Financial Modeling", "Accounting", "Legal",
  
  // Soft skills
  "Leadership", "Communication", "Problem Solving", "Critical Thinking", "Teamwork",
  "Time Management", "Adaptability", "Creativity", "Presentation Skills"
];

const Profile = () => {
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // State for skill editing
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  
  // State for language editing
  const [languageInput, setLanguageInput] = useState("");
  const [languages, setLanguages] = useState<string[]>(user?.languages || []);
  
  // State for bio editing
  const [bio, setBio] = useState(user?.bio || "");
  
  // State for experience level
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced" | undefined>(
    user?.experienceLevel
  );
  
  // State for areas of interest
  const [interestInput, setInterestInput] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>(user?.areasOfInterest || []);
  
  // State for startup specific fields
  const [startupData, setStartupData] = useState({
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    websiteUrl: user?.websiteUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
    founderNames: user?.founderNames?.join(", ") || "",
    stage: user?.stage || ""
  });
  
  const [sectors, setSectors] = useState<string[]>(user?.sectors || []);
  const [sectorInput, setSectorInput] = useState("");
  
  // Handlers for skills
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  
  // Handlers for languages
  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput("");
    }
  };
  
  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((l) => l !== language));
  };
  
  // Handlers for areas of interest
  const addInterest = () => {
    if (interestInput.trim() && !areasOfInterest.includes(interestInput.trim())) {
      setAreasOfInterest([...areasOfInterest, interestInput.trim()]);
      setInterestInput("");
    }
  };
  
  const removeInterest = (interest: string) => {
    setAreasOfInterest(areasOfInterest.filter((i) => i !== interest));
  };
  
  // Handlers for sectors
  const addSector = () => {
    if (sectorInput.trim() && !sectors.includes(sectorInput.trim())) {
      setSectors([...sectors, sectorInput.trim()]);
      setSectorInput("");
    }
  };
  
  const removeSector = (sector: string) => {
    setSectors(sectors.filter((s) => s !== sector));
  };
  
  const handleStartupDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStartupData({ ...startupData, [name]: value });
  };
  
  const handleSaveProfile = async () => {
    // Common fields for both roles
    const profileData: Partial<any> = {
      bio,
      skills,
      languages
    };
    
    // Role-specific fields
    if (user?.role === 'student') {
      profileData.experienceLevel = experienceLevel;
      profileData.areasOfInterest = areasOfInterest;
    } else if (user?.role === 'startup') {
      profileData.companyName = startupData.companyName;
      profileData.companyDescription = startupData.companyDescription;
      profileData.websiteUrl = startupData.websiteUrl;
      profileData.linkedinUrl = startupData.linkedinUrl;
      profileData.founderNames = startupData.founderNames ? [startupData.founderNames] : undefined;
      profileData.stage = startupData.stage;
      profileData.sectors = sectors;
    }
    
    try {
      await updateUserProfile(profileData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setActiveTab("overview");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold">You need to sign in first</h1>
          <p className="text-muted-foreground">
            Please sign in or create an account to view and edit your profile.
          </p>
          <Button onClick={() => setIsAuthModalOpen(true)}>
            Sign In
          </Button>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-container pt-24 px-4 pb-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <Button onClick={() => navigate("/problems")}>Browse Problems</Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md" style={{ gridTemplateColumns: user?.role === 'startup' ? '1fr 1fr 1fr' : '1fr 1fr' }}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            {user?.role === 'startup' && (
              <TabsTrigger value="applications">Applications</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {user && <ProfileCard user={user} />}
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user?.name || ""}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add your technical and soft skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Select onValueChange={(value) => {
                        setSkillInput(value);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select or type a skill" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {skillOptions.map(skill => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      onClick={addSkill}
                      disabled={!skillInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No skills added yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription>
                    Add languages you speak
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        placeholder="Add a language..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      onClick={addLanguage}
                      disabled={!languageInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <Badge key={language} variant="outline" className="flex items-center space-x-1">
                        <span>{language}</span>
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeLanguage(language)}
                        />
                      </Badge>
                    ))}
                    {languages.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No languages added yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Student Specific Fields */}
              {user?.role === 'student' && (
                <>
                  {/* Experience Level */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Experience Level</CardTitle>
                      <CardDescription>
                        Set your current experience level
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={experienceLevel === "beginner" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => setExperienceLevel("beginner")}
                          >
                            Beginner
                          </Button>
                          <Button
                            variant={experienceLevel === "intermediate" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => setExperienceLevel("intermediate")}
                          >
                            Intermediate
                          </Button>
                          <Button
                            variant={experienceLevel === "advanced" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => setExperienceLevel("advanced")}
                          >
                            Advanced
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Areas of Interest */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Areas of Interest</CardTitle>
                      <CardDescription>
                        Select the industries or domains you're interested in
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Select onValueChange={(value) => {
                            setInterestInput(value);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select or type an interest" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {interestOptions.map(interest => (
                                <SelectItem key={interest} value={interest}>
                                  {interest}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          onClick={addInterest}
                          disabled={!interestInput.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {areasOfInterest.map((interest) => (
                          <Badge key={interest} variant="secondary" className="flex items-center space-x-1">
                            <span>{interest}</span>
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeInterest(interest)}
                            />
                          </Badge>
                        ))}
                        {areasOfInterest.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No areas of interest added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {/* Startup Specific Fields */}
              {user?.role === 'startup' && (
                <>
                  {/* Company Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                      <CardDescription>
                        Update your company details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={startupData.companyName}
                          onChange={handleStartupDataChange}
                          placeholder="Your company name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companyDescription">Company Description</Label>
                        <Textarea
                          id="companyDescription"
                          name="companyDescription"
                          value={startupData.companyDescription}
                          onChange={handleStartupDataChange}
                          placeholder="Briefly describe what your company does"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stage">Company Stage</Label>
                        <Input
                          id="stage"
                          name="stage"
                          value={startupData.stage}
                          onChange={handleStartupDataChange}
                          placeholder="e.g. Seed, Series A, Series B"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Company Sectors */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Sectors</CardTitle>
                      <CardDescription>
                        Add sectors your company operates in
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Input
                            value={sectorInput}
                            onChange={(e) => setSectorInput(e.target.value)}
                            placeholder="Add a sector..."
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSector();
                              }
                            }}
                          />
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          onClick={addSector}
                          disabled={!sectorInput.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
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
                            No sectors added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Company Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Links</CardTitle>
                      <CardDescription>
                        Add links to your company's online presence
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input
                          id="websiteUrl"
                          name="websiteUrl"
                          value={startupData.websiteUrl}
                          onChange={handleStartupDataChange}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <Input
                          id="linkedinUrl"
                          name="linkedinUrl"
                          value={startupData.linkedinUrl}
                          onChange={handleStartupDataChange}
                          placeholder="https://linkedin.com/company/yourcompany"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Founder Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Founder Information</CardTitle>
                      <CardDescription>
                        Add information about your company's founders
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="founderNames">Founder Names</Label>
                        <Input
                          id="founderNames"
                          name="founderNames"
                          value={startupData.founderNames}
                          onChange={handleStartupDataChange}
                          placeholder="Names of founders"
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate multiple names with commas
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>
                    Set your current availability status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={user?.availability?.status === "available" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {}}
                      >
                        Available
                      </Button>
                      <Button
                        variant={user?.availability?.status === "limited" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {}}
                      >
                        Limited
                      </Button>
                      <Button
                        variant={user?.availability?.status === "unavailable" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {}}
                      >
                        Unavailable
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours per week</Label>
                      <Input
                        id="hours"
                        type="number"
                        min="1"
                        max="40"
                        value={user?.availability?.hours || ""}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setActiveTab("overview")}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </TabsContent>
          
          {user?.role === 'startup' && (
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>
                    Review applications from students for your posted problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationsList />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
