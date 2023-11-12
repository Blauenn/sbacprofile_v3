import { useTranslation } from "react-i18next";
import PageHeader from "../components/misc/common/PageHeader.component";
import Clubs_rolodex from "../components/Clubs/Clubs_rolodex.component";

const Clubs = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader icon="fa-solid fa-puzzle-piece" text={t("Clubs_header")} />

      {/* Rolodex */}
      <Clubs_rolodex />
    </div>
  );
};

export default Clubs;
