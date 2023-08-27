import { LeaveNotice } from "../../interfaces/common.interface";

// The text thats's to be used in the table. //
export const getTextFromStatus_Table = (leaveNotice: LeaveNotice) => {
  const teacher_status = leaveNotice.leave_notice_teacher_status;
  const head_status = leaveNotice.leave_notice_head_status;

  switch (true) {
    // If the teacher approves. //
    case teacher_status === 2 && head_status === 1:
      return <h1 className="font-semibold opacity-50">Pending head...</h1>;
    // If the teachers ask for changes. //
    // or //
    // If head ask for changes. //
    case (teacher_status === 3 && head_status === 1) ||
      (teacher_status === 2 && head_status === 3):
      return (
        <h1 className="font-semibold text-yellow-500">Changes needed...</h1>
      );
    // If the teacher rejects. //
    case teacher_status === 4 && head_status === 1:
      return (
        <h1 className="font-semibold text-red-500">Rejected by teacher...</h1>
      );

    // If head rejects. //
    case teacher_status === 2 && head_status === 4:
      return (
        <h1 className="font-semibold text-red-500">Rejected by head...</h1>
      );

    // If both approves. //
    case teacher_status === 2 && head_status === 2:
      return <h1 className="font-semibold text-green-500">Success</h1>;

    // If no action is taken. //
    default:
      return <h1 className="font-semibold opacity-50">Pending teacher...</h1>;
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
export const getTextFromStatus_Timeline = (status: number) => {
  if (status == 2) {
    return (
      <h1 className="hidden sm:block | font-semibold text-green-500 | text-sm sm:text-base">
        Approved
      </h1>
    );
  } else if (status == 3) {
    return (
      <h1 className="hidden sm:block | font-semibold text-yellow-500 | text-sm sm:text-base">
        Changes needed...
      </h1>
    );
  } else if (status == 4) {
    return (
      <h1 className="hidden sm:block | font-semibold text-red-500 | text-sm sm:text-base">
        Rejected
      </h1>
    );
  } else {
    return (
      <h1 className="hidden sm:block | font-semibold opacity-50 | text-sm sm:text-base">
        Pending...
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
