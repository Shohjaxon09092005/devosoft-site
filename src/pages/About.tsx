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
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Briefcase,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("about");
  const values = t("values.list", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const team = t("team.list", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    bio: string;
    skills: string[];
  }>;

  const skills = t("skills.list", { returnObjects: true }) as Array<{
    name: string;
    percentage: number;
  }>;

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
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                   {t("hero.title2")}
                </span>{" "}
                {t("hero.title3")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-left">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">{t("story.title")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {t("story.paragraphs.paragraph1")}
                  </p>
                  <p>
                    {t("story.paragraphs.paragraph2")}
                  </p>
                  <p>
                    {t("story.paragraphs.paragraph3")}
                  </p>
                </div>
                <div className="flex space-x-8">
                  <div>
                    <div className="text-3xl font-bold text-primary">{t("story.stats.projects")}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("story.stats.projectsLabel")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{t("story.stats.clients")}</div>
                    <div className="text-sm text-muted-foreground">{t("story.stats.clientsLabel")}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{t("story.stats.years")}</div>
                    <div className="text-sm text-muted-foreground">{t("story.stats.yearsLabel")}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                    <div className="text-2xl font-bold text-primary">
                      {t("story.award.title")}
                    </div>
                    <div className="text-muted-foreground">
                       {t("story.award.subtitle")}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("values.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("values.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value: any, index: number) => (
              <AnimatedSection
                key={value.title}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("skills.title")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("skills.description")}
              </p>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.percentage}%
                      </span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {t("skills.stats.technologies")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("skills.stats.technologiesLabel")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {t("skills.stats.successRate")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("skills.stats.successRateLabel")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {t("skills.stats.support")}
                    </div>
                    <div className="text-sm text-muted-foreground">{t("skills.stats.supportLabel")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {t("skills.stats.satisfaction")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("skills.stats.satisfactionLabel")}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("team.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("team.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection
                key={member.name}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="group text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
