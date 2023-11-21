import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../custom/Custom_Modal";
import { Club, Teacher } from "../../../../interfaces/common.interface";
import {
  get_teacher_image_from_ID,
  get_teacher_major_from_ID,
  get_teacher_name_from_ID,
} from "../../../../functions/getFromID.function";
import { Major_To_Background_Color } from "../../../../constants/Majors.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { hover_transition } from "../../../../constants/styles/transitions.style";

// Contexts //
import { useContext_Teachers } from "../../../../context/Teachers.context";

interface CurrentComponentProp {
  club: Club;
  clubTeachers: number[];
  setClubTeachers: React.Dispatch<React.SetStateAction<number[]>>;
  open: boolean;
  onModalClose: () => void;
}

const change_button_style = `flex justify-center items-center bg-gray-500 opacity-50 w-[25px] h-[25px] rounded-full hover:opacity-100 ${hover_transition}`;

const Clubs_modal_update_teachers = (props: CurrentComponentProp) => {
  const { club, clubTeachers, setClubTeachers, open, onModalClose } = props;

  const { teachers, fetchTeachers } = useContext_Teachers();

  const { t } = useTranslation();

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, []);

  const filteredTeachersMajors = teachers.filter((teacher: Teacher) => {
    return teacher.teacher_major === club.club_major;
  });
  const filteredTeachers = filteredTeachersMajors.filter((teacher: Teacher) => {
    return !clubTeachers.includes(teacher.teacher_ID);
  });

  const addTeacher = (teacher_ID: number) => {
    if (!clubTeachers.includes(teacher_ID)) {
      const updatedClubTeachers = [...clubTeachers, teacher_ID];

      setClubTeachers(updatedClubTeachers);
    }
  };
  const removeTeacher = (teacher_ID: number) => {
    if (clubTeachers.includes(teacher_ID)) {
      const updatedClubTeachers = clubTeachers.filter(
        (id: number) => id !== teacher_ID
      );

      setClubTeachers(updatedClubTeachers);
    }
  };

  const handleSaveChanges = () => {
    onModalClose();
  };
  const handleModalClose = () => {
    onModalClose();
  };

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-chalkboard-user"
      title={t("Clubs_update_teachers_modal_header")}
      overflow>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">
            {t("Clubs_update_teachers_currentTeachers_label")}
          </h1>
          <div className="flex flex-col gap-2">
            {clubTeachers.length !== 0 ? (
              clubTeachers.map((teacher: number) => (
                <div
                  key={teacher}
                  className="flex flex-row justify-between items-center gap-4 border border-standardBlack border-opacity-25 rounded-3xl px-2 py-1">
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                        teacher,
                        teachers
                      )}`}
                      className={`w-[40px] h-[40px] rounded-full ${
                        Major_To_Background_Color[
                          get_teacher_major_from_ID(teacher, teachers)
                        ]
                      }`}
                    />
                    <h1 className="font-semibold">
                      {get_teacher_name_from_ID(teacher, teachers)}
                    </h1>
                  </div>
                  {/* Remove button */}
                  <div
                    onClick={() => {
                      removeTeacher(teacher);
                    }}
                    className={`${change_button_style} hover:bg-red-500`}>
                    <i className="fa-solid fa-minus text-white "></i>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="font-semibold opacity-50">
                {t("Clubs_crud_modal_noTeachers_message")}
              </h1>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">
            {t("Clubs_crud_modal_otherTeachers_label")}
          </h1>
          <div className="flex flex-col gap-2">
            {filteredTeachers.length !== 0 ? (
              filteredTeachers.map((teacher: Teacher) => (
                <div
                  key={teacher.teacher_ID}
                  className="flex flex-row justify-between items-center gap-4 border border-standardBlack border-opacity-25 rounded-3xl px-2 py-1">
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={`${CDN_ENDPOINT}${get_teacher_image_from_ID(
                        teacher.teacher_ID,
                        teachers
                      )}`}
                      className={`w-[40px] h-[40px] rounded-full ${
                        Major_To_Background_Color[
                          get_teacher_major_from_ID(
                            teacher.teacher_ID,
                            teachers
                          )
                        ]
                      }`}
                    />
                    <h1 className="font-semibold">
                      {get_teacher_name_from_ID(teacher.teacher_ID, teachers)}
                    </h1>
                  </div>
                  {/* Add button */}
                  <div
                    onClick={() => {
                      addTeacher(teacher.teacher_ID);
                    }}
                    className={`${change_button_style} hover:bg-green-500`}>
                    <i className="fa-solid fa-plus text-white"></i>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="font-semibold opacity-50">
                {t("Clubs_crud_modal_noTeachers_message")}
              </h1>
            )}
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          type="button"
          className={`border border-primary hover:bg-primary hover:text-white text-primary rounded-full px-6 py-2 ${hover_transition}`}>
          <i className="fa-solid fa-pencil me-4"></i>
          {t("Clubs_update_teachers_submit_button_title")}
        </button>
      </div>
    </Custom_Modal>
  );
};

export default Clubs_modal_update_teachers;
