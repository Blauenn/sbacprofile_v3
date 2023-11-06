import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import Teacher_leaveNotices_table from "../../components/LeaveNotices/TeachersOnly/table/Teacher_leaveNotices_table.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Teacher_leaveNotices = () => {
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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_teachers_myLeaveNotices_title")}
        </h1>
        <Teacher_leaveNotices_table />
      </div>
    </div>
  );
};

export default Teacher_leaveNotices;
