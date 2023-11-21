import { useTranslation } from "react-i18next";

interface CurrentComponentProp {
  teacher_description: string;
  head_description: string;
}

const Forms_approval_messages = (props: CurrentComponentProp) => {
  const { teacher_description, head_description } = props;

  const { t } = useTranslation();

  return teacher_description !== "" || head_description !== "" ? (
    <div className="p-6 sm:p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
        {/* Teacher description */}
        {teacher_description !== "" ? (
          <div className="flex flex-col">
            <h1 className="text-md font-semibold opacity-50">
              {t("Forms_approval_message_description_teacher_label")}
            </h1>
            <h1 className="text-xl">{teacher_description}</h1>
          </div>
        ) : null}
        {/* Head description */}
        {head_description !== "" ? (
          <div className="flex flex-col">
            <h1 className="text-md font-semibold opacity-50">
              {t("Forms_approval_message_description_head_label")}
            </h1>
            <h1 className="text-xl">{head_description}</h1>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Forms_approval_messages;
