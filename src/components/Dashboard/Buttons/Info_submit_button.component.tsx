import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  text: string;
  icon: string;
  isSubmitting: boolean;
  onClickFunction: () => void;
}

const Info_submit_button = (props: CurrentComponentProp) => {
  const { text, icon, isSubmitting, onClickFunction } = props;

  return (
    <button
      type="button"
      disabled={isSubmitting}
      className={`${
        isSubmitting
          ? "border border-gray-500 bg-gray-500 text-white"
          : "border border-primary hover:bg-primary text-primary hover:text-white"
      }  rounded-full px-6 py-2 ${hover_transition}`}
      onClick={() => {
        onClickFunction();
      }}>
      <i className={`${icon} me-4`}></i>
      {text}
    </button>
  );
};

export default Info_submit_button;
