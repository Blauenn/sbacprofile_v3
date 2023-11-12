import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Text_Color,
} from "../../../../constants/Majors.constant";
import {
  Level_Name,
  Level_Name_German,
  Level_Name_Korean,
  Level_Name_Thai,
} from "../../../../constants/Levels.constant";

interface CurrentComponentProp {
  object: any;
  profile: string;
  matchedClassrooms: any;
}

const Rolodex_modal_majorAndClassroom = (props: CurrentComponentProp) => {
  const { object, profile, matchedClassrooms } = props;

  const { t } = useTranslation();

  return (
    <div>
      <h1
        className={`text-lg font-semibold ${
          Major_To_Text_Color[object.major]
        }`}>
        {i18n.language === "th"
          ? Major_Name_Thai[object.major]
          : i18n.language === "ko"
          ? Major_Name_Korean[object.major]
          : i18n.language === "de"
          ? Major_Name_German[object.major]
          : Major_Name[object.major]}
      </h1>
      {profile === "student" ? (
        <h1 className="text-lg">
          {t("profile_rolodex_studentClass", {
            level:
              i18n.language === "th"
                ? Level_Name_Thai[object.level]
                : i18n.language === "ko"
                ? Level_Name_Korean[object.level]
                : i18n.language === "de"
                ? Level_Name_German[object.level]
                : Level_Name[object.level],
            classroom: object.class,
          })}
        </h1>
      ) : (
        matchedClassrooms.map((matchedClassroom: any) =>
          matchedClassroom.classroom_ID != 0 ? (
            <h1 key={matchedClassroom.classroom_ID} className="text-lg">
              {t("profile_rolodex_teacherClass", {
                level:
                  i18n.language === "th"
                    ? Level_Name_Thai[matchedClassroom.classroom_level]
                    : i18n.language === "ko"
                    ? Level_Name_Korean[matchedClassroom.classroom_level]
                    : i18n.language === "de"
                    ? Level_Name_German[matchedClassroom.classroom_level]
                    : Level_Name[matchedClassroom.classroom_level],
                classroom: matchedClassroom.classroom_class,
              })}
            </h1>
          ) : (
            <h1 key={matchedClassroom.classroom_ID} className="text-lg">
              {t("profile_rolodex_noHomeroomClass")}
            </h1>
          )
        )
      )}
    </div>
  );
};

export default Rolodex_modal_majorAndClassroom;
