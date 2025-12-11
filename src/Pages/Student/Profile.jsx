import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  FileText,
  Camera,
  Plus,
  X,
  Globe,
  Save,
  Pencil,
  Upload,
  Trash2,
  File,
} from "lucide-react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { profileUpdate } from "@/Store/Student-Slice/studentSlice";
import PLoader from "@/components/ui/PLoader";

// Mock user data based on schema
// const mockUserData = {
//   fullName: "John Doe",
//   email: "john.doe@example.com",
//   phone: "+91 9876543210",
//   skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB"],
//   resumeUrl: "",
//   profileImg: "",
//   Socials: [
//     { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
//     { platform: "GitHub", url: "https://github.com/johndoe" },
//   ],
// };

const socialPlatforms = [
  { name: "LinkedIn", icon: FaLinkedinIn },
  { name: "GitHub", icon: LuGithub },
  { name: "Twitter", icon: FaXTwitter },
  { name: "Portfolio", icon: Globe },
];

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [newSkill, setNewSkill] = useState("");
  const [fileLoad, setFileLoad] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const resumeInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.student);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    setImageLoad(true);
    const file = e.target.files?.[0];
    const data = new FormData();
    data.append("my_file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/profileImg",
        data
      );
      if (response || response.data?.success) {
        setFormData((prevData) => ({
          ...prevData,
          profileImg: response.data.result.secure_url,
        }));
      }
    } catch (error) {
      toast.error("Image not uploaded");
      imageInputRef.current.value = null;
      console.log(error);
    } finally {
      setImageLoad(false);
    }
  };

  const handleSocialChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      Socials: prev.Socials.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      ),
    }));
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      Socials: [...prev.Socials, { platform: "LinkedIn", url: "" }],
    }));
  };

  const removeSocial = (index) => {
    setFormData((prev) => ({
      ...prev,
      Socials: prev.Socials.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleResumeUpload = async (e) => {
    setFileLoad(true);
    const file = e.target.files?.[0];
    const data = new FormData();
    data.append("my_file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/uploadResume",
        data
      );
      console.log(response);
      if (response?.data?.success) {
        setFileLoad(false);
        toast.success("Resume Uploaded Successfully");
        setFormData((prev) => ({
          ...prev,
          resumeUrl: response?.data?.result?.secure_url,
        }));
      }
    } catch (error) {
      setFileLoad(false);
      toast.error(error.message);
    }
  };

  const handleSave = () => {
    dispatch(profileUpdate(formData)).then((response) => {
      console.log(response);
      if (response?.payload?.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Some error occurred");
      }
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-background">
      <div>
        <div className="page-container py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                My Profile
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your personal information and preferences
              </p>
            </div>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="gap-2"
            >
              {isEditing ? (
                <>
                  {isLoading ? (
                    <PLoader />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Photo & Basic Info */}
            <div className="space-y-6">
              {/* Profile Photo Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <input
                        type="file"
                        name="my_file"
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Avatar className="h-28 w-28">
                        {!imageLoad ? (
                          <>
                            <AvatarImage
                              src={formData.profileImg}
                              alt={formData.fullName}
                            />
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                              {getInitials(formData.fullName)}
                            </AvatarFallback>
                          </>
                        ) : (
                          <PLoader className="mt-11 ml-10" />
                        )}
                      </Avatar>
                      {isEditing && (
                        <button
                          onClick={() => {
                            imageInputRef.current.click();
                          }}
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                      {formData.fullName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {formData.email}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Student
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume
                  </CardTitle>
                  <CardDescription>Your uploaded resume</CardDescription>
                </CardHeader>
                {isEditing ? (
                  <CardContent>
                    <input
                      type="file"
                      name="my_file"
                      ref={resumeInputRef}
                      onChange={handleResumeUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {formData.resumeUrl ? (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              File
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded
                            </p>
                          </div>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                resumeUrl: "",
                              }));
                              resumeInputRef.current.value = null;
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => resumeInputRef.current?.click()}
                      >
                        {!fileLoad ? (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload Resume
                          </>
                        ) : (
                          <PLoader />
                        )}
                      </Button>
                    )}
                  </CardContent>
                ) : (
                  <CardContent>
                    {formData.resumeUrl ? (
                      <a
                        href={formData.resumeUrl}
                        className="flex items-center gap-3"
                      >
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            File
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="text-sm text-center items-center flex gap-5 text-gray-500">
                        <File />
                        No Resume Uploaded
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        Full Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-foreground py-2">
                          {formData.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          disabled={true}
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-foreground py-2">{formData.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-foreground py-2">
                          {formData.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skills</CardTitle>
                  <CardDescription>
                    Your technical and professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 gap-1"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {formData.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No skills added yet
                      </p>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                      />
                      <Button onClick={addSkill} variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Social Links</CardTitle>
                      <CardDescription>
                        Connect your social profiles
                      </CardDescription>
                    </div>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addSocial}
                        className="gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.Socials.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No social links added yet
                      </p>
                    ) : (
                      formData.Socials.map((social, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-1 grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Platform</Label>
                              {isEditing ? (
                                <select
                                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                                  value={social.platform}
                                  onChange={(e) =>
                                    handleSocialChange(
                                      index,
                                      "platform",
                                      e.target.value
                                    )
                                  }
                                >
                                  {socialPlatforms.map((platform) => (
                                    <option
                                      key={platform.name}
                                      value={platform.name}
                                    >
                                      {platform.name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <div className="flex items-center gap-2 py-2">
                                  {(() => {
                                    const platform = socialPlatforms.find(
                                      (p) => p.name === social.platform
                                    );
                                    const Icon = platform?.icon || Globe;
                                    return (
                                      <>
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">
                                          {social.platform}
                                        </span>
                                      </>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label>Profile URL</Label>
                              {isEditing ? (
                                <Input
                                  placeholder="https://..."
                                  value={social.url}
                                  onChange={(e) =>
                                    handleSocialChange(
                                      index,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline py-2 block truncate"
                                >
                                  {social.url || "Not provided"}
                                </a>
                              )}
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mt-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeSocial(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
