import { HeroSection } from "@/components/ui/hero-section";
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
import {
  Code,
  Brain,
  Rocket,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  Users,
  Award,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

interface Feature {
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  description: string | null;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
}

interface Service {
  id: string;
  technologies: Technology[];
  features: Feature[];
  notes: string;
  created_at: string;
  updated_at: string;
  icon: string;
  title: string | null;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
  description: string | null;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
  timeline: string;
  starting_price: number;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
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
interface Feedback {
  notes: string;
  first_name: string;
  last_name: string;
  job_position: string;
  description: string;
  rating: number;
}

interface ApiResponseT {
  count: number;
  next: string | null;
  previous: string | null;
  results: Feedback[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}
// Takomillashtirilgan MagicBentoCard komponenti
const MagicBentoCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [stars, setStars] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      delay: number;
      duration: number;
    }>
  >([]);

  // Yulduzlarni yaratish
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
    setStars(newStars);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ${className} ${
        isHovering ? "shadow-2xl shadow-primary/20" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${
              5 - mousePosition.y / 10
            }deg) rotateY(${mousePosition.x / 10 - 5}deg) scale(1.05)`
          : "none",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      }}
    >
      {children}

      {/* MagicBento effekti - yulduzli osmon */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                       rgba(125, 100, 255, 0.2) 0%, 
                       rgba(125, 100, 255, 0.1) 30%, 
                       transparent 70%)`,
        }}
      >
        {/* Yulduz effektlari - ko'p sonli va harakatdagi yulduzlar */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: isHovering ? star.opacity : 0,
              animation: `twinkle ${star.duration}s ease-in-out ${
                star.delay
              }s infinite, float ${star.duration * 2}s ease-in-out ${
                star.delay
              }s infinite`,
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.7)",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}

        {/* Gradient highlight effekti */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 0.2 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                         rgba(255, 255, 255, 0.4) 0%, 
                         transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const testimonials = t("testimonials", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
  }>;
  const [services_data, setServices_data] = useState<Service[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [testimonials_D, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate=useNavigate()
  const gotoPage= ()=>{
    navigate("/contact#form")
  }
  const onGoService= ()=>{
    navigate("/services#service")
  }

  // API integration
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/v1/services/");
        const data: ApiResponse = await res.json();
        setServices_data(data.results);
      } catch (err) {
        console.error("API xatolik:", err);
      }
    };

    fetchServices();
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
  console.log(fields);
  function truncate(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }
  const getLocalizedText = (item: Field, field: "title" | "value") => {
    switch (lang) {
      case "uz":
        return item[`${field}_uz` as keyof Field];
      case "ru":
        return item[`${field}_ru` as keyof Field];
      case "en":
        return item[`${field}_en` as keyof Field];
      default:
        return item[field]; // default
    }
  };

  //API feedbacks
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/v1/feedbacks/");
        if (!res.ok) throw new Error("API dan ma’lumot olib bo‘lmadi");
        const data: ApiResponseT = await res.json();

        const mapped: Testimonial[] = data.results.map((item) => ({
          name: `${item.first_name} ${item.last_name}`,
          role: item.job_position,
          content: item.notes || item.description,
          rating: item.rating,
        }));

        setTestimonials(mapped);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("servicesSection.badge")}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t("servicesSection.title")}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("servicesSection.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services_data.map((service, index) => {
              return (
                <AnimatedSection
                  key={service.id}
                  animation="slide-up"
                  delay={index * 100}
                >
                  <MagicBentoCard delay={index * 100}>
                    <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <img
                            className="h-12 w-12 object-contain"
                            src={service.icon}
                            alt="icon"
                          />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {lang === "uz"
                            ? truncate(service.title_uz, 100)
                            : lang === "en"
                            ? truncate(service.title_en, 100)
                            : service.title_ru}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {lang === "uz"
                            ? truncate(service.description_uz, 100)
                            : lang === "en"
                            ? truncate(service.description_en, 100)
                            : truncate(service.description_ru, 100)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature.title}
                              className="flex items-center text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                              {lang === "uz"
                                ? feature.title_uz
                                : lang === "en"
                                ? feature.title_en
                                : feature.title_ru}
                            </li>
                          ))}
                        </ul>
                        <Button
                        onClick={onGoService}
                          variant="ghost"
                          className="w-full mt-4 group-hover:bg-primary/10"
                        >
                          {t("servicesSection.button")}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </MagicBentoCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div
          style={{ margin: "0 auto" }}
          className="container mx-auto px-4 lg:px-8"
        >
          <AnimatedSection animation="fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {fields.slice(0, 4).map((item, index) => {
                return (
                  <div key={index} className="space-y-2">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {getLocalizedText(item, "value")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getLocalizedText(item, "title")}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {t("testimonialsSection.badge")}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("testimonialsSection.title1")}{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t("testimonialsSection.title2")}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("testimonialsSection.description")}
            </p>
          </AnimatedSection>

          {loading ? (
            <p className="text-center text-muted-foreground">Yuklanmoqda...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials_D.map((testimonial, index) => (
                <AnimatedSection
                  key={index}
                  delay={index * 200}
                  duration={1200}
                >
                  <Card className="h-full bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground mb-6 italic">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-semibold text-sm">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                              
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("ctaSection.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("ctaSection.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
              onClick={gotoPage}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
               {t("ctaSection.start")} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
              onClick={gotoPage}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {t("ctaSection.schedule")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
