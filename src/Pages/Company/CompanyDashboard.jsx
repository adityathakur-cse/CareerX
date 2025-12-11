import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Eye,
  Clock,
  ChevronUp,
  IndianRupee,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchInterns } from "@/Store/Company-Slice/companySlice";

const stats = [
  {
    title: "Active Internships",
    value: 5,
    icon: Briefcase,
    trend: "+2 this month",
    trendUp: true,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Total Applicants",
    value: 128,
    icon: Users,
    trend: "+24 this week",
    trendUp: true,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Interviews Scheduled",
    value: 8,
    icon: Calendar,
    trend: "3 this week",
    trendUp: true,
    bgColor: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Positions Filled",
    value: 12,
    icon: TrendingUp,
    trend: "+4 this month",
    trendUp: true,
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
];

const recentApplicants = [
  {
    id: "1",
    name: "John Doe",
    role: "Frontend Developer Intern",
    applied: "2 hours ago",
    status: "New",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Backend Developer Intern",
    applied: "5 hours ago",
    status: "Reviewed",
  },
  {
    id: "3",
    name: "Mike Wilson",
    role: "Frontend Developer Intern",
    applied: "1 day ago",
    status: "Shortlisted",
  },
  {
    id: "4",
    name: "Emily Chen",
    role: "Data Science Intern",
    applied: "2 days ago",
    status: "New",
  },
];

export default function CompanyDashboard() {
  const { Internships } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInterns()).then((response) => {
      console.log(response);
    });
  }, []);

  function dateF(date) {
    const d = new Date(date);
    return d.toLocaleString("en-IN");
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your internships.
          </p>
        </div>
        <Button asChild>
          <Link to="/company/post">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post Internship
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.trendUp && (
                      <ChevronUp className="h-3 w-3 text-emerald-500" />
                    )}
                    <span className="text-emerald-500">{stat.trend}</span>
                  </div>
                </div>
                <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Internships */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">
              Your Internships
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/company/internships"
                className="text-muted-foreground hover:text-foreground"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Position</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Applicants
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Stipend
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Internships.map((internship) => (
                  <TableRow key={internship.id} className="hover:bg-muted/50">
                    <TableCell className="pl-6">
                      <Link
                        to={`/company/internship/${internship._id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {internship.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Posted {dateF(internship.createdAt)}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {internship.applications}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <IndianRupee className="h-4 w-4" />
                        {internship.stipend}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={internship.isActive ? "default" : "secondary"}
                        className={
                          internship.isActive
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0"
                            : "bg-muted text-muted-foreground hover:bg-muted border-0"
                        }
                      >
                        {internship.isActive ? "Active" : "Closed"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {Internships.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No internships posted yet.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => (window.location.href = "/company/post")}
                >
                  Post Your First Internship
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applicants */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">
              Recent Applicants
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/company/applicants"
                className="text-muted-foreground hover:text-foreground"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium text-primary">
                        {applicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-foreground truncate">
                          {applicant.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={
                            applicant.status === "New"
                              ? "bg-blue-500/10 text-blue-600 border-blue-200 text-xs"
                              : applicant.status === "Shortlisted"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs"
                              : "bg-muted text-muted-foreground border-border text-xs"
                          }
                        >
                          {applicant.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {applicant.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground ml-13">
                    <Clock className="h-3 w-3" />
                    Applied {applicant.applied}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
