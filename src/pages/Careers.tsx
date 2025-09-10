import { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Search,
  Filter,
  Heart,
  Coffee,
  Zap,
  Globe,
  Award,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
type jobListings = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
};
type benefits = {
  icon: string;
  title: string;
  description: string;
};
export default function Careers() {
  const { t } = useTranslation("careers");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const jobListings = t("careers.jobsSection.jobs", {
    returnObjects: true,
  }) as jobListings[];

  const benefits = t("careers.benefitsSection.benefits", {
    returnObjects: true,
  }) as benefits[];

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "All" || job.location.includes(locationFilter);
    const matchesType = typeFilter === "All" || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">
                {t("careers.hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t("careers.hero.title")}{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {t("careers.hero.title2")}
                </span>{" "}
                {t("careers.hero.title3")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("careers.hero.description")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("careers.benefitsSection.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("careers.benefitsSection.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = Icons[benefit.icon] as React.ComponentType<{
                className?: string;
              }>;
              return (
                <AnimatedSection
                  key={benefit.title}
                  animation="slide-up"
                  delay={index * 100}
                >
                  <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t("careers.jobsSection.title")}
            </h2>
            <p className="text-muted-foreground text-center">
              {t("careers.jobsSection.description")}
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <AnimatedSection
                key={job.id}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.experience}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-purple-600">
                        {t("careers.hero.apply")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("careers.cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("careers.cta.description")}
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                {t("careers.cta.button")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
