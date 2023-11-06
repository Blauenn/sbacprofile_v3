import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Admin_classroom_table from "../../components/Dashboard/Classrooms/table/Admin_classrooms_table.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Classrooms } from "../../context/Classrooms.context";
import { useContext_Students } from "../../context/Students.context";
import { useContext_Teachers } from "../../context/Teachers.context";

const Admin_classrooms = () => {
  const { classrooms, setClassrooms } = useContext_Classrooms();
  const { students, setStudents } = useContext_Students();
  const { teachers, setTeachers } = useContext_Teachers();

  const fetchClassrooms = async () => {
    if (classrooms.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) =>
        setClassrooms(result)
      );
    }
  };
  const fetchStudents = async () => {
    if (students.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) =>
        setStudents(result)
      );
    }
  };
  const fetchTeachers = async () => {
    if (teachers.length === 0) {
      await getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) =>
        setTeachers(result)
      );
    }
  };

  useEffect(() => {
    fetchClassrooms();
    fetchStudents();
    fetchTeachers();
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Classrooms_header")} />

      <Admin_classroom_table />
    </div>
  );
};

export default Admin_classrooms;
