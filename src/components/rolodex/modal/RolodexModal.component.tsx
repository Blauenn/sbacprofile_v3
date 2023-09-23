import { useEffect } from "react";
import { createPortal } from "react-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { getData } from "../../../functions/fetchFromAPI.function";
import ModalCloseButton from "../../misc/common/ModalCloseButton.component";
import RolodexModal_contacts from "./RolodexModalContacts.component";
import RolodexModal_image from "./RolodexModal_image.component";
import {
  MajorName,
  MajorNameGerman,
  MajorNameKorean,
  MajorNameThai,
  MajorToBackgroundColor,
  MajorToTextColor,
} from "../../../constants/Majors.constant";
import {
  LevelName,
  LevelNameGerman,
  LevelNameKorean,
  LevelNameThai,
} from "../../../constants/Levels.constant";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";
import { style_modal_parent } from "../../../constants/styles/modal.style";

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

  const modal = document.getElementById("modal");

  return modal
    ? createPortal(
        <>
          <Modal
            open={open}
            onClose={onModalClose}
            className="flex justify-center items-center"
            sx={{ backdropFilter: "blur(2px)" }}>
            <div className={style_modal_parent}>
              <ModalCloseButton functionToRun={onModalClose} />
              <div className="flex flex-col lg:flex-row py-8 px-4 w-full lg:gap-x-4">
                <div className="flex items-center flex-col gap-1 mb-4 | w-full lg:mb-0 lg:w-1/2">
                  <RolodexModal_image
                    image={object.image}
                    majorColor={MajorToBackgroundColor[object.major]}
                  />
                  <h1 className="font-semibold opacity-75">{object.ID}</h1>
                </div>
                <div className="flex justify-start items-start flex-col px-4 lg:px-0 lg:mt-4">
                  <div className="mb-4 lg:mb-8">
                    {i18n.language === "th" ? (
                      <>
                        <h1 className="text-3xl font-semibold mb-2">
                          {object.first_name_thai} {object.last_name_thai}
                        </h1>
                        <h1 className="text-2xl">
                          {object.first_name} {object.last_name}
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-semibold mb-2">
                          {object.first_name} {object.last_name}
                        </h1>
                        <h1 className="text-2xl">
                          {object.first_name_thai} {object.last_name_thai}
                        </h1>
                      </>
                    )}
                    {object.nickname && object.nickname_thai && (
                      <h1 className="text-2xl font-semibold mt-2">
                        {i18n.language === "th"
                          ? `${object.nickname_thai} · ${object.nickname}`
                          : `${object.nickname} · ${object.nickname_thai}`}
                      </h1>
                    )}
                  </div>
                  <div className="mb-4 lg:mb-8">
                    <h1
                      className={`text-xl font-semibold ${
                        MajorToTextColor[object.major]
                      }`}>
                      {i18n.language === "th"
                        ? MajorNameThai[object.major]
                        : i18n.language === "ko"
                        ? MajorNameKorean[object.major]
                        : i18n.language === "de"
                        ? MajorNameGerman[object.major]
                        : MajorName[object.major]}
                    </h1>
                    {profile === "student" ? (
                      <h1 className="text-xl">
                        {t("profile_rolodex_studentClass", {
                          level:
                            i18n.language === "th"
                              ? LevelNameThai[object.level]
                              : i18n.language === "ko"
                              ? LevelNameKorean[object.level]
                              : i18n.language === "de"
                              ? LevelNameGerman[object.level]
                              : LevelName[object.level],
                          classroom: object.class,
                        })}
                      </h1>
                    ) : (
                      matchedClassrooms.map((matchedClassroom: any) =>
                        matchedClassroom.classroom_ID != 0 ? (
                          <h1
                            key={matchedClassroom.classroom_ID}
                            className="text-xl">
                            {t("profile_rolodex_teacherClass", {
                              level:
                                i18n.language === "th"
                                  ? LevelNameThai[
                                      matchedClassroom.classroom_level
                                    ]
                                  : i18n.language === "ko"
                                  ? LevelNameKorean[
                                      matchedClassroom.classroom_level
                                    ]
                                  : i18n.language === "de"
                                  ? LevelNameGerman[
                                      matchedClassroom.classroom_level
                                    ]
                                  : LevelName[matchedClassroom.classroom_level],
                              classroom: matchedClassroom.classroom_class,
                            })}
                          </h1>
                        ) : (
                          <h1
                            key={matchedClassroom.classroom_ID}
                            className="text-xl">
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
          </Modal>
        </>,
        modal
      )
    : null;
};

export default RolodexModal;
