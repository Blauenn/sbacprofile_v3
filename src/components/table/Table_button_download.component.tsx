import { style_table_button } from "../../constants/styles/tables.style";

interface CurrentComponentProp {
  text: string;
  color: string;
  url: string;
}

const Table_button_download = (props: CurrentComponentProp) => {
  const { text, color, url } = props;

  return (
    <a
      download
      target="_blank"
      className={`${color} ${style_table_button}`}
      href={url}>
      {text}
    </a>
  );
};

export default Table_button_download;
