// The text thats's to be used in the table. //
export const get_text_from_status_table = (
  teacher_status: number,
  head_status: number,
  t: any
) => {
  switch (true) {
    // If the teacher approves. //
    case teacher_status === 2 && head_status === 1:
      return (
        <h1 className="font-semibold opacity-50">
          {t("LeaveNotices_status_head_pending")}
        </h1>
      );
    // If the teachers ask for changes. //
    // or //
    // If head ask for changes. //
    case (teacher_status === 3 && head_status === 1) ||
      (teacher_status === 2 && head_status === 3):
      return (
        <h1 className="font-semibold text-yellow-500">
          {t("LeaveNotices_status_changesNeeded")}
        </h1>
      );
    // If the teacher rejects. //
    case teacher_status === 4 && head_status === 1:
      return (
        <h1 className="font-semibold text-red-500">
          {t("LeaveNotices_status_teacher_rejected")}
        </h1>
      );

    // If head rejects. //
    case teacher_status === 2 && head_status === 4:
      return (
        <h1 className="font-semibold text-red-500">
          {t("LeaveNotices_status_head_rejected")}
        </h1>
      );

    // If both approves. //
    case teacher_status === 2 && head_status === 2:
      return (
        <h1 className="font-semibold text-green-500">
          {t("LeaveNotices_status_approved")}
        </h1>
      );

    // If no action is taken. //
    default:
      return (
        <h1 className="font-semibold opacity-50">
          {t("LeaveNotices_status_teacher_pending")}
        </h1>
      );
  }
};
