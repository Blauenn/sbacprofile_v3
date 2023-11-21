import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../interfaces/common.interface";
import { has_number } from "../functions/stringManipulation.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import StudentRolodex from "../components/Students/Student_rolodex.component";
import StudentFilters from "../components/Students/Student_filters.component";

// Contexts //
import { useContext_Students } from "../context/Students.context";

const Students = () => {
  const { students, studentCount, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedClass, setSelectedClass] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: any) => {
    setSelectedMajor(parseInt(event.target.value));
  };
  const onLevelChange = (event: any) => {
    setSelectedClass(0);
    setSelectedLevel(parseInt(event.target.value));
  };
  const onClassChange = (event: any) => {
    setSelectedClass(parseInt(event.target.value));
  };
  const onSearchFieldChange = (event: any) => {
    setSearchField(event.target.value.toLowerCase());
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
    if (has_number(searchField)) {
      return student.student_ID.toString().includes(searchField);
    } else {
      return (student.student_first_name + student.student_last_name)
        .toLowerCase()
        .includes(searchField);
    }
  });

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-graduation-cap"
        text={t("Students_header")}
        subtext={studentCount.toString()}
      />

      <div className="mb-8 lg:mb-12">
        <StudentFilters
          selectedMajor={selectedMajor}
          selectedLevel={selectedLevel}
          onMajorChangeHandler={onMajorChange}
          onLevelChangeHandler={onLevelChange}
          onClassChangeHandler={onClassChange}
          onSearchFieldChangeHandler={onSearchFieldChange}
        />
      </div>

      <StudentRolodex filteredStudents={filteredStudents} />
    </div>
  );
};

export default Students;
