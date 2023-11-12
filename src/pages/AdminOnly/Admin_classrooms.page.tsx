import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import Admin_classroom_table from "../../components/Dashboard/Classrooms/table/Admin_classrooms_table.component";

const Admin_classrooms = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Classrooms_header")} />

      <Admin_classroom_table />
    </div>
  );
};

export default Admin_classrooms;
