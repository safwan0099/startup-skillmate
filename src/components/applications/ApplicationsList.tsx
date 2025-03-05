
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Application } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ApplicationsList = () => {
  const { getApplications } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [getApplications]);

  const handleAccept = (applicationId: string) => {
    // In a real app, this would send an API request
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: 'accepted' } : app
    ));
    
    toast({
      title: "Application Accepted",
      description: "The applicant has been notified of your decision.",
    });
  };

  const handleReject = (applicationId: string) => {
    // In a real app, this would send an API request
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: 'rejected' } : app
    ));
    
    toast({
      title: "Application Rejected",
      description: "The applicant has been notified of your decision.",
    });
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">You don't have any applications yet.</p>
          <p className="mt-2">When students apply to your problems, they'll appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No applications match the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredApplications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{application.problem?.title}</CardTitle>
                    <CardDescription>
                      Application from {application.user?.name}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={
                      application.status === 'accepted' ? 'default' :
                      application.status === 'rejected' ? 'destructive' :
                      'secondary'
                    }
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Applicant Information</h4>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Name:</span> {application.user?.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Experience:</span> {application.user?.experienceLevel || 'Not specified'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Skills:</span> {application.user?.skills?.join(', ') || 'Not specified'}
                    </p>
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="flex items-start space-x-4">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Cover Letter</h4>
                      <p className="text-sm mt-1">{application.coverLetter}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Applied on {format(new Date(application.createdAt), "MMMM d, yyyy")}
                </div>
              </CardContent>
              
              {application.status === 'pending' && (
                <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                  <Button variant="outline" onClick={() => handleReject(application.id)}>
                    Reject
                  </Button>
                  <Button onClick={() => handleAccept(application.id)}>
                    Accept
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;
