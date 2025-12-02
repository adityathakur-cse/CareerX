import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RegisterUser } from "@/Store/Auth-Slice/authSlice";
import {
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  role: "STUDENT",
  fullName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ...initialState,
    role: searchParams.get("role")?.toUpperCase() || "STUDENT",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(RegisterUser(formData)).then((response) => {
      if (response?.payload?.success) {
        navigate("/auth/login");
        toast.success(response?.payload?.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div className="mb-6">
        <Label className="mb-3 block">I am a</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "STUDENT" })}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all",
              formData.role === "STUDENT"
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-muted-foreground/50"
            )}
          >
            <GraduationCap className="h-5 w-5" />
            <span className="font-medium">Student</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "COMPANY" })}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all",
              formData.role === "COMPANY"
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-muted-foreground/50"
            )}
          >
            <Building2 className="h-5 w-5" />
            <span className="font-medium">Company</span>
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">
          {formData.role === "STUDENT" ? "Full Name" : "Company Name"}
        </Label>
        <div className="relative">
          {formData.role === "STUDENT" ? (
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          ) : (
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            id="name"
            type="text"
            placeholder={formData.role === "STUDENT" ? "John Doe" : "Acme Inc."}
            className="pl-10"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
};

export default Register;
