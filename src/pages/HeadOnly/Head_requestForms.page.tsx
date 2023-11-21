import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RequestForm } from "../../interfaces/common.interface";
import { get_student_major_from_ID } from "../../functions/getFromID.function";
import PageHeaderReturn from "../../components/misc/common/PageHeaderReturn.component";
import RequestForms_table from "../../components/Forms/RequestForms/table/RequestForms_table.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_RequestForms } from "../../context/RequestForms.context";
import { useContext_Students } from "../../context/Students.context";

const Head_requestForms = () => {
  const { userInfo } = useContext_Account();
  const { requestForms, fetchRequestForms } = useContext_RequestForms();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  useEffect(() => {
    if (requestForms.length === 0) {
      fetchRequestForms();
    }
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const majorRequestForms = [...requestForms]
    .reverse()
    .filter((requestForm: RequestForm) => {
      return (
        get_student_major_from_ID(
          requestForm.request_form_student_ID,
          students
        ) === userInfo.profile_major
      );
    });

  return (
    <div>
      <PageHeaderReturn text={t("Admin_RequestForms_header")} />

      <RequestForms_table requestForms={majorRequestForms} />
    </div>
  );
};

export default Head_requestForms;
