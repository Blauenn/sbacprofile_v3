import { useTranslation } from "react-i18next";
import Dashboard_button from "../Dashboard_button.component";

const Dashboard_quickAccess_buttons_admin = () => {
  const { t } = useTranslation();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
      {/* Announcements */}
      <Dashboard_button
        url="/admin/announcements"
        color="text-orange-500"
        icon="fa-solid fa-bullhorn"
        title={t("Dashboard_Admin_quickAccess_announcements_title")}
        description={t("Dashboard_Admin_quickAccess_announcements_description")}
      />
      {/* Classrooms */}
      <Dashboard_button
        url="/admin/classrooms"
        color="text-teal-500"
        icon="fa-solid fa-school"
        title={t("Dashboard_Admin_quickAccess_classrooms_title")}
        description={t("Dashboard_Admin_quickAccess_classrooms_description")}
      />
      {/* Students */}
      <Dashboard_button
        url="/admin/students"
        color="text-purple-500"
        icon="fa-solid fa-graduation-cap"
        title={t("Dashboard_Admin_quickAccess_students_title")}
        description={t("Dashboard_Admin_quickAccess_students_description")}
      />
      {/* Teachers */}
      <Dashboard_button
        url="/admin/teachers"
        color="text-pink-500"
        icon="fa-solid fa-chalkboard-user"
        title={t("Dashboard_Admin_quickAccess_teachers_title")}
        description={t("Dashboard_Admin_quickAccess_teachers_description")}
      />
      {/* Clubs */}
      <Dashboard_button
        url="/admin/clubs"
        color="text-green-500"
        icon="fa-solid fa-puzzle-piece"
        title={t("Dashboard_Admin_quickAccess_clubs_title")}
        description={t("Dashboard_Admin_quickAccess_clubs_description")}
      />
      {/* Leave notices */}
      <Dashboard_button
        url="/admin/leaveNotices"
        color="text-red-500"
        icon="fa-solid fa-flag"
        title={t("Dashboard_Admin_quickAccess_leaveNotices_title")}
        description={t("Dashboard_Admin_quickAccess_leaveNotices_description")}
      />
      {/* Request forms */}
      <Dashboard_button
        url="/admin/requestForms"
        color="text-blue-500"
        icon="fa-solid fa-folder"
        title={t("Dashboard_Admin_quickAccess_requestForms_title")}
        description={t("Dashboard_Admin_quickAccess_requestForms_description")}
      />
    </div>
  );
};

export default Dashboard_quickAccess_buttons_admin;
