
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Brain, Code, Star, ShieldCheck, Search } from "lucide-react";
import SolverList from "@/components/solvers/SolverList";

const Solvers = () => {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Talented Students Ready to <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Solve Problems</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Browse our community of skilled students eager to apply their knowledge to real-world challenges and help your startup grow.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex flex-col space-y-3">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Verified Skills</h3>
              <p className="text-muted-foreground">
                All solvers have verified skills and experience in their areas of expertise.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex flex-col space-y-3">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Academic Excellence</h3>
              <p className="text-muted-foreground">
                Our solvers bring fresh perspectives from top universities and educational programs.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex flex-col space-y-3">
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Success Rate</h3>
              <p className="text-muted-foreground">
                85% of our solvers complete their projects with successful outcomes and positive reviews.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Find the Perfect Solver</h2>
            <p className="text-muted-foreground">
              Browse our talented community of student problem-solvers
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button asChild variant="outline">
              <Link to="/problems">
                <Search className="mr-2 h-4 w-4" />
                Post a Problem
              </Link>
            </Button>
            <Button asChild>
              <Link to="/profile">
                Join As A Solver
              </Link>
            </Button>
          </div>
        </div>

        {/* Solver List */}
        <SolverList />
      </div>
    </div>
  );
};

export default Solvers;
