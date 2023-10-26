import { useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../custom/Custom_Modal";
import { getData } from "../../../functions/fetchFromAPI.function";
import RolodexModal_contacts from "./RolodexModalContacts.component";
import RolodexModal_image from "./RolodexModal_image.component";
import {
  Major_Name,
  Major_Name_German,
  Major_Name_Korean,
  Major_Name_Thai,
  Major_To_Background_Color,
  Major_To_Text_Color,
} from "../../../constants/Majors.constant";
import {
  Level_Name,
  Level_Name_German,
  Level_Name_Korean,
  Level_Name_Thai,
} from "../../../constants/Levels.constant";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

// Contexts //
import { useContext_Classrooms } from "../../../context/Classrooms.context";

interface CurrentComponentProp {
  profile: string;
  object: any;
  open: boolean;
  onModalClose: any;
}

const RolodexModal = (props: CurrentComponentProp) => {
  const { profile, object, open, onModalClose } = props;

  const { classrooms, setClassrooms } = useContext_Classrooms();

  const { t } = useTranslation();

  useEffect(() => {
    if (classrooms.length === 0) {
      // Classroom //
      getData(`${API_ENDPOINT}/api/v1/classroom`, (result: any) => {
        setClassrooms(result);
      });
    }
  }, []);

  // Only do checks if the profile is a teacher. //
  let matchedClassrooms;
  if (profile === "teacher") {
    const findClassroomByTeacherID = (teacherID: number, classrooms: any) => {
      const matchedClassrooms = classrooms.filter(
        (classroom: any) => classroom.classroom_homeroom_teacher === teacherID
      );

      if (matchedClassrooms.length > 0) {
        return matchedClassrooms.map(
          ({
            classroom_ID,
            classroom_level,
            classroom_class,
          }: {
            classroom_ID: number;
            classroom_level: number;
            classroom_class: number;
          }) => ({
            classroom_ID: classroom_ID,
            classroom_level: classroom_level,
            classroom_class: classroom_class,
          })
        );
      }

      return [{ classroom_ID: 0, classroom_level: 0, classroom_class: 0 }];
    };

    matchedClassrooms = findClassroomByTeacherID(object.ID, classrooms);
  }

  // Icons for the modal header to display. //
  let profileIcon;
  if (profile === "teacher") {
    profileIcon = "fa-solid fa-chalkboard-user";
  } else {
    profileIcon = "fa-solid fa-graduation-cap";
  }

  return (
    <Custom_Modal
      open={open}
      onModalClose={onModalClose}
      icon={profileIcon}
      title={
        i18n.language === "th"
          ? `${object.first_name_thai} ${object.last_name_thai}`
          : `${object.first_name} ${object.last_name}`
      }>
      <div className="flex flex-col lg:flex-row lg:gap-12 px-2">
        <div className="flex items-center flex-col gap-1 mb-4 | w-full lg:mb-0 lg:w-1/2">
          <RolodexModal_image
            image={object.image}
            majorColor={Major_To_Background_Color[object.major]}
          />
          <h1 className="font-semibold opacity-75">{object.ID}</h1>
        </div>
        <div className="flex justify-start items-start flex-col px-4 lg:px-0 lg:mt-4">
          <div className="flex flex-col gap-4">
            <div>
              {i18n.language === "th" ? (
                <>
                  <h1 className="text-2xl font-semibold mb-2">
                    {object.first_name_thai} {object.last_name_thai}
                  </h1>
                  <h1 className="text-xl">
                    {object.first_name} {object.last_name}
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold mb-2">
                    {object.first_name} {object.last_name}
                  </h1>
                  <h1 className="text-xl">
                    {object.first_name_thai} {object.last_name_thai}
                  </h1>
                </>
              )}
              {object.nickname && object.nickname_thai && (
                <h1 className="text-xl font-semibold mt-2">
                  {i18n.language === "th"
                    ? `${object.nickname_thai} · ${object.nickname}`
                    : `${object.nickname} · ${object.nickname_thai}`}
                </h1>
              )}
            </div>
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
            <div className="w-11/12 lg:w-full">
              <RolodexModal_contacts object={object} />
            </div>
          </div>
        </div>
      </div>
    </Custom_Modal>
  );
};

export default RolodexModal;
