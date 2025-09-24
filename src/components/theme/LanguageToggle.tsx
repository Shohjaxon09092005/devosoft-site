"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    let newLang;
    if (i18n.language === "en") {
      newLang = "ru"; // inglizdan rusga
    } else if (i18n.language === "ru") {
      newLang = "uz"; // rusdan o‘zbekka
    } else {
      newLang = "en"; // o‘zbekdan inglizga
    }
    i18n.changeLanguage(newLang);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      {i18n.language === "uz"
        ? "🇺🇿 UZ"
        : i18n.language === "ru"
        ? "🇷🇺 RU"
        : "🇬🇧 EN"}
    </Button>
  );
}
