import {
  get_student_classroom_from_ID,
  get_student_image_from_ID,
  get_student_major_from_ID,
  get_student_name_from_ID,
} from "../../functions/getFromID.function";
import {
  change_to_locale_date,
  get_day_amount_between_dates,
  get_day_from_date,
} from "../../functions/getDates.function";
import LeaveNotice_approval_timeline from "./LeaveNotices_approval_timeline.component";
import { LeaveNotice_Choice } from "../../constants/LeaveNotices.constant";
import { Major_To_Background_Color } from "../../constants/Majors.constant";
import { Day_Colors } from "../../constants/Misc.constant";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Students } from "../../context/Students.context";

interface CurrentComponentProp {
  leaveNotice: any;
}

const LeaveNotices_modal_content = (props: CurrentComponentProp) => {
  const { leaveNotice } = props;

  const { students } = useContext_Students();

  return (
    <div className="flex flex-col p-2 w-full lg:gap-x-4">
      {/* Length of leave and student's information */}
      <div className="flex flex-row items-center gap-8 mb-8">
        <div
          className={`hidden sm:block rounded-full overflow-hidden w-[120px] h-[120px] ${
            Major_To_Background_Color[
              get_student_major_from_ID(
                leaveNotice.leave_notice_student_ID,
                students
              )
            ]
          }`}>
          <img
            src={`${CDN_ENDPOINT}${get_student_image_from_ID(
              leaveNotice.leave_notice_student_ID,
              students
            )}`}
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col">
            {/* Description */}
            <div className="col-span-1 flex flex-col w-full">
              <h1 className="text-lg md:text-2xl opacity-50">
                {leaveNotice.leave_notice_description}
              </h1>
            </div>
            {/* Leave duration */}
            {get_day_amount_between_dates(
              leaveNotice.leave_notice_start_datetime,
              leaveNotice.leave_notice_end_datetime
            ) -
              1 !=
            0 ? (
              <h1 className="text-2xl sm:text-4xl font-semibold">
                {get_day_amount_between_dates(
                  leaveNotice.leave_notice_start_datetime,
                  leaveNotice.leave_notice_end_datetime
                )}{" "}
                days of leave.
              </h1>
            ) : (
              <h1 className="text-2xl sm:text-4xl font-semibold">
                1 day of leave.
              </h1>
            )}
          </div>
          {/* Student name */}
          <h1 className="text-lg sm:text-xl">
            <b className="text-lg sm:text-xl font-normal opacity-50">
              {leaveNotice.leave_notice_student_ID} :
            </b>{" "}
            {get_student_name_from_ID(
              leaveNotice.leave_notice_student_ID,
              students
            )}{" "}
            <b className="text-lg sm:text-xl font-normal opacity-50">
              :{" "}
              {get_student_classroom_from_ID(
                leaveNotice.leave_notice_student_ID,
                students
              )}
            </b>
          </h1>
          <h1 className="text-md sm:text-lg opacity-50">{`Document #${leaveNotice.leave_notice_ID}`}</h1>
        </div>
      </div>
      {/* Approval timeline */}
      <div className="mb-2">
        <LeaveNotice_approval_timeline leaveNotice={leaveNotice} />
      </div>
      {/* Teacher and head of department description */}
      <div className="grid grid-cols-2 mb-4">
        {/* Teacher description */}
        {leaveNotice.leave_notice_teacher_description != "" ? (
          <div className="col-span-1 flex flex-col w-full">
            <h1 className="text-md md:text-lg opacity-50 break-all">
              Teacher description
            </h1>
            <h1 className="text-lg md:text-2xl">
              {leaveNotice.leave_notice_teacher_description}
            </h1>
            <h1 className="text-md opacity-50">
              at{" "}
              {change_to_locale_date(
                leaveNotice.leave_notice_teacher_change_datetime
              )}
            </h1>
          </div>
        ) : null}
        {/* Head of department description */}
        {leaveNotice.leave_notice_head_description != "" ? (
          <div className="col-span-1 flex flex-col w-full">
            <h1 className="md:hidden text-md md:text-lg opacity-50 break-all">
              Head description
            </h1>
            <h1 className="hidden md:block text-md md:text-lg opacity-50 break-all">
              Head of department description
            </h1>
            <h1 className="text-lg md:text-2xl">
              {leaveNotice.leave_notice_head_description}
            </h1>
            <h1 className="text-md opacity-50">
              at{" "}
              {change_to_locale_date(
                leaveNotice.leave_notice_head_change_datetime
              )}
            </h1>
          </div>
        ) : null}
      </div>
      {/* Description and files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Attached file */}
        {leaveNotice.leave_notice_attached_file != "" ? (
          <div className="col-span-1 flex flex-col w-full">
            <h1 className="text-md md:text-lg opacity-50">Attached file</h1>
            <a
              download
              href={`${CDN_ENDPOINT}${leaveNotice.leave_notice_attached_file}`}
              target="_blank"
              className="text-lg md:text-2xl break-all hover:text-primary transition-all duration-150 ease-in-out">
              <i className="fa-solid fa-folder me-4"></i>File
            </a>
          </div>
        ) : null}
      </div>
      {/* Reason and dates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Reason of leave */}
        <div className="col-span-2 sm:col-span-1 flex flex-col">
          <h1 className="text-md md:text-lg opacity-50">Reason of leave</h1>
          <h1 className="text-lg md:text-2xl font-semibold">
            {LeaveNotice_Choice[leaveNotice.leave_notice_choice]}
          </h1>
        </div>
        {/* Time of submission */}
        <div className="col-span-1 flex flex-col">
          <h1 className="text-md md:text-lg opacity-50">Time of submission</h1>
          <h1
            className={`text-lg md:text-2xl font-semibold ${
              Day_Colors[
                get_day_from_date(leaveNotice.leave_notice_create_datetime)
              ]
            }`}>
            {change_to_locale_date(leaveNotice.leave_notice_create_datetime)}
          </h1>
        </div>
        {get_day_amount_between_dates(
          leaveNotice.leave_notice_start_datetime,
          leaveNotice.leave_notice_end_datetime
        ) -
          1 ==
        0 ? (
          /* Start date */
          <div className="col-span-1 sm:col-span-2 flex flex-col">
            <h1 className="text-md md:text-lg opacity-50">Date of leave</h1>
            <h1
              className={`text-lg md:text-2xl font-semibold ${
                Day_Colors[
                  get_day_from_date(leaveNotice.leave_notice_start_datetime)
                ]
              }`}>
              {change_to_locale_date(leaveNotice.leave_notice_start_datetime)} -{" "}
              {
                change_to_locale_date(
                  leaveNotice.leave_notice_end_datetime
                ).split(",")[1]
              }
            </h1>
          </div>
        ) : (
          <>
            {/* Start date */}
            <div className="flex flex-col">
              <h1 className="text-md md:text-lg opacity-50">Start date</h1>
              <h1
                className={`text-lg md:text-2xl font-semibold ${
                  Day_Colors[
                    get_day_from_date(leaveNotice.leave_notice_start_datetime)
                  ]
                }`}>
                {
                  change_to_locale_date(
                    leaveNotice.leave_notice_start_datetime
                  ).split(",")[0]
                }
              </h1>
            </div>
            {/* End date */}
            <div className="flex flex-col">
              <h1 className="text-md md:text-lg opacity-50">End date</h1>
              <h1
                className={`text-lg md:text-2xl font-semibold ${
                  Day_Colors[
                    get_day_from_date(leaveNotice.leave_notice_end_datetime)
                  ]
                }`}>
                {
                  change_to_locale_date(
                    leaveNotice.leave_notice_end_datetime
                  ).split(",")[0]
                }
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveNotices_modal_content;
