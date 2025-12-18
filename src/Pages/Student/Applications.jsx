import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  FileText,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Download,
  XCircle,
  CheckCircle,
  Send,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";

// Mock data - in real app, you'd fetch from API
const mockApplications = [
  {
    _id: "1",
    internship: {
      _id: "i1",
      title: "Frontend Developer Intern",
      company: {
        name: "Google",
        logo: "https://via.placeholder.com/40",
      },
      location: "Mountain View, CA",
      type: "Remote",
      stipend: "$5000/month",
      duration: "3 months",
    },
    status: "applied",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    _id: "2",
    internship: {
      _id: "i2",
      title: "Backend Developer Intern",
      company: {
        name: "Microsoft",
        logo: "https://via.placeholder.com/40",
      },
      location: "Redmond, WA",
      type: "Hybrid",
      stipend: "$4500/month",
      duration: "6 months",
    },
    status: "selected",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    submittedAt: new Date("2024-01-10T14:20:00Z"),
    updatedAt: new Date("2024-01-12T11:15:00Z"),
  },
  {
    _id: "3",
    internship: {
      _id: "i3",
      title: "Data Science Intern",
      company: {
        name: "Meta",
        logo: "https://via.placeholder.com/40",
      },
      location: "Remote",
      type: "Remote",
      stipend: "$5500/month",
      duration: "4 months",
    },
    status: "rejected",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    submittedAt: new Date("2024-01-05T09:45:00Z"),
    updatedAt: new Date("2024-01-08T16:30:00Z"),
  },
  {
    _id: "4",
    internship: {
      _id: "i4",
      title: "Product Manager Intern",
      company: {
        name: "Amazon",
        logo: "https://via.placeholder.com/40",
      },
      location: "Seattle, WA",
      type: "On-site",
      stipend: "$6000/month",
      duration: "5 months",
    },
    status: "applied",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    submittedAt: new Date("2024-01-20T13:10:00Z"),
    updatedAt: new Date("2024-01-20T13:10:00Z"),
  },
  {
    _id: "5",
    internship: {
      _id: "i5",
      title: "UX Design Intern",
      company: {
        name: "Apple",
        logo: "https://via.placeholder.com/40",
      },
      location: "Cupertino, CA",
      type: "Hybrid",
      stipend: "$5200/month",
      duration: "3 months",
    },
    status: "selected",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    submittedAt: new Date("2023-12-20T11:00:00Z"),
    updatedAt: new Date("2024-01-05T09:30:00Z"),
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [activeTab, setActiveTab] = useState("all");
  const { student } = useSelector((state) => state.student);

  const getFilteredApplications = () => {
    if (activeTab === "all") return applications;
    return applications.filter((app) => app.status === activeTab);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      applied: {
        variant: "default",
        icon: <Send className="h-3 w-3" />,
        label: "Applied",
      },
      selected: {
        variant: "success",
        icon: <CheckCircle className="h-3 w-3" />,
        label: "Selected",
      },
      rejected: {
        variant: "destructive",
        icon: <XCircle className="h-3 w-3" />,
        label: "Rejected",
      },
    };

    const config = statusConfig[status] || statusConfig.applied;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getStatusCounts = () => {
    const counts = {
      all: applications.length,
      applied: applications.filter((app) => app.status === "applied").length,
      selected: applications.filter((app) => app.status === "selected").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredApplications = getFilteredApplications();

  const handleWithdrawApplication = (applicationId) => {
    // In real app, call API to withdraw application
    console.log("Withdraw application:", applicationId);
    setApplications(applications.filter((app) => app._id !== applicationId));
  };

  const handleDownloadResume = (resumeUrl) => {
    // In real app, implement resume download
    console.log("Download resume:", resumeUrl);
    // window.open(resumeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            My Applications
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all your internship applications in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Applications
                  </p>
                  <p className="text-2xl font-bold">{statusCounts.all}</p>
                </div>
                <FileText className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold">{statusCounts.applied}</p>
                </div>
                <Send className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-2xl font-bold">{statusCounts.selected}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Not Selected</p>
                  <p className="text-2xl font-bold">{statusCounts.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all" className="flex gap-2">
                All{" "}
                <Badge variant="outline" className="ml-1">
                  {statusCounts.all}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="applied" className="flex gap-2">
                Pending{" "}
                <Badge variant="outline" className="ml-1">
                  {statusCounts.applied}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="selected" className="flex gap-2">
                Selected{" "}
                <Badge variant="outline" className="ml-1">
                  {statusCounts.selected}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex gap-2">
                Not Selected{" "}
                <Badge variant="outline" className="ml-1">
                  {statusCounts.rejected}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredApplications.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
                      onWithdraw={handleWithdrawApplication}
                      onDownloadResume={handleDownloadResume}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Application Status Guide */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Application Status Guide</CardTitle>
              <CardDescription>
                Understand what each status means
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Send className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Applied</h4>
                    <p className="text-sm text-muted-foreground">
                      Your application has been submitted and is under review
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Selected</h4>
                    <p className="text-sm text-muted-foreground">
                      Congratulations! You've been selected for this position
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Not Selected
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      This application wasn't successful. Keep applying!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ApplicationCard = ({
  application,
  onWithdraw,
  onDownloadResume,
  getStatusBadge,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Company and Position Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {application.internship.title}
                  </h3>
                  {getStatusBadge(application.status)}
                </div>
                <p className="text-muted-foreground font-medium">
                  {application.internship.company.name}
                </p>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {application.internship.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {application.internship.type}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {application.internship.stipend}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {application.internship.duration}
                  </div>
                </div>

                {/* Additional Info */}
                {expanded && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Application Timeline
                      </p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          Applied:{" "}
                          {formatDistanceToNow(
                            new Date(application.submittedAt),
                            { addSuffix: true }
                          )}
                        </p>
                        <p>
                          Last updated:{" "}
                          {formatDistanceToNow(
                            new Date(application.updatedAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Submitted Resume
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownloadResume(application.resumeUrl)}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[150px]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {expanded ? "Show Less" : "View Details"}
            </Button>

            {application.status === "applied" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onWithdraw(application._id)}
                className="gap-2"
              >
                <XCircle className="h-4 w-4" />
                Withdraw
              </Button>
            )}

            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <a href={`/student/internships/${application.internship._id}`}>
                View Internship
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ tab }) => {
  const messages = {
    all: {
      title: "No applications yet",
      description:
        "You haven't applied to any internships yet. Start your journey by exploring available opportunities.",
      icon: <Briefcase className="h-12 w-12 text-muted-foreground" />,
    },
    applied: {
      title: "No pending applications",
      description:
        "You don't have any applications under review. Check back later or apply to more internships.",
      icon: <Send className="h-12 w-12 text-muted-foreground" />,
    },
    selected: {
      title: "No selected applications",
      description:
        "You haven't been selected for any internships yet. Keep applying and improving your skills!",
      icon: <CheckCircle className="h-12 w-12 text-muted-foreground" />,
    },
    rejected: {
      title: "No rejected applications",
      description: "Great news! You don't have any rejected applications.",
      icon: <XCircle className="h-12 w-12 text-muted-foreground" />,
    },
  };

  const { title, description, icon } = messages[tab] || messages.all;

  return (
    <Card>
      <CardContent className="pt-12 pb-12 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
        {tab === "all" && (
          <Button asChild>
            <a href="/student/internships">
              Browse Internships
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Applications;
