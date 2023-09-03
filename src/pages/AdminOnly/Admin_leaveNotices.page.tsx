import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";

// Contexts //
import { useContext_LeaveNotices } from "../../context/LeaveNotices.context";
import { useEffect } from "react";
import { getData } from "../../functions/fetchFromAPI.function";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { useContext_Students } from "../../context/Students.context";
import Admin_leaveNotice_table from "../../components/LeaveNotices/AdminOnly/table/Admin_leaveNotice_table.components";

const Admin_leaveNotices = () => { 
  const { leaveNotices, setLeaveNotices } = useContext_LeaveNotices();
  const { setStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    getData(`${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`, (result: any) =>
      setLeaveNotices(result)
    );
    getData(`${API_ENDPOINT}/api/v1/student/getAll`, (result: any) =>
      setStudents(result)
    );
  }, []);

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} subtext={""} />

      <Admin_leaveNotice_table leaveNotices={leaveNotices} />
    </div>
  );
};

export default Admin_leaveNotices;
