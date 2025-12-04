import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LoginUser } from "@/Store/Auth-Slice/authSlice";
import {
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  role: "STUDENT",
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(LoginUser(formData)).then((response) => {
      console.log(response);
      if (response?.payload?.success) {
        toast.success("Logged In");
      } else {
        toast.warning(
          response?.payload?.message ||
            "Some error occurred. Please try again after some time"
        );
      }
    });
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            to="/forgot-password"
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
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
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};
