import { useTranslation } from "react-i18next";
import Student_requestForms from "./StudentsOnly/Student_requestForms.page";
import Teacher_requestForms from "./TeachersOnly/Teacher_requestForms.page";
import PageHeaderReturn from "../components/misc/common/PageHeaderReturn.component";

// Contexts //
import { useContext_Account } from "../context/Account.context";
import {
  student_access_only,
  teacher_access_only,
} from "../functions/permissionChecks.function";

const RequestForms = () => {
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("RequestForms_header")} />

      {/* If user is a student */}
      {student_access_only(userInfo.profile_position) ? (
        <Student_requestForms />
      ) : null}

      {/* If user is a teacher */}
      {teacher_access_only(userInfo.profile_position) ? (
        <Teacher_requestForms />
      ) : null}
    </div>
  );
};

export default RequestForms;
