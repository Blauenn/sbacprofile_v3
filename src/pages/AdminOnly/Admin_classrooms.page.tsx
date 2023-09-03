import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";

const Admin_classrooms = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeaderReturn text={t("Admin_Classrooms_header")} />
    </div>
  );
};

export default Admin_classrooms;
