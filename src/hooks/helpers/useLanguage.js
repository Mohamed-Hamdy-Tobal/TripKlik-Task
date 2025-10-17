import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, FONT_FAMILIES } from "@/config/constants";

const isRtl = (lang) => lang === "ar";

const pickFontForLanguage = (lang) => {
  if (isRtl(lang)) return FONT_FAMILIES.ar;
  return FONT_FAMILIES.en;
};

const applyLanguageSideEffects = (lang) => {
  document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";

  const fontFamily = pickFontForLanguage(lang);
  if (fontFamily) {
    document.documentElement.style.setProperty("--font-primary", fontFamily);
    document.documentElement.style.setProperty("--font-secondary", fontFamily);
    document.documentElement.style.fontFamily = fontFamily;
  }
};

export const useLanguage = () => {
  useEffect(() => {
    const stored = localStorage.getItem("language");
    const selected = stored && SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;

    if (!stored || !SUPPORTED_LANGUAGES.includes(stored)) {
      localStorage.setItem("language", selected);
    }
    i18n.changeLanguage(selected);
    applyLanguageSideEffects(selected);

    const onLanguageChanged = (lng) => {
      applyLanguageSideEffects(lng);
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => i18n.off("languageChanged", onLanguageChanged);
  }, []);

  const setLanguage = (lng) => {
    const next = SUPPORTED_LANGUAGES.includes(lng) ? lng : DEFAULT_LANGUAGE;
    localStorage.setItem("language", next);
    i18n.changeLanguage(next);
  };

  return { language: i18n.language, setLanguage };
};
