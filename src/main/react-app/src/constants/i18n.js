import i18next from "i18next";
const i18n = i18next.init({
  lng: "ru",
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
