import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  User,
  Mail,
  Save,
  Plus,
  FileIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { companyProfileUpdate } from "@/Store/Company-Slice/companySlice";

const CompanyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    description: user.description || "",
    location: user.location || "",
    hrName: user.hrName || "",
    hrEmail: user.hrEmail || "",
    logoUrl: user.logoUrl || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleRemoveImage = async () => {
    inputRef.current.value = null;
    setFile(null);
    toast.success("Image Removed Successfully");
    setFormData((prevData) => ({ ...prevData, logoUrl: "" }));
  };

  const handleUploadImage = async () => {
    setImageLoading(true);
    const data = new FormData();
    data.append("my_file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/company/imageupload",
        data
      );
      if (response || response?.data?.success) {
        setFormData((prevData) => ({
          ...prevData,
          logoUrl: response.data.result.secure_url,
        }));
      }
    } catch (error) {
      toast.error("Image not uploaded");
      setFile(null);
      inputRef.current.value = null;
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(companyProfileUpdate(formData)).then((response) => {
        console.log(response);
        if (response?.payload?.success) {
          toast.success(response?.payload?.message);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
                  <CardTitle className="text-lg">Company Logo</CardTitle>
                  <CardDescription>Upload your company logo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <input
                          ref={inputRef}
                          onChange={handleImageChange}
                          type="file"
                          className="hidden"
                          id="image-upload"
                        />

                        <label
                          htmlFor="image-upload"
                          className="h-32 w-32 cursor-pointer rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border overflow-hidden"
                        >
                          {formData.logoUrl ? (
                            <img
                              src={formData.logoUrl}
                              alt="Company logo"
                              className="h-full w-full object-cover"
                            />
                          ) : !file ? (
                            <Plus className="h-12 w-12 text-muted-foreground" />
                          ) : (
                            <label className="h-32 w-32 cursor-pointer rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border overflow-hidden">
                              <div className="flex items-center">
                                <FileIcon className="w-8 h-8 text-primary mr-2" />
                              </div>
                              <p className="text-sm font-medium ">
                                {file.name}
                              </p>
                            </label>
                          )}
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Recommended: 500×500px
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={handleUploadImage}
                          type="button"
                          variant="outline"
                          size="sm"
                        >
                          Upload File
                        </Button>
                        <Button
                          onClick={handleRemoveImage}
                          type="button"
                          variant="outline"
                          size="sm"
                        >
                          Remove Logo
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="logoUrl">Logo URL</Label>
                          <Input
                            disabled={true}
                            id="logoUrl"
                            name="logoUrl"
                            type="url"
                            placeholder="https://example.com/logo.png"
                            value={formData.logoUrl}
                            onChange={handleInputChange}
                            className="mt-1.5"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter a URL to your company logo image or upload
                            directly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                  <CardDescription>
                    Basic details about your company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Company Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Enter company name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Company Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="company@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-muted"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your company..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Brief description of your company (max 500 characters)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - HR Contact Information */}
            <div className="lg:w-1/3 min-h-full ">
              <Card className="top-8">
                <CardHeader>
                  <CardTitle className="text-lg">
                    HR Contact Information
                  </CardTitle>
                  <CardDescription>
                    Contact person for internship inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hrName">HR Contact Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hrName"
                          name="hrName"
                          placeholder="Full name"
                          value={formData.hrName}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hrEmail">HR Contact Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hrEmail"
                          name="hrEmail"
                          type="email"
                          placeholder="hr@company.com"
                          value={formData.hrEmail}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium text-sm mb-2">
                      Contact Information Tips
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Ensure email is regularly monitored</li>
                      <li>• Provide a professional contact name</li>
                      <li>• This information will be visible to applicants</li>
                      <li>• Updates take effect immediately</li>
                    </ul>
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

export default CompanyProfile;
