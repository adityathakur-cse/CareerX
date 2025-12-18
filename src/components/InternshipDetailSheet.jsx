import { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  Building2,
  ExternalLink,
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ApplicationForm } from "./ApplicationForm";
import { toast } from "sonner";

export function InternshipDetailSheet({ internship, open, onOpenChange }) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (!internship) return null;

  const formatStipend = (amount) => {
    return amount.toLocaleString("en-IN");
  };

  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getPostedText = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleApplyClick = () => {
    // Check if internship is active
    if (!internship.isActive) {
      toast.error("This internship is no longer accepting applications");
      return;
    }

    // Open application form
    setShowApplicationForm(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full px-5 py-3 sm:max-w-lg overflow-y-auto">
          <SheetHeader className="text-left">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Building2 className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <SheetTitle className="text-xl leading-tight">
                    {internship.title}
                  </SheetTitle>
                </div>
                <div className="flex items-center gap-2 mt-2">
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
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              {internship.location && (
                <InfoItem
                  Icon={MapPin}
                  label="Location"
                  value={internship.location}
                />
              )}
              <InfoItem
                Icon={IndianRupee}
                label="Stipend"
                value={`₹${formatStipend(internship.stipend)}/month`}
              />
              <InfoItem
                Icon={Clock}
                label="Duration"
                value={internship.duration}
              />
              <InfoItem
                Icon={Calendar}
                label="Start Date"
                value={formatStartDate(internship.startDate)}
              />
              <InfoItem
                Icon={Users}
                label="Openings"
                value={`${internship.openings} position${
                  internship.openings > 1 ? "s" : ""
                }`}
              />
              <InfoItem
                Icon={Briefcase}
                label="Applications"
                value={`${internship.applications} applied`}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Posted {getPostedText(internship.createdAt)}
              </span>
            </div>

            <Separator />

            {/* Description */}
            <section>
              <h4 className="font-semibold text-foreground mb-3">
                About the Internship
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {internship.description}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h4 className="font-semibold text-foreground mb-3">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1" size="lg" onClick={handleApplyClick}>
                Apply now
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Application Form */}
      <ApplicationForm
        internship={internship}
        open={showApplicationForm}
        onOpenChange={setShowApplicationForm}
      />
    </>
  );
}

function InfoItem({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
