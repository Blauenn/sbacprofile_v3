import { useTranslation } from "react-i18next";
import { get_text_from_status_timeline } from "../../../functions/LeaveNotices/LeaveNotices.function";
import LeaveNotices_approval_timeline_icon from "./LeaveNotices_approval_timeline_icon.component";
import LeaveNotice_approval_timeline_arrow from "./LeaveNotice_approval_timeline_arrow.component";

const LeaveNotices_approval_timeline = (props: any) => {
  const { leaveNotice } = props;

  const { t } = useTranslation();

  const teacher_status = leaveNotice.leave_notice_teacher_status;
  const head_status = leaveNotice.leave_notice_head_status;

  return (
    <div>
      <div className="flex flex-row justify-around">
        {/* Request created */}
        <LeaveNotices_approval_timeline_icon
          subtitle={t("LeaveNotices_status_timeline_requestCreated_title")}
          icon={"fa-solid fa-pen-to-square"}
          status={2}
        />
        {/* Arrow */}
        <div className="hidden md:flex | relative flex-col justify-center">
          <i
            className={`absolute top-1/4 fa-solid fa-arrow-right | text-xl sm:text-3xl | text-green-500`}></i>
        </div>

        {/* Teacher */}
        <LeaveNotices_approval_timeline_icon
          title={t("LeaveNotices_status_timeline_teacher_title")}
          subtitle={get_text_from_status_timeline(teacher_status, t)}
          icon={"fa-solid fa-chalkboard-user"}
          status={teacher_status}
        />
        <LeaveNotice_approval_timeline_arrow status={teacher_status} />

        {/* Head of department */}
        {teacher_status !== 3 ? (
          <>
            <LeaveNotices_approval_timeline_icon
              title={t("LeaveNotices_status_timeline_head_title")}
              subtitle={get_text_from_status_timeline(head_status, t)}
              icon={"fa-solid fa-crown"}
              status={head_status}
            />
            <LeaveNotice_approval_timeline_arrow status={head_status} />
          </>
        ) : null}

        {/* Success */}
        <LeaveNotices_approval_timeline_icon
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

export default LeaveNotices_approval_timeline;
