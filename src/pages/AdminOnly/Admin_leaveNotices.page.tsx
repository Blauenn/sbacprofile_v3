import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Admin_leaveNotice_table from "../../components/LeaveNotices/AdminOnly/table/Admin_leaveNotices_table.components";

const Admin_leaveNotices = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} />

      <Admin_leaveNotice_table />
    </div>
  );
};

export default Admin_leaveNotices;
