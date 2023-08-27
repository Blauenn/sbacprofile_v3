export const languageUpdate = (value: string) => {
  document.cookie = `i18next=${encodeURIComponent(value)}; path=/`;
  location.reload();
};
