import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../interfaces/common.interface";
import { has_number } from "../functions/stringManipulation.function";
import PageHeader from "../components/misc/common/PageHeader.component";
import TeacherRolodex from "../components/Teachers/Teacher_rolodex.component";
import TeacherFilters from "../components/Teachers/Teacher_filters.component";

// Contexts //
import { useContext_Teachers } from "../context/Teachers.context";

const Teachers = () => {
  const { teachers, teacherCount, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const [selectedMajor, setSelectedMajor] = useState(0);
  const [searchField, setSearchField] = useState("");

  const onMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMajor(parseInt(event.target.value));
  };
  const onSearchFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value.toLowerCase());
  };

  const filteredTeacherMajor =
    selectedMajor != 0
      ? teachers.filter(
          (teacher: Teacher) => teacher.teacher_major == selectedMajor
        )
      : teachers;

  const filteredTeachers = filteredTeacherMajor.filter((teacher: Teacher) => {
    if (has_number(searchField)) {
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
        subtext={teacherCount.toString()}
      />

      <div className="mb-8 lg:mb-12">
        <TeacherFilters
          onMajorChangeHandler={onMajorChange}
          onSearchFieldChangeHandler={onSearchFieldChange}
        />
      </div>

      <TeacherRolodex filteredTeachers={filteredTeachers} />
    </div>
  );
};

export default Teachers;
