import { useTranslation } from "react-i18next";
import Dashboard_quickAccessList from "../components/Dashboard/Dashboard_quickAccessList.component";
import PageHeader from "../components/misc/common/PageHeader.component";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-bolt-lightning"
        text={t("Dashboard_header")}
      />

      <div className="xl:grid grid-cols-4 gap-x-8 w-full">
        <Dashboard_quickAccessList />
      </div>
    </div>
  );
};

export default Dashboard;
