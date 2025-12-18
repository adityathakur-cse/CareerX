import { useEffect, useState } from "react";
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
import { InternshipDetailSheet } from "@/components/InternshipDetailSheet";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  fetchInternships,
  selectFilteredInternships,
  setLocationQuery,
  setSearchQuery,
  setSortBy,
  toggleDuration,
  toggleInternshipType,
  toggleStipendRange,
} from "@/Store/Internship-Slice/internshipSlice";

export default function StudentInternships() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const {
    filters: {
      searchQuery,
      locationQuery,
      sortBy,
      internshipTypes,
      durations,
      stipendRanges,
    },
  } = useSelector((state) => state.internship);

  const [sheetOpen, setSheetOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInternships()).then((response) => {
      if (response?.payload.success) {
        setIsLoading(false);
      }
    });
  }, []);

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

  const filteredInternships = useSelector(selectFilteredInternships);

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
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1 sm:max-w-xs">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Remote, Bangalore..."
                value={locationQuery}
                onChange={(e) => dispatch(setLocationQuery(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Internship Type Filter */}

            <Select
              value={internshipTypes}
              onValueChange={(value) => dispatch(toggleInternshipType(value))}
            >
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            {/* Duration Filter */}

            <Select
              value={durations}
              onValueChange={(value) => dispatch(toggleDuration(value))}
            >
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="2 month">2 Month</SelectItem>
                <SelectItem value="3 months+">3 Month+</SelectItem>
              </SelectContent>
            </Select>

            {/* Stipend Filter  */}
            <Select
              value={stipendRanges}
              onValueChange={(value) => dispatch(toggleStipendRange(value))}
            >
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Stipend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="1k-5k">1k-5k</SelectItem>
                <SelectItem value="5k-10k">5k-10k</SelectItem>
                <SelectItem value="10k+">10k+</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1" />

            {/* Sort */}
            <Select
              value={sortBy}
              onValueChange={(value) => dispatch(setSortBy(value))}
            >
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
                onClick={() => dispatch(clearFilters())}
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
            <div className="flex flex-wrap gap-2 mb-4"></div>
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
        No opportunities found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        We couldn't find any opportunities matching your filters. Try adjusting
        your search criteria.
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}
