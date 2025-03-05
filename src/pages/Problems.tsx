
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ProblemList from "@/components/problems/ProblemList";
import AuthModal from "@/components/auth/AuthModal";
import { Plus } from "lucide-react";
import { useState } from "react";

const Problems = () => {
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const isStartup = user?.role === "startup";
  
  return (
    <div className="max-container pt-24 px-4 pb-16">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
            <p className="text-muted-foreground mt-1">
              Browse and apply to problems that match your skills
            </p>
          </div>
          
          {isAuthenticated && isStartup && (
            <Button className="self-start sm:self-center">
              <Plus className="mr-2 h-4 w-4" /> Post New Problem
            </Button>
          )}
          
          {!isAuthenticated && (
            <Button 
              variant="outline" 
              onClick={() => setIsAuthModalOpen(true)}
              className="self-start sm:self-center"
            >
              Sign in to post problems
            </Button>
          )}
        </div>
        
        <div className="bg-primary/5 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-medium">Looking for specific problems?</h2>
              <p className="text-muted-foreground">
                Use the filters below to find the perfect match for your skills and interests.
              </p>
            </div>
          </div>
        </div>
        
        <ProblemList />
        
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Problems;
