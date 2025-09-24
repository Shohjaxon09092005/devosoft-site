import { useEffect, useState } from "react";
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
// API dan keladigan type
type Skill = {
  name: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
};

type Employment = {
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
};

type Job = {
  id: string;
  skills: Skill[];
  employment: Employment[];
  notes: string;
  created_at: string;
  updated_at: string;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  location: string;
  location_uz: string;
  location_en: string;
  location_ru: string;
  salary: string;
  experience: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
};
type ApplicationRequest = {
  notes: string;
  full_name: string;
  description: string;
  phone_number: string;
  email: string;
  resume: File | null; // fayl yuklanadi
  status: "Submitted";
  job_posting: string; // job ID
};

type ApplicationResponse = {
  id: string;
  notes: string;
  full_name: string;
  description: string;
  phone_number: string;
  email: string;
  resume: string;
  status: string;
  job_posting: string;
  created_at: string;
};
export default function Careers() {
  const { t, i18n } = useTranslation("careers");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const lang = i18n.language;
  const [fileName, setFileName] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [formData, setFormData] = useState<ApplicationRequest>({
    notes: "",
    full_name: "",
    description: "",
    phone_number: "",
    email: "",
    resume: null,
    status: "Submitted",
    job_posting: "",
  });

  const jobListings = t("careers.jobsSection.jobs", {
    returnObjects: true,
  }) as jobListings[];

  const benefits = t("careers.benefitsSection.benefits", {
    returnObjects: true,
  }) as benefits[];

  //api fetch
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/v1/careers/jobs/");
        const data: ApiResponse = await res.json();
        setJobs(data.results);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  // form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const body = new FormData();
    body.append("notes", formData.notes);
    body.append("full_name", formData.full_name);
    body.append("description", formData.description);
    body.append("phone_number", formData.phone_number);
    body.append("email", formData.email);
    body.append("status", "Submitted");
    body.append("job_posting", selectedJob.id);

    if (formData.resume) {
      body.append("resume", formData.resume);
    }

    try {
      const res = await fetch("/api/v1/careers/applications/", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Xatolik yuz berdi");

      const data: ApplicationResponse = await res.json();
      alert("Arizangiz yuborildi ✅");
      console.log("Application response:", data);

      setOpen(false);
      setFormData({
        notes: "",
        full_name: "",
        description: "",
        phone_number: "",
        email: "",
        resume: null,
        status: "Submitted",
        job_posting: "",
      });
    } catch (err) {
      console.error("Application error:", err);
      alert("Ariza yuborishda xatolik yuz berdi ❌");
    }
  };
  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }
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
            {jobs.map((job, index) => (
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
                          <h3 className="text-xl font-bold">
                            {lang == "uz"
                              ? job.title_uz
                              : lang == "en"
                              ? job.title_en
                              : job.title_ru}
                          </h3>
                          <Badge variant="secondary">
                            {lang == "uz"
                              ? job.skills[0].name_uz
                              : lang == "en"
                              ? job.skills[0].name_en
                              : job.skills[0].name_ru}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {lang == "uz"
                            ? job.description_uz
                            : lang == "en"
                            ? job.description_en
                            : job.description_ru}
                        </CardDescription>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {lang == "uz"
                              ? job.employment[0].title_uz
                              : lang == "en"
                              ? job.employment[0].title_en
                              : job.employment[0].title_ru}
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
                      <Button
                        className="bg-gradient-to-r from-primary to-purple-600"
                        onClick={() => {
                          setSelectedJob(job);
                          setOpen(true);
                          setFormData({ ...formData, job_posting: job.id });
                        }}
                      >
                        {t("careers.hero.apply")}
                      </Button>
                    </div>
                  </CardContent>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                          {selectedJob
                            ? lang == "uz"
                              ? selectedJob.title_uz
                              : lang == "en"
                              ? selectedJob.title_en
                              : selectedJob.title_ru
                            : ""}
                        </DialogTitle>
                        <DialogDescription>
                          {t("careers.form.dialog")}
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="fullname">
                            {t("careers.form.full_name")}
                          </Label>
                          <Input
                            id="fullname"
                            value={formData.full_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                full_name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">
                            {t("careers.form.Email")}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">
                            {t("careers.form.phone_number")}
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone_number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone_number: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="resume">
                            {t("careers.form.Resume")} (PDF / DOCX)
                          </Label>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                resume: e.target.files
                                  ? e.target.files[0]
                                  : null,
                              })
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="desc">
                            {t("careers.form.description")}
                          </Label>
                          <Textarea
                            id="desc"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                          >
                            {t("careers.form.out_btn")}
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-primary to-purple-600"
                          >
                            {t("careers.form.start_btn")}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
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
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fileInput =
                    form.querySelector<HTMLInputElement>("#resume");
                  const resumeFile = fileInput?.files?.[0];

               

                  try {
                    const formData = new FormData();
                    formData.append("notes", "string");
                    formData.append("full_name", "string");
                    formData.append("description", "string");
                    formData.append("phone_number", "string");
                    formData.append("email", "user@example.com");
                    formData.append("status", "Submitted");
                    formData.append("job_posting", ""); // Job ID bo‘lishi mumkin
                    formData.append("resume", resumeFile);

                    const res = await fetch("/api/v1/careers/applications/", {
                      method: "POST",
                      body: formData,
                    });

                    if (res.ok) {
                      alert("Rezyume yuborildi ✅");
                      form.reset();
                      setFileName(""); // Fayl nomini tozalash
                    } else {
                      const errData = await res.json();
                      console.error("Error:", errData);
                      alert("Xatolik yuz berdi ❌");
                    }
                  } catch (err) {
                    console.error("Error submitting form:", err);
                    alert("Server bilan ulanishda xatolik!");
                  }
                }}
                className="space-y-4 text-center"
              >
                {/* File inputni yashiramiz */}
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  onInvalid={(e) => {
                    e.preventDefault();
                    alert("Iltimos, rezyume yuklang!");
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : "");
                  }}
                />

                {/* Custom tugma */}
                <label
                  htmlFor="resume"
                  className="inline-block cursor-pointer bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  {t("careers.form.file_btn")}
                </label>

                {/* Tanlangan fayl nomi */}
                <p id="fileName" className="text-sm text-gray-600 mt-2">
                  {fileName ? fileName : "Fayl tanlanmagan"}
                </p>

                {/* Submit tugmasi */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  {t("careers.form.start_btn")}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
