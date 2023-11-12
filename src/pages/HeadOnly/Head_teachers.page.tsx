import { useState } from "react";
import { useTranslation } from "react-i18next";
import Head_teacher_table from "../../components/Dashboard/Teachers/HeadOnly/table/Head_teachers_table.component";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import Head_teacher_modal_create from "../../components/Dashboard/Teachers/HeadOnly/modal/Head_teachers_modal_create.component";

const Head_teachers = () => {
  const { t } = useTranslation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Teachers_header")} />

      <div className="mb-8">
        <Head_teacher_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-chalkboard-user"
          text={t("Admin_Teachers_create_button_title")}
        />
      </div>

      <Head_teacher_table />
    </div>
  );
};

export default Head_teachers;
