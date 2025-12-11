import { useState, useMemo } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InternshipCardSkeleton } from "@/components/ui/SkeletonCard";
import { ChevronDown } from "lucide-react";
import InternshipListCard from "@/components/ui/InternshipListCard";
import { internships } from "@/lib/mock";
import { InternshipDetailSheet } from "@/components/InternshipDetailSheet";



export default function StudentInternships() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const [sortBy, setSortBy] = useState("latest");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Filter states
  const [internshipTypes, setInternshipTypes] = useState([]);
  const [durations, setDurations] = useState([]);
  const [stipendRanges, setStipendRanges] = useState([]);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  const toggleInternshipType = (type) => {
    setInternshipTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleDuration = (duration) => {
    setDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const toggleStipendRange = (range) => {
    setStipendRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setInternshipTypes([]);
    setDurations([]);
    setStipendRanges([]);
    setSortBy("latest");
  };

  const activeFilterCount =
    internshipTypes.length + durations.length + stipendRanges.length;

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

  const formatStipend = (amount) => {
    return amount.toLocaleString("en-IN");
  };

  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date <= now) return "Immediately";
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredInternships = useMemo(() => {
    let result = [...internships];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.skills.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (locationQuery) {
      const query = locationQuery.toLowerCase();
      result = result.filter(
        (i) =>
          (i.location && i.location.toLowerCase().includes(query)) ||
          i.internshipType.toLowerCase().includes(query)
      );
    }

    // Internship type filter
    if (internshipTypes.length > 0) {
      result = result.filter((i) => internshipTypes.includes(i.internshipType));
    }

    // Duration filter
    if (durations.length > 0) {
      result = result.filter((i) => {
        const months = parseInt(i.duration);
        if (durations.includes("1 month") && months === 1) return true;
        if (durations.includes("2 months") && months === 2) return true;
        if (durations.includes("3 months+") && months >= 3) return true;
        return false;
      });
    }

    // Stipend filter
    if (stipendRanges.length > 0) {
      result = result.filter((i) => {
        const stipend = i.stipend;
        if (stipendRanges.includes("Unpaid") && stipend === 0) return true;
        if (
          stipendRanges.includes("1k-5k") &&
          stipend >= 1000 &&
          stipend <= 5000
        )
          return true;
        if (
          stipendRanges.includes("5k-10k") &&
          stipend > 5000 &&
          stipend <= 10000
        )
          return true;
        if (stipendRanges.includes("10k+") && stipend > 10000) return true;
        return false;
      });
    }

    // Sort
    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "stipend-high") {
      result.sort((a, b) => b.stipend - a.stipend);
    } else if (sortBy === "stipend-low") {
      result.sort((a, b) => a.stipend - b.stipend);
    }

    return result;
  }, [
    searchQuery,
    locationQuery,
    internshipTypes,
    durations,
    stipendRanges,
    sortBy,
  ]);

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setSheetOpen(true);
  };

  return (
    <div className="bg-background">
      {/* Sticky Search Bar with Filters */}
      <div className="sticky top-0 bg-background border-b border-border">
        <div className="container px-4 py-4 space-y-3">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search internships, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1 sm:max-w-xs">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Remote, Bangalore..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Internship Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Type
                  {internshipTypes.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1.5 px-1.5 py-0 text-xs"
                    >
                      {internshipTypes.length}
                    </Badge>
                  )}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {["Remote", "On-site", "Hybrid"].map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={internshipTypes.includes(type)}
                    onCheckedChange={() => toggleInternshipType(type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Duration Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Duration
                  {durations.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1.5 px-1.5 py-0 text-xs"
                    >
                      {durations.length}
                    </Badge>
                  )}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {["1 month", "2 months", "3 months+"].map((duration) => (
                  <DropdownMenuCheckboxItem
                    key={duration}
                    checked={durations.includes(duration)}
                    onCheckedChange={() => toggleDuration(duration)}
                  >
                    {duration}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Stipend Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Stipend
                  {stipendRanges.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1.5 px-1.5 py-0 text-xs"
                    >
                      {stipendRanges.length}
                    </Badge>
                  )}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {["Unpaid", "1k-5k", "5k-10k", "10k+"].map((range) => (
                  <DropdownMenuCheckboxItem
                    key={range}
                    checked={stipendRanges.includes(range)}
                    onCheckedChange={() => toggleStipendRange(range)}
                  >
                    {range === "Unpaid" ? "Unpaid" : `₹${range}`}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1" />

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="stipend-high">
                  Stipend: High → Low
                </SelectItem>
                <SelectItem value="stipend-low">Stipend: Low → High</SelectItem>
              </SelectContent>
            </Select>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {internshipTypes.map((type) => (
                <Badge key={type} variant="secondary" className="gap-1">
                  {type}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleInternshipType(type)}
                  />
                </Badge>
              ))}
              {durations.map((duration) => (
                <Badge key={duration} variant="secondary" className="gap-1">
                  {duration}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleDuration(duration)}
                  />
                </Badge>
              ))}
              {stipendRanges.map((range) => (
                <Badge key={range} variant="secondary" className="gap-1">
                  ₹{range}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleStipendRange(range)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-4">
            {isLoading
              ? "Loading..."
              : `${filteredInternships.length} internships found`}
          </p>

          {/* Internship Cards */}
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <InternshipCardSkeleton key={i} />
              ))
            ) : filteredInternships.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              filteredInternships.map((internship) => (
                <InternshipListCard
                  key={internship.id}
                  internship={internship}
                  formatStipend={formatStipend}
                  formatStartDate={formatStartDate}
                  getPostedText={getPostedText}
                  onViewDetails={() => handleViewDetails(internship)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Detail Sheet */}
      <InternshipDetailSheet
        internship={selectedInternship}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">
        No internships found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        We couldn't find any internships matching your filters. Try adjusting
        your search criteria.
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}
