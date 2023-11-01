import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";
import SettingsTab from "../components/Settings/Settings_tab.component";
import SettingsPreferencesTab from "../components/Settings/Settings_tab_preferences.component";
import SettingsAccountTab from "../components/Settings/Settings_tab_account.component";

const Settings = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <PageHeader icon="fa-solid fa-gear" text={t("Settings_header")} />

      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex flex-row w-full">
          {/* General */}
          <SettingsTab
            tabIndex={1}
            icon="fa-solid fa-wrench"
            text={t("Settings_tab_preferences")}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Account */}
          <SettingsTab
            tabIndex={2}
            icon="fa-solid fa-lock"
            text={t("Settings_tab_account")}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Content */}
        <div hidden={activeTab !== 1}>
          <SettingsPreferencesTab />
        </div>

        <div hidden={activeTab !== 2}>
          <SettingsAccountTab />
        </div>
      </div>
    </div>
  );
};

export default Settings;
