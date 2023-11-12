import Settings_content_preferences_language from "./preferences/Settings_content_preferences_language.component";
import Settings_content_preferences_theme from "./preferences/Settings_content_preferences_theme.component";

const Settings_content_preferences = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {/* Language */}
      <Settings_content_preferences_language />
      {/* Theme */}
      <Settings_content_preferences_theme />
    </div>
  );
};

export default Settings_content_preferences;
