import { useTranslation } from "react-i18next";
import { getTextByPosition } from "../functions/getAccountInfo.function";
import Student_leaveNotices from "./StudentsOnly/Student_leaveNotices.page";
import Teacher_leaveNotices from "./TeachersOnly/Teacher_leaveNotices.page";
import PageHeaderReturn from "../components/misc/common/PageHeaderReturn.component";

// Contexts //
import { useContext_Account } from "../context/Account.context";

const LeaveNotices = () => {
  const { userInfo } = useContext_Account();

  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("LeaveNotices_header")} />
      
      {getTextByPosition(userInfo.profile_position) === "student" ? (
        <Student_leaveNotices />
      ) : (
        <Teacher_leaveNotices />
      )}
    </div>
  );
};

export default LeaveNotices;
