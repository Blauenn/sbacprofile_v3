import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Club } from "../../interfaces/common.interface";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Text_Color,
} from "../../constants/Majors.constant";

interface CurrentComponentProp {
  selfClubInformation: Club;
}

const Club_clubName = (props: CurrentComponentProp) => {
  const { selfClubInformation } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <h1 className="opacity-50">{t("Teacher_club_currentClub_title")}</h1>
      <h1
        className={`${
          Major_To_Text_Color[selfClubInformation.club_major]
        } text-2xl font-semibold mb-2`}>
        {selfClubInformation.club_name}
      </h1>
      <h1 className="opacity-50">
        {i18n.language === "th"
          ? Major_Name_Thai[selfClubInformation.club_major]
          : i18n.language === "ko"
          ? Major_Name_Korean[selfClubInformation.club_major]
          : i18n.language === "de"
          ? Major_Name_German[selfClubInformation.club_major]
          : Major_Name[selfClubInformation.club_major]}
      </h1>
    </div>
  );
};

export default Club_clubName;
