
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Users, Briefcase, Brain, Award, Heart, Rocket, Building2 } from "lucide-react";
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
      
      {/* Explore Sections */}
      <section className="py-10 bg-muted/20 px-4">
        <div className="max-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Explore SkillMate</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our three main sections to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problems Card */}
            <Card className="border-none bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Problems</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Browse through challenges posted by startups looking for fresh perspectives and innovative solutions.
                </p>
                <Button asChild variant="outline" className="border-blue-200 dark:border-blue-800 bg-white dark:bg-blue-950/40 hover:bg-blue-50 dark:hover:bg-blue-900/50">
                  <Link to="/problems">
                    View Problems <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Startups Card */}
            <Card className="border-none bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Startups</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Discover innovative startups seeking talent to help them grow and refine their products and services.
                </p>
                <Button asChild variant="outline" className="border-emerald-200 dark:border-emerald-800 bg-white dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/50">
                  <Link to="/startups">
                    View Startups <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Solvers Card */}
            <Card className="border-none bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Solvers</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Connect with talented students who are ready to apply their skills and knowledge to real-world problems.
                </p>
                <Button asChild variant="outline" className="border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/40 hover:bg-purple-50 dark:hover:bg-purple-900/50">
                  <Link to="/solvers">
                    View Solvers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
