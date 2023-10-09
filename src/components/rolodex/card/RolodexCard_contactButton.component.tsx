import { Tooltip } from "@mui/material";
import { Major_To_Background_Color } from "../../../constants/Majors.constant";

interface CurrentComponentProp {
  title: string;
  major: number;
  icon: string;
}

const RolodexCard_contactButton = (props: CurrentComponentProp) => {
  const { title, major, icon } = props;

  const rolodex_contact_button_style = "flex justify-center items-center rounded-full p-4 | w-12 h-12 | 2xl:w-16 2xl:h-16";

  return (
    <>
      <Tooltip title={<h1 className="text-[1rem] p-2">{title}</h1>} arrow>
        <div
          className={`${rolodex_contact_button_style} ${Major_To_Background_Color[major]}`}>
          <i className={`${icon} text-white 2xl:text-xl`}></i>
        </div>
      </Tooltip>
    </>
  );
};

export default RolodexCard_contactButton;
