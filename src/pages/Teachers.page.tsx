import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../interfaces/common.interface";
import { getData } from "../functions/fetchFromAPI.function";
import { hasNumber } from "../functions/stringChecks.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import TeacherRolodex from "../components/Teachers/TeacherRolodex.component";
import TeacherFilters from "../components/Teachers/TeacherFilters.component";
import { API_ENDPOINT } from "../constants/API_ENDPOINT";

// Contexts //
import { useContext_Majors } from "../context/Majors.context";
import { useContext_Teachers } from "../context/Teachers.context";

const Teachers = () => {
  const { teachers, setTeachers, teacherCount, setTeacherCount } =
    useContext_Teachers();
  const { majors, setMajors } = useContext_Majors();

  const { t } = useTranslation();

  useEffect(() => {
    // Teachers //
    getData(`${API_ENDPOINT}/api/v1/teacher/getAll`, (result: any) => {
      setTeachers(result);
      setTeacherCount(result.length);
    });
    // Majors //
    getData(`${API_ENDPOINT}/api/v1/major/getAll`, (result: any) => {
      setMajors(result);
    });
  }, []);

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: any) => {
    setSelectedMajor(event.target!.value);
  };
  const onSearchFieldChange = (event: any) => {
    setSearchField(event.target!.value.toLowerCase());
  };

  const filteredTeacherMajor =
    selectedMajor != 0
      ? teachers.filter(
          (teacher: Teacher) => teacher.teacher_major == selectedMajor
        )
      : teachers;

  const filteredTeachers = filteredTeacherMajor.filter((teacher: Teacher) => {
    if (hasNumber(searchField)) {
      return teacher.teacher_ID.toString().includes(searchField);
    } else {
      return (teacher.teacher_first_name + teacher.teacher_last_name)
        .toLowerCase()
        .includes(searchField);
    }
  });

  return (
    <div>
      <PageHeader
        icon="fa-solid fa-chalkboard-user"
        text={t("Teachers_header")}
        subtext={teacherCount}
      />

      <div className="mb-8 lg:mb-12">
        <TeacherFilters
          majors={majors}
          onMajorChangeHandler={onMajorChange}
          onSearchFieldChangeHandler={onSearchFieldChange}
        />
      </div>

      <TeacherRolodex filteredTeachers={filteredTeachers} />
    </div>
  );
};

export default Teachers;
