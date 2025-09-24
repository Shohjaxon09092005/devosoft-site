import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Item } from "@radix-ui/react-dropdown-menu";
type Service = {
  id: string;
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
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
interface EmailListRequest {
  notes: string;
  email: string;
}

interface EmailListResponse {
  id: number;
  notes: string;
  email: string;
  created_at: string;
}
const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const currentYear = new Date().getFullYear();
  const [services_data, setServices] = useState<Service[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
  //API Fields
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
  // Tilga qarab matnni tanlash helper
  const getLocalizedText = (
    item: Service,
    field: "title" | "description"
  ): string => {
    if (lang === "uz") return item[`${field}_uz`];
    if (lang === "en") return item[`${field}_en`];
    if (lang === "ru") return item[`${field}_ru`];
    return item[field];
  };
  const getLocalizedText_fields = (item: Field, field: "value"): string => {
    if (lang === "uz") return item[`${field}_uz`];
    if (lang === "en") return item[`${field}_en`];
    if (lang === "ru") return item[`${field}_ru`];
    return item[field];
  };

  // POST email-list
  const handleSubscribe = async () => {
    if (!email) {
      setError("Email kiritilishi kerak!");
      return;
    }

    const body: EmailListRequest = {
      notes: "Subscribed from footer form",
      email: email,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/v1/email-lists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Xatolik yuz berdi");
      }

      const data: EmailListResponse = await res.json();
      setSuccess("Obuna bo‘ldingiz!");
      setEmail(""); // inputni tozalash
      console.log("API javobi:", data);
    } catch (err) {
      setError("Obuna bo‘lishda xatolik yuz berdi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="bg-gradient-to-br from-background to-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                DevoSoft
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.footer_company.description")}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
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
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t("footer.footer_quickLinks.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.footer_quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.footer_quickLinks.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.footer_quickLinks.portfolio")}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.footer_quickLinks.careers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.footer_quickLinks.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t("footer.footer_services.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              {services_data.map((ser, index) => {
                return (
                  <li key={index}>
                    <span className="text-muted-foreground">
                      {getLocalizedText(ser, "title")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t("footer.footer_contact.title")}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {fields.slice(16, 17).map((Item, index) => {
                  return (
                    <span key={index}>
                      {getLocalizedText_fields(Item, "value")}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {fields.slice(17, 18).map((Item, index) => {
                  return (
                    <span key={index}>
                      {getLocalizedText_fields(Item, "value")}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {fields.slice(18, 19).map((Item, index) => {
                  return (
                    <span key={index}>
                      {getLocalizedText_fields(Item, "value")}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.footer_contact.placeholder")}
                className="text-sm"
              />
              <Button
                size="sm"
                disabled={loading}
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                {loading ? "..." : t("footer.footer_contact.subscribe")}
              </Button>

              {success && <p className="text-green-500 text-sm">{success}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
