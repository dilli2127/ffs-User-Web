import i18n from "i18next";
const localeRTLList = ["ar", "he"];

export function useIsRTL() {
  let locale = i18n.language || "en";
  if (locale && localeRTLList.includes(locale)) {
    return { isRTL: true, alignLeft: "right", alignRight: "left" };
  }
  return { isRTL: false, alignLeft: "left", alignRight: "right" };
}
