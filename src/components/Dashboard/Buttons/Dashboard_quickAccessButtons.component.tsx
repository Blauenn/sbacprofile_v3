import { useTranslation } from "react-i18next";
import Dashboard_button from "./Dashboard_button.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import {
  head_access_only,
  student_access_only,
  teacher_access_only,
} from "../../../functions/permissionChecks.function";

interface CurrentComponentProp {
  profile: string;
}

const Dashboard_quickAccessButtons = (props: CurrentComponentProp) => {
  const { profile } = props;

  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      {/* Students or teachers */}
      {profile === "student" || profile === "teacher" ? (
        <div className="flex flex-col gap-8">
          {head_access_only(userInfo.profile_position) ? (
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
                  description={t(
                    "Dashboard_Majors_quickAccess_students_description"
                  )}
                />
                {/* Teachers */}
                <Dashboard_button
                  url="/majors/teachers"
                  color="text-pink-500"
                  icon="fa-solid fa-chalkboard-user"
                  title={t("Dashboard_Majors_quickAccess_teachers_title")}
                  description={t(
                    "Dashboard_Majors_quickAccess_teachers_description"
                  )}
                />
                {/* Clubs */}
                <Dashboard_button
                  url="/majors/clubs"
                  color="text-green-500"
                  icon="fa-solid fa-puzzle-piece"
                  title={t("Dashboard_Majors_quickAccess_clubs_title")}
                  description={t(
                    "Dashboard_Majors_quickAccess_clubs_description"
                  )}
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
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-4">
            {teacher_access_only(userInfo.profile_position) ? (
              <h1 className="text-xl">
                <i className="fa-solid fa-graduation-cap me-4"></i>
                {t("Dashboard_quickAccess_homeroomStudents_header")}
              </h1>
            ) : null}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {/* Leave notices */}
              <Dashboard_button
                url="/leaveNotices"
                color="text-red-500"
                icon="fa-solid fa-flag"
                title={t("Dashboard_quickAccess_leaveNotices_title")}
                description={t(
                  "Dashboard_quickAccess_leaveNotices_description"
                )}
              />
              {/* Request forms */}
              <Dashboard_button
                url="/requestForms"
                color="text-blue-500"
                icon="fa-solid fa-folder"
                title={t("Dashboard_quickAccess_requestForms_title")}
                description={t(
                  "Dashboard_quickAccess_requestForms_description"
                )}
              />
              {/* Clubs */}
              {student_access_only(userInfo.profile_position) ? (
                <Dashboard_button
                  url="/club"
                  color="text-green-500"
                  icon="fa-solid fa-puzzle-piece"
                  title={t("Dashboard_quickAccess_clubs_title")}
                  description={t(
                    "Dashboard_quickAccess_student_clubs_description"
                  )}
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
            {teacher_access_only(userInfo.profile_position) ? (
              <h1 className="text-xl">
                <i className="fa-solid fa-thumbtack me-4"></i>
                {t("Dashboard_quickAccess_others_header")}
              </h1>
            ) : null}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                {/* Clubs */}
                {teacher_access_only(userInfo.profile_position) ? (
                  <Dashboard_button
                    url="/club"
                    color="text-green-500"
                    icon="fa-solid fa-puzzle-piece"
                    title={t("Dashboard_quickAccess_clubs_title")}
                    description={t(
                      "Dashboard_quickAccess_teacher_clubs_description"
                    )}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Administrator */}
      {profile === "admin" ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
          {/* Announcements */}
          <Dashboard_button
            url="/admin/announcements"
            color="text-orange-500"
            icon="fa-solid fa-bullhorn"
            title={t("Dashboard_Admin_quickAccess_announcements_title")}
            description={t(
              "Dashboard_Admin_quickAccess_announcements_description"
            )}
          />
          {/* Classrooms */}
          <Dashboard_button
            url="/admin/classrooms"
            color="text-teal-500"
            icon="fa-solid fa-school"
            title={t("Dashboard_Admin_quickAccess_classrooms_title")}
            description={t(
              "Dashboard_Admin_quickAccess_classrooms_description"
            )}
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
            description={t(
              "Dashboard_Admin_quickAccess_leaveNotices_description"
            )}
          />
          {/* Request forms */}
          <Dashboard_button
            url="/admin/requestForms"
            color="text-blue-500"
            icon="fa-solid fa-folder"
            title={t("Dashboard_Admin_quickAccess_requestForms_title")}
            description={t(
              "Dashboard_Admin_quickAccess_requestForms_description"
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard_quickAccessButtons;
