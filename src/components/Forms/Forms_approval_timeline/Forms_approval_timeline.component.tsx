import { useTranslation } from "react-i18next";
import { get_text_from_status_timeline } from "../../../functions/Forms/LeaveNotices/LeaveNotices.function";
import Forms_approval_timeline_icon from "./Forms_approval_timeline_icon.component";

interface CurrentComponentProp {
  teacher_status: number;
  head_status: number;
}

const Forms_approval_timeline = (props: CurrentComponentProp) => {
  const { teacher_status, head_status } = props;

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-row justify-around items-start sm:gap-8">
        {/* Request created */}
        <Forms_approval_timeline_icon
          subtitle={t("LeaveNotices_status_timeline_requestCreated_title")}
          icon={"fa-solid fa-pen-to-square"}
          status={2}
        />

        {/* Teacher */}
        <Forms_approval_timeline_icon
          title={t("LeaveNotices_status_timeline_teacher_title")}
          subtitle={get_text_from_status_timeline(teacher_status, t)}
          icon={"fa-solid fa-chalkboard-user"}
          status={teacher_status}
        />

        {/* Head of department */}
        {teacher_status !== 3 && teacher_status !== 4 ? (
          <Forms_approval_timeline_icon
            title={t("LeaveNotices_status_timeline_head_title")}
            subtitle={get_text_from_status_timeline(head_status, t)}
            icon={"fa-solid fa-crown"}
            status={head_status}
          />
        ) : null}

        {/* Success */}
        <Forms_approval_timeline_icon
          title={t("LeaveNotices_status_timeline_status_title")}
          subtitle={get_text_from_status_timeline(
            teacher_status === 2 && head_status === 2
              ? 2
              : teacher_status === 3 || head_status === 3
              ? 3
              : teacher_status === 4 || head_status === 4
              ? 4
              : 1,
            t
          )}
          icon={
            teacher_status === 2 && head_status === 2
              ? "fa-solid fa-circle-check"
              : teacher_status === 3 || head_status === 3
              ? "fa-solid fa-pencil"
              : teacher_status === 4 || head_status === 4
              ? "fa-solid fa-circle-xmark"
              : "fa-solid fa-circle-question"
          }
          status={
            teacher_status === 2 && head_status === 2
              ? 2
              : teacher_status === 3 || head_status === 3
              ? 3
              : teacher_status === 4 || head_status === 4
              ? 4
              : 1
          }
        />
      </div>
    </div>
  );
};

export default Forms_approval_timeline;
