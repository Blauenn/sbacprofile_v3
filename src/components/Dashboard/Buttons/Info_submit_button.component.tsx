import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  text: string;
  successText: string;
  icon: string;
  color?: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  disabled?: boolean;
  onClickFunction: () => void;
}

const Info_submit_button = (props: CurrentComponentProp) => {
  const {
    text,
    successText,
    icon,
    color,
    isSubmitting,
    isSuccess,
    disabled,
    onClickFunction,
  } = props;

  return (
    <button
      type="button"
      disabled={disabled ?? (isSubmitting || isSuccess)}
      className={`${
        disabled || isSubmitting
          ? "border-gray-500 bg-gray-500 text-white"
          : isSuccess
          ? "border-green-500 text-green-500"
          : `${
              color ?? "border-primary hover:bg-primary text-primary"
            } hover:text-white`
      } border rounded-full px-6 py-2 ${hover_transition}`}
      onClick={() => {
        onClickFunction();
      }}>
      <i
        className={`${isSuccess ? "fa-solid fa-circle-check" : icon} me-4`}></i>
      {isSuccess ? successText : text}
    </button>
  );
};

export default Info_submit_button;
