import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData } from "../../functions/fetchFromAPI.function";
import Student_leaveNotices_modal_create from "../../components/LeaveNotices/StudentsOnly/modal/Student_leaveNotices_modal_create.component";
import Student_leaveNotices_table from "../../components/LeaveNotices/StudentsOnly/table/Student_leaveNotices_table.component";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useContext_Students } from "../../context/Students.context";

const Student_leaveNotices = () => {
  const { userInfo } = useContext_Account();
  const { leaveNotices, setLeaveNotices } = useContext_LeaveNotices();
  const { setStudents } = useContext_Students();

  const { t } = useTranslation();

  const fetchLeaveNotices = async () => {
    await getData(
      `${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`,
      (result: any) => setLeaveNotices(result)
    );
  };
  const fetchStudents = async () => {
    await getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) =>
      setStudents(result)
    );
  };

  useEffect(() => {
    fetchLeaveNotices();
    fetchStudents();
  }, []);

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
          setLeaveNotices={setLeaveNotices}
          open={modalOpen}
          onModalClose={onModalClose}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_students_myLeaveNotices_title")}
        </h1>
        <Student_leaveNotices_table
          leaveNotices={leaveNotices}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
};

export default Student_leaveNotices;
