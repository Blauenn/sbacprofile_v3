import { useTranslation } from "react-i18next";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";

const Admin_requestForms = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <PageHeaderReturn text={t("Admin_RequestForms_header")} />
    </div>
  );
};

export default Admin_requestForms;
