import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../../interfaces/common.interface";
import { getData } from "../../functions/fetchFromAPI.function";
import { hasNumber } from "../../functions/stringManipulation.function";
import Admin_student_table from "../../components/Dashboard/Students/AdminOnly/table/Admin_student_table.component";
import StudentFilters from "../../components/Students/StudentFilters.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_student_modal_create from "../../components/Dashboard/Students/AdminOnly/modal/Admin_student_modal_create.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../context/Students.context";
import { useContext_Majors } from "../../context/Majors.context";

const Admin_students = () => {
  const { students, setStudents, setStudentCount } = useContext_Students();
  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    // Students //
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) => {
      setStudents(result);
      setStudentCount(result.length);
    });
    // Majors //
    // Only fetch when empty //
    if (majors.length === 0) {
      getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
        setMajors(result);
      });
    }
  }, []);

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedClass, setSelectedClass] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: any) => {
    setSelectedMajor(event.target!.value);
  };
  const onLevelChange = (event: any) => {
    setSelectedClass(0);
    setSelectedLevel(event.target!.value);
  };
  const onClassChange = (event: any) => {
    setSelectedClass(event.target!.value);
  };
  const onSearchFieldChange = (event: any) => {
    setSearchField(event.target!.value.toLowerCase());
  };

  const filteredStudentMajor =
    selectedMajor != 0
      ? students.filter(
          (student: Student) => student.student_major == selectedMajor
        )
      : students;
  const filteredStudentLevel =
    selectedLevel != 0
      ? filteredStudentMajor.filter((student: Student) => {
          return student.student_level == selectedLevel;
        })
      : filteredStudentMajor;
  const filteredStudentClass =
    selectedClass != 0
      ? filteredStudentLevel.filter(
          (student: Student) => student.student_class == selectedClass
        )
      : filteredStudentLevel;
  const filteredStudents = filteredStudentClass.filter((student: Student) => {
    if (hasNumber(searchField)) {
      return student.student_ID.toString().includes(searchField);
    } else {
      return (student.student_first_name + student.student_last_name)
        .toLowerCase()
        .includes(searchField);
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Students_header")} />

      <div className="mb-8">
        <Admin_student_modal_create open={modalOpen} onModalClose={onModalClose} />
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-graduation-cap"
          text={t("Admin_Students_create_button_title")}
        />
      </div>

      <div className="flex flex-col gap-8">
        <StudentFilters
          majors={majors}
          selectedMajor={selectedMajor}
          selectedLevel={selectedLevel}
          onMajorChangeHandler={onMajorChange}
          onLevelChangeHandler={onLevelChange}
          onClassChangeHandler={onClassChange}
          onSearchFieldChangeHandler={onSearchFieldChange}
        />
        <Admin_student_table filteredStudents={filteredStudents} />
      </div>
    </div>
  );
};

export default Admin_students;
