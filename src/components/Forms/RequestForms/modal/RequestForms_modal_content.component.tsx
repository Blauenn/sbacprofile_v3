import { useTranslation } from "react-i18next";
import { RequestForm } from "../../../../interfaces/common.interface";
import Forms_approval_timeline from "../../Forms_approval_timeline/Forms_approval_timeline.component";
import Forms_student_information from "../../Forms_student_information.component";
import Forms_approval_messages from "../../Forms_approval_timeline/Forms_approval_messages.component";
import { hover_transition } from "../../../../constants/styles/transitions.style";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import {
  change_to_locale_date,
  get_day_from_date,
} from "../../../../functions/getDates.function";
import { Day_Colors } from "../../../../constants/Misc.constant";

interface CurrentComponentProp {
  requestForm: RequestForm;
}

const RequestForms_modal_content = (props: CurrentComponentProp) => {
  const { requestForm } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-2 w-full gap-8">
      {/* Student information */}
      <Forms_student_information
        form_ID={requestForm.request_form_ID}
        form_student_ID={requestForm.request_form_student_ID}
      />
      {/* Request form title and description */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border px-6 py-4 rounded-xl">
          {/* Request form title */}
          <h1 className="text-2xl">{requestForm.request_form_title}</h1>
          {/* Request form description */}
          <h1 className="text-lg opacity-50">
            {requestForm.request_form_description}
          </h1>
        </div>
        {/* Request form attached file */}
        <div className="flex flex-col gap-1 border px-6 py-4 rounded-xl">
          <div className="flex flex-col gap-1">
            <h1 className="text-md font-semibold opacity-50">
              {t("RequestForms_modal_content_attachedFile_label")}
            </h1>
            {requestForm.request_form_attached_file != "" ? (
              <a
                download
                href={`${CDN_ENDPOINT}${requestForm.request_form_attached_file}`}
                target="_blank"
                className={`text-xl break-all hover:text-primary ${hover_transition}`}>
                <i className="fa-solid fa-folder me-4"></i>
                {t("RequestForms_modal_content_attachedFile_fileText")}
              </a>
            ) : (
              <h1 className="text-xl">
                {t("RequestForms_modal_content_attachedFile_noFileText")}
              </h1>
            )}
          </div>
        </div>
        {/* Request form time of submission */}
        <div className="flex flex-col gap-8 rounded-xl border p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-md font-semibold opacity-50">
              {t("RequestForm_modal_content_timeOfSubmission_label")}
            </h1>
            <h1
              className={`text-xl ${
                Day_Colors[
                  get_day_from_date(requestForm.request_form_create_datetime)
                ]
              }`}>
              {change_to_locale_date(requestForm.request_form_create_datetime)}
            </h1>
          </div>
        </div>
        {/* Request form approval status */}
        <div className="flex flex-col sm:gap-8 rounded-xl border sm:p-6">
          <Forms_approval_timeline
            teacher_status={requestForm.request_form_teacher_status}
            head_status={requestForm.request_form_head_status}
          />
          <Forms_approval_messages
            teacher_description={requestForm.request_form_teacher_description}
            head_description={requestForm.request_form_head_description}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestForms_modal_content;
