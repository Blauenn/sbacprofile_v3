import { table_button_style } from "../../constants/styles/tables.style";

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
      className={`${color} ${table_button_style} ${extraClass}`}
      href={url}>
      {text ?? <i className={icon}></i>}
    </a>
  );
};

export default Table_button_download;
