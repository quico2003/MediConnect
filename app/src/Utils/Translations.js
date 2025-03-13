import { StorageKeys } from "../Constants/storekeys.constants";

export const getAvailableLanguages = async () => {
  return await fetch(`/Translations/AvailableLanguages.json`)
    .then((res) => res.json())
    .then((langs) => langs);
};

export const getLanguageSelected = async () => {
  let languageSelected = localStorage.getItem(StorageKeys.LANGUAGE_SELECTED);
  return getAvailableLanguages().then((langs) => {
    if (
      !languageSelected ||
      !langs.some((lang) => lang.key === languageSelected)
    ) {
      languageSelected = "en";
      localStorage.setItem(StorageKeys.LANGUAGE_SELECTED, languageSelected);
    }
    return languageSelected;
  });
};
