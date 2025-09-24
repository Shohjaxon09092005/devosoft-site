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
import { useEffect, useState } from "react";
export interface Skill {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  percent: number;
}
export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
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
// types.ts
export interface MemberLink {
  icon: string;
  title: string | null;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  url: string;
  member: string;
}

interface Category {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
}

interface Position {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
}

interface Member {
  id: string;
  categories: Category[];
  memberlinks_set: MemberLink[];
  position: Position;
  first_name: string;
  last_name: string;
  description: string;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
}

interface MemberResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Member[];
}

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

  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [skill, setSkill] = useState<Skill[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/v1/expertise/");
        const data: ApiResponse = await res.json();
        setSkill(data.results);
      } catch (error) {
        console.error("API xatolik:", error);
      }
    };

    fetchSkills();
  }, []);

  // API Fields
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch("/api/v1/fields/");
        const data: ApiResponse_f = await res.json();
        const sorted = [...data.results].sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        setFields(sorted);
      } catch (err) {
        console.error("API xatolik:", err);
      }
    };

    fetchFields();
  }, []);
  // Members API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/v1/members/"); // backend endpoint
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: MemberResponse = await res.json();
        setMembers(data.results);
      } catch (err: any) {
        setError(err.message || "API dan ma’lumot olishda xato!");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
  console.log(members);

  if (loading) return <p>⏳ Yuklanmoqda...</p>;
  if (error) return <p className="text-red-500">Xato: {error}</p>;

  function truncate(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }
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
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("story.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("story.paragraphs.paragraph1")}</p>
                  <p>{t("story.paragraphs.paragraph2")}</p>
                  <p>{t("story.paragraphs.paragraph3")}</p>
                </div>
                <div className="flex space-x-8">
                  {fields.slice(4, 7).map((item, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <div className="text-3xl font-bold text-primary">
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {lang === "uz"
                            ? truncate(item.title_uz, 100)
                            : lang === "en"
                            ? truncate(item.title_en, 100)
                            : item.title}
                        </div>
                      </div>
                    );
                  })}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("values.title")}
            </h2>
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
                {skill.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {lang === "uz"
                          ? truncate(skill.title_uz, 100)
                          : lang === "en"
                          ? truncate(skill.title_en, 100)
                          : skill.title}
                      </span>
                      <span className="text-muted-foreground">
                        {skill.percent}%
                      </span>
                    </div>
                    <Progress value={skill.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {fields.slice(7, 11).map((item, index) => {
                    return (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {item.value_en}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {lang === "uz"
                            ? truncate(item.title_uz, 100)
                            : lang === "en"
                            ? truncate(item.title_en, 100)
                            : item.title}
                        </div>
                      </div>
                    );
                  })}
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
            {members.map((member, index) => (
              <AnimatedSection
                key={member.id}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="group text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    {/* Avatar (inicial) */}
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">
                        {member.first_name[0]}
                        {member.last_name[0]}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-lg mb-1">
                      {member.first_name} {member.last_name}
                    </h3>

                    {/* Position */}
                    <p className="text-primary font-medium mb-3">
                      {lang === "uz"
                        ? member.position.title_uz
                        : lang === "en"
                        ? member.position.title_en
                        : lang === "ru"
                        ? member.position.title_ru
                        : member.position.title}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {lang === "uz"
                        ? member.description_uz
                        : lang === "en"
                        ? member.description_en
                        : lang === "ru"
                        ? member.description_ru
                        : member.description}
                    </p>

                    {/* Skills (categories) */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.categories.map((cat, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {lang === "uz"
                            ? cat.title_uz
                            : lang === "en"
                            ? cat.title_en
                            : lang === "ru"
                            ? cat.title_ru
                            : cat.title}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex justify-center space-x-2">
                      {member.memberlinks_set.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-primary"
                          >
                            <img
                              src={link.icon}
                              alt={link.title ?? "link"}
                              className="w-4 h-4"
                            />
                          </Button>
                        </a>
                      ))}
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
