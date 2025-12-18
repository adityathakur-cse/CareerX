import React from "react";
import {
  Briefcase,
  GraduationCap,
  Building2,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/common/Navbar";

const features = [
  {
    icon: Briefcase,
    title: "Discover Opportunities",
    description:
      "Browse thousands of internship and full time opportunities from top companies across industries.",
  },
  {
    icon: GraduationCap,
    title: "Skill Development",
    description:
      "Access training modules and resources to enhance your professional skills.",
  },
  {
    icon: TrendingUp,
    title: "Track Applications",
    description:
      "Monitor your application status from submission to selection in real-time.",
  },
  {
    icon: Award,
    title: "Get Hired",
    description:
      "Connect with companies actively looking for talented individuals like you.",
  },
];

const stats = [
  { value: "100+", label: "Active Opportunities" },
  { value: "50+", label: "Companies" },
  { value: "500+", label: "Students Placed" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Launch Your Career with the
              <span className="text-primary"> Right Placement Opportunity</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with top companies, build real-world experience, and take
              the first step towards your dream career. Join thousands of
              students already using CareerX.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/auth/register?role=student">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  I'm a Student
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/register?role=company">
                  <Building2 className="mr-2 h-5 w-5" />
                  I'm a Company
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From discovering opportunities to landing your dream internship,
              we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-card transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Find the best talent for your team
              </h2>
              <p className="text-muted-foreground mb-8">
                Post job opportunities and connect with motivated
                students from top universities. Our platform makes it easy to
                manage applications and find perfect candidates.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Post unlimited opportunities",
                  "Advanced candidate filtering",
                  "Built-in interview scheduling",
                  "Track application pipeline",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-5 w-5 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/signup?role=company">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center">
                <Users className="h-32 w-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 px-8 rounded-2xl bg-primary">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of students and companies already using CareerX
              to build meaningful connections.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/register">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">CareerX</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                to="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CareerX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
