import { z } from "zod";
import { ValidationErrors } from "../../../interfaces/common.interface";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";
import { uploadFile } from "../../fileUpload.function";

const validateLeaveNoticeObject = (
  leaveNoticeObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const LeaveNoticeSchema = z.object({
    leave_notice_student_ID: z.number(),
    leave_notice_description: z.string().min(1),
    leave_notice_choice: z.number(),
    leave_notice_start_datetime: z.string().min(1),
    leave_notice_end_datetime: z.string().min(1),
    leave_notice_create_datetime: z.string().min(1),
    leave_notice_attached_file: z.string(),
  });

  const validationErrors: ValidationErrors = {
    leave_notice_description: "",
  };

  const validationResult = LeaveNoticeSchema.safeParse(leaveNoticeObject);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      if (issue.path[0] === "leave_notice_description") {
        validationErrors.leave_notice_description =
          "The description should not be empty.";
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

export const handleLeaveNoticeCreate = async (
  leaveNoticeCreateObject: any,
  leave_notice_student_ID: number,
  leaveNoticeFile: any,
  leaveNoticeFileName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  // Perform the validation //
  const validation = validateLeaveNoticeObject(
    leaveNoticeCreateObject,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Upload the file //
    if (leaveNoticeFile) {
      uploadFile(
        leaveNoticeFile,
        leaveNoticeFileName,
        "/api/v1/upload/file/leaveNotice"
      );
    }

    // Upload the leave notice information. //
    const leaveNoticeObject = {
      leave_notice_student_ID: leave_notice_student_ID,
      leave_notice_description:
        leaveNoticeCreateObject.leave_notice_description,
      leave_notice_choice: leaveNoticeCreateObject.leave_notice_choice,
      leave_notice_start_datetime:
        leaveNoticeCreateObject.leave_notice_start_datetime,
      leave_notice_end_datetime:
        leaveNoticeCreateObject.leave_notice_end_datetime,
      leave_notice_attached_file: leaveNoticeFile
        ? `/assets/files/leaveNotices/${leaveNoticeFileName}`
        : "",
    };
    const leaveNoticeJSON = JSON.stringify(leaveNoticeObject);

    // Add the data into the leave_notice table. //
    try {
      const result = await fetch(
        `${API_ENDPOINT}/api/v1/forms/leaveNotice/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: leaveNoticeJSON,
        }
      );
      const response = await result.json();

      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// The color that's to be used in the timeline. //
export const get_color_from_status_timeline = (
  status: number,
  type: string
) => {
  if (status == 2) {
    return type == "border" ? "border-green-500" : "text-green-500";
  } else if (status == 3) {
    return type == "border" ? "border-yellow-500" : "text-yellow-500";
  } else if (status == 4) {
    return type == "border" ? "border-red-500" : "text-red-500";
  } else if (status == 1) {
    return type == "border" ? null : "opacity-25";
  }
};
// The text that's to be used under the icons in the timeline. //
export const get_text_from_status_timeline = (status: number, t: any) => {
  if (status === 2) {
    return t("LeaveNotices_status_timeline_approved");
  } else if (status === 3) {
    return t("LeaveNotices_status_timeline_changesNeeded");
  } else if (status === 4) {
    return t("LeaveNotices_status_timeline_rejected");
  } else {
    return;
  }
};

// Check which date comes first. //
export const check_date_order = (firstDate: string, secondDate: string) => {
  // 1 = Date of the homeroom teacher. //
  // 2 = Date of the head of department. //

  if (firstDate > secondDate) {
    return 1;
  } else {
    return 2;
  }
};
