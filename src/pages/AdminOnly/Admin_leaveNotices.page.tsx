import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Admin_leaveNotice_table from "../../components/LeaveNotices/AdminOnly/table/Admin_leaveNotices_table.components";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Admin_leaveNotices = () => {
  const { leaveNotices, setLeaveNotices } = useContext_LeaveNotices();
  const { students, setStudents, setStudentCount } = useContext_Students();

  const { t } = useTranslation();

  const fetchLeaveNotices = async () => {
    if (leaveNotices.length === 0) {
      await getData(
        `${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`,
        (result: any) => {
          setLeaveNotices(result);
        }
      );
    }
  };
  const fetchStudents = async () => {
    if (students.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
        setStudents(result);
        setStudentCount(result.length);
      });
    }
  };

  useEffect(() => {
    fetchLeaveNotices();
    fetchStudents();
  }, []);

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} subtext={""} />

      <Admin_leaveNotice_table />
    </div>
  );
};

export default Admin_leaveNotices;
