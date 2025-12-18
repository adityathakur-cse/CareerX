import { useState } from "react";
import {
  Building2,
  Calendar,
  Clock,
  IndianRupee,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { toast } from "sonner";
import { ApplicationForm } from "../ApplicationForm";

export default function InternshipListCard({
  internship,
  formatStipend,
  formatStartDate,
  getPostedText,
  onViewDetails,
}) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [hasApplied, setHasApplied] = useState(internship.applied || false);

  const handleApplyClick = (e) => {
    e.stopPropagation(); // Prevent opening details when clicking Apply

    if (hasApplied) {
      toast.info("You have already applied for this internship");
      return;
    }

    if (!internship.isActive) {
      toast.error("This internship is no longer accepting applications");
      return;
    }

    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (applicationData) => {
    // Here you would call your API to submit the application
    console.log("Submitting application:", applicationData);

    // Mock API call
    setTimeout(() => {
      setHasApplied(true);
      setShowApplicationForm(false);
      toast.success("Application submitted successfully!");

      // Update the internship object
      if (internship) {
        internship.applied = true;
        internship.applications += 1;
      }
    }, 1000);
  };

  return (
    <>
      <div className="group rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/20">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {internship.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {internship.openings} opening
                    {internship.openings > 1 ? "s" : ""}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {internship.applications} applications
                  </span>
                  {hasApplied && (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Applied
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    internship.internshipType === "Remote"
                      ? "default"
                      : "secondary"
                  }
                >
                  {internship.internshipType}
                </Badge>
                {!internship.isActive && (
                  <Badge variant="destructive">Closed</Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
              {internship.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {internship.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4" />
                {formatStipend(internship.stipend)}/month
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {internship.duration} Months
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatStartDate(internship.startDate)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {internship.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
              {internship.skills.length > 4 && (
                <span className="px-2.5 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                  +{internship.skills.length - 4} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Posted {getPostedText(internship.createdAt)}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onViewDetails}>
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={handleApplyClick}
                  disabled={hasApplied || !internship.isActive}
                >
                  {hasApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <ApplicationForm
        internship={internship}
        open={showApplicationForm}
        onOpenChange={setShowApplicationForm}
        onSubmit={handleApplicationSubmit}
      />
    </>
  );
}
