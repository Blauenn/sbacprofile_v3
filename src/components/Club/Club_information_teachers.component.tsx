import { useEffect } from "react";
import i18n from "i18next";
import { ClubManager } from "../../interfaces/common.interface";
import { teacher_check } from "../../functions/miscellaneous.function";
import {
    get_teacher_image_from_ID,
    get_teacher_major_from_ID,
    get_teacher_name_thai_from_ID,
    get_teacher_name_from_ID,
} from "../../functions/getFromID.function";
import { Major_To_Background_Color } from "../../constants/Majors.constant";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

// Contexts //
import { useContext_Teachers } from "../../context/Teachers.context";

interface CurrentComponentProp {
  clubTeachers: ClubManager[];
  title: string;
}

const Club_information_teachers = (props: CurrentComponentProp) => {
  const { clubTeachers, title } = props;

  const { teachers, fetchTeachers } = useContext_Teachers();

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="opacity-50">{title}</h1>
      <div className="flex flex-col gap-2">
        {clubTeachers.map((clubManager: ClubManager) =>
          // Only show the teacher that exists. //
          teacher_check(clubManager.club_manager_teacher_ID, teachers) ? (
            <div
              key={clubManager.club_manager_teacher_ID}
              className="flex flex-row items-center gap-4">
              <img
                src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                  clubManager.club_manager_teacher_ID,
                  teachers
                )}`}
                className={`${
                  Major_To_Background_Color[
                    get_teacher_major_from_ID(
                      clubManager.club_manager_teacher_ID,
                      teachers
                    )
                  ]
                } w-[32px] h-[32px] rounded-full`}
              />
              <h1 className="line-clamp-1">
                {i18n.language === "th"
                  ? get_teacher_name_thai_from_ID(
                      clubManager.club_manager_teacher_ID,
                      teachers
                    )
                  : get_teacher_name_from_ID(
                      clubManager.club_manager_teacher_ID,
                      teachers
                    )}
              </h1>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Club_information_teachers;
