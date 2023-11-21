import { useTranslation } from "react-i18next";
import Dashboard_button from "../Dashboard_button.component";

const Dashboard_quickAccess_buttons_studentsTeachers = () => {
  const { t } = useTranslation();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
      {/* Leave notices */}
      <Dashboard_button
        url="/leaveNotices"
        color="text-red-500"
        icon="fa-solid fa-flag"
        title={t("Dashboard_quickAccess_leaveNotices_title")}
        description={t("Dashboard_quickAccess_leaveNotices_description")}
      />
      {/* Request forms */}
      <Dashboard_button
        url="/requestForms"
        color="text-blue-500"
        icon="fa-solid fa-folder"
        title={t("Dashboard_quickAccess_requestForms_title")}
        description={t("Dashboard_quickAccess_requestForms_description")}
      />
    </div>
  );
};

export default Dashboard_quickAccess_buttons_studentsTeachers;
