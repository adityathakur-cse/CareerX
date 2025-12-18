// components/ApplicationForm.jsx
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileText,
  X,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";

export function ApplicationForm({ internship, open, onOpenChange }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    internship: "",
    company: "",
    student: "",
    coverLetter: "",
    resume: "",
  });

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);

  console.log(profile);

  const profileResumeUrl = profile?.resumeUrl || "";
  const hasProfileResume = !!profileResumeUrl;

  const formatStipend = (amount) => {
    return amount?.toLocaleString("en-IN") || "0";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");

    if (!profileResumeUrl) {
      toast.error("Please upload your resume");
      return;
    } else {
      setFormData((prev) => ({ ...prev, resume: profile.resumeUrl }));
    }

    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("internship", internship._id);
      formData.append("company", internship.companyId);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", profileResumeUrl);

      // Add student info if available
      if (profile?._id) {
        formData.append("student", profile._id);
      }

      console.log(formData);

      setIsSubmitting(false);

      // Reset form
      setCoverLetter("");
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Failed to submit application");
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-5 overflow-scroll">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Apply for Internship</SheetTitle>
            <SheetDescription>
              Complete your application for this position
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Internship Details Card */}
            <div className="bg-muted/30 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {internship.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {internship.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{internship.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IndianRupee className="h-3 w-3" />
                      <span>₹{formatStipend(internship.stipend)}/month</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{internship.duration}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {internship.openings} opening
                      {internship.openings > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Applicant Info (if student data available) */}
            {profile && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Your Information
                </h4>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">
                      {profile.fullName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">
                      {profile.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Selection */}
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Resume *</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose which resume to use for this application
                </p>
              </div>

              <RadioGroup value={"profile"} className="space-y-3">
                {/* Option 1: Use Profile Resume */}
                <div
                  className={`flex items-center gap-3 p-3 border rounded-lg border-primary bg-primary/5
                  `}
                >
                  <RadioGroupItem
                    value="profile"
                    id="profile-resume"
                    disabled={!hasProfileResume}
                  />
                  <div className="flex-1">
                    <Label htmlFor="profile-resume" className="cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">
                            Use Profile Resume
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {hasProfileResume
                              ? "Use the resume uploaded in your profile"
                              : "No resume found in your profile"}
                          </p>
                        </div>
                        {hasProfileResume && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        )}
                      </div>
                    </Label>

                    <div className="mt-2 p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">
                          Resume from profile
                        </span>
                      </div>
                      <a
                        href={profileResumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 block truncate"
                      >
                        Open Resume
                      </a>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {!hasProfileResume && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    You haven't uploaded a resume to your profile yet. You can
                    upload one in your profile settings or use the option above.
                  </p>
                </div>
              )}
            </div>
            {/* Cover Letter */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="coverLetter" className="text-foreground">
                  Cover Letter *
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Why are you interested in this position? (Minimum 50
                  characters)
                </p>
              </div>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="I'm excited to apply for this position because..."
                rows={5}
                minLength={50}
                required
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.coverLetter.length}/50 characters minimum
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                By submitting this application, you agree to share your
                information with the company for evaluation purposes. You may be
                contacted for further interview rounds.
              </p>
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex w-full gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  setCoverLetter("");
                }}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || coverLetter.length < 50}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
