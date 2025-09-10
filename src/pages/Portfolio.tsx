import { useState } from "react";
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

export default function Portfolio() {
  const { t } = useTranslation("portfolio");
  // kategoriyalarni massiv sifatida olamiz
  const categories = t("filter.categories", {
    returnObjects: true,
  }) as string[];

  // loyihalarni massiv sifatida olamiz
  const projects = t("projects", { returnObjects: true }) as Project[];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const filteredProjects =
    selectedCategory === categories[0]
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
              {categories.map((category) => (
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
                          {project.category}
                        </Badge>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="flex-1">
                              {t("hero.view_button")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">
                                {project.title}
                              </DialogTitle>
                              <DialogDescription>
                                <Badge variant="secondary" className="mr-2">
                                  {project.category}
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
                                {project.fullDescription}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    {t("hero.technologies_used")}
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                      <Badge key={tech} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    {t("hero.key_challange")}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {project.challenges}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">
                                  {t("hero.Result")}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {project.results}
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  {t("hero.demo")}
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <Github className="mr-2 h-4 w-4" />
                                  {t("hero.view_code")}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
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
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.projects")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  150+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.clients")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  98%
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.success")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.industries")}
                </div>
              </div>
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
              <p className="text-lg text-muted-foreground mb-8">{t("cta.description")}</p>
              <Button
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
