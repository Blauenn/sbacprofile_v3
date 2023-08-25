import { useState } from "react";
import PageHeader from "../components/misc/common/PageHeader.component";
import SettingsTab from "../components/Settings/SettingsTab.component";
import SettingsPreferencesTab from "../components/Settings/SettingsPreferencesTab.component";
import SettingsAccountTab from "../components/Settings/SettingsAccountTab.component";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);

  const userEmail = "nawee.moo@sbacnon.ac.th";

  return (
    <div>
      <PageHeader icon="fa-solid fa-gear" text="Settings" />

      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex flex-row w-full">
          {/* General */}
          <SettingsTab
            tabIndex={1}
            icon="fa-solid fa-wrench"
            text="Preferences"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Account */}
          <SettingsTab
            tabIndex={2}
            icon="fa-solid fa-lock"
            text="Account"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Content */}
        <div hidden={activeTab !== 1}>
          <SettingsPreferencesTab />
        </div>

        <div hidden={activeTab !== 2}>
          <SettingsAccountTab userEmail={userEmail} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
