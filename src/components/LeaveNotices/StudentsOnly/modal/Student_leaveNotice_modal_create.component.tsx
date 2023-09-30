import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FileIcon } from "react-file-icon";
import {
  TextField_multiline,
  TextField_select,
} from "../../../custom/Custom_TextFields.tsx";
import Custom_Modal from "../../../custom/Custom_Modal.tsx";
import { LeaveNotice } from "../../../../interfaces/common.interface";
import {
  handleFileInputChange,
} from "../../../../functions/fields/handleFieldChanges.function";
import { getData } from "../../../../functions/fetchFromAPI.function";
import { handleLeaveNoticeSubmit } from "../../../../functions/LeaveNotice/LeaveNotice.function.tsx";
import Info_submit_button from "../../../Dashboard/Buttons/Info_submit_button.component";
import Info_addSuccess_message from "../../../Dashboard/Buttons/Info_success_message.component.tsx";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS.ts";

interface CurrentComponentProp {
  setLeaveNotices: any;
  userProfileID: number;
  open: boolean;
  onModalClose: any;
}

const Student_leaveNotice_modal_create = (props: CurrentComponentProp) => {
  const { setLeaveNotices, userProfileID, open, onModalClose } = props;

  const { t } = useTranslation();

  const [leaveNoticeAddObject, setLeaveNoticeAddObject] = useState<LeaveNotice>(
    {
      leave_notice_student_ID: userProfileID,
      leave_notice_description: "",
      leave_notice_choice: 1,
      leave_notice_start_datetime: "",
      leave_notice_end_datetime: "",
      leave_notice_duration: 3,
      leave_notice_create_datetime: "",
      leave_notice_attached_file: "",
      leave_notice_teacher_ID: 0,
      leave_notice_teacher_status: 1,
      leave_notice_teacher_description: "",
      leave_notice_teacher_change_datetime: "",
      leave_notice_head_ID: 0,
      leave_notice_head_status: 1,
      leave_notice_head_description: "",
      leave_notice_head_change_datetime: "",
    }
  );
  const [leaveNoticeFile, setLeaveNoticeFile] = useState(null);
  const [leaveNoticeFileName, setLeaveNoticeFileName] = useState("");
  const [fileSizeNotice, setFileSizeNotice] = useState(false);
  // To store any validation errors. //
  const [validationErrors, setValidationErrors] = useState({
    leave_notice_description: "",
  });

  const [leaveDuration, setLeaveDuration] = useState(3);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleLeaveDurationChange = (event: any) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLeaveDuration(selectedValue);
  };

  const fetchLeaveNotice = () => {
    getData(`${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`, (result: any) =>
      setLeaveNotices(result)
    );
  };

  // Clear all values when the modal is closed. //
  const handleModalClose = () => {
    setLeaveNoticeAddObject({
      leave_notice_student_ID: 0,
      leave_notice_description: "",
      leave_notice_choice: 1,
      leave_notice_start_datetime: "",
      leave_notice_end_datetime: "",
      leave_notice_duration: 3,
      leave_notice_create_datetime: "",
      leave_notice_attached_file: "",
      leave_notice_teacher_ID: 0,
      leave_notice_teacher_status: 1,
      leave_notice_teacher_description: "",
      leave_notice_teacher_change_datetime: "",
      leave_notice_head_ID: 0,
      leave_notice_head_status: 1,
      leave_notice_head_description: "",
      leave_notice_head_change_datetime: "",
    });
    setLeaveNoticeFile(null);
    setLeaveNoticeFileName("");
    setFileSizeNotice(false);
    setValidationErrors({ leave_notice_description: "" });
    setLeaveDuration(3);
    setStartDate(dayjs());
    setEndDate(dayjs().add(1, "day"));
    setIsCreateSuccess(false);
    setIsSubmitting(false);
    onModalClose();
  };

  // Put the value in the state into the object and submit. //
  const setObjectAndSubmit = () => {
    let startDateForUpload: string;
    let endDateForUpload: string;

    if (leaveDuration === 1 || leaveDuration === 2 || leaveDuration === 3) {
      const startDateUnchanged = new Date(startDate.toString());
      const endDateUnchanged = new Date(startDate.toString());

      switch (leaveDuration) {
        case 1:
          startDateUnchanged.setHours(8, 30, 0); // 08:30 //
          endDateUnchanged.setHours(12, 50, 0); // 12:50 //
          break;

        case 2:
          startDateUnchanged.setHours(12, 50, 0); // 12:50 //
          endDateUnchanged.setHours(16, 30, 0); // 16:30 //
          break;

        case 3:
          startDateUnchanged.setHours(8, 30, 0); // 08:30 //
          endDateUnchanged.setHours(16, 30, 0); // 16:30 //
          break;

        default:
          break;
      }
      startDateForUpload = startDateUnchanged.toISOString();
      endDateForUpload = endDateUnchanged.toISOString();
    } else if (leaveDuration === 4) {
      const startDateUnchanged = new Date(startDate.toString());
      const endDateUnchanged = new Date(endDate.toString());

      startDateUnchanged.setHours(8, 30, 0); // 08:30 //
      endDateUnchanged.setHours(16, 30, 0); // 16:30 //

      startDateForUpload = startDateUnchanged.toISOString();
      endDateForUpload = endDateUnchanged.toISOString();
    }

    const currentDateForUpload = dayjs().toISOString(); // Current datetime //

    // Parse leave_notice_choice to a number //
    const leaveNoticeChoiceAsNumber = parseInt(
      leaveNoticeAddObject.leave_notice_choice.toString(),
      10
    );

    // Put all the value in other states into the...
    // main state to submit. //
    setLeaveNoticeAddObject((prevLeaveNotice) => ({
      ...prevLeaveNotice,
      leave_notice_choice: leaveNoticeChoiceAsNumber,
      leave_notice_start_datetime: startDateForUpload,
      leave_notice_end_datetime: endDateForUpload,
      leave_notice_create_datetime: currentDateForUpload,
    }));

    handleLeaveNoticeSubmit(
      leaveNoticeAddObject,
      leaveNoticeFile,
      leaveNoticeFileName,
      setValidationErrors,
      setIsSubmitting,
      setIsCreateSuccess,
      fetchLeaveNotice
    );
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-plus"
      title={t("LeaveNotices_students_create_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        {/* Leave duration */}
        <TextField
          label={t("LeaveNotices_students_create_modal_leaveDuration_label")}
          name="leave_notice_duration"
          className="col-span-1"
          select
          defaultValue={leaveDuration}
          SelectProps={{ native: true }}
          onChange={(event) => {
            handleLeaveDurationChange(event);
          }}>
          <option value="1">
            {t("LeaveNotices_students_create_modal_leaveDuration_option1")}
          </option>
          <option value="2">
            {t("LeaveNotices_students_create_modal_leaveDuration_option2")}
          </option>
          <option value="3">
            {t("LeaveNotices_students_create_modal_leaveDuration_option3")}
          </option>
          <option value="4">
            {t("LeaveNotices_students_create_modal_leaveDuration_option4")}
          </option>
        </TextField>
        {/* Date of leave */}
        {leaveDuration != 4 ? (
          // Either morning, afternoon or entire day is selected //
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t("LeaveNotices_students_create_modal_dateOfLeave_label")}
              className="col-span-1"
              value={startDate}
              onChange={(newValue) => setStartDate(dayjs(newValue))}
            />
          </LocalizationProvider>
        ) : (
          //  Longer is selected //
          //  Dates //
          <div className="col-span-1 flex flex-row items-center gap-4">
            {/* Start date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("LeaveNotices_students_create_modal_startDate_label")}
                value={startDate}
                onChange={(newValue) => setStartDate(dayjs(newValue))}
              />
            </LocalizationProvider>
            <i className="fa-solid fa-arrow-right"></i>
            {/* End date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("LeaveNotices_students_create_modal_endDate_label")}
                value={endDate}
                onChange={(newValue) => setEndDate(dayjs(newValue))}
              />
            </LocalizationProvider>
          </div>
        )}
        {/* Leave choice */}
        <TextField_select
          label={t("LeaveNotices_students_create_modal_leaveChoice_label")}
          name="leave_notice_choice"
          className="col-span-1"
          object={leaveNoticeAddObject}
          setObject={setLeaveNoticeAddObject}
          value="1"
          validation="">
          <option value="1">
            {t("LeaveNotices_students_create_modal_leaveChoice_option1")}
          </option>
          <option value="2">
            {t("LeaveNotices_students_create_modal_leaveChoice_option2")}
          </option>
          <option value="3">
            {t("LeaveNotices_students_create_modal_leaveChoice_option3")}
          </option>
        </TextField_select>
        {/* Description */}
        <TextField_multiline
          label={t("LeaveNotices_students_create_modal_description_label")}
          name="leave_notice_description"
          className="col-span-1"
          maxRows={4}
          object={leaveNoticeAddObject}
          setObject={setLeaveNoticeAddObject}
          validation={validationErrors.leave_notice_description}
        />
        {/* File */}
        <div className="flex flex-col gap-2">
          <div className="border border-standardBlack border-opacity-25 rounded-xl w-full h-[100px]">
            <label htmlFor="leave_notice_attached_file">
              {leaveNoticeFile ? (
                <>
                  <div className="flex flex-row justify-center items-center gap-4 w-full h-full px-8">
                    <div className="w-[75px]">
                      <FileIcon
                        extension={leaveNoticeFileName.split(".").pop()}
                        color="pink"
                      />
                    </div>
                    <h1 className="text-xl truncate">{leaveNoticeFileName}</h1>
                  </div>
                  <input
                    type="file"
                    name="leave_notice_attached_file"
                    id="leave_notice_attached_file"
                    hidden
                    onChange={(event) => {
                      handleFileInputChange(
                        'input[name="leave_notice_attached_file"]',
                        event,
                        setLeaveNoticeFile,
                        setLeaveNoticeFileName,
                        setFileSizeNotice
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="flex flex-row justify-center items-center gap-4 w-full h-full">
                    <i className="fa-solid fa-folder text-4xl"></i>
                    <h1 className="text-xl">
                      {t("LeaveNotices_students_create_modal_file_label")}
                    </h1>
                  </div>
                  <input
                    type="file"
                    name="leave_notice_attached_file"
                    id="leave_notice_attached_file"
                    hidden
                    onChange={(event) => {
                      handleFileInputChange(
                        'input[name="leave_notice_attached_file"]',
                        event,
                        setLeaveNoticeFile,
                        setLeaveNoticeFileName,
                        setFileSizeNotice
                      );
                    }}
                  />
                </>
              )}
            </label>
          </div>
          {fileSizeNotice && (
            <h1 className="text-sm text-red-500 mb-2">
              {t(
                "LeaveNotices_students_create_modal_file_fileSizeNotice_message"
              )}
            </h1>
          )}
        </div>
        {/* Submit button */}
        <Info_submit_button
          text={t("LeaveNotices_students_create_modal_submit_button_title")}
          icon="fa-solid fa-flag"
          isSubmitting={isSubmitting}
          onClickFunction={setObjectAndSubmit}
        />
        {/* Success message */}
        <Info_addSuccess_message
          message={t(
            "LeaveNotices_students_create_modal_submit_success_message"
          )}
          isSuccess={isCreateSuccess}
        />
      </div>
    </Custom_Modal>
  );
};

export default Student_leaveNotice_modal_create;
