import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import bannerTranslationEN from "src/assets/locales/en/banner.json";
import commonTranslationEN from "src/assets/locales/en/common.json";
import errorTranslationEN from "src/assets/locales/en/error.json";
import formTranslationEN from "src/assets/locales/en/form.json";
import tableTranslationEN from "src/assets/locales/en/table.json";
import widgetsTranslationEN from "src/assets/locales/en/widgets.json";

import bannerTranslationES from "src/assets/locales/es/banner.json";
import commonTranslationES from "src/assets/locales/es/common.json";
import errorTranslationES from "src/assets/locales/es/error.json";
import formTranslationES from "src/assets/locales/es/form.json";
import tableTranslationES from "src/assets/locales/es/table.json";
import widgetsTranslationES from "src/assets/locales/es/widgets.json";

const resources = {
  en: {
    banner: bannerTranslationEN,
    common: commonTranslationEN,
    error: errorTranslationEN,
    form: formTranslationEN,
    table: tableTranslationEN,
    widgets: widgetsTranslationEN,
  },
  es: {
    banner: bannerTranslationES,
    common: commonTranslationES,
    error: errorTranslationES,
    form: formTranslationES,
    table: tableTranslationES,
    widgets: widgetsTranslationES,
  },
};
let currentLanguage = localStorage.getItem("currentLanguage");

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage || "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lang) => {
  localStorage.setItem("currentLanguage", lang);
  i18n.changeLanguage(lang);
};

export default i18n;
