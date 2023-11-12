import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { language_update } from "../../../../functions/Settings/LanguageUpdate.function";

const Settings_content_preferences_language = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      <h1 className="text-2xl font-semibold mb-4">
        <i className="fa-solid fa-globe me-4"></i>
        {t("Settings_preferences_language_title")}
      </h1>
      <h1 className="opacity-50 mb-4">
        {t("Settings_preferences_language_description")}
      </h1>
      <TextField
        name="settings_language"
        select
        className="w-full"
        SelectProps={{ native: true }}
        defaultValue={i18n.language}
        onChange={(event) => {
          language_update(event.target.value);
        }}
        InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="th">ไทย</option>
        <option value="ko">한국어</option>
      </TextField>
    </div>
  );
};

export default Settings_content_preferences_language;
