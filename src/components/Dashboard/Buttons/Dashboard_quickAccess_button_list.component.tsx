import { useTranslation } from "react-i18next";
import {
  head_access_only,
  teacher_access_only,
} from "../../../functions/permissionChecks.function";
import Dashboard_button from "./Dashboard_button.component";

// Contexts //
import { useContext_Account } from "../../../context/Account.context";
import Dashboard_quickAccess_buttons_admin from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_admin.component";
import Dashboard_quickAccess_buttons_head from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_head.component";
import Dashboard_quickAccess_buttons_studentsTeachers from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_studentsTeachers.component";

interface CurrentComponentProp {
  profile: string;
}

const Dashboard_quickAccess_button_list = (props: CurrentComponentProp) => {
  const { profile } = props;

  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      {/* Students or teachers */}
      {profile === "student" || profile === "teacher" ? (
        <div className="flex flex-col gap-8">
          {/* Head of department */}
          {head_access_only(userInfo.profile_position) ? (
            <Dashboard_quickAccess_buttons_head />
          ) : null}

          <div className="flex flex-col gap-4">
            {teacher_access_only(userInfo.profile_position) ? (
              <h1 className="text-xl">
                <i className="fa-solid fa-graduation-cap me-4"></i>
                {t("Dashboard_quickAccess_homeroomStudents_header")}
              </h1>
            ) : null}
            <Dashboard_quickAccess_buttons_studentsTeachers />

            {/* Miscelleneous */}
            <div className="flex flex-col gap-4">
              <h1 className="text-xl">
                <i className="fa-solid fa-thumbtack me-4"></i>
                {t("Dashboard_quickAccess_others_header")}
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                <Dashboard_button
                  url="/club"
                  color="text-green-500"
                  icon="fa-solid fa-puzzle-piece"
                  title={t("Dashboard_quickAccess_clubs_title")}
                  description={t(
                    "Dashboard_quickAccess_teacher_clubs_description"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Administrator */}
      {profile === "admin" ? <Dashboard_quickAccess_buttons_admin /> : null}
    </div>
  );
};

export default Dashboard_quickAccess_button_list;
