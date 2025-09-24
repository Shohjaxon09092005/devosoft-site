import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import SplashCursor from './SplashCursor'

interface Field {
  notes: string;
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
  description: string | null;
  description_uz: string | null;
  description_en: string | null;
  description_ru: string | null;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Field[];
}

export function HeroSection() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Create floating cubes with CSS
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cubes = [];

    // Create 40 floating cubes
    for (let i = 0; i < 500; i++) {
      const cube = document.createElement("div");
      cube.className = "absolute w-4 h-4 border border-primary/30 opacity-60";

      // Random position
      const x = Math.random() * 300;
      const y = Math.random() * 300;
      const size = Math.random() * 100 + 4;

      cube.style.left = `${x}%`;
      cube.style.top = `${y}%`;
      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;

      // Random animation
      const duration = Math.random() * 40 + 20;
      const delay = Math.random() * 5;

      cube.style.animation = `
        float ${duration}s ease-in-out ${delay}s infinite alternate,
        spin ${duration * 0.5}s linear ${delay}s infinite
      `;

      container.appendChild(cube);
      cubes.push(cube);
    }

    // Cleanup function
    return () => {
      cubes.forEach((cube) => {
        if (container.contains(cube)) {
          container.removeChild(cube);
        }
      });
    };
  }, []);
  // API
  useEffect(() => {
    fetch("/api/v1/fields/")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        const sorted = [...data.results].sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        setFields(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatolik:", error);
        setLoading(false);
      });
  }, []);
  const getLocalizedText = (item: Field, field: "title" | "value") => {
    switch (currentLang) {
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

  const goToAbout = () => {
    navigate("/contact#form");
  };
  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <section
      style={{ marginTop: "100px" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
    >
      {/* CSS Cubes Container */}
      {/* <SplashCursor/> */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 overflow-hidden"
      />

      {/* Animated Background Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <AnimatedSection animation="slide-up" delay={400}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                {t("hero.title.line1")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t("hero.title.line2")}
              </span>
              <br />
              <span className="text-foreground">{t("hero.title.line3")}</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={600}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              
              <Button
                onClick={goToAbout}
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-3 text-base"
              >
                {t("hero.buttons.startProject")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-muted/50 px-8 py-3 text-base"
              >
                <Play className="mr-2 h-4 w-4" />
                <a href="https://devosoft.osson.uz/" target="_blank" rel="noopener noreferrer">{t("hero.buttons.watchDemo")}</a>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={1000}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {fields.slice(0, 3).map((item, index) => {
                return (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {getLocalizedText(item, "value")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getLocalizedText(item, "title")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(calc(var(--move-x, 20px) * 10), calc(var(--move-y, 20px) * 10)) rotate(360deg);
          }
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
