import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RequestForm } from "../../../../../interfaces/common.interface";
import { get_student_major_from_ID } from "../../../../../functions/getFromID.function";
import {
  Major_To_Background_Color,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../../../../constants/Majors.constant";
import { hover_transition } from "../../../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Students } from "../../../../../context/Students.context";

interface CurrentComponentProp {
  requestForm: RequestForm;
  functionToRun: () => void;
}

const RequestForms_evaluate_button = (props: CurrentComponentProp) => {
  const { requestForm, functionToRun } = props;

  const { t } = useTranslation();

  const { students, fetchStudents } = useContext_Students();

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const studentMajor = get_student_major_from_ID(
    requestForm.request_form_student_ID,
    students
  );

  return (
    <div>
      <button
        className={`border ${Major_To_Border_Color[studentMajor]} ${Major_To_Text_Color[studentMajor]} hover:${Major_To_Background_Color[studentMajor]} hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
        onClick={() => {
          functionToRun();
        }}>
        {t("RequestForms_evaluate_button_title")}
      </button>
    </div>
  );
};

export default RequestForms_evaluate_button;
