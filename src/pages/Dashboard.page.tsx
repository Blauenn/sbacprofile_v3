import { useTranslation } from "react-i18next";
import { getTextByPosition } from "../functions/getAccountInfo.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import Dashboard_quickAccessButtons from "../components/Dashboard/Buttons/Dashboard_quickAccessButtons.component";
import Dashboard_selfInfo from "../components/Dashboard/Dashboard_selfInfo.component";

// Contexts //
import { useContext_Account } from "../context/Account.context";

const Dashboard = () => {
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-bolt-lightning"
        text={t("Dashboard_header")}
      />

      <div className="grid grid-cols-1 xl:grid-cols-8 gap-8 w-full">
        <div className="xl:col-span-6">
          <h1 className="text-2xl font-semibold mb-4">{t("Dashboard_title_quickAccess")}</h1>
          <Dashboard_quickAccessButtons
            profile={getTextByPosition(userInfo.profile_position)}
          />
        </div>
        <div className="xl:col-span-2 grid grid-cols-3 xl:grid-cols-1">
          <div className="col-span-3 lg:col-span-2 xl:col-span-3">
            <Dashboard_selfInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
