import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  GraduationCap,
  Calendar,
  User,
  Building2,
  Users,
  PlusCircle,
  LogOut,
} from "lucide-react";

const studentLinks = [
  { to: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/student/internships", icon: Briefcase, label: "Browse Internships" },
  { to: "/applications", icon: FileText, label: "My Applications" },
  { to: "/student/training", icon: GraduationCap, label: "Training" },
  { to: "/interviews", icon: Calendar, label: "Interviews" },
  { to: "/student/profile", icon: User, label: "Profile" },
];

const companyLinks = [
  { to: "/company/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/company/post", icon: PlusCircle, label: "Post Internship" },
  { to: "/company/internships", icon: Briefcase, label: "My Internships" },
  { to: "/company/applicants", icon: Users, label: "Applicants" },
  { to: "/company/profile", icon: Building2, label: "Company Profile" },
];

export function DashboardSidebar({ userRole }) {
  const location = useLocation();
  const links = userRole === "STUDENT" ? studentLinks : companyLinks;

  return (
    <aside className="h-screen left-0 top-16 w-64 border-r border-border bg-card hidden lg:block">
      <div className="flex flex-col gap-10 h-full py-6">
        <Link to="/" className=" items-center pl-5 hidden lg:flex  gap-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold text-foreground">
            CareerX
          </span>
        </Link>
        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pt-4 border-t border-border">
          <button className="flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
