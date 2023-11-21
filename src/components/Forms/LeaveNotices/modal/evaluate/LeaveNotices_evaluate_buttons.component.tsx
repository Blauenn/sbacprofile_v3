import { hover_transition } from "../../../../../constants/styles/transitions.style";

// TODO: MAKE THE TYPE WORKS //
interface CurrentComponentProp {
  leaveNoticeUpdateObject: any;
  setLeaveNoticeUpdateObject: any;
}

const LeaveNotices_evaluate_buttons = (props: CurrentComponentProp) => {
  const { leaveNoticeUpdateObject, setLeaveNoticeUpdateObject } = props;

  const evaluate_button_styles = `group flex justify-center items-center w-[80px] h-[80px] border-[8px] sm:w-[90px] sm:h-[90px] sm:border-[5px] rounded-full cursor-pointer border-gray-200 ${hover_transition}`;
  const evaluate_button_text_styles = `text-2xl sm:text-3xl text-gray-200 ${hover_transition}`;

  const evaluate_status = (status: number) => {
    setLeaveNoticeUpdateObject({
      ...leaveNoticeUpdateObject,
      status: status,
    });
  };

  return (
    <div className="flex flex-gap justify-around gap-2 sm:gap-4">
      {/* Approve */}
      <div
        onClick={() => evaluate_status(1)}
        className={`${evaluate_button_styles} hover:border-green-500 ${
          leaveNoticeUpdateObject.status === 1 ? "border-green-500" : null
        }`}>
        <i
          className={`${evaluate_button_text_styles} fa-solid fa-circle-check group-hover:text-green-500 ${
            leaveNoticeUpdateObject.status === 1 ? "text-green-500" : null
          }`}></i>
      </div>
      {/* Request edit */}
      <div
        onClick={() => evaluate_status(2)}
        className={`${evaluate_button_styles} hover:border-yellow-500 ${
          leaveNoticeUpdateObject.status === 2 ? "border-yellow-500" : null
        }`}>
        <i
          className={`${evaluate_button_text_styles} fa-solid fa-pencil group-hover:text-yellow-500 ${
            leaveNoticeUpdateObject.status === 2 ? "text-yellow-500" : null
          }`}></i>
      </div>
      {/* Reject */}
      <div
        onClick={() => evaluate_status(3)}
        className={`${evaluate_button_styles} hover:border-red-500 ${
          leaveNoticeUpdateObject.status === 3 ? "border-red-500" : null
        }`}>
        <i
          className={`${evaluate_button_text_styles} fa-solid fa-circle-xmark group-hover:text-red-500 ${
            leaveNoticeUpdateObject.status === 3 ? "text-red-500" : null
          }`}></i>
      </div>
    </div>
  );
};

export default LeaveNotices_evaluate_buttons;
