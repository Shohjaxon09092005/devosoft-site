import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  challenges: string;
  results: string;
};
interface Category {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
}

interface Technology {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  description: string | null;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
}

interface Portfolio_Project {
  id: string;
  categories: Category[];
  technologies: Technology[];
  notes: string;
  created_at: string;
  updated_at: string;
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  short_code: string | null;
  description: string | null;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
  key_challenges: string | null;
  key_challenges_uz: string | null;
  key_challenges_en: string | null;
  key_challenges_ru: string | null;
  results_impact: string | null;
  results_impact_uz: string | null;
  results_impact_en: string | null;
  results_impact_ru: string | null;
  live_demo_url: string | null;
  code_url: string | null;
}

interface ProjectApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Portfolio_Project[];
}
interface Field {
  created_at: string;
  updated_at: string;
  title: string | null;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  value: string | null;
  value_uz: string | null;
  value_en: string | null;
  value_ru: string | null;
}

interface ApiResponse_f {
  count: number;
  next: string | null;
  previous: string | null;
  results: Field[];
}
export default function Portfolio() {
  const { t } = useTranslation("portfolio");
  const [projects_data, setProjects] = useState<Portfolio_Project[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const onGoPage = () => {
    navigate("/contact");
  };
  // kategoriyalarni massiv sifatida olamiz
  // Filter qismida categories API’dan keladigan loyihalardan olinadi
  const categoriesFromApi = [
    "All", // umumiy "hammasi"
    ...new Set(
      projects_data.flatMap((project) =>
        project.categories.map((cat) =>
          lang === "uz"
            ? cat.title_uz || cat.title
            : lang === "en"
            ? cat.title_en || cat.title
            : lang === "ru"
            ? cat.title_ru || cat.title
            : cat.title
        )
      )
    ),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filterlash
  const filteredProjects =
    selectedCategory === "All"
      ? projects_data
      : projects_data.filter((project) =>
          project.categories.some(
            (cat) =>
              (lang === "uz"
                ? cat.title_uz || cat.title
                : lang === "en"
                ? cat.title_en || cat.title
                : lang === "ru"
                ? cat.title_ru || cat.title
                : cat.title) === selectedCategory
          )
        );

  //API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/v1/portfolio/projects/");
        const data: ProjectApiResponse = await res.json();
        setProjects(data.results);
      } catch (err) {
        console.error("API xatolik:", err);
      }
    };

    fetchProjects();
  }, []);
  // API Fields
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch("/api/v1/fields/");
        const data: ApiResponse_f = await res.json();
        const sorted = [...data.results].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setFields(sorted);
      } catch (err) {
        console.error("API xatolik:", err);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {t("hero.title")}
                </span>{" "}
                {t("hero.title2")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center mr-4">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">{t("filter.label")}</span>
              </div>

              {/* All category button */}
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("All")}
                className={
                  selectedCategory === "All"
                    ? "bg-gradient-to-r from-primary to-purple-600"
                    : ""
                }
              >
                {t("filter.categories")}{" "}
                {/* i18n da "All" uchun tarjima qo'shib qo'yasiz */}
              </Button>

              {/* Dynamic categories from API */}
              {Array.from(
                new Set(
                  projects_data.flatMap((project) =>
                    project.categories.map((cat) =>
                      lang === "uz"
                        ? cat.title_uz || cat.title
                        : lang === "en"
                        ? cat.title_en || cat.title
                        : lang === "ru"
                        ? cat.title_ru || cat.title
                        : cat.title
                    )
                  )
                )
              ).map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-purple-600"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/50">
                      {project.title
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {lang === "uz"
                            ? project.categories[0]?.title_uz ||
                              project.categories[0]?.title
                            : lang === "en"
                            ? project.categories[0]?.title_en ||
                              project.categories[0]?.title
                            : lang === "ru"
                            ? project.categories[0]?.title_ru ||
                              project.categories[0]?.title
                            : project.categories[0]?.title}
                        </Badge>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {lang === "uz"
                            ? project.title_uz || project.title
                            : lang === "en"
                            ? project.title_en || project.title
                            : lang === "ru"
                            ? project.title_ru || project.title
                            : project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {lang === "uz"
                            ? project.description_uz || project.description
                            : lang === "en"
                            ? project.description_en || project.description
                            : lang === "ru"
                            ? project.description_ru || project.description
                            : project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {lang === "uz"
                              ? tech.title_uz || tech.title
                              : lang === "en"
                              ? tech.title_en || tech.title
                              : lang === "ru"
                              ? tech.title_ru || tech.title
                              : tech.title}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* 👇 View More Button (Dialog) */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-primary to-purple-600"
                          >
                            {t("hero.view_button")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">
                              {lang === "uz"
                                ? project.title_uz || project.title
                                : lang === "en"
                                ? project.title_en || project.title
                                : lang === "ru"
                                ? project.title_ru || project.title
                                : project.title}
                            </DialogTitle>
                            <DialogDescription>
                              <Badge variant="secondary" className="mr-2">
                                {lang === "uz"
                                  ? project.categories[0]?.title_uz ||
                                    project.categories[0]?.title
                                  : lang === "en"
                                  ? project.categories[0]?.title_en ||
                                    project.categories[0]?.title
                                  : lang === "ru"
                                  ? project.categories[0]?.title_ru ||
                                    project.categories[0]?.title
                                  : project.categories[0]?.title}
                              </Badge>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                              <div className="text-6xl font-bold text-primary/50">
                                {project.title
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")}
                              </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                              {lang === "uz"
                                ? project.description_uz || project.description
                                : lang === "en"
                                ? project.description_en || project.description
                                : lang === "ru"
                                ? project.description_ru || project.description
                                : project.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">
                                  {t("hero.technologies_used")}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, idx) => (
                                    <Badge key={idx} variant="secondary">
                                      {lang === "uz"
                                        ? tech.title_uz || tech.title
                                        : lang === "en"
                                        ? tech.title_en || tech.title
                                        : lang === "ru"
                                        ? tech.title_ru || tech.title
                                        : tech.title}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">
                                  {t("hero.key_challange")}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {lang === "uz"
                                    ? project.key_challenges_uz ||
                                      project.key_challenges
                                    : lang === "en"
                                    ? project.key_challenges_en ||
                                      project.key_challenges
                                    : lang === "ru"
                                    ? project.key_challenges_ru ||
                                      project.key_challenges
                                    : project.key_challenges}
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">
                                {t("hero.Result")}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {lang === "uz"
                                  ? project.results_impact_uz ||
                                    project.results_impact
                                  : lang === "en"
                                  ? project.results_impact_en ||
                                    project.results_impact
                                  : lang === "ru"
                                  ? project.results_impact_ru ||
                                    project.results_impact
                                  : project.results_impact}
                              </p>
                            </div>

                            <div className="flex gap-4">
                              {project.live_demo_url && (
                                <Button
                                  asChild
                                  className="flex-1 bg-gradient-to-r from-primary to-purple-600"
                                >
                                  <a
                                    href={project.live_demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    {t("hero.demo")}
                                  </a>
                                </Button>
                              )}
                              {project.code_url && (
                                <Button
                                  asChild
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <a
                                    href={project.code_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Github className="mr-2 h-4 w-4" />
                                    {t("hero.view_code")}
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {fields.slice(11, 15).map((item, index) => {
                return (
                  <div className="space-y-2">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lang === "uz"
                        ? item.title_uz
                        : lang === "en"
                        ? item.title_en
                        : item.title_ru}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("cta.description")}
              </p>
              <Button
                onClick={onGoPage}
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                {t("cta.button")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
