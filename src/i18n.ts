import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "translations/resources";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === "development",
    // Allows "en-US" and "en-UK" to be implcitly supported when "en" is supported
    nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
  });

export default i18n;
