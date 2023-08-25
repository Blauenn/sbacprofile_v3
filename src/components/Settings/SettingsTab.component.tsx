interface CurrentProp {
  tabIndex: number;
  icon: string;
  text: string;
  activeTab: number;
  setActiveTab: (value: number) => void;
}

const SettingsTab = (props: CurrentProp) => {
  const { tabIndex, icon, text, activeTab, setActiveTab } = props;

  const handleTabChange = (value: number) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div
        onClick={() => handleTabChange(tabIndex)}
        className={`px-4 py-2 border-b-2 cursor-pointer ${
          activeTab == tabIndex ? "border-primary" : ""
        }`}>
        <h1 className={`${activeTab == tabIndex ? "text-primary" : null}`}>
          <i className={`${icon} me-2`}></i>
          {text}
        </h1>
      </div>
    </div>
  );
};

export default SettingsTab;
