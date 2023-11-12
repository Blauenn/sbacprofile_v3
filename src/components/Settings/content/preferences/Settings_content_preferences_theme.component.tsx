import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const Settings_content_preferences_theme = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      <h1 className="text-2xl font-semibold mb-4">
        <i className="fa-solid fa-brush me-4"></i>
        {t("Settings_preferences_theme_title")}
      </h1>
      <h1 className="opacity-50 mb-4">
        {t("Settings_preferences_theme_description")}
      </h1>
      <TextField
        name="settings_theme"
        select
        className="w-full"
        SelectProps={{ native: true }}
        InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
        <option value="1">{t("Settings_preferences_theme_option1")}</option>
        <option value="2">{t("Settings_preferences_theme_option2")}</option>
        <option value="3">{t("Settings_preferences_theme_option3")}</option>
      </TextField>
    </div>
  );
};

export default Settings_content_preferences_theme;
