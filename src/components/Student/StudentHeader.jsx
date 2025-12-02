import React from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { Bell, Briefcase, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const pageHeadings = {
  "/student/dashboard": "Dashboard",
  "/student/internships": "Browse Internships",
  "/applications": "My Applications",
  "/student/training": "Training",
  "/interviews": "Interviews",
  "/student/profile": "Profile",
};

const StudentHeader = ({ setOpenSidebar }) => {
  const location = useLocation();
  const heading = pageHeadings[location.pathname] || "";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center w-full justify-between">
          <div className="flex gap-5">
            <Button
              onClick={() => setOpenSidebar(true)}
              className={"lg:hidden"}
            >
              <Menu />
            </Button>
            <div to="/" className=" items-center hidden lg:flex  gap-2">
              <span className="text-xl font-semibold text-foreground">
                {heading}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative cursor-pointer">
                <Bell className="h-6 w-6 text-primary" />

                <span
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center 
               rounded-full bg-red-500 text-[10px] font-semibold text-white"
                >
                  5
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"mr-5"}>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div className="flex cursor-pointer items-start gap-3 py-2 px-1">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      New internship available
                    </p>
                    <p className="text-xs text-muted-foreground">
                      A new role matching your skills was posted.
                    </p>
                  </div>

                  <span className="text-[10px] text-muted-foreground">2m</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div className="flex cursor-pointer items-start gap-3 py-2 px-1">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      New internship available
                    </p>
                    <p className="text-xs text-muted-foreground">
                      A new role matching your skills was posted.
                    </p>
                  </div>

                  <span className="text-[10px] text-muted-foreground">2m</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
