
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Users, Briefcase, Brain, Award, Heart } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import ProblemList from "@/components/problems/ProblemList";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const features = [
    {
      icon: Code,
      title: "Showcase Your Skills",
      description: "Create a professional profile highlighting your skills, experience, and availability.",
    },
    {
      icon: Briefcase,
      title: "Real-World Experience",
      description: "Work on real projects for startups and build your portfolio with meaningful work.",
    },
    {
      icon: Users,
      title: "Connect with Startups",
      description: "Build relationships with innovative companies looking for fresh talent.",
    },
    {
      icon: Award,
      title: "Get Compensated",
      description: "Find paid opportunities that match your skills and experience level.",
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-container">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="outline" className="py-1.5 px-4 text-sm font-medium">
              Connecting Talent with Opportunity
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Where Student Skills Meet
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ml-2">
                Startup Needs
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SkillMate connects talented students with innovative startups, 
              providing real-world experience while helping companies solve 
              their most pressing challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              {!isAuthenticated ? (
                <>
                  <Button size="lg" onClick={() => setIsAuthModalOpen(true)}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/problems">
                      Browse Problems <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/profile">
                      My Profile
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/problems">
                      Find Problems <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Join SkillMate?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform creates meaningful connections that benefit both students and startups.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-none bg-background/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Problems Section */}
      <section className="py-20 px-4">
        <div className="max-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Problems</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Discover the latest challenges from innovative startups looking for your skills.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/problems">
                View All Problems <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <ProblemList />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-container px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're a student looking to gain experience or a startup seeking fresh talent,
                SkillMate is the platform for you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" onClick={() => setIsAuthModalOpen(true)}>
                      Create an Account
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setIsAuthModalOpen(true)}>
                      Sign In
                    </Button>
                  </>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/problems">
                      Find Your Next Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
