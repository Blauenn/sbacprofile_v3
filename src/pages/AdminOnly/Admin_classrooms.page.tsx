import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Admin_classroom_table from "../../components/Dashboard/Classrooms/table/Admin_classroom_table.component";

// Contexts //
import { useContext_Classrooms } from "../../context/Classrooms.context";
import { useEffect } from "react";
import { getData } from "../../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { useContext_Students } from "../../context/Students.context";
import { useContext_Teachers } from "../../context/Teachers.context";
import { useContext_Majors } from "../../context/Majors.context";

const Admin_classrooms = () => {
  const { classrooms, setClassrooms } = useContext_Classrooms();
  const { students, setStudents } = useContext_Students();
  const { teachers, setTeachers } = useContext_Teachers();
  const { majors, setMajors } = useContext_Majors();

  const fetchClassrooms = () => {
    getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) =>
      setClassrooms(result)
    );
  };
  const fetchStudents = () => {
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) =>
      setStudents(result)
    );
  };
  const fetchTeachers = () => {
    getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) =>
      setTeachers(result)
    );
  };
  const fetchMajors = () => {
    getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) =>
      setMajors(result)
    );
  };

  useEffect(() => {
    fetchClassrooms();
    fetchMajors();
    fetchStudents();
    fetchTeachers();
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Classrooms_header")} />

      <Admin_classroom_table
        fetchClassrooms={fetchClassrooms}
        classrooms={classrooms}
        students={students}
        teachers={teachers}
        majors={majors}
      />
    </div>
  );
};

export default Admin_classrooms;
