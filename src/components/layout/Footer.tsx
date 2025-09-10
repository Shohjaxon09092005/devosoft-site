import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t}=useTranslation();
  const currentYear = new Date().getFullYear();

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
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.footer_quickLinks.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.footer_quickLinks.about")}</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.footer_quickLinks.services")}</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.footer_quickLinks.portfolio")}</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.footer_quickLinks.careers")}</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.footer_quickLinks.blog")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.footer_services.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">{t("footer.footer_services.software")}</span></li>
              <li><span className="text-muted-foreground">{t("footer.footer_services.ai")}</span></li>
              <li><span className="text-muted-foreground">{t("footer.footer_services.digital")}</span></li>
              <li><span className="text-muted-foreground">{t("footer.footer_services.cloud")}</span></li>
              <li><span className="text-muted-foreground">{t("footer.footer_services.mobile")}</span></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.footer_contact.title")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{t("footer.footer_contact.email")}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{t("footer.footer_contact.phone")}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t("footer.footer_contact.location")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("footer.footer_contact.newsletter")}</p>
              <div className="flex space-x-2">
                <Input placeholder={t("footer.footer_contact.placeholder")} className="text-sm" />
                <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600">
                  {t("footer.footer_contact.subscribe")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} DevoSoft. {t("footer.footer_legal.rights")}
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">{t("footer.footer_legal.privacy")}</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">{t("footer.footer_legal.terms")}</Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">{t("footer.footer_legal.cookies")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;