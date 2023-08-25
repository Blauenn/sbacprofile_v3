import { TextField } from "@mui/material";

const SettingsPreferencesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {/* Language */}
      <div className="border border-standardBlack border-opacity-25 rounded-xl p-4">
        <h1 className="text-2xl font-semibold mb-4">
          <i className="fa-solid fa-globe me-4"></i>Language
        </h1>
        <h1 className="text-lg opacity-50 mb-4">
          Change the display language.
        </h1>
        <TextField
          name="settings_language"
          select
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="1">English</option>
          <option value="2">Thai</option>
        </TextField>
      </div>
      {/* Theme */}
      <div className="border border-standardBlack border-opacity-25 rounded-xl p-4">
        <h1 className="text-2xl font-semibold mb-4">
          <i className="fa-solid fa-brush me-4"></i>Theme
        </h1>
        <h1 className="text-lg opacity-50 mb-4">Change the display theme.</h1>
        <TextField
          name="settings_theme"
          select
          className="w-full"
          SelectProps={{ native: true }}
          InputProps={{ sx: { borderRadius: 3 } }}>
          <option value="1">System</option>
          <option value="2">Light</option>
          <option value="3">Dark</option>
        </TextField>
      </div>
    </div>
  );
};

export default SettingsPreferencesTab;
