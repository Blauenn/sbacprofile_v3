import { Tooltip } from "@mui/material";
import { MajorToBackgroundColor } from "../../../constants/Majors.constant";
import { RolodexContactButton } from "../../../constants/styles/rolodex.style";

interface CurrentComponentProp {
  title: string;
  major: number;
  icon: string;
}

const RolodexCard_contactButton = (props: CurrentComponentProp) => {
  const { title, major, icon } = props;

  return (
    <>
      <Tooltip title={<h1 className="text-[1rem] p-2">{title}</h1>} arrow>
        <div
          className={`${RolodexContactButton} ${MajorToBackgroundColor[major]}`}>
          <i className={`${icon} text-white 2xl:text-xl`}></i>
        </div>
      </Tooltip>
    </>
  );
};

export default RolodexCard_contactButton;
