import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Head_leaveNotices_table from "../../components/LeaveNotices/HeadOnly/table/Head_leaveNotices_table.componenet";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Head_leaveNotices = () => {
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

      <Head_leaveNotices_table />
    </div>
  );
};

export default Head_leaveNotices;
