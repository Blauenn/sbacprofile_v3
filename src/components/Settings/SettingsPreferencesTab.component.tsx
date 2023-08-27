import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { languageUpdate } from "../../functions/Settings/LanguageUpdate.function";

const SettingsPreferencesTab = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {/* Language */}
      <div className="border border-standardBlack border-opacity-25 rounded-xl p-4">
        <h1 className="text-2xl font-semibold mb-4">
          <i className="fa-solid fa-globe me-4"></i>
          {t("Settings_preferences_language_title")}
        </h1>
        <h1 className="text-lg opacity-50 mb-4">
          {t("Settings_preferences_language_description")}
        </h1>
        <TextField
          name="settings_language"
          select
          className="w-full"
          SelectProps={{ native: true }}
          defaultValue={i18n.language}
          onChange={(event) => {languageUpdate(event.target.value)}}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="en">English</option>
          <option value="th">ไทย</option>
        </TextField>
      </div>
      {/* Theme */}
      <div className="border border-standardBlack border-opacity-25 rounded-xl p-4">
        <h1 className="text-2xl font-semibold mb-4">
          <i className="fa-solid fa-brush me-4"></i>
          {t("Settings_preferences_theme_title")}
        </h1>
        <h1 className="text-lg opacity-50 mb-4">
          {t("Settings_preferences_theme_description")}
        </h1>
        <TextField
          name="settings_theme"
          select
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="1">{t("Settings_preferences_theme_option1")}</option>
          <option value="2">{t("Settings_preferences_theme_option2")}</option>
          <option value="3">{t("Settings_preferences_theme_option3")}</option>
        </TextField>
      </div>
    </div>
  );
};

export default SettingsPreferencesTab;
