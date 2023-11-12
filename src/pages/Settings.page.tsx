import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";
import Settings_content_preferences from "../components/Settings/content/Settings_content_preferences.component";
import Settings_content_account from "../components/Settings/content/Settings_content_account.component";
import Settings_tabs from "../components/Settings/tabs/Settings_tabs.component";

const Settings = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <PageHeader icon="fa-solid fa-gear" text={t("Settings_header")} />

      <div className="flex flex-col">
        {/* Tabs */}
        <Settings_tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div hidden={activeTab !== 1}>
          <Settings_content_preferences />
        </div>

        <div hidden={activeTab !== 2}>
          <Settings_content_account />
        </div>
      </div>
    </div>
  );
};

export default Settings;
