import { Tooltip } from "@mui/material";

const RolodexCard_robotIcon = () => {
  return (
    <Tooltip title="Artificial information." placement="bottom" arrow>
      <div className="absolute left-4 font-semibold opacity-75">
        <i className="fa-solid fa-robot me-2"></i>
      </div>
    </Tooltip>
  );
};

export default RolodexCard_robotIcon;
