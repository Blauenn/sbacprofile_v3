export const language_update = (value: string) => {
  document.cookie = `i18next=${encodeURIComponent(value)}; path=/`;
  location.reload();
};
