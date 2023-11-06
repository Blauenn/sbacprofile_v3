import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  text: string;
  icon: string;
  color?: string;
  setModalOpen: any;
  fullWidth?: boolean;
}

const Info_create_button = (props: CurrentComponentProp) => {
  const { text, icon, color, setModalOpen, fullWidth } = props;

  return (
    <div className="grid grid-cols-4">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className={`${
          color ?? "border-primary hover:bg-primary text-primary"
        } ${
          fullWidth ? "col-span-4" : "col-span-4 md:col-span-2 xl:col-span-1"
        } border hover:text-white rounded-full px-4 py-2 w-full ${hover_transition}`}>
        <i className={`${icon} me-4`}></i>
        {text}
      </button>
    </div>
  );
};

export default Info_create_button;
