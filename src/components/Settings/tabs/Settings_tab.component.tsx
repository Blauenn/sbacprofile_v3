interface CurrentProp {
  tabIndex: number;
  icon: string;
  text: string;
  activeTab: number;
  setActiveTab: (value: number) => void;
}

const Settings_tab = (props: CurrentProp) => {
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
          <i className={`${icon} me-2 } hidden sm:inline-block`}></i>
          {text}
        </h1>
      </div>
    </div>
  );
};

export default Settings_tab;
