import { useTranslation } from "react-i18next";
import Dashboard_button from "../Dashboard_button.component";

const Dashboard_quickAccess_buttons_head = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        <i className="fa-solid fa-users me-4"></i>
        {t("Dashboard_quickAccess_majors_header")}
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
        <Dashboard_button
          url="/majors/students"
          color="text-purple-500"
          icon="fa-solid fa-graduation-cap"
          title={t("Dashboard_Majors_quickAccess_students_title")}
          description={t("Dashboard_Majors_quickAccess_students_description")}
        />
        {/* Teachers */}
        <Dashboard_button
          url="/majors/teachers"
          color="text-pink-500"
          icon="fa-solid fa-chalkboard-user"
          title={t("Dashboard_Majors_quickAccess_teachers_title")}
          description={t("Dashboard_Majors_quickAccess_teachers_description")}
        />
        {/* Clubs */}
        <Dashboard_button
          url="/majors/clubs"
          color="text-green-500"
          icon="fa-solid fa-puzzle-piece"
          title={t("Dashboard_Majors_quickAccess_clubs_title")}
          description={t("Dashboard_Majors_quickAccess_clubs_description")}
        />
        {/* Leave notices */}
        <Dashboard_button
          url="/majors/leaveNotices"
          color="text-red-500"
          icon="fa-solid fa-flag"
          title={t("Dashboard_Majors_quickAccess_leaveNotices_title")}
          description={t(
            "Dashboard_Majors_quickAccess_leaveNotices_description"
          )}
        />
        {/* Request forms */}
        <Dashboard_button
          url="/majors/requestForms"
          color="text-blue-500"
          icon="fa-solid fa-folder"
          title={t("Dashboard_Majors_quickAccess_requestForms_title")}
          description={t(
            "Dashboard_Majors_quickAccess_requestForms_description"
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard_quickAccess_buttons_head;
