import { style_table_button } from "../../constants/styles/tables.style";

interface CurrentComponentProp {
  text: string;
  color: string;
  functionToRun: () => void;
}

const Table_button = (props: CurrentComponentProp) => {
  const { text, color, functionToRun } = props;

  return (
    <button
      onClick={() => {
        functionToRun();
      }}
      type="button"
      className={`${color} ${style_table_button}`}>
      {text}
    </button>
  );
};

export default Table_button;
