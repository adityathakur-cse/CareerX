import React, { useState } from "react";
import { DashboardSidebar } from "../common/DashboardSidebar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Logout } from "@/Store/Auth-Slice/authSlice";
import CompanyHeader from "./CompanyHeader";

const companyLinks = [
  { to: "/company/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/company/post", icon: PlusCircle, label: "Post Internship" },
  { to: "/company/internships", icon: Briefcase, label: "My Internships" },
  { to: "/company/applicants", icon: Users, label: "Applicants" },
  { to: "/company/profile", icon: Building2, label: "Company Profile" },
];

const CompanyLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout(e) {
    e.preventDefault();
    dispatch(Logout()).then((response) => {
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
      <DashboardSidebar userRole={"COMPANY"} />
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

          {companyLinks.map((link) => {
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
        <CompanyHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <main className="flex-1 flex flex-col overflow-scroll bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
