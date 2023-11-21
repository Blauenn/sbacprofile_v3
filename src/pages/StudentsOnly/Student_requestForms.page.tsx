import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestForm } from "../../interfaces/common.interface";
import Info_create_button from "../../components/Dashboard/Buttons/Info_create_button.component";
import RequestForms_modal_create from "../../components/Forms/RequestForms/modal/RequestForms_modal_create.component";
import RequestForms_table from "../../components/Forms/RequestForms/table/RequestForms_table.component";

// Contexts //
import { useContext_Account } from "../../context/Account.context";
import { useContext_RequestForms } from "../../context/RequestForms.context";

const Student_requestForms = () => {
  const { userInfo } = useContext_Account();
  const { requestForms, fetchRequestForms } = useContext_RequestForms();

  const { t } = useTranslation();

  useEffect(() => {
    if (requestForms.length === 0) {
      fetchRequestForms();
    }
  }, []);

  // Only get request forms that has been made by the current user. //
  const selfRequestForms = [...requestForms].reverse().filter(
    (requestForm: RequestForm) =>
      requestForm.request_form_student_ID === userInfo.profile_ID
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
          icon="fa-solid fa-folder"
          text={t("RequestForms_students_create_button_title")}
        />
        <RequestForms_modal_create
          open={createModalOpen}
          onModalClose={onCreateModalClose}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">
          {t("RequestForms_students_myRequestForms_title")}
        </h1>
        <RequestForms_table requestForms={selfRequestForms} />
      </div>
    </div>
  );
};

export default Student_requestForms;
