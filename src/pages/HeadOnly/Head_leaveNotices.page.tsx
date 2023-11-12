import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Head_leaveNotices_table from "../../components/LeaveNotices/HeadOnly/table/Head_leaveNotices_table.componenet";

const Head_leaveNotices = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_LeaveNotices_header")} />

      <Head_leaveNotices_table />
    </div>
  );
};

export default Head_leaveNotices;
