import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { companyPostInternship } from "@/Store/Company-Slice/companySlice";
import {
  Briefcase,
  Calendar,
  DollarSign,
  IndianRupee,
  MapPin,
  Save,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  title: "",
  description: "",
  skills: [],
  stipend: "",
  duration: "",
  internshipType: "",
  startDate: "",
  openings: "",
  location: "",
};

const PostIntern = () => {
  const [formData, setFormData] = useState(initialState);
  const { isLoading } = useSelector((state) => state.company);
  const [skillInput, setSkillInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(companyPostInternship(formData)).then((response) => {
      if (response?.payload?.success) {
        navigate("/company/dashboard");
        toast.success(response?.payload?.message);
      } else {
        toast.error("Couldn't Post Internship. Please try again");
      }
    });
  }
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="bg-background">
      <main className="page-container py-8">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Logo & Company Details */}
            <div className="lg:w-2/3 space-y-6">
              {/* Logo Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex gap-2">
                    {" "}
                    <Briefcase className="h-7 w-7 text-primary" />
                    Internship Details
                  </CardTitle>
                  <CardDescription>
                    Basic information about the internship position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="space-y-5">
                        <div className="gap-3 flex flex-col">
                          <Label className={"text-black font-[100px]"}>
                            Internship Title*
                          </Label>
                          <Input
                            name="title"
                            id="title"
                            onChange={handleInputChange}
                            placeholder="e.g. Frontend Developer Intern"
                          />
                        </div>
                        <div className="gap-3 flex flex-col">
                          <Label className={"text-black font-[100px]"}>
                            Description*
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                            placeholder="Describe the internship role, responsibilites, and what the intern will learn..."
                          />
                        </div>
                        {/* Skills */}
                        <div className="space-y-2">
                          <Label>Required Skills *</Label>
                          <div className="flex gap-2 w-[300px]">
                            <Input
                              placeholder="Add a skill and press Enter"
                              value={skillInput}
                              onChange={(e) => setSkillInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleAddSkill}
                            >
                              Add
                            </Button>
                          </div>
                          {formData.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {formData.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="hover:bg-primary/20 rounded-full p-0.5"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex gap-3 items-center">
                    <Calendar className="w-5 h-5 text-primary" />
                    Duration & Schedule
                  </CardTitle>
                  <CardDescription>
                    Timing and work arrangement details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Duration */}
                  <div className="grid grid-cols-3 mb-5">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="duration">Duration *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, duration: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Month</SelectItem>
                          <SelectItem value="2">2 Months</SelectItem>
                          <SelectItem value="3">3 Months</SelectItem>
                          <SelectItem value="4">4 Months</SelectItem>
                          <SelectItem value="5">5 Months</SelectItem>
                          <SelectItem value="6">6 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Start Date  */}
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        name="startDate"
                        className={"w-[150px]"}
                        id="startDate"
                        type={"date"}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label htmlFor="internshipType">Work Type *</Label>
                      <Select
                        className="w-[150px]"
                        value={formData.internshipType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, internshipType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className={"w-[150px]"} value="remote">
                            Remote
                          </SelectItem>
                          <SelectItem className={"w-[150px]"} value="onsite">
                            On-site
                          </SelectItem>
                          <SelectItem className={"w-[150px]"} value="hybrid">
                            Hybrid
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Location (for on-site/hybrid) */}
                  {(formData.internshipType === "onsite" ||
                    formData.internshipType === "hybrid") && (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="location">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Office Location *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g. Mumbai, India"
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - HR Contact Information */}
            <div className="lg:w-1/3 min-h-full ">
              <Card className="top-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    Compensation and Openings
                  </CardTitle>
                  <CardDescription>
                    Stipend and number of positions available
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stipen  d">Monthly Stipend (₹) *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="stipend"
                          name="stipend"
                          type="number"
                          placeholder="e.g. 15000"
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="openings">Number of Openings *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="openings"
                          name="openings"
                          type="number"
                          placeholder="e.g. 5"
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-8 border-t mt-8">
            <Link to="/company/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostIntern;
