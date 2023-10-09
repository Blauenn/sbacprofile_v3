import { useTranslation } from "react-i18next";
import {
  get_color_from_status_timeline,
  get_text_from_status_timeline,
} from "../../functions/LeaveNotices/LeaveNotices.function";

const LeaveNotices_approval_timeline = (props: any) => {
  const { leaveNotice } = props;

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-row | justify-around">
        {/* Request created */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center | bg-white rounded-full mb-2 | w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] border-4 sm:border-8 | border-green-500">
            <i className="fa-solid fa-pen-to-square | text-xl sm:text-3xl | text-green-500"></i>
          </div>
          <h1 className="hidden sm:block | font-semibold | text-sm sm:text-base | text-green-500">
            Request created
          </h1>
        </div>
        {/* Arrow */}
        <div className="hidden md:flex | relative flex-col justify-center">
          <i
            className={`absolute top-1/4 fa-solid fa-arrow-right | text-xl sm:text-3xl | text-green-500`}></i>
        </div>

        {/* Teacher */}
        <div className="flex flex-col items-center">
          <div
            className={`flex justify-center items-center | bg-white rounded-full mb-2 | w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] border-4 sm:border-8 | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_teacher_status,
              "border"
            )}`}>
            <i
              className={`fa-solid fa-chalkboard-user | text-xl sm:text-3xl ${get_color_from_status_timeline(
                leaveNotice.leave_notice_teacher_status,
                "text"
              )}`}></i>
          </div>
          <h1 className="hidden sm:block | text-sm sm:text-base">Teacher</h1>
          {get_text_from_status_timeline(
            leaveNotice.leave_notice_teacher_status,
            t
          )}
        </div>
        {/* Arrow */}
        <div className="hidden md:flex | relative flex-col justify-center">
          <i
            className={`absolute top-1/4 fa-solid fa-arrow-right | text-xl sm:text-3xl ${get_color_from_status_timeline(
              leaveNotice.leave_notice_teacher_status,
              "text"
            )}`}></i>
        </div>

        {/* Head of department */}
        <div className="flex flex-col items-center">
          <div
            className={`flex justify-center items-center | bg-white rounded-full mb-2 | w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] border-4 sm:border-8 | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_head_status,
              "border"
            )}`}>
            <i
              className={`fa-solid fa-crown | text-xl sm:text-3xl ${get_color_from_status_timeline(
                leaveNotice.leave_notice_head_status,
                "text"
              )}`}></i>
          </div>
          <h1 className="hidden sm:block | text-sm sm:text-base">
            Head of department
          </h1>
          {get_text_from_status_timeline(
            leaveNotice.leave_notice_head_status,
            t
          )}
        </div>
        {/* Arrow */}
        <div className="hidden md:flex | relative flex-col justify-center">
          <i
            className={`absolute top-1/4 fa-solid fa-arrow-right | text-xl sm:text-3xl ${get_color_from_status_timeline(
              leaveNotice.leave_notice_head_status,
              "text"
            )}`}></i>
        </div>

        {/* Success */}
        <div className="flex flex-col items-center">
          <div
            className={`flex justify-center items-center | bg-white rounded-full mb-2 | w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] border-4 sm:border-8 | ${
              leaveNotice.leave_notice_teacher_status == 2 &&
              leaveNotice.leave_notice_head_status == 2
                ? get_color_from_status_timeline(
                    leaveNotice.leave_notice_head_status,
                    "border"
                  )
                : leaveNotice.leave_notice_head_status == 4
                ? get_color_from_status_timeline(4, "border")
                : null
            }`}>
            <i
              className={`fa-solid ${
                leaveNotice.leave_notice_teacher_status == 2 &&
                leaveNotice.leave_notice_head_status == 2
                  ? "fa-circle-check"
                  : leaveNotice.leave_notice_head_status == 4
                  ? "fa-circle-xmark"
                  : "fa-circle-question"
              } | text-xl sm:text-3xl ${
                leaveNotice.leave_notice_teacher_status == 2 &&
                leaveNotice.leave_notice_head_status == 2
                  ? get_color_from_status_timeline(
                      leaveNotice.leave_notice_head_status,
                      "text"
                    )
                  : leaveNotice.leave_notice_head_status == 4
                  ? get_color_from_status_timeline(4, "text")
                  : "opacity-25"
              }`}></i>
          </div>
          <h1 className="hidden sm:block | text-sm sm:text-base">Status</h1>
          {leaveNotice.leave_notice_teacher_status == 2 &&
          leaveNotice.leave_notice_head_status == 2 ? (
            <h1 className="hidden sm:block | font-semibold | text-sm sm:text-base | text-green-500">
              Success
            </h1>
          ) : leaveNotice.leave_notice_head_status == 4 ? (
            <h1 className="hidden sm:block | font-semibold | text-sm sm:text-base | text-red-500">
              Rejected
            </h1>
          ) : (
            <h1 className="hidden sm:block | font-semibold opacity-50 | text-sm sm:text-base">
              Pending...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveNotices_approval_timeline;
