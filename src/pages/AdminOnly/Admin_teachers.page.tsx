import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Teacher } from "../../interfaces/common.interface";
import { has_number } from "../../functions/stringManipulation.function";
import TeacherFilters from "../../components/Teachers/Teacher_filters.component";
import Admin_teacher_table from "../../components/Dashboard/Teachers/AdminOnly/table/Admin_teachers_table.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Admin_teacher_modal_create from "../../components/Dashboard/Teachers/AdminOnly/modal/Admin_teachers_modal_create.component";

// Contexts //
import { useContext_Teachers } from "../../context/Teachers.context";

const Admin_teachers = () => {
  const { teachers, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
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
    if (has_number(searchField)) {
      return teacher.teacher_ID.toString().includes(searchField);
    } else {
      return (teacher.teacher_first_name + teacher.teacher_last_name)
        .toLowerCase()
        .includes(searchField);
    }
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Teachers_header")} />

      <div className="mb-8">
        <Admin_teacher_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-chalkboard-user"
          text={t("Admin_Teachers_create_button_title")}
        />
      </div>

      <div className="flex flex-col gap-8">
        <TeacherFilters
          onMajorChangeHandler={onMajorChange}
          onSearchFieldChangeHandler={onSearchFieldChange}
        />
        <Admin_teacher_table filteredTeachers={filteredTeachers} />
      </div>
    </div>
  );
};

export default Admin_teachers;
