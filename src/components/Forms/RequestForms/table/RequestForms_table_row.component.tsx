import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestForm } from "../../../../interfaces/common.interface.ts";
import { get_text_from_status_table } from "../../../../functions/Forms/formStatusCheck.function.tsx";
import {
  change_to_locale_date,
  get_day_from_date,
} from "../../../../functions/getDates.function.ts";
import { student_access_only } from "../../../../functions/permissionChecks.function.ts";
import Table_button from "../../../table/Table_button.component.tsx";
import Table_button_download from "../../../table/Table_button_download.component.tsx";
import RequestForms_modal_delete from "../modal/RequestForms_modal_delete.component.tsx";
import RequestForms_modal from "../modal/RequestForms_modal.component.tsx";
import { Day_Colors } from "../../../../constants/Misc.constant.ts";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS.ts";
import { table_content_style } from "../../../../constants/styles/tables.style.tsx";

// Contexts //
import { useContext_Account } from "../../../../context/Account.context.tsx";

interface CurrentComponentProp {
  requestForm: RequestForm;
  index: number;
}

const RequestForms_table_row = (props: CurrentComponentProp) => {
  const { requestForm, index } = props;

  const { userInfo } = useContext_Account();

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

  const dayColor_createDateTime =
    Day_Colors[get_day_from_date(requestForm.request_form_create_datetime)];
  const localeDate_createDateTime = change_to_locale_date(
    requestForm.request_form_create_datetime
  ).split(",")[0];

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
      {/* Request form index */}
      <td className={`${table_content_style}`}>
        <h1>{index}</h1>
      </td>
      {/* Request form submit date */}
      <td
        className={`${table_content_style} | hidden lg:table-cell ${dayColor_createDateTime}`}>
        <h1>{localeDate_createDateTime}</h1>
      </td>
      {/* Request form title */}
      <td className={`${table_content_style} | hidden md:table-cell`}>
        <h1 className="line-clamp-1">{requestForm.request_form_title}</h1>
      </td>
      {/* Request form status */}
      <td className={`${table_content_style} | hidden sm:table-cell`}>
        {get_text_from_status_table(
          requestForm.request_form_teacher_status,
          requestForm.request_form_head_status,
          t
        )}
      </td>
      {/* Buttons */}
      <td className={table_content_style}>
        <div className="flex gap-x-4">
          <div className="flex gap-x-2">
            {/* View info button */}
            <RequestForms_modal
              requestForm={requestForm}
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
            <div className="hidden md:flex items-center">
              {/* View file button */}
              {requestForm.request_form_attached_file != "" ? (
                <Table_button_download
                  icon="fa-solid fa-folder"
                  color="bg-purple-500"
                  url={`${CDN_ENDPOINT}${requestForm.request_form_attached_file}`}
                />
              ) : null}
            </div>
          </div>
          {student_access_only(userInfo.profile_position) ? (
            <>
              {/* Delete info button */}
              <RequestForms_modal_delete
                requestForm={requestForm}
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

export default RequestForms_table_row;
