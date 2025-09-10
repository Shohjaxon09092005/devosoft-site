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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
type contactInfo = {
  icon: string;
  title: string;
  description: string;
  contact: string;
  action: string;
};
type Services = {
  value: string;
  label: string;
};
type FAQ = {
  question: string;
  answer: string;
};
type offices = {
  city: string;
  address: string;
  phone: string;
  email: string;
};
export default function Contact() {
  const { t } = useTranslation("contact");
  const services = t("form.services", { returnObjects: true }) as Services[];
  const contactInfo = t("contactInfo", {
    returnObjects: true,
  }) as contactInfo[];

  const offices = t("offices.items", { returnObjects: true }) as offices[];
  const faq = t("faq.items",{returnObjects:true}) as FAQ[];
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
                {t("hero.title")}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  {t("hero.title2")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = Icons[info.icon] as React.ComponentType<{
                className?: string;
              }>;
              return (
                <AnimatedSection
                  key={info.title}
                  animation="slide-up"
                  delay={index * 100}
                >
                  <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {info.description}
                      </p>
                      <a
                        href={info.action}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {info.contact}
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="slide-left">
              <Card className="border-2 bg-gradient-to-br from-card to-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                    {t("form.title")}
                  </CardTitle>
                  <CardDescription>{t("form.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {t("form.fields.firstName")}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={t("form.placeholders.firstName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {t("form.fields.lastName")}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={t("form.placeholders.lastName")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("form.fields.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("form.placeholders.email")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("form.fields.company")}</Label>
                    <Input
                      id="company"
                      placeholder={t("form.placeholders.company")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">{t("form.fields.service")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("form.placeholders.service")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((item, index) => {
                          return (
                            <div key={index}>
                              <SelectItem value={item.value}>
                                {item.label}
                              </SelectItem>
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("form.fields.message")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("form.placeholders.message")}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                    <Send className="h-4 w-4 mr-2" />
                    {t("form.button")}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Map Placeholder */}
            <AnimatedSection animation="slide-right">
              <Card className="h-full border-2 bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        {t("map.title")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("map.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("offices.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("offices.description")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <AnimatedSection
                key={office.city}
                animation="slide-up"
                delay={index * 200}
              >
                <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{office.city}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-primary"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-primary"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("faq.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("faq.description")}
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {t("cta.button")}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
