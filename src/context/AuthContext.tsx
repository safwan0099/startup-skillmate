
import { createContext, useContext, useEffect, useState } from "react";
import { User, Application } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'student' | 'startup') => Promise<void>;
  logout: () => Promise<void>;
  getApplications: () => Promise<Application[]>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication for demo purposes
// In a real app, this would connect to Supabase
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem('skillmate-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - would use Supabase auth in real implementation
      const mockUser: User = {
        id: "123",
        email,
        name: "Demo User",
        role: "student",
        skills: ["React", "TypeScript", "UI/UX"],
        languages: ["English", "Spanish"],
        availability: { status: "available", hours: 20 },
        experienceLevel: "intermediate",
        areasOfInterest: ["SaaS", "Fintech", "EdTech"],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('skillmate-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Mock Google login - would use Supabase auth in real implementation
      const mockUser: User = {
        id: "123",
        email: "user@example.com",
        name: "Google User",
        avatarUrl: "https://i.pravatar.cc/150?u=google",
        role: "student",
        skills: ["React", "JavaScript"],
        languages: ["English"],
        availability: { status: "available" },
        experienceLevel: "intermediate",
        areasOfInterest: ["SaaS", "Fintech"],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('skillmate-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'startup') => {
    setIsLoading(true);
    try {
      // Mock signup - would use Supabase auth in real implementation
      const mockUser: User = {
        id: "123",
        email,
        name,
        role,
        experienceLevel: role === 'student' ? 'beginner' : undefined,
        areasOfInterest: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('skillmate-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout - would use Supabase auth in real implementation
      setUser(null);
      localStorage.removeItem('skillmate-user');
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Mock update profile - would use Supabase in real implementation
      if (user) {
        const updatedUser = { ...user, ...userData, updatedAt: new Date() };
        setUser(updatedUser);
        localStorage.setItem('skillmate-user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to get applications for a startup
  const getApplications = async (): Promise<Application[]> => {
    // In a real app, this would fetch from the backend
    if (user?.role !== 'startup') return [];

    // Mock applications data
    const mockApplications: Application[] = [
      {
        id: "app1",
        userId: "user1",
        user: {
          id: "user1",
          email: "student1@example.com",
          name: "John Student",
          role: "student",
          skills: ["React", "Node.js"],
          experienceLevel: "intermediate",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        problemId: "1",
        problem: {
          id: "1",
          title: "Develop a Mobile App UI/UX",
          description: "We need a talented UI/UX designer...",
          startupId: user.id,
          requiredSkills: ["UI/UX", "Figma"],
          experienceLevel: "intermediate",
          status: "open",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        coverLetter: "I am very interested in this opportunity...",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "app2",
        userId: "user2",
        user: {
          id: "user2",
          email: "student2@example.com",
          name: "Jane Student",
          role: "student",
          skills: ["UI/UX", "Figma", "Adobe XD"],
          experienceLevel: "advanced",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        problemId: "1",
        problem: {
          id: "1",
          title: "Develop a Mobile App UI/UX",
          description: "We need a talented UI/UX designer...",
          startupId: user.id,
          requiredSkills: ["UI/UX", "Figma"],
          experienceLevel: "intermediate",
          status: "open",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        coverLetter: "I have extensive experience with mobile app design...",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return mockApplications;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
        getApplications,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
