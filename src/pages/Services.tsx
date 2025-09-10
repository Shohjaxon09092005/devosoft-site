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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Code,
  Brain,
  Rocket,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
export default function Services() {
  const { t } = useTranslation("services");
  const services = t("list", { returnObjects: true }) as Array<{
    icon: keyof typeof Icons; // icon faqat string emas, ikon nomi bo'ladi
    title: string;
    shortDescription: string;
    fullDescription: string;
    timeline: string;
    startingPrice: string;
    features: string[];
    technologies: string[];
  }>;
  const step=t("process.steps",{returnObjects:true}) as Array<{
    step:string;
    title:string;
    description:string;
  }>

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
                {t("hero.title_2")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = Icons[service.icon] as React.ComponentType<{
                className?: string;
              }>;
              return (
                <AnimatedSection
                  key={service.title}
                  animation="slide-up"
                  delay={index * 100}
                >
                  <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {t("hero.time_line")} {service.timeline}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {t("hero.Start")} {service.startingPrice}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full group-hover:bg-primary/10">
                              {t("hero.button_learn")}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center text-2xl">
                                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                {service.title}
                              </DialogTitle>
                              <DialogDescription className="text-base leading-relaxed">
                                {service.fullDescription}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                  {t("hero.key_features")}
                                </h4>
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
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center">
                                  <Zap className="h-4 w-4 mr-2 text-primary" />
                                  {t("hero.Technologies")}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.technologies.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="mt-6 space-y-3">
                                  <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-primary" />
                                    <span className="font-medium">
                                      {service.timeline}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                                    <span className="font-medium">
                                      {service.startingPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-8">
                              <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600">
                                {t("hero.Get_Quote")}
                              </Button>
                              <Button variant="outline" className="flex-1">
                                {t("hero.Schedule")}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("process.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("process.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {step.map((process, index) => (
              <AnimatedSection
                key={process.step}
                animation="slide-up"
                delay={index * 200}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {process.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {process.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t("cta.title")}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {t("cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {t("cta.buttons.consultation")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {t("cta.buttons.portfolio")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
