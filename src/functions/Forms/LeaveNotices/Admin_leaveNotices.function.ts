import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const handleLeaveNoticeUpdate = async (
  leaveNoticeOriginalObject: any,
  leaveNoticeUpdateObject: any,
  updateAs: number
  // Update as: //
  // 1. Teacher //
  // 2. Student //
  // 3. Head of department //
) => {
  const currentDate = new Date();

  // Get the data to turn them into JSON to update. //
  let leaveNoticeToUpdateObject;
  // If head of department evaluates. //
  if (updateAs === 3) {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      updateAs: 3,
      leaveNoticeInfo: {
        leave_notice_head_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_head_status: leaveNoticeUpdateObject.status,
        leave_notice_head_description: leaveNoticeUpdateObject.description,
        leave_notice_head_change_datetime: currentDate,
      },
    };
  }
  // If the teacher evaluates. //
  else if (updateAs === 2) {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      updateAs: 2,
      leaveNoticeInfo: {
        // Updated values //
        leave_notice_teacher_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_teacher_status: leaveNoticeUpdateObject.status,
        leave_notice_teacher_description: leaveNoticeUpdateObject.description,
        leave_notice_teacher_change_datetime: currentDate,
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

export const handleLeaveNoticeDelete = async (leave_notice_ID: number) => {
  const leaveNoticeToDelete = {
    id: leave_notice_ID,
  };
  const leaveNoticeToDeleteJSON = JSON.stringify(leaveNoticeToDelete);

  // Delete the leave notice //
  try {
    const result = await fetch(
      `${API_ENDPOINT}/api/v1/forms/leaveNotice/delete`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: leaveNoticeToDeleteJSON,
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
