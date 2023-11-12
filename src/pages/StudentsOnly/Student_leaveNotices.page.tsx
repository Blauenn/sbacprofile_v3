import { useState } from "react";
import { useTranslation } from "react-i18next";
import Student_leaveNotices_modal_create from "../../components/LeaveNotices/StudentsOnly/modal/Student_leaveNotices_modal_create.component";
import Student_leaveNotices_table from "../../components/LeaveNotices/StudentsOnly/table/Student_leaveNotices_table.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";

const Student_leaveNotices = () => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Create button */}
      <div className="mb-8">
        <Info_create_button
          setModalOpen={setModalOpen}
          icon="fa-solid fa-flag"
          text={t("LeaveNotices_students_create_button_title")}
        />
        <Student_leaveNotices_modal_create
          open={modalOpen}
          onModalClose={onModalClose}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_students_myLeaveNotices_title")}
        </h1>
        <Student_leaveNotices_table />
      </div>
    </div>
  );
};

export default Student_leaveNotices;
