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
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import MapComponent from "@/components/ui/MapComponent";
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
type Service = {
  id: string;
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
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
// API type
type Faq = {
  notes: string;
  created_at: string;
  updated_at: string;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Faq[];
};
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
type ContactInfo = {
  icon: string;
  title: string;
  description: string;
  contact: string;
  action: string;
};
export default function Contact({ info }: { info: any }) {
  const { t, i18n } = useTranslation("contact");
  const lang = i18n.language;
  const services = t("form.services", { returnObjects: true }) as Services[];
  const contactInfo = t("contactInfo", {
    returnObjects: true,
  }) as contactInfo[];

  const offices = t("offices.items", { returnObjects: true }) as offices[];
  const faq = t("faq.items", { returnObjects: true }) as FAQ[];
  const [faq_data, setFaq] = useState<Faq[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [mergedData, setMergedData] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [services_data, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });
  //API fetch
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch("/api/v1/faqs/");
        const data: ApiResponse = await res.json();
        setFaq(data.results);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, []);
  // api service
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/v1/services/");
        const data = await res.json();
        setServices(data.results); // API ichida results bor
      } catch (error) {
        console.error("Services fetch error:", error);
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
  // static + api birlashtirish
  const getLocalizedText1 = (
    item: any,
    lang: string,
    field: "title" | "value"
  ) => {
    switch (lang) {
      case "uz":
        return item?.[`${field}_uz`] || item?.[field];
      case "en":
        return item?.[`${field}_en`] || item?.[field];
      case "ru":
        return item?.[`${field}_ru`] || item?.[field];
      default:
        return item?.[field];
    }
  };
  useEffect(() => {
    if (fields.length > 0 && contactInfo.length > 0) {
      // masalan, contactInfo.length === fields.length bo‘lsa indeks orqali map qilamiz
      const merged = contactInfo.map((info, index) => {
        const field = fields.slice(16, 18)[index]; // mos indeksdagi field

        return {
          ...info,
          description:
            getLocalizedText1(field, lang, "title") ?? info.description,
          contact: getLocalizedText1(field, lang, "value") ?? info.contact,
          action: getLocalizedText1(field, lang, "value") ?? info.action,
        };
      });

      setMergedData(merged);
    }
  }, [fields, contactInfo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send message");
      alert("Xabaringiz yuborildi!");
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        company: "",
        message: "",
        service: "",
      });
    } catch (error) {
      console.error("Send error:", error);
      alert("Xabar yuborishda xatolik yuz berdi.");
    }
  };
  // Tilga qarab matnni tanlash helper
  const getLocalizedText = (
    item: Faq,
    field: "title" | "description"
  ): string => {
    const lang = i18n.language;
    if (lang === "uz") return item[`${field}_uz`];
    if (lang === "en") return item[`${field}_en`];
    if (lang === "ru") return item[`${field}_ru`];
    return item[field];
  };
  //copy
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
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
            {mergedData.map((info, index) => {
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
                      <button
                        onClick={() => handleCopy(info.contact, index)}
                        className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline mx-auto"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedIndex === index ? "Copied!" : info.contact}
                      </button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div id="form" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.firstName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {t("form.fields.lastName")}
                      </Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.lastName")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">
                      {t("form.fields.phone_number")}
                    </Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("form.fields.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("form.fields.company")}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("form.placeholders.company")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">{t("form.fields.service")}</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, service: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("form.placeholders.service")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {services_data.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("form.fields.message")}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("form.placeholders.message")}
                    />
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-primary to-purple-600"
                  >
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
                  <MapComponent
                    height="100%"
                    position={[40.518741, 68.793750]} 
                    zoom={15}
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Offices */}
      {/* <section className="py-20 bg-gradient-to-b from-background to-muted/30">
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
      </section> */}

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
            {faq_data.map((item, index) => (
              <AnimatedSection
                key={index}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">
                      {getLocalizedText(item, "title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {getLocalizedText(item, "description")}
                    </p>
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
              <a href="#form">{t("cta.button")}</a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
