import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Head_student_table from "../../components/Dashboard/Students/HeadOnly/table/Head_students_table.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_student_modal_create from "../../components/Dashboard/Students/HeadOnly/modal/Head_students_modal_create.component";

// Contexts //
import { useContext_Students } from "../../context/Students.context";

const Head_students = () => {
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Students_header")} />

      <div className="mb-8">
        <Head_student_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-graduation-cap"
          text={t("Admin_Students_create_button_title")}
        />
      </div>

      <Head_student_table />
    </div>
  );
};

export default Head_students;
