import { style_table_button } from "../../constants/styles/tables.style";

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
      className={`${color} ${style_table_button}`}>
      {text ?? <i className={icon}></i>}
    </button>
  );
};

export default Table_button;
