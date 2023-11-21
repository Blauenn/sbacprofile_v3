import { Tooltip } from "@mui/material";
import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  functionToRun: () => void;
  isSubmitting: boolean;
  title: string;
  icon: string;
  color: string;
  textColor: string;
}

const approve_request_button_style = `flex justify-center items-center group rounded-full w-[25px] h-[25px] ${hover_transition} cursor-pointer`;
const approve_request_button_text_style = `text-sm group-hover:text-white ${hover_transition}`;

const Club_student_interact_button = (props: CurrentComponentProp) => {
  const { functionToRun, isSubmitting, title, icon, color, textColor } = props;

  return (
    <Tooltip title={title} placement="top" arrow>
      <div
        onClick={() => {
          functionToRun();
        }}
        className={`${approve_request_button_style} ${
          isSubmitting ? "bg-gray-500" : color
        }`}>
        <i
          className={`${approve_request_button_text_style} ${icon} ${
            isSubmitting ? "text-white" : textColor
          }`}></i>
      </div>
    </Tooltip>
  );
};

export default Club_student_interact_button;
