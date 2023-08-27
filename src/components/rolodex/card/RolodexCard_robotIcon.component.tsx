import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const RolodexCard_robotIcon = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("Students_rolodexCard_robotMessage")} placement="bottom" arrow>
      <div className="absolute left-4 font-semibold opacity-75">
        <i className="fa-solid fa-robot me-2"></i>
      </div>
    </Tooltip>
  );
};

export default RolodexCard_robotIcon;
