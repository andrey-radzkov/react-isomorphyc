import i18next from "i18next/i18next";
import LngDetector from 'i18next-browser-languagedetector';
import en from "./en"
import ru from "./ru"

const detection = {
  order: ['querystring', 'navigator', 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
  caches: ['localStorage', 'cookie'],
};

const i18n = i18next
  .use(LngDetector)
  .init({
    detection: detection,
    resources: {
      en: {
        translation: en
      },
      ru: {
        translation: ru
      }
    }
  });

export default i18n;
