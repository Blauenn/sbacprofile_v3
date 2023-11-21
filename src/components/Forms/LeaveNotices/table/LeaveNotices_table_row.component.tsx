import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import { get_text_from_status_table } from "../../../../functions/Forms/formStatusCheck.function.tsx";
import {
  get_student_first_name_from_ID,
  get_student_first_name_thai_from_ID,
} from "../../../../functions/getFromID.function.ts";
import Table_button_download from "../../../table/Table_button_download.component.tsx";
import LeaveNotices_modal_delete from "../modal/LeaveNotices_modal_delete.component.tsx";
import Table_button from "../../../table/Table_button.component.tsx";
import LeaveNotices_modal from "../modal/LeaveNotices_modal.component.tsx";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS.ts";
import {
  LeaveNotice_Choice,
  LeaveNotice_Choice_Thai,
} from "../../../../constants/LeaveNotices.constant";
import { table_content_style } from "../../../../constants/styles/tables.style";
import { student_access_only } from "../../../../functions/permissionChecks.function.ts";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context.tsx";
import { useContext_Students } from "../../../../context/Students.context.tsx";

interface CurrentComponentProp {
  leaveNotice: LeaveNotice;
  index: number;
}

const LeaveNotices_table_row = (props: CurrentComponentProp) => {
  const { leaveNotice, index } = props;

  const { userInfo } = useContext_Account();
  const { students, fetchStudents } = useContext_Students();

  const { t } = useTranslation();

  let table_row_icon: string;
  switch (userInfo.profile_position) {
    case 3:
    case 4:
      table_row_icon = "fa-solid fa-check";
      break;
    default:
      table_row_icon = "fa-solid fa-eye";
      break;
  }

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const onViewModalClose = () => {
    setViewModalOpen(false);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const onDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <tr className={index % 2 === 1 ? "bg-gray-200" : ""}>
      {/* Leave notice index */}
      <td className={`${table_content_style}`}>
        <h1>{index}</h1>
      </td>
      {/* Leave notice student */}
      <td className={`${table_content_style} | hidden md:table-cell`}>
        <h1>
          {i18n.language === "th"
            ? get_student_first_name_thai_from_ID(
                leaveNotice.leave_notice_student_ID,
                students
              )
            : get_student_first_name_from_ID(
                leaveNotice.leave_notice_student_ID,
                students
              )}
        </h1>
      </td>
      {/* Leave notice choice */}
      <td className={`${table_content_style} | hidden md:table-cell`}>
        {i18n.language === "th"
          ? LeaveNotice_Choice_Thai[leaveNotice.leave_notice_choice]
          : LeaveNotice_Choice[leaveNotice.leave_notice_choice]}
      </td>
      {/* Leave notice status */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        {get_text_from_status_table(
          leaveNotice.leave_notice_teacher_status,
          leaveNotice.leave_notice_head_status,
          t
        )}
      </td>
      {/* Buttons */}
      <td className={table_content_style}>
        <div className="flex gap-x-4">
          <div className="flex gap-x-2">
            {/* View info button */}
            <LeaveNotices_modal
              leaveNotice={leaveNotice}
              open={viewModalOpen}
              onModalClose={onViewModalClose}
            />
            <Table_button
              icon={table_row_icon}
              color="bg-blue-500"
              functionToRun={() => {
                setViewModalOpen(true);
              }}
            />
            {/* View file button */}
            {leaveNotice.leave_notice_attached_file != "" ? (
              <Table_button_download
                icon="fa-solid fa-folder"
                color="bg-purple-500"
                url={`${CDN_ENDPOINT}${leaveNotice.leave_notice_attached_file}`}
              />
            ) : null}
          </div>
          {student_access_only(userInfo.profile_position) ? (
            <>
              {/* Delete info button */}
              <LeaveNotices_modal_delete
                leaveNotice={leaveNotice}
                open={deleteModalOpen}
                onModalClose={onDeleteModalClose}
              />
              <Table_button
                icon="fa-solid fa-trash-can"
                color="bg-red-500"
                functionToRun={() => {
                  setDeleteModalOpen(true);
                }}
              />
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default LeaveNotices_table_row;
