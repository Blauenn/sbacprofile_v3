import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import LeaveNotices_table from "../../components/Forms/LeaveNotices/table/LeaveNotices_table.component";

// Contexts //
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Admin_leaveNotices = () => {
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

  const reversedLeaveNotices = [...leaveNotices].reverse();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} />

      <LeaveNotices_table leaveNotices={reversedLeaveNotices} />
    </div>
  );
};

export default Admin_leaveNotices;
