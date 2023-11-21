import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../interfaces/common.interface";
import LeaveNotices_modal_create from "../../components/Forms/LeaveNotices/modal/LeaveNotices_modal_create.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import LeaveNotices_table from "../../components/Forms/LeaveNotices/table/LeaveNotices_table.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Student_leaveNotices = () => {
  const { userInfo } = useContext_Account();
  const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (leaveNotices.length === 0) {
      fetchLeaveNotices();
    }
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const selfLeaveNotices = [...leaveNotices].reverse().filter(
    (leaveNotice: LeaveNotice) =>
      leaveNotice.leave_notice_student_ID === userInfo.profile_ID
  );

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const onCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      {/* Create button */}
      <div className="mb-8">
        <Info_create_button
          setModalOpen={setCreateModalOpen}
          icon="fa-solid fa-flag"
          text={t("LeaveNotices_students_create_button_title")}
        />
        <LeaveNotices_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_students_myLeaveNotices_title")}
        </h1>
        <LeaveNotices_table leaveNotices={selfLeaveNotices} />
      </div>
    </div>
  );
};

export default Student_leaveNotices;
