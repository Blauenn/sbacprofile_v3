import { z } from "zod";
import { LeaveNotice } from "../../interfaces/common.interface";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

export const handleLeaveNoticeSubmit = async (
  leaveNoticeAddObject: any,
  leaveNoticeFile: any,
  leaveNoticeFileName: string,
  setValidationErrors: any,
  setIsSubmitting: any,
  setIsCreateSuccess: any,
  fetchLeaveNotice: any
) => {
  // Disable the submit button. //
  setIsSubmitting(true);

  const LeaveNoticeSchema = z.object({
    leave_notice_student_ID: z.number(),
    leave_notice_description: z.string().nonempty(),
    leave_notice_choice: z.number(),
    leave_notice_start_datetime: z.string().nonempty(),
    leave_notice_end_datetime: z.string().nonempty(),
    leave_notice_create_datetime: z.string().nonempty(),
    leave_notice_attached_file: z.string(),
  });

  const validationErrors: any = {
    leave_notice_description: "",
  };

  // Perform validation and collect error messages. //
  const validationResult = LeaveNoticeSchema.safeParse(leaveNoticeAddObject);

  // If validation fails. //
  // Don't submit. //
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
    setIsSubmitting(false);
    return;
  } else {
    setValidationErrors(validationErrors);
  }

  // If validation passes //
  // Get the data to turn them into JSON to create. //
  const leaveNoticeObject = {
    leave_notice_student_ID: leaveNoticeAddObject.leave_notice_student_ID,
    leave_notice_description: leaveNoticeAddObject.leave_notice_description,
    leave_notice_choice: leaveNoticeAddObject.leave_notice_choice,
    leave_notice_start_datetime:
      leaveNoticeAddObject.leave_notice_start_datetime,
    leave_notice_end_datetime: leaveNoticeAddObject.leave_notice_end_datetime,
    leave_notice_create_datetime:
      leaveNoticeAddObject.leave_notice_create_datetime,
    leave_notice_attached_file: leaveNoticeFile
      ? `/assets/files/leaveNotices/${leaveNoticeFileName}`
      : "",
  };
  const leaveNoticeJSON = JSON.stringify(leaveNoticeObject);

  // Leave notice file //
  // Get the file object from the state. //
  const leaveNoticeAddFile = new FormData();
  if (leaveNoticeFile != null) {
    leaveNoticeAddFile.append("image", leaveNoticeFile);
  }
  leaveNoticeAddFile.append("filename", `${leaveNoticeFileName}`);

  console.log(leaveNoticeJSON);
  console.log(leaveNoticeAddFile);

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
      setIsCreateSuccess(true);
      setIsSubmitting(false);
      fetchLeaveNotice();
    } else {
      setIsSubmitting(false);
      setIsCreateSuccess(false);
    }
  } catch (error) {
    console.log(error);
    setIsSubmitting(false);
    setIsCreateSuccess(false);
  }

  // Upload the file into the CDN. //
  try {
    const result = await fetch(
      `${API_ENDPOINT}/api/v1/upload/image/leaveNotice`,
      {
        method: "post",
        body: leaveNoticeAddFile,
      }
    );
    const response = await result.json();

    if (response) {
      setIsCreateSuccess(true);
    } else {
      setIsCreateSuccess(false);
    }
  } catch (error) {
    console.log(error);
    setIsCreateSuccess(false);
  }
};

// The text thats's to be used in the table. //
export const getTextFromStatus_Table = (leaveNotice: LeaveNotice, t: any) => {
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
export const getColorFromStatus_Timeline = (status: number, type: string) => {
  if (status == 2) {
    return type == "border" ? "border-green-500" : "text-green-500";
  } else if (status == 3) {
    return type == "border" ? "border-yellow-500" : "text-yellow-500";
  } else if (status == 4) {
    return type == "border" ? "border-red-500" : "text-red-500";
  } else if (status == 1) {
    return type == "border"
      ? "border-standardBlack border-opacity-25"
      : "opacity-25";
  }
};
// The text that's to be used under the icons in the timeline. //
export const getTextFromStatus_Timeline = (status: number, t: any) => {
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
export const checkDateOrder = (firstDate: string, secondDate: string) => {
  // 1 = Date of the homeroom teacher. //
  // 2 = Date of the head of department. //

  if (firstDate > secondDate) {
    return 1;
  } else {
    return 2;
  }
};
