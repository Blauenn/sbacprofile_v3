import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  Major_To_Text_Color,
  Major_Name_Thai,
  Major_Name_Korean,
  Major_Name_German,
  Major_Name,
} from "../../../../constants/Majors.constant";

interface CurrentComponentProp {
  club_name: string;
  club_major: number;
}

const Student_club_noClub_requestedClub = (props: CurrentComponentProp) => {
  const { club_name, club_major } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="opacity-50">{t("Student_club_requestedClub_title")}</h1>
      <h1
        className={`${Major_To_Text_Color[club_major]} text-2xl font-semibold mb-2`}>
        {club_name}
      </h1>
      <h1 className="opacity-50">
        {i18n.language === "th"
          ? Major_Name_Thai[club_major]
          : i18n.language === "ko"
          ? Major_Name_Korean[club_major]
          : i18n.language === "de"
          ? Major_Name_German[club_major]
          : Major_Name[club_major]}
      </h1>
    </div>
  );
};

export default Student_club_noClub_requestedClub;
