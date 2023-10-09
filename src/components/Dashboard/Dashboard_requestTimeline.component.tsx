import { get_color_from_status_timeline } from "../../functions/LeaveNotices/LeaveNotices.function.tsx";
import {
  get_day_from_date,
  get_day_name_from_date,
} from "../../functions/getDates.function";
import { LeaveNotice } from "../../interfaces/common.interface";

interface CurrentComponentProps {
  leaveNotice: LeaveNotice;
}

const Dashboard_requstTimeline = (props: CurrentComponentProps) => {
  const { leaveNotice } = props;

  return (
    <div className="border border-standardBlack border-opacity-25 rounded-xl px-4 py-2 | hover:bg-gray-200 cursor-pointer">
      <h1 className="text-xl font-semibold line-clamp-1 mb-2">
        {leaveNotice.leave_notice_description != "" ? (
          leaveNotice.leave_notice_description
        ) : (
          <h1 className="opacity-50">{`For ${get_day_name_from_date(
            leaveNotice.leave_notice_start_datetime
          )} ${get_day_from_date(leaveNotice.leave_notice_start_datetime)}`}</h1>
        )}
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <i className={`text-lg fa-solid fa-pen-to-square text-green-500`}></i>
          <i className={`fa-solid fa-arrow-right text-green-500`}></i>
          <i
            className={`text-lg fa-solid fa-chalkboard-user | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_teacher_status,
              "text"
            )}`}></i>
          <i
            className={`fa-solid fa-arrow-right | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_teacher_status,
              "text"
            )}`}></i>
          <i
            className={`text-lg fa-solid fa-crown | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_head_status,
              "text"
            )}`}></i>
          <i
            className={`fa-solid fa-arrow-right | ${get_color_from_status_timeline(
              leaveNotice.leave_notice_head_status,
              "text"
            )}`}></i>
          <i
            className={`text-lg fa-solid fa-circle-check | ${
              leaveNotice.leave_notice_teacher_status == 2 &&
              leaveNotice.leave_notice_head_status == 2
                ? get_color_from_status_timeline(2, "text")
                : "opacity-25"
            }`}></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_requstTimeline;
