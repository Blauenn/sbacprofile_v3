import { style_table_button } from "../../constants/styles/tables.style";

interface CurrentComponentProp {
  text?: string;
  icon?: string;
  color: string;
  extraClass?: string;
  url: string;
}

const Table_button_download = (props: CurrentComponentProp) => {
  const { text, icon, color, extraClass, url } = props;

  return (
    <a
      download
      target="_blank"
      className={`${color} ${style_table_button} ${extraClass}`}
      href={url}>
      {text ?? <i className={icon}></i>}
    </a>
  );
};

export default Table_button_download;
