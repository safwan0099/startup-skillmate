
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
  onSuccess?: () => void;  // Added onSuccess callback prop
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login", onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogTitle className="text-xl font-semibold text-center pt-6">
          {activeTab === "login" ? "Welcome Back" : "Create an Account"}
        </DialogTitle>
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="p-6 pt-4">
            <LoginForm onSuccess={onSuccess} />
          </TabsContent>
          <TabsContent value="signup" className="p-6 pt-4">
            <SignupForm onSuccess={onSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
