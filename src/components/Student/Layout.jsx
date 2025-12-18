import React, { useState } from "react";
import { DashboardSidebar } from "../common/DashboardSidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import StudentHeader from "./StudentHeader";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Briefcase,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Logout } from "@/Store/Auth-Slice/authSlice";

const studentLinks = [
  { to: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/student/internships", icon: Briefcase, label: "Browse Opportunities" },
  { to: "/applications", icon: FileText, label: "My Applications" },
  { to: "/student/training", icon: GraduationCap, label: "Training" },
  { to: "/interviews", icon: Calendar, label: "Interviews" },
  { to: "/student/profile", icon: User, label: "Profile" },
];

export const StudentLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    dispatch(Logout()).then((response) => {
      console.log(response);
      if (response?.payload?.success) {
        toast.success(response?.payload?.message);
      } else {
        toast.warning(response?.payload?.message || "Some error occurred");
      }
    });
  }

  return (
    <div className="flex max-h-screen w-full">
      {/* Student Sidebar */}
      <DashboardSidebar userRole={"STUDENT"} />
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetContent className={"w-72"} side="left">
          <SheetHeader>
            <SheetTitle>
              <Link to="/" className="items-center cursor-pointer flex gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  CareerX
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          {studentLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <div
                key={link.to}
                onClick={() => {
                  navigate(link.to);
                  setOpenSidebar(false);
                }}
                className={cn(
                  "flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </div>
            );
          })}
          <SheetFooter>
            <div className="px-4 pt-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <StudentHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <main className="flex-1 overflow-scroll flex flex-col bg-muted/40 px-4 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
