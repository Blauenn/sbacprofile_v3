import { get_student_major_from_ID } from "../../functions/getFromID.function";

// Contexts //
import { useContext_Students } from "../../context/Students.context";
import {
  Major_To_Background_Color,
  Major_To_Border_Color,
  Major_To_Text_Color,
} from "../../constants/Majors.constant";
import { hover_transition } from "../../constants/styles/transitions.style";

interface CurrentComponentProp {
  leaveNotice: any;
  functionToRun: () => void;
}

const LeaveNotices_evaluate_button = (props: CurrentComponentProp) => {
  const { leaveNotice, functionToRun } = props;

  const { students } = useContext_Students();

  const studentMajor = get_student_major_from_ID(
    leaveNotice.leave_notice_student_ID,
    students
  );

  return (
    <div>
      <button
        className={`border ${Major_To_Border_Color[studentMajor]} ${Major_To_Text_Color[studentMajor]} hover:${Major_To_Background_Color[studentMajor]} hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
        onClick={() => {
          functionToRun();
        }}>
        Evaluate
      </button>
    </div>
  );
};

export default LeaveNotices_evaluate_button;
