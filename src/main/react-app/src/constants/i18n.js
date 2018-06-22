import i18next from "i18next/i18next";
import LngDetector from 'i18next-browser-languagedetector';

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
        translation: {
          loginH1: "Please, Log In"
        }
      },
      ru: {
        translation: {
          loginH1: "Пожалуйста, войдите"
        }
      }
    }
  });

export default i18n;
