import { Briefcase } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isLoginPage ? "Welcome Back" : "Welcome to CareerX"}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {isLoginPage
                ? "Sign in to your account to continue"
                : "Create an Account"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <Outlet />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isLoginPage
              ? "Don't have an account?"
              : "Already Have an account?"}{" "}
            <Link
              to={isLoginPage ? "/auth/register" : "/auth/login"}
              className="text-primary hover:underline font-medium"
            >
              {isLoginPage ? "Signup" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
