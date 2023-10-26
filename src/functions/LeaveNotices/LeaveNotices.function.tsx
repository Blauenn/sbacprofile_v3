import { z } from "zod";
import { LeaveNotice } from "../../interfaces/common.interface";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

const validateLeaveNoticeObject = (
  leaveNoticeObject: any,
  setValidationErrors: any
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

  const validationErrors: any = {
    leave_notice_description: "",
  };

  const validationResult = LeaveNoticeSchema.safeParse(leaveNoticeObject);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "leave_notice_description":
          validationErrors.leave_notice_description =
            "The description should not be empty.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

const uploadLeaveNoticeFile = async (
  leaveNoticeFile: any,
  leaveNoticeFileName: any
) => {
  // Leave notice file //
  // Get the file object from the state. //
  const leaveNoticeCreateFile = new FormData();
  leaveNoticeCreateFile.append("image", leaveNoticeFile);
  leaveNoticeCreateFile.append("filename", `${leaveNoticeFileName}`);

  try {
    const result = await fetch(
      `${API_ENDPOINT}/api/v1/upload/image/leaveNotice`,
      {
        method: "post",
        body: leaveNoticeCreateFile,
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
};

export const handleLeaveNoticeCreate = async (
  leaveNoticeCreateObject: any,
  leaveNoticeFile: any,
  leaveNoticeFileName: string,
  setValidationErrors: any
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
      uploadLeaveNoticeFile(leaveNoticeFile, leaveNoticeFileName);
    }

    // Upload the leave notice information. //
    const leaveNoticeObject = {
      leave_notice_student_ID: leaveNoticeCreateObject.leave_notice_student_ID,
      leave_notice_description:
        leaveNoticeCreateObject.leave_notice_description,
      leave_notice_choice: leaveNoticeCreateObject.leave_notice_choice,
      leave_notice_start_datetime:
        leaveNoticeCreateObject.leave_notice_start_datetime,
      leave_notice_end_datetime:
        leaveNoticeCreateObject.leave_notice_end_datetime,
      leave_notice_create_datetime:
        leaveNoticeCreateObject.leave_notice_create_datetime,
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

export const handleLeaveNoticeUpdate = async (
  leaveNoticeOriginalObject: any,
  leaveNoticeUpdateObject: any,
  updateAs: number
  // Update as: //
  // 1. Teacher //
  // 2. Head of department //
) => {
  const currentDate = new Date();

  // Get the data to turn them into JSON to update. //
  let leaveNoticeToUpdateObject;
  // If head of department evaluates. //
  if (updateAs === 2) {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      leaveNoticeInfo: {
        // Updated values //
        leave_notice_teacher_ID:
          leaveNoticeOriginalObject.leave_notice_teacher_ID,
        leave_notice_teacher_status:
          leaveNoticeOriginalObject.leave_notice_teacher_status,
        leave_notice_teacher_description:
          leaveNoticeOriginalObject.leave_notice_teacher_description,
        leave_notice_teacher_change_datetime:
          leaveNoticeOriginalObject.leave_notice_teacher_change_datetime,
        // Retain previous values. //
        leave_notice_student_ID:
          leaveNoticeOriginalObject.leave_notice_student_ID,
        leave_notice_description:
          leaveNoticeOriginalObject.leave_notice_description,
        leave_notice_choice: leaveNoticeOriginalObject.leave_notice_choice,
        leave_notice_for_date: leaveNoticeOriginalObject.leave_notice_for_date,
        leave_notice_duration: leaveNoticeOriginalObject.leave_notice_duration,
        leave_notice_create_datetime:
          leaveNoticeOriginalObject.leave_notice_create_datetime,
        leave_notice_attached_file:
          leaveNoticeOriginalObject.leave_notice_attached_file,

        leave_notice_head_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_head_status: leaveNoticeUpdateObject.status,
        leave_notice_head_description: leaveNoticeUpdateObject.description,
        leave_notice_head_change_datetime: currentDate,
      },
    };
  }
  // If the teacher evaluates. //
  else {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      leaveNoticeInfo: {
        // Updated values //
        leave_notice_teacher_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_teacher_status: leaveNoticeUpdateObject.status,
        leave_notice_teacher_description: leaveNoticeUpdateObject.description,
        leave_notice_teacher_change_datetime: currentDate,
        // Retain previous values. //
        leave_notice_student_ID:
          leaveNoticeOriginalObject.leave_notice_student_ID,
        leave_notice_description:
          leaveNoticeOriginalObject.leave_notice_description,
        leave_notice_choice: leaveNoticeOriginalObject.leave_notice_choice,
        leave_notice_for_date: leaveNoticeOriginalObject.leave_notice_for_date,
        leave_notice_duration: leaveNoticeOriginalObject.leave_notice_duration,
        leave_notice_create_datetime:
          leaveNoticeOriginalObject.leave_notice_create_datetime,
        leave_notice_attached_file:
          leaveNoticeOriginalObject.leave_notice_attached_file,

        leave_notice_head_ID: leaveNoticeOriginalObject.leave_notice_head_ID,
        leave_notice_head_status:
          leaveNoticeOriginalObject.leave_notice_head_status,
        leave_notice_head_description:
          leaveNoticeOriginalObject.leave_notice_head_description,
        leave_notice_head_change_datetime:
          leaveNoticeOriginalObject.leave_notice_head_change_datetime,
      },
    };
  }
  const leaveNoticeJSON = JSON.stringify(leaveNoticeToUpdateObject);

  // Update the leaveNotice table with the corresponding info. //
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/forms/leaveNotice/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: leaveNoticeJSON,
      }
    );

    if (response.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// The text thats's to be used in the table. //
export const get_text_from_status_table = (
  leaveNotice: LeaveNotice,
  t: any
) => {
  const teacher_status = leaveNotice.leave_notice_teacher_status;
  const head_status = leaveNotice.leave_notice_head_status;

  switch (true) {
    // If the teacher approves. //
    case teacher_status === 2 && head_status === 1:
      return (
        <h1 className="font-semibold opacity-50">
          {t("LeaveNotices_status_head_pending")}...
        </h1>
      );
    // If the teachers ask for changes. //
    // or //
    // If head ask for changes. //
    case (teacher_status === 3 && head_status === 1) ||
      (teacher_status === 2 && head_status === 3):
      return (
        <h1 className="font-semibold text-yellow-500">
          {t("LeaveNotices_status_changesNeeded")}...
        </h1>
      );
    // If the teacher rejects. //
    case teacher_status === 4 && head_status === 1:
      return (
        <h1 className="font-semibold text-red-500">
          {t("LeaveNotices_status_teacher_rejected")}...
        </h1>
      );

    // If head rejects. //
    case teacher_status === 2 && head_status === 4:
      return (
        <h1 className="font-semibold text-red-500">
          {t("LeaveNotices_status_head_rejected")}...
        </h1>
      );

    // If both approves. //
    case teacher_status === 2 && head_status === 2:
      return (
        <h1 className="font-semibold text-green-500">
          {t("LeaveNotices_status_success")}
        </h1>
      );

    // If no action is taken. //
    default:
      return (
        <h1 className="font-semibold opacity-50">
          {t("LeaveNotices_status_teacher_pending")}...
        </h1>
      );
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
  if (status == 2) {
    return (
      <h1 className="hidden sm:block | font-semibold text-green-500 | text-sm sm:text-base">
        {t("LeaveNotices_status_timeline_success")}
      </h1>
    );
  } else if (status == 3) {
    return (
      <h1 className="hidden sm:block | font-semibold text-yellow-500 | text-sm sm:text-base">
        {t("LeaveNotices_status_timeline_changesNeeded")}
      </h1>
    );
  } else if (status == 4) {
    return (
      <h1 className="hidden sm:block | font-semibold text-red-500 | text-sm sm:text-base">
        {t("LeaveNotices_status_timeline_rejected")}
      </h1>
    );
  } else {
    return (
      <h1 className="hidden sm:block | font-semibold opacity-50 | text-sm sm:text-base">
        {t("LeaveNotices_status_timeline_pending")}
      </h1>
    );
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
