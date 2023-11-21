import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../interfaces/common.interface";
import { get_student_major_from_ID } from "../../functions/getFromID.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import LeaveNotices_table from "../../components/Forms/LeaveNotices/table/LeaveNotices_table.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Head_leaveNotices = () => {
  const { userInfo } = useContext_Account();
  const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (leaveNotices.length === 0) {
      fetchLeaveNotices();
    }
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const majorLeaveNotices = [...leaveNotices]
    .reverse()
    .filter((leaveNotice: LeaveNotice) => {
      return (
        get_student_major_from_ID(
          leaveNotice.leave_notice_student_ID,
          students
        ) === userInfo.profile_major
      );
    });

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} />

      <LeaveNotices_table leaveNotices={majorLeaveNotices} />
    </div>
  );
};

export default Head_leaveNotices;
