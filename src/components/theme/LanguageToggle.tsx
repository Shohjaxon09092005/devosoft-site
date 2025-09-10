"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "uz" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      {i18n.language === "uz" ? "🇺🇿 UZ" : "🇬🇧 EN"}
    </Button>
  );
}
