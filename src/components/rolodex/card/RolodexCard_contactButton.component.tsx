import { Tooltip } from "@mui/material";
import { RolodexContactButton } from "../../../constants/styles/rolodex.style";
import { MajorToBackgroundColor } from "../../../constants/Majors.constant";

const RolodexCard_contactButton = (props: any) => {
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
