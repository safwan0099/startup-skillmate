
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Briefcase, Rocket, Building2, Users, Search } from "lucide-react";
import StartupList from "@/components/startups/StartupList";

const Startups = () => {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Innovative Startups Ready to <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Collaborate</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Connect with forward-thinking startups looking for talented students to help solve their challenges and build the future.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">150+</p>
                <p className="text-muted-foreground">Active Startups</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">300+</p>
                <p className="text-muted-foreground">Projects Posted</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">2,500+</p>
                <p className="text-muted-foreground">Successful Matches</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Explore Startups</h2>
            <p className="text-muted-foreground">
              Find innovative companies looking for talent like you
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button asChild variant="outline">
              <Link to="/problems">
                <Search className="mr-2 h-4 w-4" />
                View Problems
              </Link>
            </Button>
            <Button asChild>
              <Link to="/profile">
                Join As A Startup
              </Link>
            </Button>
          </div>
        </div>

        {/* Startup List */}
        <StartupList />
      </div>
    </div>
  );
};

export default Startups;
