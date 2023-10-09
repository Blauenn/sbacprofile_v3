import { table_button_style } from "../../constants/styles/tables.style";

interface CurrentComponentProp {
  text?: string;
  icon?: string;
  color: string;
  functionToRun: () => void;
}

const Table_button = (props: CurrentComponentProp) => {
  const { text, icon, color, functionToRun } = props;

  return (
    <button
      onClick={() => {
        functionToRun();
      }}
      type="button"
      className={`${color} ${table_button_style}`}>
      {text ?? <i className={icon}></i>}
    </button>
  );
};

export default Table_button;
