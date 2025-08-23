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
  const services = [
    {
      icon: Code,
      title: "Software Development",
      description:
        "Custom software solutions built with cutting-edge technologies and best practices.",
      features: [
        "Full-stack Development",
        "API Integration",
        "Database Design",
      ],
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description:
        "Intelligent systems powered by machine learning and artificial intelligence.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
      ],
    },
    {
      icon: Rocket,
      title: "Digital Transformation",
      description:
        "Transform your business processes with modern digital solutions.",
      features: ["Process Automation", "Cloud Migration", "Digital Strategy"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets.",
      features: ["Security Audits", "Penetration Testing", "Compliance"],
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Optimize your applications for maximum speed and efficiency.",
      features: ["Code Optimization", "Database Tuning", "Caching Strategies"],
    },
    {
      icon: Globe,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure and deployment solutions.",
      features: ["AWS/Azure/GCP", "DevOps", "Microservices"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content:
        "DevoSoft transformed our entire digital infrastructure. Their AI solutions increased our efficiency by 300%.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupX",
      content:
        "The team at DevoSoft is exceptional. They delivered our project on time and exceeded all expectations.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
    },
    {
      name: "Emily Rodriguez",
      role: "VP Engineering, InnovateLab",
      content:
        "Outstanding quality and innovative solutions. DevoSoft is our go-to partner for all tech projects.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Comprehensive IT Solutions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end technology
              solutions that drive innovation and accelerate your business
              growth.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.title}
                animation="slide-up"
                delay={index * 100}
              >
                <MagicBentoCard delay={index * 100}>
                  <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="ghost"
                        className="w-full mt-4 group-hover:bg-primary/10"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </MagicBentoCard>
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
                  Projects Completed
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  150+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  98%
                </div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say
              about working with DevoSoft.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={testimonial.name}
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
                        <div className="font-semibold">{testimonial.name}</div>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our innovative solutions can accelerate your
              digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Schedule Consultation
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
