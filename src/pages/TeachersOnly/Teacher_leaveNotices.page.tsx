import { useTranslation } from "react-i18next";
import Teacher_leaveNotices_table from "../../components/LeaveNotices/TeachersOnly/table/Teacher_leaveNotices_table.component";

const Teacher_leaveNotices = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("LeaveNotices_teachers_myLeaveNotices_title")}
        </h1>
        <Teacher_leaveNotices_table />
      </div>
    </div>
  );
};

export default Teacher_leaveNotices;
