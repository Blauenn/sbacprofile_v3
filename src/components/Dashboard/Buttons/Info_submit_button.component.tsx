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
        isSubmitting ? "bg-gray-500" : "bg-primary hover:bg-violet-700"
      } text-white rounded-full px-6 py-2`}
      onClick={() => {
        onClickFunction();
      }}>
      <i className={`${icon} me-4`}></i>
      {text}
    </button>
  );
};

export default Info_submit_button;
