import { useTranslation } from "react-i18next";
import {
  student_access_only,
  teacher_access_only,
} from "../functions/permissionChecks.function";
import PageHeaderReturn from "../components/misc/common/PageHeaderReturn.component";
import Student_club from "../components/Club/StudentOnly/Student_club.component";
import Teacher_club from "../components/Club/TeacherOnly/Teacher_club.component";

// Contexts //
import { useContext_Account } from "../context/Account.context";

const Club = () => {
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Club_header")} />

      {/* If user is a student */}
      {student_access_only(userInfo.profile_position) ? <Student_club /> : null}

      {/* If user is a teacher */}
      {teacher_access_only(userInfo.profile_position) ? <Teacher_club /> : null}
    </div>
  );
};

export default Club;
