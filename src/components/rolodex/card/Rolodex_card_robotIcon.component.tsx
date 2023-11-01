import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const Rolodex_card_robotIcon = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("RolodexCard_robotMessage")} placement="bottom" arrow>
      <div className="absolute left-4 font-semibold opacity-50">
        <i className="fa-solid fa-robot me-2"></i>
      </div>
    </Tooltip>
  );
};

export default Rolodex_card_robotIcon;
